import React, {Component} from "react";
import Peg from "./Peg";

export default class CodeBreakerAttempt extends Component {
    render() {
        let pegs = [1, 2, 3, 4];
        return (
        <div className="row">
            <div className="col-sm-4">
                {pegs.map( pegNr => {
                    return <Peg key={pegNr}/>
                })}
            </div>
        </div>
        );
    }
}