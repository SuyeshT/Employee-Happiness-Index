import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menubar from '@material-ui/core/Menu';
import { MenuItemLink, usePermissions } from 'react-admin';
import MyLogoutButton from './MyLogoutButton';
import Avatar from '@material-ui/core/Avatar';
import logo from './download.png';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  Typography: {
    color: 'white',
  }
}));
export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { permissions } = usePermissions();
  var username = localStorage.getItem('Full_name');
  return (
    <div className={classes.root}>
      <AppBar className='appbar' position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon className='Menuicon' />
          </IconButton>
          {permissions === 'Public' && <p variant="h6" className='title'>  EMPLOYEE HAPPINESS INDEX <p id='appbarusername'>{username}</p></p>}
          {permissions === 'Administrator' && <p variant="h6" className='title'> Employee Happpiness Index  <p id='appbarusername'>Hello Admin</p></p>}
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle className='AccountCircle' />
            </IconButton>
            <Menubar
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <div >
                {permissions === 'Public' && <MenuItemLink to="/Profile" primaryText="Profile" />}
              </div>
              <MyLogoutButton className='logoutbutton' />
            </Menubar>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
