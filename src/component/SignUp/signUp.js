import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, TextField, FormControl } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { getUser } from '../actions/index';
import { registerUser } from '../../utils/index';
import * as utils from '../../utils/utilityFunctions';
import * as util from '../../utils/index';
import Footer from '../Footer';
import style from './style';
import store from '../store';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confPass: '',
    type: 'op',
    isClicked: false,
    isLogginClicked: false,
    isloggedIn: false,
    isEmailEmpty: false,
    isPasswordEmpty: false,
    isErrorOccured: false,
    isEmailValid: true,
    isExceptionOccured: false
  }

  confirmState = () => {
    this.setState({
      isClicked: true
    })
  }

  signUp = async (event) => {
    event.preventDefault();
    const { type, email, password, confPass } = this.state;

    this.setState({
      isEmailValid: utils.emailValidation(email)
    });

    if (confPass === password && confPass !== '' && password !== '' && email !== '' && this.state.isEmailValid) {
      const res = await registerUser({ type, email, password });
      if (res === true) {
        this.setState({
          isEmailEmpty: false,
          isPasswordEmpty: false
        });
        this.props.history.push({
          pathname: '/signup/confirm',
          state: { email: this.state.email }
        });
      } else {
        this.setState({
          isExceptionOccured: true
        })
      }
      return;
    }

    if (email === '' && password === '') {
      this.setState({
        isEmailEmpty: true,
        isPasswordEmpty: true
      });
      return;
    }

    if (email === '') {
      this.setState({
        isEmailEmpty: true,
        isPasswordEmpty: false
      });
      return;
    }

    if (password === '') {
      this.setState({
        isPasswordEmpty: true,
        isEmailEmpty: false
      });
      return;
    }

    if (password === '' && confPass === '') {
      this.setState({
        isErrorOccured: true
      });
      return;
    }
  }

  signWithGoogle = async () => {
    const res = await util.registerUser({type: 'gl', email: '', password: ''});
    window.location.href = res;
    console.log(res);
    
  }

  switchToLogin = () => {
    this.props.history.push('/login')
  }

  handleEventChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  buttonContainer = () => {
    return (
      <div>
        <Button variant style={style.signWithGoogle} onClick={this.signWithGoogle}>Sign With Google</Button>
        <div className='row'>
          <div className='col-md-6'>
            <Button
              variant="contained"
              style={style.signUpButton}
              onClick={this.signUp}
            >
              Create Account
          </Button>
          </div>
          <div className='col-md-6'>
            <Button
              variant="contained"
              style={style.loginButton}
              to='/login'
              onClick={this.switchToLogin}
            >
              Login
          </Button>
          </div>
        </div>
      </div>
    );
  }


  render() {
    return (
      <div style={style.containerFluid}>
        <div className={style.formWrapper}>
          <div style={(this.state.isEmailEmpty | this.state.isErrorOccured) ? style.formContainerExtended : style.formContainer}>
            <FormControl>
              <div>
                <h3 style={style.topic}>CREATE YOUR <br /> ACCOUNT</h3>
                <h4 className='text-muted' style={style.subTopic}>This is step 1</h4>
              </div>
              <div style={style.inputContainer}>
                <TextField
                  id="outlined-name"
                  label="Email Address"
                  // className={}
                  value={null}
                  error={this.state.isEmailEmpty | this.state.isExceptionOccured}
                  fullWidth
                  onChange={this.handleEventChange('email')}
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
                  type="password"
                  error={this.state.isPasswordEmpty | this.state.isErrorOccured | this.state.isExceptionOccured}
                  value={null}
                  fullWidth
                  onChange={this.handleEventChange('password')}
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
                <TextField
                  id="outlined-name"
                  label="Confirm Password"
                  // className={}
                  type="password"
                  error={this.state.isErrorOccured | this.state.isExceptionOccured}
                  value={null}
                  fullWidth
                  onChange={this.handleEventChange('confPass')}
                  margin="normal"
                  variant="outlined"
                />
                {
                  this.state.isErrorOccured &&
                  <div>
                    <div style={style.errorMsg}>
                      <p style={style.errorText}>Error: Password mismatch!</p>
                    </div>
                  </div>
                }
                {
                  this.state.isExceptionOccured &&
                  <div>
                    <p style={style.exceptionText}>{store.getState().auth.errorMsg}</p>
                  </div>
                }
              </div>
              <div style={style.hrContainer}>
                <hr style={style.styleEight} />
              </div>
              <div>
                {this.buttonContainer()}
              </div>
            </FormControl>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: user => dispatch(getUser(user))
  }
}


export default connect(null, mapDispatchToProps)(SignUp);