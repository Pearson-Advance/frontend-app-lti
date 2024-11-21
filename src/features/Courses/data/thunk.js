/* eslint-disable import/prefer-default-export */
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';

import { fetchLicensedCourses } from 'features/Courses/data/api';
import { updateCoursesDataRequest, updateCoursesDataSuccess, updateCoursesDataFailed } from 'features/Courses/data/slice';

function fetchCoursesData(launchId) {
  return async (dispatch) => {
    dispatch(updateCoursesDataRequest());

    try {
      const response = camelCaseObject(await fetchLicensedCourses(launchId));
      dispatch(updateCoursesDataSuccess(response.data));
    } catch (error) {
      dispatch(updateCoursesDataFailed());
      logError(error);
    }
  };
}

export { fetchCoursesData };
