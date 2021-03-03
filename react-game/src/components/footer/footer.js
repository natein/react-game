import React, { Component } from 'react';
import './footer.scss';
import * as Constants from '../../constants/constants';

export class Footer extends Component {
  render() {
    const links = Constants.DEVELOPERS
      .map((elem) => <a className="github-user" key={elem.user} href={elem.link}>{elem.user}</a>);
    return (
      <footer className="footer">
        <div className="rsschool-logo"></div>
        <div className="github">
          <div className="github-logo"></div>
          {links}          
        </div>
        <a href={Constants.COURSE_LINK}>{Constants.COURSE_NAME}</a>
      </footer>
    );
  }
}
