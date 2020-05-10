import * as React from 'react';
import Peg from "./Peg";

export default class CodeMakerFeedback extends React.Component{
     className = "btn btn-dark btn-circle btn-l border border-dark";
    renderPeg(key) {
        return <Peg key={key} dataKey={"feedbackPeg_" + key + "_" + this.props.dataKey} className={this.props.feedback[key].className}/>
    }
    render() {

        return (
            <div className="row border border-dark">
                <div className="col-sm-2">
                        {this.renderPeg(0)}
                        {this.renderPeg(1)}
                </div>
                <div className="col-sm-2">
                        {this.renderPeg(2)}
                        {this.renderPeg(3)}
                </div>
            </div>
        );
    }
}