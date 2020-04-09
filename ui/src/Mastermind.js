import React from 'react';
import ControlPanel from './components/ControlPanel'
import './App.css';
import RowPanel from "./components/RowPanel";
import CodeBreakerAttempt from "./components/CodeBreakerAttempt";
import SecretKey from "./components/SecretKey";

class Mastermind extends React.Component {
    defaultClassName = "btn btn-white btn-circle btn-xl border border-dark";
    attempt = [];
    constructor() {
        super();
        this.intiAttempt();

        this.state = {
            activeRow: 1,
            activePeg: 1,
            attempt: this.attempt
        }
    }

    intiAttempt = () => {
        for(let i = 0; i<4; i++) {
            this.attempt.push({id: i, color: this.defaultClassName});
        }
    }

    changeColor = (color) => {
        let activePegCopy = {...this.state.attempt[this.state.activePeg -1]};
        activePegCopy.color = color;

        this.state.attempt[this.state.activePeg -1] = activePegCopy;
        this.setState({attempt: this.state.attempt });
    }

    render() {
        let secretKeyClassName = "btn btn-dark btn-circle btn-xl border border-dark";
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 text-left">
                        <h1>Mastermind</h1>
                        <p>The play of the game goes as follows:</p>
                        <ul>
                            <li>
                                One player, known as the Codemaker, secretly places the 4 Code Pegs in the 4
                                holes, which are then covered by flipping over the plastic shield to conceal them from
                                the opponent's sight. The Codemaker can use any combination of the 6 colors he
                                chooses. He can also use 2 or more Code Pegs of the same color if he wishes.
                            </li>
                            <li>
                                The other player, known as the Codebreaker, sits opposite the Codemaker and
                                places Code Pegs in the 1st row of the Code Peg holes (closest to him). The
                                Codebreaker is attempting to duplicate the exact colors and positions of the secret
                                code.
                            </li>
                            <li>
                                The Codemaker responds by placing 0, 1, 2, 3, and 4 Key Pegs in the Key Peg holes
                                on the 1st row as follows:
                                (b) A black Key Peg to indicate a Code Peg of the right color and in the right position
                                (without indication of which Code Peg it corresponds to).
                                (b) A white Key Peg to indicate a Code Peg of the right color but in the wrong position.
                                (b) No Key Peg to indicate a wrong color that does not appear in the secret code.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <SecretKey className={secretKeyClassName} />
                        <div className="row">
                            <div className="col border border-dark text-danger text-center"> <b> Secret Key </b> </div>
                        </div>
                        <RowPanel attempt={this.state.attempt}/>
                        <div className="row">
                            <div className="col border border-dark text-danger text-center"> <b> Control Panel </b> </div>
                        </div>
                        <ControlPanel changeColor = {this.changeColor}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Mastermind;
