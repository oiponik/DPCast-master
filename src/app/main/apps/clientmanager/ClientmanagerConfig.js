import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ClientlistConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/clientmanager/write',
      component: lazy(() => import('./client/Write')),
    },
    {
      path: '/apps/clientmanager/client/:clientId',
      component: lazy(() => import('./client/Client')),
    },
    {
      path: '/apps/clientmanager/clients',
      component: lazy(() => import('./clients/Clients')),
    },
    {
      path: '/apps/clientmanager',
      component: ()=><Redirect to='/apps/clientmanager/clients'/>,
    },
    
  ],
};

export default ClientlistConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
