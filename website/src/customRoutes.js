import React from 'react';
import { Route } from 'react-router-dom';
import Profile from './Profile';
import Feedback from './Feedback';
import Userfeedback from './userfeedback';
import Empinfo from './userinfo';
import Feedbacktocompany from './Feedbacktocompany';
import { View } from "./View";
export default [
  <div>
    <Route exact path="/Profile" component={Profile} />,
    <Route exact path="/Feedback" component={Feedback} />,
    <Route exact path="/Userfeedback" component={Userfeedback} />,
    <Route exact path="/userinfo" component={Empinfo} />,
    <Route exact path="/Feedbacktocompany" component={Feedbacktocompany} />,
     {/* <Route exact path="/View" component={View} />, */}
  </div>
];