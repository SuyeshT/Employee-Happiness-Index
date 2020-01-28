import React from 'react';
import { Login, LoginForm } from 'react-admin';
import { withStyles } from '@material-ui/core';
const styles = theme =>({

    main: { background: '#ffffff' },
    avatar: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        height: 80,
        margin: theme.spacing(1),
        Color: theme.palette.secondary.main,

    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
});
const CustomLoginForm = withStyles({
    button: { background: '#0080ff' },
})(LoginForm);
const CustomLoginPage = props => (
    <Login
        LoginForm={<CustomLoginForm />}
        {...props}
    />
);
export default withStyles(styles)(CustomLoginPage);