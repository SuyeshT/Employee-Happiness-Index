import React from 'react';
import { Filter, Edit, ReferenceArrayInput, SelectArrayInput,ReferenceInput, SelectInput, ArrayField, SingleFieldList, ChipField, List, Datagrid, TextField, EditButton, Create, SimpleForm, TextInput } from 'react-admin';
import { required } from 'react-admin';
const KeywordFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="keyword_name" alwaysOn />
  </Filter>
);
const validateKeyword = [required()];
export const KeywordList = props => (
  <div className='adminpagetopheight'>
  <List filters={<KeywordFilter />} {...props}>
    <Datagrid rowClick="edit">
      <TextField source="keyword_name" label="Keywords" />
      <ArrayField source="designation_id" label="Designations" reference="Empdesignations" ><SingleFieldList><ChipField source="designation" /></SingleFieldList></ArrayField>
      <EditButton label="Edit" variant="outlined" />
    </Datagrid>
  </List>
  </div>
);
export const KeywordCreate = props => (
  <Create {...props}>
    <SimpleForm >
      <TextInput source="keyword_name" validate={validateKeyword}  variant="standard" />
      <ArrayField source="designation_id" label="designation" reference="Empdesignations" variant="outlined"><SingleFieldList><ChipField source="designation" /></SingleFieldList></ArrayField>
    </SimpleForm>
  </Create>
);
export const KeywordEdit = props => (
  <Edit label="Edit"{...props}>
    <SimpleForm >
      <TextInput source="keyword_name" validate={validateKeyword} />
      <ReferenceArrayInput source="designation_id"  variant="standard"  label="Designation" reference="Empdesignations">
        <SelectArrayInput optionText="designation"  variant="standard"  />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);
