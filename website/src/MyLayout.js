import { Layout } from 'react-admin';
import Menu from './Menu';
import React from 'react';
const MyLayout = (props) => <Layout
  {...props}
  menu={Menu}
/>;
export default MyLayout;





