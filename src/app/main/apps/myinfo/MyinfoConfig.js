import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const MyinfoConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/myinfo',
      component: lazy(() => import('./Myinfo')),
    },
    {
      path: '/apps/myinfo',
      component: ()=><Redirect to='/apps/myinfo'/>,
    },
    
  ],
};

export default MyinfoConfig;

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
