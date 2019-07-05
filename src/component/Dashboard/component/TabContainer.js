import React, { Component } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@material-ui/core';
import * as utils from '../../../utils/index';
import styles from '../style';


class TabContainer extends Component {
  state = {
    lockStatus: false
  };

  componentDidMount() {
    console.log(this.props.lockState, this.props.name);
    // console.log(this.state.lockStatus);
    this.setState({
      lockStatus: this.props.lockState
    })
  };

  toggleLockState = async () => {
    const { type, email } = this.props;
    const { lockStatus } = this.state;
    this.setState({
      lockStatus: !lockStatus
    });
    const response = await utils.lockUserEndPoint({ type, email, lockStatus });
    console.log(response);
  };

  render() {
    console.log(this.props.lockState);
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        <List component="nav" aria-label="Main mailbox folders">
          <ListItem>
            <ListItemText primary="Name" secondary={this.props.name} />
            <ListItemText primary="Email" secondary={this.props.email} />
          </ListItem>
          <ListItem>
            <div style={{ minWidth: '322px' }}>
              <ListItemText 
                primary="Acc. type" 
                secondary={
                  (this.props.type === 'fb') ? 'Facebook' : (
                    (this.props.type === 'gl') ? 'Google' : 'Open-Provider')
                  }
                />
            </div>
            <div className='pull-left'>
              <div className='row'>
                {/* <label>Lock/Unlock Acc.</label><br /> */}
                {
                  this.props.lockState !== '' &&
                  <Button
                    style={(this.props.lockState) ? styles.buttonStyleLock : styles.buttonStyle}
                    onClick={() => this.props.lockStatusChange()}
                  >
                    {(this.props.lockState) ? 'lock' : 'unlock'}
                  </Button>
                }
              </div>
            </div>
          </ListItem>
        </List>
      </Typography>
    )
  };
}

export default TabContainer;