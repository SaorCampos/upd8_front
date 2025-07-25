import React from 'react';
import ClientPage from '../pages/client/ClientPage';
import ClientCreatePage from '../pages/client/ClientCreatePage';
import ClientUpdatePage from '../pages/client/ClientUpdatePage';
import RepresentativePage from '../pages/representative/RepresentativePage';
import RepresentativeCreatePage from '../pages/representative/RepresentativeCreatePage';
import RepresentativeUpdatePage from '../pages/representative/RepresentativeUpdatePage';

export const routes = [
  { 
    resource: 'cliente',
    path: 'cliente', 
    component: <ClientPage /> 
  },
  { 
    resource: 'cliente', 
    type:     'create',
    path:     'cliente/registrar', 
    component:<ClientCreatePage /> 
  },
  { 
    resource: 'cliente', 
    type:     'update', 
    path:     'cliente/alterar/:id', 
    component:<ClientUpdatePage /> 
  },
  { 
    resource: 'representante',
    path:     'representante', 
    component:<RepresentativePage /> 
  },
  {
    resource: 'representante',
    type:     'create',
    path:     'representante/registrar',
    component:<RepresentativeCreatePage />
  },
  {
    resource: 'representante',
    type:     'update',
    path:     'representante/alterar/:id',
    component:<RepresentativeUpdatePage />
  }
];
