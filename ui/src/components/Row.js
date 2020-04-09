import * as React from 'react';
import PegList from "./PegList";
import CodeMakerFeedback from "./CodeMakerFeedback";

export default class Row extends React.Component{
    render() {
        return (
           <div className="row">
               <div className="col-8">
                   <PegList className={this.props.className}/>
               </div>
               <div className="col-4">
               <CodeMakerFeedback/>
               </div>
           </div>
        )
    }
}
