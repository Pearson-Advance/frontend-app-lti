import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import Main from 'features/Main';

import appMessages from './i18n';
import { store } from './store';

import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Main />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize(
  {
    messages: [appMessages],
    handlers: {
      config: () => {
        mergeConfig({
          MFE_CONFIG_API_URL: process.env.MFE_CONFIG_API_URL || null,
          OPENEDX_LTI_TOOL_PLUGIN_URL: process.env.OPENEDX_LTI_TOOL_PLUGIN_URL || null,
          COURSE_OPERATIONS_API_V2_BASE_URL: process.env.COURSE_OPERATIONS_API_V2_BASE_URL || null,
        });
      },
    },
  },
  'deepLinkingAppConfig',
);
