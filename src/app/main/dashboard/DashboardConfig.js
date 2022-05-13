import i18next from 'i18next';
import Dashboard from './Dashboard';
import en from './i18n/en';
import ko from './i18n/ko';


i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('ko', 'examplePage', ko);

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
    },
  ],
};

export default DashboardConfig;

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
