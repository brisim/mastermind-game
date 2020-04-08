import * as React from 'react';
import Peg from "./Peg";

export default class CodeMakerFeedback extends React.Component{
     className = "btn btn-white btn-circle btn-l border border-dark";
    renderPeg(key) {
        return <Peg key={key} className={this.className}/>
    }
    render() {
        let pegs = [1, 2, 3, 4];
        return (
            <div className="row">
                <div className="col-sm-2">
                    <div className="row">
                        {this.renderPeg(0)}
                        {this.renderPeg(1)}
                    </div>
                    <div className="row">
                        {this.renderPeg(2)}
                        {this.renderPeg(3)}
                    </div>
                </div>
            </div>
        );
    }
}