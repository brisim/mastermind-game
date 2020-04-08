import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import colors from './data/colors';
import Peg from "./Peg";

class ControlPanel extends React.Component {
    render() {
        return <div className="row border border-dark">
           <div class="col-sm-4">
               {colors.map(color =><Peg key={color.id} className={color.className}/>
               )}
           </div>
                <div class="col-sm-4">
                    <div className="row">
                <button type="button" id="check" className="btn btn-success">Check</button>
                    </div>
                    <div className="row">
                <button type="button" id="reset" className="btn btn-danger">Reset</button>
                    </div>
                </div>
        </div>;
    }
}

export default ControlPanel;