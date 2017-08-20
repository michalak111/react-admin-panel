// in src/customRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Foo from './Foo';

export default [
    <Route exact path="/foo" component={Foo} />,
];