import React, { Component } from 'react';
import './select.scss';

export class Select extends Component {
  render() {
    const {
      className, options, selected, onChange
    } = this.props; 

    
    let opts = options.map((elem, idx) => {
      const selectedIndex = (elem.value === selected) ? selected : '';
      return <option key={elem.value} value={elem.value} {...selectedIndex}>{elem.text}</option>
    });

    return (
      <select
        className={className}
        onChange={onChange}
      >
      {opts};
      </select>
    );
  }  
}

export default Select;
