import React, {Component} from 'react';
import {List, ListItem, ListItemText, Avatar} from '@material-ui/core';
import Footer from '../Footer';
import style from './style';

class NewsFeed extends Component {
  state = {
    news: [
      {
        header: 'Sri Lanka storms into finals CWC19',
        content: 'Greates victory ever on semis against Australiya',
        image: 'http://www.srilankacricket.lk/wp-content/uploads/2017/06/JDK_6308.jpg'
      },
      {
        header: 'Sri Lanks ready to take on India in Final at Lords',
        content: 'It\' the time for revenge - Fans in SL',
        image: 'https://images.financialexpress.com/2017/12/cricket-1.jpg?w=660&h=440&imflag=true'
      }
    ]
  }

  render() {
    return(
      <div style={style.containerFluid}>
        <div style={style.newsContainer}>
          <h1 style={style.newsFeedHeader}>NEWS Feed</h1>
          {
            this.state.news.map((news) => (
              <div style={style.listContainer}>
                <List style={style.listStyle}>
                <ListItem>
                  <div style={style.avatarConatainer}>
                    <img alt='' src={news.image} height="130" width="130" />
                  </div>
                  <ListItemText primary={news.header} secondary={news.content} style={style.newsFeedText} />
                </ListItem>
              </List>
              </div>
            ))
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default NewsFeed;