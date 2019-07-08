import React, { Component } from 'react';
import Navbar from './components/navbar';
import NewsFeed from '../NewsFeed';
import styles from './style';

class Home extends Component {
  state = {
    navName: 'Gapstars',
    imgUrl: 'https://pbs.twimg.com/profile_images/899622243432628226/YFpE4kEK.jpg'
  }
  render() {
    const { navName, imgUrl } = this.state;
    return (
      <div>
        <Navbar navName={navName} imgUrl={imgUrl} />
        <div style={styles.newsFeed}>
          <h2 className='text-muted'>NEWS</h2><br />
          <NewsFeed />
        </div>
      </div>
    );
  }
}

export default Home;