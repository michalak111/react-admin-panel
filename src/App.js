import React from 'react';
import { simpleRestClient, fetchUtils, Admin, Resource } from 'admin-on-rest';
import { API_URL } from './config'
import authClient from './authClient';
import { PostList, PostEdit, PostCreate } from './posts';
import Menu from './Menu';
import customRoutes from './customRoutes';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('x-access-token', localStorage.getItem('token'));
    return fetchUtils.fetchJson(url, options);
};

const restClient = simpleRestClient(API_URL, httpClient);

const App = () => (
    <Admin title="Simple CMS" customRoutes={customRoutes} menu={Menu} authClient={authClient} restClient={restClient}>
        <Resource name="post" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
);

export default App;
