// in src/posts.js
import React from 'react';
import RichTextInput from 'aor-rich-text-input';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, LongTextInput, SimpleForm, TextInput } from 'admin-on-rest';

export const PostList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <EditButton/>
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = (props) => {
    return (
        <Edit title={<PostTitle />} {...props}>
            <SimpleForm>
                <DisabledInput source="id"/>
                <TextInput source="title"/>
                <RichTextInput source="content"/>
            </SimpleForm>
        </Edit>
    )
};

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <LongTextInput source="content" />
        </SimpleForm>
    </Create>
);