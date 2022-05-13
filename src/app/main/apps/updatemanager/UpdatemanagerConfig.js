import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const UpdatemanagerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/updatemanager/updates',
      component: lazy(() => import('./Updates')),
    },
    {
      path: '/apps/updatemanager',
      component: ()=><Redirect to='/apps/updatemanager/updates'/>,
    },
    
  ],
};

export default UpdatemanagerConfig;

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
