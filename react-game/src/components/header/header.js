import React, { Component } from 'react';
import './header.scss';
import * as Constants from '../../constants/constants';
import {Button} from '../shared/button';

export class Header extends Component {
  
  launchFullScreen(element) {
    if(element.requestFullScreen) {
      element.requestFullScreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  cancelFullscreen() {
    if(document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }

  viewFullScreen(evt) {
    evt.target.onclick = this.exitFullScreen.bind(this);
    evt.target.classList.replace('fullscreen_in', 'fullscreen_out');
    this.launchFullScreen(document.body);
  }

  exitFullScreen(evt) {
    evt.target.onclick = this.viewFullScreen.bind(this);
    evt.target.classList.replace('fullscreen_out', 'fullscreen_in');
    this.cancelFullscreen();
  }

  render() {
    const {isAuth, openStats, openLogin, openSettings, autoPlay, newGame} = this.props;
    const loginBtnTitle = (isAuth) ? "Logout" : "Login";
    return (
      <header className="header">
        <h1 className="header_h1">{Constants.APP_NAME}</h1>
        <div className="menu_buttons">
          <Button className={"menu_button"}
            disabled={false}
            onClick={newGame}
            title={"New Game"}
          />
          <Button className={"menu_button"}
            disabled={false}
            onClick={autoPlay}
            title={"Autoplay"}
          />
          <Button className={"menu_button"}
            disabled={false}
            onClick={openStats}
            title={"Stats"}
          />
          <Button className={"menu_button"}
            disabled={false}
            onClick={openSettings}
            title={"Settings"}
          />
          <Button className={"menu_button"}
            disabled={false}
            onClick={openLogin}
            title={loginBtnTitle}
          />
          <button className="fullscreen fullscreen_in"
            onClick={this.viewFullScreen.bind(this)}
          >
          </button>
        </div>
      </header>
    );
  }
}
