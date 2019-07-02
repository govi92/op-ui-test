import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, TextField, FormControl } from '@material-ui/core'
import { getUser } from '../actions/index';
import { registerUser } from '../../utils/index';
import * as utils from '../../utils/utilityFunctions';
import * as util from '../../utils/index';
import store from '../store';
import NewsFeed from '../NewsFeed';
import style from './style';

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
    isEmailNotValid: false,
    isConfPasswordEmpty: false,
    isExceptionOccured: false
  }

  componentDidMount() { }

  confirmState = () => {
    this.setState({
      isClicked: true
    })
  }

  signUp = async (event) => {
    event.preventDefault();
    const { type, email, password, confPass } = this.state;

    const isEmailValid = utils.emailValidation(email);

    if (confPass === password && confPass !== '' && password !== '' && email !== '' && isEmailValid) {

      const res = await registerUser({ type, email, password });
      if (res === true) {
        this.setState({
          isEmailEmpty: false,
          isPasswordEmpty: false,
          isEmailNotValid: false,
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
    }
    if (isEmailValid === false) {
      this.setState({
        isEmailNotValid: true,
      });
    } else {
      this.setState({
        isEmailNotValid: false,
      });
    }
    if (email === '') {
      this.setState({
        isEmailEmpty: true,
      });
    } else {
      this.setState({
        isEmailEmpty: false,
      });
    }
    if (password === '') {
      this.setState({
        isPasswordEmpty: true
      });
    } else {
      this.setState({
        isPasswordEmpty: false
      })
    }
    if (confPass === '') {
      this.setState({
        isConfPasswordEmpty: true
      });
    } else {
      this.setState({
        isConfPasswordEmpty: false
      })
    }
    if (password !== confPass && password !== '' && confPass !== '') {
      this.setState({
        isErrorOccured: true
      });
    } else {
      this.setState({
        isErrorOccured: false
      });
    }
  }

  signUpWithGoogle = async () => {
    const res = await util.registerUser({ type: 'gl', email: '', password: '' });
    window.location.href = res;
  }

  signUpWithFacebook = async () => {
    const res = await util.registerUser({ type: 'fb', email: '', password: '' });
    window.location.href = res;
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
        <Button
          variant='contained'
          style={style.signUpButton}
          onClick={this.signUp}
          fullWidth
        >
          Create Account
          </Button>
        <div style={style.hrContainer}>
          <hr style={style.styleEight} />
        </div>
        <Button
          variant='contained' style={style.signWithGoogle}
          onClick={this.signUpWithGoogle}
          fullWidth
        >
          Sign With Google
            </Button>
        <Button
          variant='contained' style={style.signUpWithFacebook}
          onClick={this.signUpWithFacebook}
          fullWidth
        >
          Sign With Facebook
            </Button>
      </div>
    );
  }


  render() {
    return (
      <div style={style.containerFluid}>
        <div className={style.formWrapper}>
          <div style={(this.state.isEmailEmpty | this.state.isErrorOccured | this.props.location.state) ? style.formContainerExtended : style.formContainer}>
            <div className='row'>
              <div className='col-md-6' style={style.newsContainer}>
                <h2 style={style.newsFeedHeader}>LATEST NEWS</h2>
                <div style={{height: '430px', overflowX: 'scroll'}}>
                  <NewsFeed />
                </div>
              </div>
              <div style={style.verticalLine}></div>
              <div className='col-md-5' style={style.formControlCont}>
                <FormControl>
                  <div>
                    <h3 style={style.topic}>CREATE YOUR <br /> ACCOUNT</h3>
                    {/* <h4 className='text-muted' style={style.subTopic}>This is step 1</h4> */}
                  </div>
                  <div style={style.inputContainer}>
                    <TextField
                      id="outlined-name"
                      label="Email Address"
                      error={(this.state.isEmailEmpty | this.state.isExceptionOccured | this.state.isEmailNotValid) ? true : false}
                      fullWidth
                      onChange={this.handleEventChange('email')}
                      margin="normal"
                      variant="outlined"
                    />
                    {
                      (!this.state.isEmailEmpty && this.state.isEmailNotValid) &&
                      <div>
                        <div style={style.errorMsg}>
                          <p style={style.errorText}>Please enter a valid email address!</p>
                        </div>
                      </div>
                    }
                    {
                      this.state.isEmailEmpty &&
                      <div>
                        <div style={style.errorMsg}>
                          <p style={style.errorText}>Email shouldn't be empty!</p>
                        </div>
                      </div>
                    }
                    <TextField
                      id="outlined-name"
                      label="Password"
                      // className={}
                      type="password"
                      error={(this.state.isPasswordEmpty | this.state.isErrorOccured | this.state.isExceptionOccured) ? true : false}
                      fullWidth
                      onChange={this.handleEventChange('password')}
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
                    <TextField
                      id="outlined-name"
                      label="Confirm Password"
                      // className={}
                      type="password"
                      error={
                        (this.state.isErrorOccured | this.state.isExceptionOccured | (this.state.isConfPasswordEmpty && !this.state.isPasswordEmpty)) ?
                          true : false
                      }
                      fullWidth
                      onChange={this.handleEventChange('confPass')}
                      margin="normal"
                      variant="outlined"
                    />
                    {
                      (this.state.isConfPasswordEmpty && !this.state.isPasswordEmpty) &&
                      <div style={style.errorMsg}>
                        <p style={style.errorText}>Please enter confirm password!</p>
                      </div>
                    }
                    {
                      this.state.isErrorOccured &&
                      <div>
                        <div style={style.errorMsg}>
                          <p style={style.errorText}>Password mismatch!</p>
                        </div>
                      </div>
                    }
                    {
                      this.state.isExceptionOccured &&
                      <div>
                        <p style={style.exceptionText}>{store.getState().auth.errorMsg}</p>
                      </div>
                    }
                    {
                      this.props.location.state &&
                      <div>
                        <p style={style.exceptionText}>{this.props.location.state.error}</p>
                      </div>
                    }
                  </div>
                  <div>
                    {this.buttonContainer()}
                  </div>
                  <div style={style.signUpTextWrapper}>
                    <p className='text-muted' style={style.signUpText}>Already have an account? <Link style={style.linkText} to='/login'>Sign In</Link> </p>
                  </div>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <Footer /> */}
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