import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styles from '../style';

function navbar(props) {
  return (
    <div style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" style={styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={styles.title}>
            {props.navName}
          </Typography>
          <MenuItem>
            <img src={props.imgUrl} style={styles.media} alt='' />
          </MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default navbar;