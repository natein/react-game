import React, { Component } from 'react';
import './stats.scss';
import {Button} from '../shared/button';

export class Stats extends Component {
  render() {
    const { onClose } = this.props;

    return (
      <div className="modal-shadow" onClick={onClose} >      
        <div className="stats">
        
          <div className="stats_caption">
            <h2>Statistics</h2>
          </div>
          
          <div className="stats_content">
            <p>Games played: 30 times</p>
            <p>Games won: 10 times</p>
            <p>Win percentage: 33%</p>

            <Button className="modal_button"
              onClick={ onClose }
              title="OK"
              toolTip="OK"
            />            
          </div>
          
        </div>
      </div>
    );
  }
}

