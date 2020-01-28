import React, { forwardRef } from 'react';
import { useLogout } from 'react-admin';
import MenuItem from '@material-ui/core/MenuItem';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
const MyLogoutButton = forwardRef((props, ref) => {
  const logout = useLogout();
  const handleClick = () => logout('/custom-login');
  return (
    <MenuItem
      onClick={handleClick}
      ref={ref}
    >
        <ExitIcon className='logouticon'/> <pre className='logoutbutton'> Logout</pre>
    </MenuItem>
  );
});
export default MyLogoutButton;