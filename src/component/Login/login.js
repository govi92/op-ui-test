import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Button, TextField, FormControl } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { getUser } from '../actions/index';
import { loginUser } from '../../utils/index';
import * as utils from '../../utils/utilityFunctions';
import style from './style';
import Footer from '../Footer';
import store from '../store';

class Login extends Component {

  state = {
    email: '',
    password: '',
    type: 'op',
    isClicked: false,
    isFacebookClicked: false,
    isloggedIn: false,
    isEmailEmpty: false,
    isPasswordEmpty: false,
    isEmailNotValid: false,
    isExceptionOccurred: false,
    isCallBackErrorOccured: false
  }

  login = async (event) => {
    event.preventDefault();
    const { type, email, password } = this.state;

    const isEmailValid = utils.emailValidation(email);
  
    if (email !== '' && password !== '' && isEmailValid) {
      const response = await loginUser({ type, email, password })
      if (response !== false) {
        this.setState({
          isEmailEmpty: false,
          isPasswordEmpty: false,
          isEmailNotValid: false
        });
        localStorage.setItem('loginCredentials', response);
        this.props.history.push('/newsfeed');
      } else {
        this.setState({
          isExceptionOccurred: true
        })
      }

    } else if (email === '' && password !== '') {
      this.setState({
        isEmailEmpty: true,
      });

    } else if (email !== '' && password === '' && isEmailValid) {
      this.setState({
        isPasswordEmpty: true,
        isEmailEmpty: false
      });

    } else if (email !== '' && password === '' && isEmailValid === false) {
      this.setState({
        isEmailNotValid: true,
        isPasswordEmpty: true,
        isEmailEmpty: false
      });

    } else if(email === '' && password === '') {
      this.setState({
        isPasswordEmpty: true,
        isEmailEmpty: true
      });

    } else if(isEmailValid === false) {
      this.setState({
        isEmailNotValid: true
      });

    } else {
      this.setState({
        isPasswordEmpty: true,
        isEmailEmpty: true
      });
    }
  };

  loginWithGoogle = async () => {
    const response = await loginUser({ type: 'gl', email: '', password: '' });
    console.log(response);
    
    window.location.href = response.message;
  };

  loginWithFacebook = async () => {
    const response = await loginUser({ type: 'fb', email: '', password: '' });
    window.location.href = response.message;
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  buttonContainer = () => {
    return (
      <div>
        <div>
          <Button
            variant="contained"
            style={style.loginButton}
            onClick={this.login}
          >
            Login
          </Button>
        </div>
        <div style={style.hrContainer}>
          <hr style={style.styleEight} />
        </div>
        <Button
          variant='contained'
          style={style.loginGoogle}
          onClick={this.loginWithGoogle}
          fullWidth>
          <div style={style.iconStyle}>
            <FontAwesomeIcon icon={faGoogle} />
          </div>
          Login with Google
        </Button>
        <Button
          variant='contained'
          style={style.loginFacebook}
          onClick={this.loginWithFacebook}
          fullWidth>
          <div style={style.iconStyle}
          >
            <FontAwesomeIcon icon={faFacebookSquare} />
          </div>
          Login with Facebook
        </Button>
      </div>
    )
  }

  render() {

    return (
      <div style={style.containerFluid}>
        <div >
          <div style={(this.state.isEmailEmpty | this.state.isPasswordEmpty | this.state.isEmailNotValid | this.state.isExceptionOccurred) ? style.formContainerExtended : style.formContainer}>
            <FormControl>
              <div>
                <h2 style={style.topic}>LOGIN</h2>
              </div>
              <div style={style.inputContainer}>
                <TextField
                  id="outlined-name"
                  label="Email Address"
                  // className={}
                  error={(this.state.isEmailEmpty | this.state.isExceptionOccurred | this.state.isEmailNotValid) ? true : false}
                  fullWidth
                  onChange={this.handleChange('email')}
                  margin="normal"
                  variant="outlined"
                />
                {
                  this.state.isEmailEmpty &&
                  <div>
                    <div style={style.errorMsg}>
                      <p style={style.errorText}>Email shouldn't be empty!</p>
                    </div>
                  </div>
                }
                {
                  (!this.state.isEmailEmpty && this.state.isEmailNotValid) &&
                  <div>
                    <div style={style.errorMsg}>
                      <p style={style.errorText}>Please enter a valid email address!</p>
                    </div>
                  </div>
                }
                <TextField
                  id="outlined-name"
                  label="Password"
                  // className={}
                  type='password'
                  error={(this.state.isPasswordEmpty | this.state.isExceptionOccurred) ? true : false}
                  fullWidth
                  onChange={this.handleChange('password')}
                  margin="normal"
                  variant="outlined"
                />
                {
                  this.state.isPasswordEmpty &&
                  <div>
                    <div style={style.errorMsg}>
                      <p style={style.errorText}>Password shouldn't be empty!</p>
                    </div>
                  </div>
                }
                {
                  this.state.isExceptionOccurred &&
                  <div>
                    <p style={style.exceptionErrorText}>
                      {store.getState().auth.errorMsg}
                    </p>
                  </div>
                }
                {
                  this.props.location.state &&
                  <div>
                    <p style={style.exceptionErrorText}>
                      {this.props.location.state.error}
                    </p>
                  </div>
                }
              </div>
              {
                this.buttonContainer()
              }
              <div style={style.signUpTextWrapper}>
                <p className='text-muted' style={style.signUpText}>Don't have an account? <Link style={style.linkText} to='/'>Sign Up</Link> </p>
              </div>
            </FormControl>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: user => dispatch(getUser(user))
  }
}


export default connect(null, mapDispatchToProps)(Login);