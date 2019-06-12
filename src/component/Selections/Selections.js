import React, { Component } from 'react';
import { FormControl, InputLabel, Select, OutlinedInput, Button } from '@material-ui/core';
import style from './style';

class Selections extends Component {
  state = {
    firstName: 'JOHN',
    lastName: 'DOE',
    options: [
      {
        age: '',
        version: 'Option 1',
        companies: [
          { value: 10, name: 'company 1' },
          { value: 30, name: 'company 2' },
          { value: 30, name: 'company 3' },
        ]
      },
      {
        age: '',
        version: 'Option 2',
        companies: [
          { value: 10, name: 'company 1' },
          { value: 30, name: 'company 2' },
          { value: 30, name: 'company 3' },
        ]
      },
      {
        age: '',
        version: 'Option 3',
        companies: [
          { value: 10, name: 'company 1' },
          { value: 30, name: 'company 2' },
          { value: 30, name: 'company 3' },
        ]
      },
      {
        age: '',
        version: 'Option 4',
        companies: [
          { value: 10, name: 'company 1' },
          { value: 30, name: 'company 2' },
          { value: 30, name: 'company 3' },
        ]
      }
    ]
  }
  componentDidMount() {

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  SelectOptions = () => {
    const inputLabel = null
    return (
      <div style={style.optionStyle}>
        {
          this.state.options.map(
            option => (
              <div>
                <FormControl variant="outlined" style={style.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    {option.version}
                  </InputLabel>
                  <Select
                    native
                    value={option.age}
                    onChange={this.handleChange(`${option.version}`)}
                    input={
                      <OutlinedInput name={`${option.version}`} labelWidth={60} id="outlined-age-native-simple" />
                    }
                  >
                    <option value="" />
                    {
                      option.companies.map(
                        company => {
                          return <option value={company.value}>{company.name}</option>
                        }
                      )
                    }
                  </Select>
                </FormControl>
              </div>
            )
          )
        }
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
              <Button variant='contained' style={style.submitButton}>Submit</Button>
            </div>
          </FormControl>
        </div>
        <footer style={style.footer}>
          <h6 style={style.footerText}>Powered By </h6>
          <h4><b>GAPSTARS</b></h4>
        </footer>
      </div>
    )
  }
}

export default Selections;