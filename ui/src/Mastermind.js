import React from 'react';
import ControlPanel from './components/ControlPanel'
import './App.css';
import RowPanel from "./components/RowPanel";
import SecretKey from "./components/SecretKey";
import Rules from "./components/Rules";
import feedback from "./components/mock/feedback";

class Mastermind extends React.Component {
    defaultClassName = "btn btn-white btn-circle btn-xl border border-dark";
    feedbackDefaultClassName = "btn btn-dark btn-circle btn-l border border-dark";
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
            this.attempt.push({id: i, color: this.defaultClassName});
        }
    }

    initFeedback = () => {
        for(let i = 0; i<4; i++) {
            this.feedback.push({id: i, color: this.feedbackDefaultClassName});
        }
    }

    initRows = () => {
        for(let i = 0; i<10; i++) {
            this.rows[i] = { attempt : [...this.attempt], feedback: [...this.feedback]}
        }
    }

    changeColor = (event) => {
        const className = event.target.className;

        const activeAttempt = this.state.rows[this.state.activeRow-1].attempt;

        let activePegCopy = {...activeAttempt[this.state.activePeg -1]};
        activePegCopy.color = className;

        activeAttempt[this.state.activePeg -1] = activePegCopy;

        let nextPeg = this.state.activePeg % 4 + 1;
        this.setState( { activePeg: nextPeg });
    }

    gameOver = () =>{
        return this.state.activeRow == 0;
    }

    checkAttempt = (event) => {
        //api
        if(!this.gameOver()) {
            const activeFeedback = this.state.rows[this.state.activeRow-1].feedback;

            for(let i = 0; i<4; i++) {
                let feedbackPegCopy = {...activeFeedback[i]};
                feedbackPegCopy.color = feedback[i].color;
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
