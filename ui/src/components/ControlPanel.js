import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import config from './data/config';
import Peg from "./Peg";
import axios from 'axios';
import {baseUrl} from "./api/baseUrl";
import {axiosConfiguration} from "./api/axiosConfiguration";

class ControlPanel extends React.Component {

    async start() {
       await axios.get(`${baseUrl}/start`, axiosConfiguration);
    }

    render() {
        const coloredPegs = [];
        let index = 0;
        for (const [color, className] of config.attemptColors.entries()) {
            coloredPegs.push(<Peg key={index} dataKey={"coloredPeg" + index} color={color} className={className}
                     changeColor={this.props.changeColor}/>);
            index++;
        }

        return (
            <div className="row border border-dark">
                <div className="col-sm-1"></div>
                <div className="col-sm-5">
                    {coloredPegs}
               </div>
                <div className="col-sm-2"></div>
                   <div className="col-sm-3">
                        <div className="row">
                            <button type="button" id="check" className="btn btn-success" onClick={this.props.checkAttempt}>Check</button>
                        </div>
                         <div className="row">
                            <button type="button" id="reset" className="btn btn-danger" onClick={this.props.reset}>Reset</button>
                         </div>
                       <div className="row">
                           <button type="button" id="start" className="btn btn-info" onClick={this.start}>Start</button>
                       </div>
                   </div>
        </div>
        )
    }
}

export default ControlPanel;