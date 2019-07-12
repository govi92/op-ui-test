import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/navbar';
import * as utils from '../../utils/index';
import NewsFeed from '../NewsFeed';
import styles from './style';

class Home extends Component {
  state = {
    bgColor: '',
    fontColor: '',
    newsfeedBGColor: '',
    newsfeedFontColor: '',
    navName: 'Gapstars',
    imgUrl: 'https://pbs.twimg.com/profile_images/899622243432628226/YFpE4kEK.jpg'
  }

  async componentDidMount() {
    if(this.props.location.state) {
      const display = await utils.getNewsFeedCustomizationBasedOnUser({ref: this.props.location.state.ref, type: this.props.location.state.type});
      if (display.data.data) {
        if(display.data.data.logoURL !== '') {
          this.setState({
            imgUrl: display.data.data.logoURL
          });
        }
        if(display.data.data.bgColor !== '') {
          this.setState({
            bgColor: display.data.data.bgColor
          });
        }
        if(display.data.data.fontColor !== '') {
          this.setState({
            fontColor: display.data.data.fontColor,
          });
        }
        if(display.data.data.newsfeedBGColor !== '') {
          this.setState({
            newsfeedBGColor: display.data.data.newsfeedBGColor,
          });
        }
        if(display.data.data.newsfeedFontColor !== '') {
          this.setState({
            newsfeedFontColor: display.data.data.newsfeedFontColor
          });
        }
      }
      console.log(display.data.data);
    }
  }

  generateStyle = (prop) => {
    const useStyles = {
      newsFeed: {
        margin: '50px',
        padding: '30px',
        width: '90%',
        color: prop.newsfeedFontColor,
        background: prop.newsfeedBGColor,
        border: '1px solid transparent',
        boxShadow: '1px 1px 5px black',
      },

      listBackground: {
        background: prop.newsfeedBGColor
      }
    }

    return useStyles;
  }


  render() {
    const { navName, imgUrl, bgColor, newsfeedBGColor, newsfeedFontColor } = this.state;
    return (
      <div style={{background: bgColor}}>
        <Navbar navName={navName} imgUrl={imgUrl} style={this.state.fontColor && {color:this.state.fontColor}} />
        <div style={bgColor ? this.generateStyle({newsfeedBGColor, newsfeedFontColor}).newsFeed : styles.newsFeed}>
          <h2 className='text-muted'>NEWS</h2><br />
          <NewsFeed listBackground={newsfeedBGColor}/>
        </div>
      </div>
    );
  }
}

export default Home;