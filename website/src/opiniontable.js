import React from 'react';
import {  List, Datagrid, TextField, NumberField, } from 'react-admin';

export const OpiniontableList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField label ="User" source="user_id.username" />
      <TextField label ="Rater" source="rater_id.username" />
      <NumberField source="performance" />
      <NumberField source="behaviour" />
      <NumberField source="handlepressure" />
      <NumberField source="taskdelivery" />
      <NumberField source="innovative" />
      <NumberField source="profitability" />
    </Datagrid>
  </List>
);