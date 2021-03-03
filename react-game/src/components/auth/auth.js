/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './auth.scss';
import * as Constants from '../../constants/constants';
import * as RemoteAuth from '../../services/auth';
import { validateEmail, validatePassword } from './validation';
import { Spinner } from '../shared/spinner';

const passwordError = `Password must be at least 8 characters long and contain at least one number, 
  upper and lower case letter and special character @#$%^&*`;
const emailError = 'Incorrect email format';

export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLogin: true,
      errorMessage: '',
    };
  }
    
  switchForm() {
    this.setState({
      isLogin: !this.state.isLogin,
    });
  }

  checkPassword(evt) {
    const password = evt.target.value;
    console.log(password);
    const message = (validatePassword(password)) ? '' : passwordError;      
    this.setState({
      errorMessage: message,
    });
  }

  checkEmail(evt) {
    const email = evt.target.value;
    console.log(email);
    const message = (validateEmail(email)) ? '' : emailError;      
    this.setState({ errorMessage: message });
  }

  async registerUser(username, email, password) {
    try {
      const res = await RemoteAuth.registerUser(username, email, password);
      if (res.statusCode === 200) {
        localStorage.setItem(Constants.userItemLocalStorage, JSON.stringify(res.token));
        const {setLogin, onClose} = this.props;
        setLogin();
        onClose();       
      }
      if (res.statusCode === 400) {
        this.setState({ errorMessage: res.reason });
      }      
    } catch (err) {
        this.setState({ errorMessage: `${err.name}: ${err.message}` });
    }
  }  
  
  async loginUser(username, password) {
    try {
      const res = await RemoteAuth.loginUser(username, password);
      if (res.statusCode === 200) {
        localStorage.setItem(Constants.userItemLocalStorage, JSON.stringify(res.token));
        const {setLogin, onClose} = this.props;
        setLogin();
        onClose();
      }
      if (res.statusCode === 403) {
        this.setState({ errorMessage: res.reason });
      }
    } catch (err) {
      this.setState({ errorMessage: `${err.name}: ${err.message}` });
    }
  }
  
  handleSubmit(evt) {
    evt.preventDefault(evt.target.elements);
    this.setState({ isLoading: true });
    
    if(this.state.isLogin) {
      const { username, password } = evt.target.elements;
      this.loginUser(username, password);
    } else {
      const { username, email, password } = evt.target.elements;
      this.registerUser(username, email, password);
    }
  }
  
  register(evt) {
    evt.preventDefault();
    const username = document.querySelector('#auth-username');
    const email = document.querySelector('#auth-email');
    const password = document.querySelector('#auth-password');
    this.registerUser(username.value, email.value, password.value);
  }

  login(evt) {
    evt.preventDefault();
    const username = document.querySelector('#auth-username');
    const password = document.querySelector('#auth-password');
    this.loginUser(username.value, password.value);  
  }

  render() {
    const formCaption = (this.state.isLogin) ? 'Login' : 'Register';
    const emailInput = (this.state.isLogin) ? '' :
    <input
      id="auth-email"
      className="auth-form-input"
      onChange={this.checkEmail.bind(this)}
      name="email"
      type="email"
      placeholder="youremail@domain.com"
      required
    />;
    const {onClose} = this.props;
    const buttonLogin = (this.state.isLogin) ? 'Login' : 'Register';
    const buttonRegister = (this.state.isLogin) ? 'Register' : 'Login';
    const command = (this.state.isLogin) ? this.login.bind(this) : this.register.bind(this);

    return (
      <div className="modal-shadow" onClick={onClose}>
        <div className="auth">
          <h2 className="auth-header">{formCaption}</h2>
          <form className="auth-form" >
            <div className="auth-inputs">
              <input
                id="auth-username"                
                className="auth-form-input"   
                name="username"
                type="text"
                placeholder="Username"
                required
              />
             {emailInput}
             <input
                id="auth-password"
                className="auth-form-input"
                onChange={this.checkPassword.bind(this)}
                name="password"
                type="password"
                placeholder="**************"
                autoComplete ="off"
                required
              />
             <span className="auth-form-error">{this.state.errorMessage}</span>
            </div>
            <div className="auth-buttons">
              <button
                className="auth-button button-register"
                onClick={this.switchForm.bind(this)}
                type="button"
              >{buttonRegister}</button>
              <button className="auth-button button-log-in"
                onClick={ command }
                type="submit">{buttonLogin}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
