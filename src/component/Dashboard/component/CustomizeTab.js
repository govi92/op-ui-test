import React, { Component } from 'react';
import { Typography, FormControl, TextField, Button } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import * as utils from '../../../utils/index';
import style from '../style'

class CustomizeTab extends Component {

  state = {
    userId: '',
    userType: '',
    organization: '',
    logoURL: 'https://pbs.twimg.com/profile_images/899622243432628226/YFpE4kEK.jpg',
    bgColorBase: '',
    fontColorBase: '',
    newsFeedBGColor: '',
    newsFeedFontColor: '',
    users: ''
  }

  async componentDidMount() {
    if (this.props.user) {
      this.setState({
        users: this.props.user
      }, () => {
        if (this.state.users.logoURL !== '') {
          this.setState({
            logoURL: this.state.users.logoURL
          });
        }
        if (this.state.users.bgColor !== '') {
          this.setState({
            bgColorBase: this.state.users.bgColor
          });
        }
        if (this.state.users.fontColor !== '') {
          this.setState({
            fontColorBase: this.state.users.fontColor,
          });
        }
        if (this.state.users.newsfeedBGColor !== '') {
          this.setState({
            newsFeedBGColor: this.state.users.newsfeedBGColor,
          });
        }
        if (this.state.users.newsfeedFontColor !== '') {
          this.setState({
            newsFeedFontColor: this.state.users.newsfeedFontColor
          });
        }
      });
    }


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

    const { userId, userType, organization, logoURL, bgColorBase, fontColorBase, newsFeedBGColor, newsFeedFontColor } = this.state;
    const response = await utils.setNewsFeedCustomizationBasedOnUser({ userId, userType, organization, logoURL, bgColorBase, fontColorBase, newsFeedBGColor, newsFeedFontColor });
    console.log(response);

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  handleChangeComplete = (name, color) => {
    this.setState({ [name]: color.hex });
  };

  render() {
    const { logoURL, bgColorBase, fontColorBase, newsFeedBGColor, newsFeedFontColor } = this.state;

    return (
      <div>
        <Typography component="div" style={{ padding: 8 * 3 }}>
          <FormControl>
            <TextField
              id="outlined-name"
              label="LOGO Address"
              fullWidth
              value={logoURL}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('logoURL')}
              style={style.colorPallete}
            />
            <div className='row'>
              <div className='col-md-4' style={style.colorPallete}>
                <h5 className='text-muted'>Backgroud Colour</h5>
                <SketchPicker color={bgColorBase} onChangeComplete={(color) => this.handleChangeComplete('bgColorBase', color)} />
              </div>
              <div className='col-md-4'>
                <h5 className='text-muted'>Font Colour</h5>
                <SketchPicker color={fontColorBase} onChangeComplete={(color) => this.handleChangeComplete('fontColorBase', color)} />
              </div>
              <div className='col-md-4'>
                <h5 className='text-muted'>NEWS Feed BG.Colour</h5>
                <SketchPicker color={newsFeedBGColor} onChangeComplete={(color) => this.handleChangeComplete('newsFeedBGColor', color)} />
              </div>
              <div className='col-md-4' style={style.colorPallete}>
                <h5 className='text-muted'>NEWS Feed Font.Colour</h5>
                <SketchPicker color={newsFeedFontColor} onChangeComplete={(color) => this.handleChangeComplete('newsFeedFontColor', color)} />
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