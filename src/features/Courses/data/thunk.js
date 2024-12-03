/* eslint-disable import/prefer-default-export */
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';

import { fetchLicensedCourses, fetchCoursesClasses } from 'features/Courses/data/api';
import {
  updateCoursesDataRequest,
  updateCoursesDataSuccess,
  updateCoursesDataFailed,
  updateCourseClassesDataRequest,
  updateCourseClassesDataSuccess,
  updateCourseClassesDataFailed,
} from 'features/Courses/data/slice';

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

/**
 * Fetches CCX courses for a specific master course.
 *
 * Dispatches a request action to update the classes data status to loading.
 * It then attempts to fetch the classes data for a given course using the provided launch ID and parameters.
 * If successful, it dispatches a success action with the fetched data.
 * In case of failure, it dispatches a failure action and logs the error.
 *
 * @param {string} launchId - The launch ID for the request.
 * @param {Object} params - Additional parameters for the request.
 * @param {string} params.courseId - The course ID for which to fetch the classes data.
 * @returns {Function} A thunk that handles fetching course classes data and dispatching actions.
 */
function fetchCourseClassesData(launchId, params) {
  return async (dispatch) => {
    dispatch(updateCourseClassesDataRequest());

    try {
      const response = camelCaseObject(await fetchCoursesClasses(launchId, params));
      dispatch(updateCourseClassesDataSuccess(response.data));
    } catch (error) {
      dispatch(updateCourseClassesDataFailed());
      logError(error);
    }
  };
}

export { fetchCoursesData, fetchCourseClassesData };
