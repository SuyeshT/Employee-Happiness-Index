import React from 'react';
import { Admin } from 'react-admin';
import { Resource, fetchUtils } from 'react-admin';
import './App.css';
import authProvider from "./authProvider";
import Dashboard from "./Dashboard";
import { KeywordList, KeywordCreate, KeywordEdit } from './keywords';
import { EmpdesignationList, EmpdesignationCreate, EmpdesignationEdit } from './empdesignation';
import MyLoginPage from './MyLoginPage';
import { UserList, UserCreate, UserEdit } from './UserList';
import MyLogoutButton from './MyLogoutButton';
import simpleRestProvider from './ra-strapi-rest';
import NotFound from './NotFound'
import customRoutes from './customRoutes';
import Profile from './Profile';
import { createBrowserHistory as createHistory } from 'history';
import Feedback from './Feedback';
import MyLayout from './MyLayout';
import Userfeedback from './userfeedback';
import Empinfo from './userinfo';
import { makeStyles } from '@material-ui/core/styles';
import Feedbacktocompany from './Feedbacktocompany';
import View from './View';
import Topemplist from './Topemplist';
import * as constant from './constant';
const newHistory = createHistory();
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });

  }
  const token = localStorage.getItem('jwt');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}
const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function App() {
  const classes = useStyles();
  const apiUrl = constant.API;
  const dataProvider = simpleRestProvider(apiUrl, httpClient);
  const App = () => (<div className='main'>
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Admin layout={MyLayout} customroutes={customRoutes} history={newHistory} loginPage={MyLoginPage} logout={MyLogoutButton} catchAll={NotFound} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="keywords" list={KeywordList} edit={KeywordEdit} create={KeywordCreate} />
        <Resource name="Empdesignations" list={EmpdesignationList} edit={EmpdesignationEdit} create={EmpdesignationCreate} />
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
        <Resource name="Profile" list={Profile} />
        <Resource name="Feedback" list={Feedback} />
        <Resource name="Userfeedback" list={Userfeedback} />
        <Resource name="userinfo" list={Empinfo} />
        <Resource name="Feedbacktocompany" list={Feedbacktocompany} />
        <Resource name ="View" list={View} />
        <Resource name ="Topemplist" list={Topemplist} />
      </Admin>
    </main>
  </div>
  )
  return (
    <div>
      <App />
    </div>
  )
}
export default App;



