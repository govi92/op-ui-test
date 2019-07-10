import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { FormControl, TextField, Button } from '@material-ui/core';
import * as utils from '../../utils/index';
import style from './style';

class Selections extends Component {
  state = {
    empAcc: '',
    name: '',
    accessToken: '',
    organization: '',
    designation: '',
    firstName: 'JOHN',
    lastName: 'DOE',
    errorStatus: '',
    isFormSubmitted: false,
    isErrorOccurred: false,
    errorMessage: '',
    isEmpAccEmpty: false,
    isOrgEmpty: false,
    isDesignationEmpty: false,
    isNameEmpty: false
  }

  async componentDidMount() { 
    this.setState({
      accessToken: this.props.match.params.params
    });
    const res = await utils.confirmRegistration(this.props.match.params.params);
    if(res) {
      if(res.status !== 200) {
        this.setState({
          errorStatus: res.status,
          isErrorOccurred: true,
          errorMessage: res.message
        })
      }
    }
  }

  handleEventChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const {empAcc, name, organization, designation, accessToken} = this.state;
    if( empAcc !== '' &&  organization!== '' && designation!== '' && name !== '' && accessToken) {
      utils.registerCompanyDetails({empAcc, name, organization, designation, accessToken});
      this.props.history.push('/');
    } 
    if (empAcc === '') {
      this.setState({
        isEmpAccEmpty: true
      });
    } else if (empAcc !== '') {
      this.setState({
        isEmpAccEmpty: false
      });
    }
    if (name === '') {
      this.setState({
        isNameEmpty: true
      });
    } else if (name !== '') {
      this.setState({
        isNameEmpty: false
      });
    }
    if (organization === '') {
      this.setState({
        isOrgEmpty: true
      });
    } else if (organization !== '') {
      this.setState({
        isOrgEmpty: false
      });
    } 
    if (designation === '') {
      this.setState({
        isDesignationEmpty: true
      });
    } else if (designation !== '') {
      this.setState({
        isDesignationEmpty: false
      });
    }
    }

  SelectOptions = () => {
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
              error={this.state.isOrgEmpty ? true : false}
              onChange={this.handleEventChange('organization')}
              margin="normal"
              variant="outlined"
            />
            {
              this.state.isOrgEmpty &&
              <p style={style.errorText}>Organization field shouldn't be empty</p>
            }
            <TextField
              id="outlined-name"
              label="Name"
              // className={}
              value={null}
              fullWidth
              error={this.state.isNameEmpty ? true : false}
              onChange={this.handleEventChange('name')}
              margin="normal"
              variant="outlined"
            />
            {
              this.state.isNameEmpty &&
              <p style={style.errorText}>Name field shouldn't be empty</p>
            }
            <TextField
              id="outlined-name"
              label="Employee Account"
              // className={}
              value={null}
              type='number'
              fullWidth
              error={this.state.isEmpAccEmpty ? true : false}
              onChange={this.handleEventChange('empAcc')}
              margin="normal"
              variant="outlined"
            />
            {
              this.state.isEmpAccEmpty &&
              <p style={style.errorText}>Employee account shouldn't be empty</p>
            }
            <TextField
              id="outlined-name"
              label="Designation"
              // className={}
              value={null}
              fullWidth
              error={this.state.isDesignationEmpty ? true : false}
              onChange={this.handleEventChange('designation')}
              margin="normal"
              variant="outlined"
            />
            {
              this.state.isDesignationEmpty &&
              <p style={style.errorText}>Designation field shouldn't be empty</p>
            }
          </FormControl>
          <div>
            {
              this.state.isErrorOccurred && 
              <p style={style.errorText}>{this.state.errorMessage}</p>
            }
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={style.containerFluid}>
        <div style={
          (this.state.isErrorOccurred | this.state.isDesignationEmpty | this.state.isEmpAccEmpty | this.state.isNameEmpty | this.state.isOrgEmpty )
           ? style.formContainerExtended : style.formContainer
          }>
          <FormControl>
            <div>
              <h3 style={style.topic}>WELCOME {this.state.firstName} {this.state.lastName}</h3>
              <h6 className='text-muted' style={style.subTopic}>You're almost ready for take-off</h6>
            </div>
            {
              this.state.isErrorOccurred ? 
              <div style={style.errorContainer}>
                <p style={style.errorText}>{this.state.errorMessage}</p>
                {
                  (this.state.errorStatus === 400 | this.state.errorStatus === 404)  && 
                  <Link to='/' style={style.errorTextLink}>Register Your Account</Link>
                }
              </div> :
              <div>
                {
                  this.SelectOptions()
                }
                <div>
                  <Button 
                    variant='contained' 
                    style={style.submitButton}
                    onClick={this.onSubmit}
                    >Submit
                  </Button>
                </div>
              </div>
            }
          </FormControl>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

export default Selections;