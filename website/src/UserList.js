import React from 'react';
import { Filter, DateField, BooleanInput, DateInput, ReferenceInput, SelectInput, Edit, NumberField, List, Datagrid, TextField, EmailField, Create, SimpleForm, TextInput ,EditButton } from 'react-admin';
import { required, minLength, maxLength, minValue, maxValue, email } from 'react-admin';
const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="username" alwaysOn />
  </Filter>
);
export const UserList = props => (
  <div className='adminpagetopheight'>
    <List {...props}>

      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="username" />
        <EmailField source="email" />
        <NumberField source="role.name" label="Role" />
        <DateField source="dateOfBirth" />
        <DateField source="joiningDate" />
        <TextField source="fullName" />
        <NumberField source="empdesignation.designation" label="Designation" />
        <NumberField source="reporter_name.username" label="Report Person" />
        <EditButton label="Edit" variant="outlined" />
      </Datagrid>
    </List>
  </div>
);
export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm >
      <TextInput source="username" validate={validateUserName} variant="standard" fullWidth /><br></br>
      <TextInput source="email" validate={validateEmail} variant="standard" fullWidth /><br></br>
      <DateInput source="dateOfBirth" validate={validateDOB} variant="standard" fullWidth /><br></br>
      <DateInput source="joiningDate" validate={validateDOJ} variant="standard" fullWidth /><br></br>
      <TextInput source="fullName" validate={required()} variant="standard" fullWidth /><br></br>
      <SelectInput source="role.id" label="Role" choices={[
        { id: '1', name: 'Administrator' },
        { id: '3', name: 'Public' },
        { id: '2', name: 'Authenticated' },
      ]} variant="standard" fullWidth /><br></br>
      <ReferenceInput source="empdesignation" label="Designation" reference="Empdesignations" variant="outlined" fullWidth><SelectInput optionText="designation" variant="standard" fullWidth /></ReferenceInput><br></br>
      <ReferenceInput source="reporter_name" label="Reports" reference="users" variant="outlined" fullWidth><SelectInput optionText="username" variant="standard" fullWidth /></ReferenceInput><br></br>
      <BooleanInput source="confirmed" variant="standard" fullWidth /><br></br>
    </SimpleForm>
  </Edit>
);
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const validateUserName = [required(), minLength(2), maxLength(25)];
const validateEmail = [required(), email()];
const validatePassword = [required(), minLength(8), maxLength(15)]
const validateDOB = [minValue("1920-01-01"), maxValue(date)];
const validateDOJ = [minValue("2000-01-01")];
export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm >
      <TextInput source="username" validate={validateUserName} variant="standard" fullWidth /><br></br>
      <TextInput source="email" validate={validateEmail} variant="standard" fullWidth /><br></br>
      <TextInput label="Password" source="password" type="password" validate={validatePassword} variant="standard" fullWidth /><br></br>
      <DateInput source="dateOfBirth" validate={validateDOB} variant="standard" fullWidth /><br></br>
      <DateInput source="joiningDate" validate={validateDOJ} variant="standard" fullWidth /><br></br>
      <TextInput source="fullName" validate={required()} variant="standard" fullWidth /><br></br>
      <SelectInput source="role.id" label="Role" validate={required()} choices={[
        { id: '1', name: 'Administrator' },
        { id: '3', name: 'Public' },
        { id: '2', name: 'Authenticated' },
      ]} variant="standard" fullWidth /><br></br>
      <ReferenceInput source="empdesignation" label="designation" reference="Empdesignations" variant="outlined" fullWidth><SelectInput optionText="designation" /></ReferenceInput>
      <ReferenceInput source="reporter_name" label="Reports" reference="users" variant="outlined" fullWidth><SelectInput optionText="username" variant="standard" fullWidth /></ReferenceInput><br></br>
      <BooleanInput source="confirmed" variant="standard" fullWidth /><br></br>
    </SimpleForm>
  </Create>
);