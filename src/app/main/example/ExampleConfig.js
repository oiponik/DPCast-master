import i18next from 'i18next';
import Example from './Example';
import en from './i18n/en';
import ko from './i18n/ko';


i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('ko', 'examplePage', ko);

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/example',
      component: Example,
    },
  ],
};

export default ExampleConfig;

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
