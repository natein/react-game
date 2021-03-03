import React, { Component } from 'react';
import './settings.scss';
import * as Constants from '../../constants/constants';
import {Button} from '../shared/button';
import {Select} from '../shared/select';
import {Toggle} from '../shared/toggle';

export class Settings extends Component {
  render() {
    const {
      fieldSize, isTexture, isSound, 
      soundLevel, isMusic, musicLevel, onClose,
      onChangeFieldSize, onChangeMusicVolume, onChangeSoundVolume,
      onChangeFieldFill, onChangePlaySound, onChangePlayMusic
    } = this.props;

    return (
      <div className="modal-shadow" onClick={onClose} >
        <div className="settings">
          <div className="settings_caption">
            <h2>Settings</h2>
          </div>
          <div className="settings_content">
          
            <div className="setting-item">
              <label htmlFor ="settings_select">Field size</label> 
              <Select 
                className="settings_select"
                options={ Constants.FIELD_SIZES }                
                selected={ fieldSize }
                onChange={ onChangeFieldSize }
              />
            </div>
            
            <div className="setting-item">
              <label>Textured game field</label>
              <Toggle 
                onChange={onChangeFieldFill}
                isChecked={isTexture}
              />
            </div>
            
            <div className="setting-item">
              <label>Play sound</label>
              <Toggle
                onChange={onChangePlaySound}
                isChecked={isSound}              
              />
            </div>

            <div className="setting-item">
              <label htmlFor ="sound_volume">Sound volume</label>
              <input type="range" 
                min="0" max="1" step="0.1"
                name="volume" id="sound_volume" 
                value={soundLevel}
                onChange={onChangeSoundVolume}
              />
            </div>
            
            <div className="setting-item">
              <label>Play music</label>
              <Toggle
                onChange={onChangePlayMusic}
                isChecked={isMusic}              
              />
            </div>

            <div className="setting-item">
              <label htmlFor="music_volume">Music volume</label>
              <input type="range" 
                min="0" max="1" step="0.1"
                name="music_volume" id="music_volume" 
                value={musicLevel}
                onChange={onChangeMusicVolume}
              />
            </div>

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

