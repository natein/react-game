import React, { Component } from 'react';
import * as Constants from '../constants/constants';
import musicSrc from '../assets/audio/ambient.mp3';
import soundSrc from '../assets/audio/noise.mp3';
import { Header } from './header/header';
import { Auth } from './auth/auth';
import { Main } from './main/main';
import { Footer } from './footer/footer';
import { Settings } from './settings/settings';
import { Stats } from './stats/stats';

export class App extends Component {
  constructor(props) {
    super(props);
    this.musicAudio = new Audio();
    this.musicAudio.loop = true;
    this.musicAudio.src = musicSrc;
    this.soundAudio = new Audio();
    this.soundAudio.src = soundSrc;

    this.state = {
      fieldSize: 3,
      gameField: Array(9).fill(-1),
      winnedCells: Array(9).fill(-1),
      isTexture: true,
      isSound: false,
      soundLevel: 1,
      isMusic: false,
      musicLevel: 1,
      isAuth: false,
      isAuthOpen: false,
      isStatsOpen: false,
      isSettingsOpen: false,
      isFinished: false
    };
  }
  
  loadData() {
    const storageName = Constants.userItemLocalStorage + 'state';
    const locStorage = localStorage.getItem(storageName);
    const initialData = (locStorage) ? JSON.parse(locStorage) : Constants.settingsDefault;
    this.setState({...initialData});
  }

  saveData() {
    const storageName = Constants.userItemLocalStorage + 'state';
    localStorage.setItem(storageName, JSON.stringify(this.state));
  }  

  changeFieldSize(evt) {
    this.setState({
      fieldSize: parseInt(evt.target.value, 10),
      gameField: Array(evt.target.value ** 2).fill(-1),
      winnedCells: Array(evt.target.value ** 2).fill(-1),
      isFinished: false
    });

  }
  
  changeFinished(value) {
    this.setState({
      isFinished: value,
    });
  }

  setLogin() {
    this.setState({
      isAuth: true,
    });
  }

  setLogout() {
    this.setState({
      isAuth: false,
    });
  }   

  changeFieldFill(evt) {
    this.setState({
      isTexture: evt.target.checked,
    });
  }

  setCellValue(n, value) {
    const arr = this.state.gameField;
    arr[n] = value;
    this.setState({
      gameField: arr,
    });
  }

  setWinnedCells(arr) {
    const field = this.state.winnedCells;
    arr.forEach(item => field[item] = 1);
    this.setState({
      winnedCells: field,
    });
  }

  changePlaySound(evt) {
    this.setState({
      isSound: evt.target.checked,
    });
  }
  
  changeSoundVolume(evt) {
    this.setState({
      soundLevel: evt.target.value,
    });
  }

  changePlayMusic(evt) {
    this.setState({
      isMusic: evt.target.checked,
    });
    if(evt.target.checked) this.musicAudio.play();
    else this.musicAudio.pause();
  }

  changeMusicVolume(evt) {
    this.setState({
      musicLevel: evt.target.value,
    });
    this.musicAudio.volume = evt.target.value;
  }

  openLogin() {
    this.setState({
      isAuthOpen: true,
    });
  }

  closeLogin(evt) {
    const className = evt.target.className;
    if(className === 'modal-shadow' || className === 'modal_button') {
      this.setState({
        isAuthOpen: false,
      });
    }
  }

  openStats() {
    this.setState({
      isStatsOpen: true,
    });
  }

  closeStats(evt) {
    const className = evt.target.className;
    if(className === 'modal-shadow' || className === 'modal_button') {
      this.setState({
        isStatsOpen: false,
      });
    }
  }

  openSettings() {
    this.setState({
      isSettingsOpen: true,
    });
  }

  closeSettings(evt) {
    const className = evt.target.className;
    if(className === 'modal-shadow' || className === 'modal_button') {
      this.setState({
        isSettingsOpen: false,
      });
    }
  }

  autoPlay() {
    
  }

  newGame() {
    this.setState({
      gameField: Array(this.state.fieldSize ** 2).fill(-1),
      winnedCells: Array(this.state.fieldSize ** 2).fill(-1),
      isFinished: false,
    });
  }

  render() {
    const {
      fieldSize,
      gameField,
      winnedCells,
      isTexture,
      isSound,
      soundLevel,
      isMusic,
      musicLevel,
      isAuth,
      isAuthOpen,
      isStatsOpen,
      isSettingsOpen,
      isFinished
    } = this.state;
    const openAuth = (isAuthOpen)
      ? <Auth
        onClose={this.closeLogin.bind(this)}
        setLogin = {this.setLogin.bind(this)}
      />
      : "";
    const openSettings = (isSettingsOpen)
      ? <Settings 
          fieldSize={ fieldSize }
          isTexture={ isTexture }
          isSound={ isSound }
          isMusic={ isMusic }
          musicLevel={ musicLevel }
          soundLevel={ soundLevel }
          onClose={ this.closeSettings.bind(this) }
          onChangeFieldSize={ this.changeFieldSize.bind(this)}
          onChangeMusicVolume = { this.changeMusicVolume.bind(this) }
          onChangeSoundVolume = { this.changeSoundVolume.bind(this) }
          onChangeFieldFill = { this.changeFieldFill.bind(this) }
          onChangePlaySound = { this.changePlaySound.bind(this) }
          onChangePlayMusic = { this.changePlayMusic.bind(this) }
        /> 
      : "";
      const openStats = (isStatsOpen) ? <Stats
        onClose={this.closeStats.bind(this)}
      /> : "";
    return (
      <>
        <Header
          isAuth = {isAuth}
          openStats = {this.openStats.bind(this)}
          openLogin = {this.openLogin.bind(this)}
          openSettings = {this.openSettings.bind(this)}
          autoPlay = {this.autoPlay.bind(this)}
          newGame = {this.newGame.bind(this)}
        />
        <Main 
          fieldSize={fieldSize}
          gameField={gameField}
          winnedCells={winnedCells}
          isTexture={isTexture}
          isFinished={isFinished}
          changeFinished={this.changeFinished.bind(this)}
          setCellValue={this.setCellValue.bind(this)}
          setWinnedCells={this.setWinnedCells.bind(this)}
        />
        <Footer />
        { openAuth }
        { openSettings }
        { openStats }
      </>
    );
  }
}
