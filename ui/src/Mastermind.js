import React from 'react';
import ControlPanel from './components/ControlPanel'
import './App.css';
import RowPanel from "./components/RowPanel";
import SecretKey from "./components/SecretKey";
import Rules from "./components/Rules";
import axios from 'axios';
import {baseUrl} from "./components/api/baseUrl";
import {axiosConfiguration} from "./components/api/axiosConfiguration";
import config from "./components/data/config";

class Mastermind extends React.Component {
    attempt = [];
    rows = [];
    feedback = [];
    secretKey = [];
    constructor(props) {
        super(props);
        this.initAttempt();
        this.initFeedback();
        this.initSecretKey();
        this.initRows();

        this.state = {
            activeRow: 10,
            activePeg: 1,
            rows: [...this.rows],
            secretKey: this.secretKey,
            isGameStarted: false,
            message:""
        }
    }

    initAttempt = () => {
        for(let i = 0; i<4; i++) {
            this.attempt.push({position: i, color: "WHITE", className: config.attemptDefaultClassName});
        }
    }

    initFeedback = () => {
        for(let i = 0; i<4; i++) {
            this.feedback.push({position: i, className: config.feedbackDefaultClassName});
        }
    }

    initSecretKey = () => {
        for(let i = 0; i<4; i++) {
            this.secretKey.push(config.secretKeyDefaultClassName);
        }
    }

    initRows = () => {
        for(let i = 0; i<10; i++) {
            this.rows[i] = { attempt : [...this.attempt], feedback: [...this.feedback]}
        }
    }

    changeColor = (event) => {
        if(this.attemptLeft) {
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
    }

    attemptLeft = () => {
        return this.state.activeRow !=0;
    }

    checkAttempt = async (event) => {
        if(this.attemptLeft()) {
        let currentAttempt =  [...this.state.rows[this.state.activeRow-1].attempt];
        let attemptRequest = [];

        for(let i = 0; i<4; i++) {
          const { className, ...attempt} = currentAttempt[i];
          attemptRequest.push(attempt);
         }
            const feedbackResponse = await axios.post(`${baseUrl}/check`, {attempt: attemptRequest}, axiosConfiguration);
            const result = feedbackResponse.data;
            const feedbackFromApi = result.feedback;
            const isWinner = result.winner;

            const activeFeedback = this.state.rows[this.state.activeRow-1].feedback;

            for(let i = 0; i<4; i++) {
                let feedbackPegCopy = {...activeFeedback[i]};
                feedbackPegCopy.className = config.feedbackColors.get(feedbackFromApi[i].color);
                activeFeedback[i] = feedbackPegCopy;
            }

                let nextAttempt = this.state.activeRow - 1;
                let activePeg = 1;
                this.setState({activeRow: nextAttempt, activePeg: activePeg });
                if(nextAttempt == 0 || isWinner) {
                    this.revealSecretKey();
                    this.displayMessage("You Won!");
                }
                if (nextAttempt == 0 && !isWinner) {
                    this.revealSecretKey();
                    this.displayMessage("Game Over!");
                }
        }
    }

    displayMessage = (message) => {
        this.setState({message: message});
}

    revealSecretKey = async () => {
        const response = await axios.get(`${baseUrl}/secret-key`, axiosConfiguration);
        const secretKey = [];
        const secretKeyColor =  response.data;
        for(let i = 0; i<4; i++) {
            secretKey.push(config.attemptColors.get(secretKeyColor[i]));
        }
        this.setState({secretKey: secretKey});
    }

    reset = () => {
        for(let i = 0; i<10; i++) {
            this.rows[i] = {attempt: [...this.attempt], feedback:[...this.feedback] };
        }
        this.setState({activeRow: 10, activePeg:1, rows: this.rows, secretKey:[...this.secretKey], message:""});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                   <Rules/>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col border border-dark text-danger text-center" id="message"><b>{this.state.message}</b></div>
                        </div>
                        <SecretKey config={this.state.secretKey} />
                        <div className="row">
                            <div className="col border border-dark text-danger text-center"> <b> Secret Key </b> </div>
                        </div>
                        <RowPanel rows={this.state.rows} activeRow = {this.state.activeRow}/>
                        <div className="row">
                            <div className="col border border-dark text-danger text-center"> <b> Control Panel </b> </div>
                        </div>
                        <ControlPanel isGameStarted = {this.state.isGameStarted} changeColor = {this.changeColor} checkAttempt = {this.checkAttempt} reset = {this.reset}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mastermind;