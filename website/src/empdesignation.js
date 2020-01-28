import React from 'react';
import { Filter, List, Edit, ReferenceArrayInput, SelectArrayInput, Datagrid, ChipField, SingleFieldList, ArrayField, TextField, EditButton, TextInput, SimpleForm, Create } from 'react-admin';
const EmpdesignationFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="designation" alwaysOn />
  </Filter>
);
const validateEmpdesignationCreation = (values) => {
  const errors = {};
  if (!values.designation) {
    errors.designation = ['The designation is required'];
  }
  if (!values.empdesignation_id) {
    errors.empdesignation_id = ['The empdesignation_id is required'];
  }
  return errors
};
export const EmpdesignationList = props => (
  <div className='adminpagetopheight'>
  <List filters={<EmpdesignationFilter/>} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="designation"/>
      <ArrayField source="empdesignation_id" label="Keywords" reference="Empdesignations"><SingleFieldList><ChipField source="keyword_name" /></SingleFieldList></ArrayField>
      <EditButton variant="outlined"/>
    </Datagrid>
  </List>
  </div>
);
export const EmpdesignationCreate = props => (
  <Create {...props}>
    <SimpleForm validate={validateEmpdesignationCreation}>
      <TextInput source="designation"/>
      <ReferenceArrayInput source="empdesignation_id" label="Keywords" reference="keywords" >
        <SelectArrayInput optionText="keyword_name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
export const EmpdesignationEdit = props => (
  <Edit label="Edit" {...props}>
    <SimpleForm>
      <TextInput source="designation"/>
      <ReferenceArrayInput  source="empdesignation_id" label="Keywords" reference="keywords" >
        <SelectArrayInput optionText="keyword_name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);