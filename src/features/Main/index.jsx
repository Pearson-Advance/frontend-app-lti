import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';

import { getConfig } from '@edx/frontend-platform';
import { Container } from '@edx/paragon';

import CookiePolicyBanner from '@pearsonedunext/frontend-component-cookie-policy-banner';

import CoursesPage from 'features/Courses/CoursesPage';

import { cookieText } from 'features/constants';

const Main = () => {
  const routes = [{ path: '/deep_linking/:launchId', component: CoursesPage, exact: true }];

  return (
    <BrowserRouter basename={getConfig().LTI_MFE_BASE_URL}>
      <CookiePolicyBanner policyText={{ en: cookieText }} />

      <Container className="px-0 container-pages">
        <Switch>
          {routes.map(({ path, exact, component: Component }) => (
            <Route key={path} path={path} exact={exact} render={() => <Component />} />
          ))}

          <Route path="*" render={() => <h1>Not found</h1>} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Main;
