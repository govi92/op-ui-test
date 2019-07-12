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
import LockIcon from '@material-ui/icons/Lock';
import UnLockIcon from '@material-ui/icons/LockOpen';
import TabContainer from './component/TabContainer';
import CustomizeTab from './component/CustomizeTab';
import * as utils from '../../utils/index';
import { FETCH_USERS_LIST } from '../actions/types';
import { fetchUserList } from '../actions/index'
import store from '../store';
import styles from './style'


function UserPane (props) {  
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const { name, email, mode, locked, onLockStateChange, selectedUser } = props;
  console.log(name, email, mode, locked);
  
  return (
    <div>
      {
        name &&
        <Paper style={styles.tableBooth}>
          <AppBar position='static'>
            <Tabs value={value} onChange={handleChange}>
              <Tab label='Overview' />
              <Tab label='Customization' />
              <Tab label='Domaine' />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer name={name} email={email} type={mode} lockState={locked} lockStatusChange={onLockStateChange} />}
          {value === 1 && <CustomizeTab name={name} userType={mode} userId={email} user={selectedUser} />}
          {value === 2 && <div>Item Three</div>}
        </Paper>
      }
    </div>
  );
}

class Dashboard extends Component {

  state = {
    name: undefined,
    ref: undefined,
    mode: '',
    locked: false,
    value: 0,
    newValue: '',
    selectedUser: '',
    users: []
  }

  async componentDidMount() {
    const res = await utils.usersList();
    
    if (res.data.data) {
      store.dispatch(fetchUserList({ type: FETCH_USERS_LIST, payload: res.data.data }));
      this.setState({
        users: store.getState().users.users.payload
      });
    }
  }

  onLockStateChange = async (name) => {
    this.state.users.filter((user, index) => {
      if (user.name !== name) {
        return false
      }
      return true;
    }).map((user, index) => {    
        user.locked = !user.locked;
        if(user.locked) {
          this.setState({
            locked: true
          });
        } else {
          this.setState({
            locked: false
          });
        }
      });

      store.dispatch(fetchUserList({ type: FETCH_USERS_LIST, payload: this.state.users }));
      
      setTimeout(async () => {
        const {mode, ref, locked} = this.state;
        const response = await utils.lockUserEndPoint({ mode, ref, locked });
        console.log(response);
      }, 1000);
  }

  onClick = (name, ref, mode, locked, user) => {
    this.setState({
      name, ref, mode, locked, selectedUser: user
    }); 
  }

  handleChange = value => event => {
    
    this.setState({
      value: event.target.value
    })
  }

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
              if (user.role === 'super') {
                return false;
              }
              return true;
            }).map((user, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => this.onClick(user.name, user.ref, user.mode, user.locked, user)}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>  
                <TableCell >
                  {
                    (user.locked === true) ?
                    <LockIcon /> : <UnLockIcon />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  

  render() {
    const { name, ref, mode, locked, selectedUser } = this.state;
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
                <UserPane name={name} email={ref} mode={mode} locked={locked} onLockStateChange={this.onLockStateChange} selectedUser={selectedUser}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;