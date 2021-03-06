import React, { Component } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@material-ui/core';
import styles from '../style';


class TabContainer extends Component {
  state = {
    lockStatus: false
  };

  async componentDidMount() {
    this.setState({
      lockStatus: this.props.lockState
    });
  };

  toggleLockState = async () => {
    const { lockStatus } = this.state;
    if(lockStatus === null) {
      this.setState({
        lockStatus: true
      });
    } else {
      this.setState({
        lockStatus: !lockStatus
      });
    }
  };

  render() {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        <List component="nav" aria-label="Main mailbox folders">
          <ListItem>
            <div style={{ minWidth: '307px' }}>
              <ListItemText primary="Name" secondary={this.props.name} />
            </div>
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
                    style={(this.props.lockState) ? styles.buttonStyle : styles.buttonStyleLock}
                    onClick={() => this.props.lockStatusChange(this.props.name)}
                  >
                    {(this.props.lockState === true) ? 'unlock' : 'lock'}
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