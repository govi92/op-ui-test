import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { FormControl, TextField, Button } from '@material-ui/core';
import * as utils from '../../utils/index';
import Footer from '../Footer';
import style from './style';

class Selections extends Component {
  state = {
    empAcc: '',
    organization: '',
    designation: '',
    firstName: 'JOHN',
    lastName: 'DOE',
    isFormSubmitted: false
  }

  componentDidMount() { 
    this.setState({
      accessToken: this.props.match.params.params
    });
  }

  handleEventChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const {empAcc, organization, designation, accessToken} = this.state;
    if( empAcc !== '' &&  organization!== '' && designation!== '' && accessToken) {
      utils.registerCompanyDetails({empAcc, organization, designation, accessToken});
    }
  }

  SelectOptions = () => {
    if (this.state.isFormSubmitted) {
      return <Redirect to='/login' />
    }
    return (
      <div style={style.optionStyle}>
        <div>
          <FormControl variant="outlined" style={style.formControl}>
            <TextField
              id="outlined-name"
              label="Organization/Industry"
              // className={}
              value={null}
              fullWidth
              onChange={this.handleEventChange('organization')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Employee Account"
              // className={}
              value={null}
              fullWidth
              onChange={this.handleEventChange('empAcc')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Designation"
              // className={}
              value={null}
              fullWidth
              onChange={this.handleEventChange('designation')}
              margin="normal"
              variant="outlined"
            />
          </FormControl>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={style.containerFluid}>
        <div style={style.formContainer}>
          <FormControl>
            <div>
              <h3 style={style.topic}>WELCOME {this.state.firstName} {this.state.lastName}</h3>
              <h6 className='text-muted' style={style.subTopic}>You're almost ready for take-off</h6>
              {
                this.SelectOptions()
              }
            </div>
            <div>
              <Button 
                variant='contained' 
                style={style.submitButton}
                onClick={this.onSubmit}
                >Submit
              </Button>
            </div>
          </FormControl>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Selections;