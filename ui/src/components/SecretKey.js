import React, {Component} from "react";
import Peg from "./Peg";

export default class SecretKey extends Component {
    render() {
        let pegs = [1, 2, 3, 4];
        return (
        <div className="row border border-dark">
            <div className="col-12">
                {pegs.map( pegNr => {
                    return <Peg key={pegNr} className={this.props.config[pegNr-1]}/>
                })}
            </div>
        </div>
        );
    }
}