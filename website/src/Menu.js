import React from 'react';
import { useState, useEffect } from 'react';
import { useDataProvider} from 'react-admin';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { MenuItemLink, usePermissions } from 'react-admin';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import MyLogoutButton from './MyLogoutButton';
import Avatar from '@material-ui/core/Avatar';
import logo from './download.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menubar from '@material-ui/core/Menu';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    color: 'black',
    '&:hover': {
      backgroundColor: '#eaeaea !important',
      color: 'black',
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: 'white',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  active: {
    color: 'white',
    backgroundColor: '#98317D',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    background: '#98317D;',
    boxShadow: '0 3px 5px 2px rgb(202, 202, 202, .3)',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Menu = ({ onMenuClick, logout }) => {
  const { permissions } = usePermissions();
  var username = localStorage.getItem('Full_name');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const [open1, setOpen1] = React.useState(true);
  const handleClick = () => {
    setOpen1(!open1);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);
  var empid = localStorage.getItem('userdesignationid');
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const dataProvider = useDataProvider();
  useEffect(() => {
    dataProvider.getOne('empdesignations', { id: empid })
      .then(({ data }) => {
        setUser(data.designation);
      })
      .catch(error => {
        setError(error);
      })
  }, []);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className='toolbar'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          {permissions === 'Authenticated' && <div variant="h6" className='title'> Employee Happpiness Index<p id='appbarusername' style={{ textTransform: 'capitalize' }}>{username}</p></div>}
          {permissions === 'Administrator' && <div variant="h6" className='title'>Employee Happpiness Index<p id='appbarusername'>Hello Admin</p></div>}
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
              open={menuopen}
              onClose={handleClose}
            >
              <div >
                {permissions === 'Authenticated' && <MenuItemLink to="/Profile" id='appbarprofile' onClick={handleClose} leftIcon={<Avatar alt="Remy Sharp" src={logo} className={'small'} />} primaryText="Profile" />}
              </div>
              <MyLogoutButton className='logout' />
            </Menubar>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer className='drawer'
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <MenuIcon /> : <MenuOpenIcon style={{ color: 'white' }} />}
          </IconButton>
        </div>
        <Divider />
        <div >
          {permissions === 'Authenticated' && <p><MenuItemLink className={classes.root} activeClassName={classes.active} id='Menuitems' to="/dashboard" primaryText="Dashboard" leftIcon={<DashboardOutlinedIcon className={'icon'} />} onClick={onMenuClick} /><Divider /></p>}
          {user === 'CEO/CTO' && <p><MenuItemLink className={classes.root} activeClassName={classes.active} id='Menuitems' to="/Topemplist" primaryText="Top Employees" leftIcon={<PeopleAltOutlinedIcon className={'icon'} />} onClick={onMenuClick} /><Divider /></p>}
          {user === 'CEO/CTO' && <p><MenuItemLink className={classes.root} activeClassName={classes.active} id='Menuitems' to="/View" primaryText="Suggestions" leftIcon={<AddCommentOutlinedIcon className={'icon'} />} onClick={onMenuClick} /><Divider /></p>}
          {permissions === 'Administrator' && <p><MenuItemLink className={classes.root} activeClassName={classes.active} id='Menuitems' to="/Users" primaryText="Employees" leftIcon={<PeopleAltOutlinedIcon className={'icon'} />} onClick={onMenuClick} /><Divider /></p>}
          {permissions === 'Administrator' && <p><MenuItemLink className={classes.root} activeClassName={classes.active} id='Menuitems' to='/Keywords' primaryText="Keywords" leftIcon={<FormatListBulletedIcon className={'icon'} />} onClick={onMenuClick} /><Divider /></p>}
          {permissions === 'Administrator' && <p><MenuItemLink className={classes.root} activeClassName={classes.active} id='Menuitems' to="/Empdesignations" primaryText="Designations" leftIcon={<WorkOutlineOutlinedIcon className={'icon'} />} onClick={onMenuClick} /><Divider /></p>}
          {permissions === 'Authenticated' &&
            <div className={'submenu'}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className='feedbackmenuicn' />} aria-controls="panel2a-content" id="panel2a-header"  >
                  <Typography activeClassName={classes.active} id={'menuheading'}><RateReviewOutlinedIcon className={'menuicon'} />Feedback</Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails>
                  <MenuItemLink className={classes.root} activeClassName={classes.active} id={'submenulinks'} to="/Feedback" primaryText="Employee" leftIcon={<PeopleAltOutlinedIcon className={'icon'} />} onClick={onMenuClick} > </MenuItemLink>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelDetails>
                  <MenuItemLink className={classes.root} activeClassName={classes.active} className={classes.root} id={'submenulinks'} to="/Feedbacktocompany" primaryText="Company" leftIcon={<BusinessOutlinedIcon className={'icon'} />} onClick={onMenuClick} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>}
        </div>
      </Drawer>
    </div>
  );
}
export default Menu;
