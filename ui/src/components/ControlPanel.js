import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import colors from './data/colors';
import Peg from "./Peg";

class ControlPanel extends React.Component {
    render() {
        return (
            <div className="row border border-dark">
                <div className="col-sm-1"></div>
                <div className="col-sm-5">
                   {colors.map(color =><Peg key={color.id} className={color.className} changeColor={this.props.changeColor}/>
                   )}
               </div>
                <div className="col-sm-2"></div>
                   <div className="col-sm-3">
                        <div className="row">
                            <button type="button" id="check" className="btn btn-success">Check</button>
                        </div>
                         <div className="row">
                            <button type="button" id="reset" className="btn btn-danger">Reset</button>
                         </div>
                   </div>
        </div>
        )
    }
}

export default ControlPanel;