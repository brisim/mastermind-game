import * as React from 'react';
import CodeBreakerAttempt from "./CodeBreakerAttempt";
import CodeMakerFeedback from "./CodeMakerFeedback";

export default class Row extends React.Component{
    render() {
        return (
           <div className="row">
               <div className="col-sm-10">
                   <CodeBreakerAttempt/>
               </div>
               <div className="col-sm-4">
               <CodeMakerFeedback/>
               </div>
           </div>
        )
    }
}
