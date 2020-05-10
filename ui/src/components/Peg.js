import React, {Component} from 'react';

export default class Peg extends Component {
    render() {
       return(
           <button type="button" id={this.props.dataKey} className={this.props.className}
           color={this.props.color} onClick={this.props.changeColor}>
               <i className="fa fa-list"></i>
           </button>
       )
    }
}