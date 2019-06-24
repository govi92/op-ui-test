import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import { Button, TextField, FormControl } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import {getUser} from '../actions/index';
import {loginUser} from '../../utils/index';
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
    isEmailEmpty:false,
    isPasswordEmpty: false,
    isEmailValid: true,
    isExceptionOccurred: false
  }

  login = async (event) => {
    event.preventDefault();
    const {type, email, password } = this.state;

    this.setState({
      isEmailValid: utils.emailValidation(email)
    });

    if(email !== '' && password !== '' && this.state.isEmailValid) {
      const response = await loginUser({type, email, password})
      
      if(response) {
        this.setState({
          isEmailEmpty: false,
          isPasswordEmpty: false
        });
        this.props.history.push('/newsfeed');
      } else {
        this.setState({
          isExceptionOccurred: true
        })
      }
    } else if (email === '' && password !== '') {
      this.setState({
        isEmailEmpty: true
      });
    } else if (email !== '' && password === '') {
      this.setState({
        isPasswordEmpty: true
      });
    } else {
      this.setState({
        isPasswordEmpty: true,
        isEmailEmpty: true
      });
    }
  }

  loginWithGoogle = async () => {
    const response = await loginUser({type: 'gl', email: '', password: ''});
    window.location.href = response;
  }

  loginWithFacebook = async () => {
    const response = await loginUser({type: 'fb', email: '', password: ''});
    window.location.href = response;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value 
    })
  }

  render() {

    return (
      <div style={style.containerFluid}>
        <div >
          <div style={(this.state.isEmailEmpty | this.state.isPasswordEmpty) ? style.formContainerExtended : style.formContainer }>
            <FormControl>
              <div>
                <h2 style={style.topic}>LOGIN</h2>
              </div>
              <div style={style.inputContainer}>
                <TextField
                  id="outlined-name"
                  label="Email Address"
                  // className={}
                  error={this.state.isEmailEmpty | this.state.isExceptionOccurred}
                  value={null}
                  fullWidth
                  onChange={this.handleChange('email')}
                  margin="normal"
                  variant="outlined"
                />
                {
                  (!this.state.isEmailEmpty && !this.state.isEmailValid) &&
                  <div>
                    <div style={style.errorMsg}>
                      <p style={style.errorText}>Error: Please enter a valid email address!</p>
                    </div>
                  </div>
                }
                {
                  this.state.isEmailEmpty &&
                  <div>
                    <div style={style.errorMsg}>
                      <p style={style.errorText}>Error: Email shouldn't be empty!</p>
                    </div>
                  </div>
                }
                <TextField
                  id="outlined-name"
                  label="Password"
                  // className={}
                  error={this.state.isPasswordEmpty | this.state.isExceptionOccurred}
                  value={null}
                  fullWidth
                  onChange={this.handleChange('password')}
                  margin="normal"
                  variant="outlined"
                />
                {
                  this.state.isPasswordEmpty &&
                  <div>
                    <div style={style.errorMsg}>
                      <p style={style.errorText}>Error: Password shouldn't be empty!</p>
                    </div>
                  </div>
                }
                {
                  this.state.isExceptionOccurred && 
                  <div>
                    <p style={style.exceptionErrorText}>
                      { store.getState().auth.errorMsg }
                    </p>
                  </div>
                }
              </div>
              <div style={style.hrContainer}>
                <hr style={style.styleEight} />
              </div>
              <div>
                <div className={'row'}>
                  <div className='col-md-6 col-xs-6'>
                    <Button 
                      variant='contained' 
                      style={style.loginGoogle}
                      onClick={this.loginWithGoogle}>
                      <div style={style.iconStyle}>
                        <FontAwesomeIcon icon={faGoogle} />
                      </div>
                      Login with Google
                    </Button>
                  </div>
                  <div className='col-md-6 col-xs-6'>
                    <Button 
                      variant='contained'
                      style={style.loginFacebook}
                      onClick={this.loginWithFacebook}>
                      <div style={style.iconStyle}>
                        <FontAwesomeIcon icon={faFacebookF} />
                      </div>
                      Login with Facebook
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  variant="contained"
                  style={style.loginButton}
                  onClick={this.login}
                >
                  Login
                </Button>
              </div>
            </FormControl>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser:user => dispatch(getUser(user))
  }
}


export default connect(null, mapDispatchToProps)(Login);