import React, { Component } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button, Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tabs,
  Tab
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import TabContainer from './component/TabContainer';
import * as utils from '../../utils/index';
import styles from './style'


class Dashboard extends Component {

  state = {
    name: undefined,
    ref: undefined,
    mode: '',
    locked: '',
    value: 0,
    newValue: '',
    users: [
      { name: 'Govinda', mode: 'fb', ref: 'govinda@hello.com', locked: false, role: 'user' },
      { name: 'Prashanth', mode: 'gl', ref: 'prashanth@hello.com', locked: false, role: 'user' },
      { name: 'Para', mode: 'Open-provider', ref: 'para@hello.com', locked: true, role: 'user' }
    ]
  }

  async componentDidMount() {
    const res = await utils.usersList();
    if(res.data.data) {
      this.setState({
        users: res.data.data
      });
    }
    console.log(this.state.users.map((user, index) => {
      return user.name
    }));
    
  }

  onLockStateChange = () => {
    console.log('Lock status changed..');
    this.setState({ locked: !this.state.locked })
  }

  onClick = (name, ref, mode, locked) => {
    this.setState({
      name, ref, mode, locked
    });
  }

  handleEventChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  navbar = () => {
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" style={styles.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={styles.title}>
              Dashboard
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  usersList = () => {
    const { users } = this.state;
    return (
      <Paper style={styles.tableBooth}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.filter((user) => {
              if(user.role === 'super') {
                return false;
              }
              return true;
            }).map((user, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => this.onClick(user.name, user.ref, user.mode, user.locked)}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell >
                  {/* <Button
                    style={(user.lock) ? styles.buttonStyleLock : styles.buttonStyle}
                  >
                    {(user.lock) ? 'lock' : 'unlock'}
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  userPane = () => {
    const { value, name, ref, mode, locked } = this.state;
    return (
      <div>
        {
          name &&
          <Paper style={styles.tableBooth}>
            <AppBar position='static'>
              <Tabs value={value} onChange={this.handleEventChange}>
                <Tab label='Overview' />
                <Tab label='Customization' />
                <Tab label='Domaine' />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer name={name} email={ref} type={mode} lockState={locked} lockStatusChange={this.onLockStateChange} />}
            {value === 1 && <TabContainer>Item Two</TabContainer>}
            {value === 2 && <TabContainer>Item Three</TabContainer>}
          </Paper>
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.navbar()}
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <div style={styles.tableContainer}>
                {this.usersList()}
              </div>
            </div>
            <div className='col-md-6'>
              <div style={styles.tableContainer}>
                {this.userPane()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;