import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Button } from '@material-ui/core'
import style from './confirmStyle';

class Confirm extends Component {
  state = {
    isClicked: false,
    email: 'test@goblock.com'
  }

  componentDidMount() {
    this.setState({
      email: this.props.location.state.email
    })
  }

  backToFront = () => {
    this.setState({
      isClicked: true
    })
  }


  render() {
    if(this.state.isClicked){
      return <Redirect to='/login' />
    }
    return (
      <div>
        <div style={style.containerFluid}>
          <div className={style.formWrapper}>
            <div style={style.formContainer}>
              <div>
                <h3 style={style.topic}>CONFIRM YOUR ACCOUNT</h3>
                <h4 className='text-muted' style={style.subTopic}>This is step 2</h4>
              </div>
              <div style={style.textContainer}>
                <p>
                  Email has been send to <br />
                  <Link>{this.state.email}</Link>
                </p>
                <p>
                  Please click the link mentioned in the<br/> email to validate your email address.
                </p>
              </div>

              <div style={style.hrContainer}>
                <hr style={style.styleEight} />
              </div>
              {/* <Button variant="contained" style={style.loginButton} onClick={this.backToFront}>Continue to Login</Button> */}
            </div>
          </div>
          <footer style={style.footer}>
            <h6 style={style.footerText}>Powered By </h6>
            <h4><b>GAPSTARS</b></h4> 
          </footer>
        </div>
      </div>
    )
  }
}

export default Confirm;