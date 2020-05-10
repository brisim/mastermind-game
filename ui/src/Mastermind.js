import React from 'react';
import ControlPanel from './components/ControlPanel'
import './App.css';
import RowPanel from "./components/RowPanel";
import SecretKey from "./components/SecretKey";
import Rules from "./components/Rules";
import axios from 'axios';
import {baseUrl} from "./components/api/baseUrl";
import {axiosConfiguration} from "./components/api/axiosConfiguration";
import feedbackColors from "./components/data/feedbackColors";
import attemptColors from "./components/data/attemptColors";

class Mastermind extends React.Component {
    defaultClassName = attemptColors.get("WHITE");
    feedbackDefaultClassName = feedbackColors.get("BLACK");

    attempt = [];
    rows = [];
    feedback = [];
    constructor(props) {
        super(props);
        this.initAttempt();
        this.initFeedback();
        this.initRows();

        this.state = {
            activeRow: 10,
            activePeg: 1,
            rows: [...this.rows]
        }
    }

    initAttempt = () => {
        for(let i = 0; i<4; i++) {
            this.attempt.push({position: i, color: "WHITE", className:this.defaultClassName});
        }
    }

    initFeedback = () => {
        for(let i = 0; i<4; i++) {
            this.feedback.push({position: i, className: this.feedbackDefaultClassName});
        }
    }

    initRows = () => {
        for(let i = 0; i<10; i++) {
            this.rows[i] = { attempt : [...this.attempt], feedback: [...this.feedback]}
        }
    }

    changeColor = (event) => {
        const className = event.target.className;
        const color = event.target.getAttribute("color")

        const activeAttempt = this.state.rows[this.state.activeRow-1].attempt;

        let activePegCopy = {...activeAttempt[this.state.activePeg -1]};
        activePegCopy.className = className;
        activePegCopy.color = color;

        activeAttempt[this.state.activePeg -1] = activePegCopy;
        let nextPeg = this.state.activePeg % 4 + 1;
        this.setState( { activePeg: nextPeg });
    }

    gameOver = () => {
        return this.state.activeRow === 0;
    }

    checkAttempt = async (event) => {
        if(!this.gameOver()) {
        let currentAttempt =  [...this.state.rows[this.state.activeRow-1].attempt];
        let attemptRequest = [];

        for(let i = 0; i<4; i++) {
          const { className, ...attempt} = currentAttempt[i];
          attemptRequest.push(attempt);
         }
            const feedbackResponse = await axios.post(`${baseUrl}/check`, {attempt: attemptRequest}, axiosConfiguration);
            const result = feedbackResponse.data;
            const feedbackFromApi = result.feedback

            const activeFeedback = this.state.rows[this.state.activeRow-1].feedback;

            for(let i = 0; i<4; i++) {
                let feedbackPegCopy = {...activeFeedback[i]};
                feedbackPegCopy.className = feedbackColors.get(feedbackFromApi[i].color);
                activeFeedback[i] = feedbackPegCopy;
            }

            let nextAttempt = this.state.activeRow - 1;
            let activePeg = 1;
            this.setState({activeRow: nextAttempt, activePeg: activePeg });
        }
    }

    reset = () => {
        for(let i = 0; i<10; i++) {
            this.rows[i] = {attempt: [...this.attempt], feedback:[...this.feedback] };
        }
        this.setState({activeRow: 10, activePeg:1, rows: this.rows});
    }

    render() {
        let secretKeyClassName = "btn btn-dark btn-circle btn-xl border border-dark";
        return (
            <div className="container">
                <div className="row">
                   <Rules/>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <SecretKey className={secretKeyClassName} />
                        <div className="row">
                            <div className="col border border-dark text-danger text-center"> <b> Secret Key </b> </div>
                        </div>
                        <RowPanel rows={this.state.rows} activeRow = {this.state.activeRow}/>
                        <div className="row">
                            <div className="col border border-dark text-danger text-center"> <b> Control Panel </b> </div>
                        </div>
                        <ControlPanel changeColor = {this.changeColor} checkAttempt = {this.checkAttempt} reset = {this.reset}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mastermind;