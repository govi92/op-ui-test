import React, {Component} from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import Footer from '../Footer';
import style from './style';

class NewsFeed extends Component {
  state = {
    news: [
      {
        header: 'Sri Lanka storms into finals CWC19',
        content: 'Greates victory ever on semis against Australiya'
      },
      {
        header: 'Sri Lanks ready to take on India in Final at Lords',
        content: 'It\' the time for revenge - Fans in SL'
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
                  <ListItemText primary={news.header} secondary={news.content} />
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