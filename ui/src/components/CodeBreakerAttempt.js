import React, {Component} from "react";
import Peg from "./Peg";

export default class CodeBreakerAttempt extends Component {
    render() {
        let pegs = [1, 2, 3, 4];
        let className = "btn btn-white btn-circle btn-xl border border-dark";
        return (
        <div className="row border border-dark">
            <div className="col">
                {pegs.map( pegNr => {
                    return <Peg key={pegNr} className={className}/>
                })}
            </div>
        </div>
        );
    }
}