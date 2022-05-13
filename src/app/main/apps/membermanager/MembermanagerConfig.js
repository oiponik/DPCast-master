import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const MembermanagerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/membermanager/write',
      component: lazy(() => import('./member/Write')),
    },
    {
      path: '/apps/membermanager/member/:memberId',
      component: lazy(() => import('./member/Member')),
    },
    {
      path: '/apps/membermanager/members',
      component: lazy(() => import('./members/Members')),
    },
    {
      path: '/apps/membermanager',
      component: ()=><Redirect to='/apps/membermanager/Members'/>,
    },
    
  ],
};

export default MembermanagerConfig;

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
