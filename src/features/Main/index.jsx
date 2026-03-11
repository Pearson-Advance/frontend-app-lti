import { Routes, Route } from 'react-router-dom';
import CookiePolicyBanner from '@pearsonedunext/frontend-component-cookie-policy-banner';

import { cookieText } from 'features/constants';
import CoursesPage from 'features/Courses/CoursesPage';
import ClassesPage from 'features/Courses/ClassesPage';

const Main = () => {
  const routes = [
    { path: '/deep_linking/:launchId', element: <CoursesPage /> },
    { path: '/deep_linking/:launchId/:courseId', element: <ClassesPage /> },
  ];

  return (
    <>
      <CookiePolicyBanner policyText={{ en: cookieText }} />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </>
  );
};

export default Main;
