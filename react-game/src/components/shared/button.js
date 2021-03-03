import React, { Component } from 'react';
import './button.scss';
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    const {
      className, isDisabled, onClick, title, toolTip,
    } = this.props;
    return (
      <button
        className={className}
        disabled={isDisabled}
        onClick={onClick}
        title={toolTip}
        type="button"
      >
        {title}
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  toolTip: PropTypes.string,
};

Button.defaultProps = {
    className: '',
    isDisabled: false,
};
