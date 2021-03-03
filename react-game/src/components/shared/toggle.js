import React, { Component } from 'react';
import './toggle.scss';
import PropTypes from 'prop-types';

import {Button} from '../shared/button';

export class Toggle extends Component {
  render() {
    const {
      onChange,
      isChecked
    } = this.props;
    return (
      <label className="switch">
        <input 
          type="checkbox"
          onChange={ onChange }
          defaultChecked={ isChecked }
        />
        <div className="slider round"></div>
      </label>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

Button.defaultProps = {
    isChecked: false,
};
