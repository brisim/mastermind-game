import React, {Component} from 'react';

export default class Peg extends Component {
    render() {
       return(
           <button type="button" className={this.props.className}>
               <i className="fa fa-list"></i>
           </button>
       )
    }
}