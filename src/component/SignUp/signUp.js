import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, TextField, FormControl } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { getUser } from '../actions/index';
import { registerUser } from '../../utils/index';
import style from './style';

class SignUp extends Component {
  state = {
    isClicked: false,
    isLogginClicked: false,
    isloggedIn: false,
    email: '',
    password: '',
    confPass: '',
    isEmailEmpty: false,
    isPasswordEmpty: false,
    isErrorOccured: false
  }

  confirmState = () => {
    this.setState({
      isClicked: true
    })
  }

  signUp = async (event) => {
    event.preventDefault();
    const { email, password, confPass } = this.state;

    if (confPass === password && confPass !== '' && password !== '' && email !== '') {
      registerUser({ "type": "hi", email, password })
      .then(
        res => {
          res && (
            this.setState({
              isClicked: true,
              isEmailEmpty: false,
              isPasswordEmpty: false
            })
          );
        }
      );
    } else if(email === '' && password !== '') {
      this.setState({
        isEmailEmpty: true,
        isPasswordEmpty: false
      });
    } else if(password === '' && email !== '') {
      this.setState({
        isPasswordEmpty: true,
        isEmailEmpty: false
      });
    } else {
      this.setState({
        isErrorOccured: true
      });
    }
  }

  switchToLogin = () => {
    this.setState({
      isLogginClicked: true
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  

  render() {
    if (this.state.isClicked) {
      return <Redirect to={{
        pathname: '/signup/confirm',
        state: {email: this.state.email}
      }}/>
    }

    if (this.state.isLogginClicked) {
      return <Redirect to='/login' />
    }

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
                  error={this.state.isEmailEmpty}
                  fullWidth
                  onChange={this.handleChange('email')}
                  margin="normal"
                  variant="outlined"
                />
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
                  error={this.state.isPasswordEmpty | this.state.isErrorOccured}
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
                <TextField
                  id="outlined-name"
                  label="Confirm Password"
                  // className={}
                  type="password"
                  error={this.state.isErrorOccured}
                  value={null}
                  fullWidth
                  onChange={this.handleChange('confPass')}
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
              </div>
              <div style={style.hrContainer}>
                <hr style={style.styleEight} />
              </div>
              <div>
                {/* <div className={'row'}>
                  <div className='col-md-6'>
                    <Button variant='contained' style={style.loginGoogle}>
                      <div style={style.iconStyle}>
                        <FontAwesomeIcon icon={faGoogle} />
                      </div>
                      { this.state.isloggedIn ? 'Login' : 'SignUp' } with Google
                    </Button>
                  </div>
                  <div className='col-md-6'>
                    <Button 
                      variant='contained'
                      style={style.loginFacebook}
                      onClick={this.login}>
                      <div style={style.iconStyle}>
                        <FontAwesomeIcon icon={faFacebookF} />
                      </div>
                      { this.state.isloggedIn ? 'Login' : 'SignUp' } with Facebook
                    </Button>
                  </div>
                </div> */}
              </div>
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
            </FormControl>
          </div>
        </div>
        <footer style={style.footer}>
          <h6 style={style.footerText}>Powered By</h6>
          <h4 style={style.footerTopic}>GAPSTARS</h4>
          <h5>{this.props.articles}</h5>
        </footer>
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