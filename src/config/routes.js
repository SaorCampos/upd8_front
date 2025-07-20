import React from 'react';
import ClientPage from '../pages/client/ClientPage';
import ClientCreatePage from '../pages/client/ClientCreatePage';
import ClientUpdatePage from '../pages/client/ClientUpdatePage';

export const routes = [
  { path: '/', component: <ClientPage /> },
  { path: '/registrar', component: <ClientCreatePage /> },
  { path: '/alterar/:id', component: <ClientUpdatePage /> },
];
