import React from 'react';
import { MenuItemLink } from 'admin-on-rest';
import PostIcon from 'material-ui/svg-icons/content/content-paste';
import FooIcon from 'material-ui/svg-icons/action/code';

export default ({ resources, onMenuTap, logout }) => (
    <div>
        <MenuItemLink to="/post" primaryText="Posts" onTouchTap={onMenuTap} leftIcon={<PostIcon/>}/>
        <MenuItemLink to="/foo" primaryText="Foo" onTouchTap={onMenuTap} leftIcon={<FooIcon/>}/>
        {logout}
    </div>
);