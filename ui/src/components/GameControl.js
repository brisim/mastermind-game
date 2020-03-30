import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
class GameControl extends React.Component {
    render() {
        return <div className="row border border-dark">
           <div class="col-sm-4">
            <button type="button" className="btn btn-primary btn-circle btn-xl"><i className="fa fa-list"></i>
            </button>
            <button type="button" className="btn btn-success btn-circle btn-xl"><i className="fa fa-link"></i>
            </button>
            <button type="button" className="btn btn-info btn-circle btn-xl"><i className="fa fa-check"></i>
            </button>
               <br/>
            <button type="button" className="btn btn-warning btn-circle btn-xl"><i className="fa fa-times"></i>
            </button>
            <button type="button" className="btn btn-danger btn-circle btn-xl"><i className="fa fa-heart"></i>
            </button>
            <button type="button" className="btn btn-dark btn-circle btn-xl"><i className="fa fa-heart"></i>
            </button>
           </div>
                <div class="col-sm-4">
                    <div className="row">
                <button type="button" className="btn btn-success">Check</button>
                    </div>
                    <div className="row">
                <button type="button" className="btn btn-danger">Reset</button>
                    </div>
                </div>
        </div>;
    }
}

export default GameControl;