import * as React from 'react';
import CodeBreakerAttempt from "./CodeBreakerAttempt";
import CodeMakerFeedback from "./CodeMakerFeedback";

export default class Row extends React.Component{
    render() {
        return (
           <div className="row">
               <div className="col-8">
                   <CodeBreakerAttempt/>
               </div>
               <div className="col-4">
               <CodeMakerFeedback/>
               </div>
           </div>
        )
    }
}
