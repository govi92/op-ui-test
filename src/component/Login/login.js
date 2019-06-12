import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import { Button, TextField, FormControl } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import {getUser} from '../actions/index';
import {loginUser} from '../../utils/index';
import style from './style';
import images from '../../assets/img/blur_city.jpg';

class Login extends Component {
  state = {
    isClicked: false,
    isFacebookClicked: false,
    isloggedIn: false,
    isEmailEmpty:false,
    isPasswordEmpty: false,
    email: '',
    password: '',
    type: 'op'
  }

  confirmState = () => {
    this.setState({
      isClicked: true
    })
  }

  login = async (event) => {
    event.preventDefault();
    const {type, email, password} = this.state;

    if(email !== '' && password !== '') {
      loginUser({type, email, password})
      .then(
        res => console.log(res)
      )
      // if(res) (
      //   this.setState({
      //     isClicked: true,
      //     isEmailEmpty: false,
      //     isPasswordEmpty: false
      //   })
      // )
    } else if (email === '' && password !== '') {
      this.setState({
        isEmailEmpty: true
      });
    } else if (email !== '' && password === '') {
      this.setState({
        isPasswordEmpty: true
      })
    } else {
      event.preventDefault();
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    if (this.state.isClicked) {
      return <Redirect to='/selections' />
    }
    
    if(this.state.isFacebookClicked) {
      // return <Redirect to='/selections' />
    }

    console.log(this.state.isEmailEmpty);
    

    return (
      <div style={style.containerFluid}>
        <div >
          <div style={(this.state.isEmailEmpty | this.state.isPasswordEmpty) ? [style.formContainerExtended] : style.formContainer }>
            <FormControl>
              <div>
                <h2 style={style.topic}>LOGIN</h2>
              </div>
              <div style={style.inputContainer}>
                <TextField
                  id="outlined-name"
                  label="Email Address"
                  // className={}
                  error={this.state.isEmailEmpty}
                  value={null}
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
                  error={this.state.isPasswordEmpty}
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
              </div>
              <div style={style.hrContainer}>
                <hr style={style.styleEight} />
              </div>
              <div>
                <div className={'row'}>
                  <div className='col-md-6 col-xs-6'>
                    <Button variant='contained' style={style.loginGoogle}>
                      <div style={style.iconStyle}>
                        <FontAwesomeIcon icon={faGoogle} />
                      </div>
                      { this.state.isloggedIn ? 'Login' : 'SignUp' } with Google
                    </Button>
                  </div>
                  <div className='col-md-6 col-xs-6'>
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
    getUser:user => dispatch(getUser(user))
  }
}


export default connect(null, mapDispatchToProps)(Login);