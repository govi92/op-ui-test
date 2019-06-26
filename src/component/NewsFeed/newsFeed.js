import React, {Component} from 'react';
import {List, ListItem, ListItemText, Avatar} from '@material-ui/core';
import Footer from '../Footer';
import style from './style';
import * as utils from '../../utils/index';

class NewsFeed extends Component {
  state = {
    news: [
      {
        imageUrl: 'http://www.frontpage.lk/img/news/ce698684.jpg',
        headline: 'Sri Lanka Storms in finals in CWC 2019',
        description: 'Sri Lanka defeated the Australia in semi-final at ovel and create history, famous victory for SL in famous old cricket ground'
      },
      {
        imageUrl: 'https://images.financialexpress.com/2017/06/sl.jpg?w=660&h=440&imflag=true',
        headline: 'Sri Lanka will meet India in finals of CWC 2019',
        description: 'One of the most famous rivals in cricket will meet again in CWC 2019, SL is ready take on India said by captain Dimuth Karunaratne.'
      }
    ]
  };

  async componentDidMount() {
    const token = localStorage.getItem('loginCredentials');
    console.log(token);
    
  };

  render() {
    return(
      <div style={style.containerFluid}>
        <div style={style.newsContainer}>
          <h1 style={style.newsFeedHeader}>NEWS Feed</h1>
          {
            this.state.news.map((news, i) => (
              <div style={style.listContainer} key={i}>
                <List style={style.listStyle} key={i}>
                <ListItem>
                  <div style={style.avatarConatainer}>
                    <img alt='' src={news.imageUrl} height="130" width="130" />
                  </div>
                  <div>
                    <h3>{news.headline}</h3>
                    <ListItemText secondary={news.description} style={style.newsFeedText} />
                  </div>
                </ListItem>
              </List>
              </div>
            ))
          }
        </div>
        <Footer />
      </div>
    )
  };
}

export default NewsFeed;