import * as React from "react";

class GameAttempts extends React.Component {
    render() {
        return (
        <div className="row">
            <div className="col-sm-4">
                <button type="button" className="btn btn-white btn-circle btn-xl border border-dark"><i className="fa fa-list"></i>
                </button>
                <button type="button" className="btn btn-white btn-circle btn-xl border border-dark"><i className="fa fa-list"></i>
                </button>
                <button type="button" className="btn btn-white btn-circle btn-xl border border-dark"><i className="fa fa-list"></i>
                </button>
                <button type="button" className="btn btn-white btn-circle btn-xl border border-dark"><i className="fa fa-list"></i>
                </button>
            </div>
        </div>
        );
    }
}
export default GameAttempts;