/* eslint-disable import/prefer-default-export */
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { fetchCoursesDataFailed, fetchCoursesDataRequest, fetchCoursesDataSuccess } from 'features/Courses/data/slice';
import { handleGetLicensedCourses } from './api';

function fetchCoursesData(launchId) {
  return async (dispatch) => {
    dispatch(fetchCoursesDataRequest());

    try {
      const response = camelCaseObject(await handleGetLicensedCourses(launchId));
      dispatch(fetchCoursesDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchCoursesDataFailed());
      logError(error);
    }
  };
}

export { fetchCoursesData };
