import React, {Component} from 'react';
import { Typography, FormControl, TextField, Button } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import * as utils from '../../../utils/index';
import style from '../style'

class CustomizeTab extends Component {

  state = {
    userId: '',
    userType: '',
    organization: '',
    logoURL: '',
    bgColorBase: '',
    fontColorBase: '',
    newsFeedBGColor: '',
    newsFeedFontColor: ''
  }

  componentDidMount() {
    this.setState({
      userId: this.props.userId,
      userType: this.props.userType
    });
  }

  onSubmit = async () => {
    this.setState({
      userId: this.props.userId,
      userType: this.props.userType
    });
 
    const {userId, userType, organization, logoURL, bgColorBase, fontColorBase, newsFeedBGColor, newsFeedFontColor} = this.state;
    const response = await utils.setNewsFeedCustomizationBasedOnUser({userId, userType, organization, logoURL, bgColorBase, fontColorBase, newsFeedBGColor, newsFeedFontColor});
    console.log(response);
    
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  handleChangeComplete = (name, color) => {
    this.setState({ [name]: color.hex });
    console.log(this.state[name]);
  };

  render() {
    return(
      <div>
        <Typography component="div" style={{ padding: 8 * 3 }}>
          <FormControl>
            <TextField
            id="outlined-name"
            label="LOGO Address"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('logoURL')}
            style={style.colorPallete}
            />
            <div className='row'>
              <div className='col-md-4' style={style.colorPallete}>
                <h5 className='text-muted'>Backgroud Colour</h5>
                <SketchPicker onChangeComplete={(color) => this.handleChangeComplete('bgColorBase', color)} />
              </div>
              <div className='col-md-4'>
                <h5 className='text-muted'>Font Colour</h5>
                <SketchPicker onChangeComplete={(color) => this.handleChangeComplete('fontColorBase', color)} />
              </div>
              <div className='col-md-4'>
                <h5 className='text-muted'>NEWS Feed BG.Colour</h5>
                <SketchPicker onChangeComplete={(color) => this.handleChangeComplete('newsFeedBGColor', color)} />
              </div>
              <div className='col-md-4' style={style.colorPallete}>
                <h5 className='text-muted'>NEWS Feed Font.Colour</h5>
                <SketchPicker onChangeComplete={(color) => this.handleChangeComplete('newsFeedFontColor', color)} />
              </div>
            </div>
            <Button variant='contained' color='primary' onClick={this.onSubmit}>Submit</Button>
          </FormControl>
        </Typography>
      </div>
    )
  }
}

export default CustomizeTab;