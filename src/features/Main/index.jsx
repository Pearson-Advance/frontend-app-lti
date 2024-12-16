import {
  Switch, Route,
} from 'react-router-dom';
import CookiePolicyBanner from '@pearsonedunext/frontend-component-cookie-policy-banner';

import { cookieText } from 'features/constants';
import CoursesPage from 'features/Courses/CoursesPage';
import ClassesPage from 'features/Courses/ClassesPage';

const Main = () => {
  const routes = [
    { path: '/deep_linking/:launchId', component: CoursesPage, exact: true },
    { path: '/deep_linking/:launchId/:courseId', component: ClassesPage, exact: true },
  ];

  return (
    <>
      <CookiePolicyBanner policyText={{ en: cookieText }} />
      <Switch>
        {routes.map(({ path, exact, component: Component }) => (
          <Route key={path} path={path} exact={exact} render={() => <Component />} />
        ))}

        <Route path="*" render={() => <h1>Not found</h1>} />
      </Switch>
    </>
  );
};

export default Main;
