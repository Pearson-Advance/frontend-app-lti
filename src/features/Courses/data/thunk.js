/* eslint-disable import/prefer-default-export */
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';

import { fetchLicensedCourses, fetchCoursesClasses } from 'features/Courses/data/api';
import {
  updateCoursesDataRequest, updateCoursesDataSuccess, updateCoursesDataFailed,
  updateCourseClassesDataRequest, updateCourseClassesDataSuccess, updateCourseClassesDataFailed,
} from 'features/Courses/data/slice';

function fetchCoursesData(launchId, keyword) {
  return async (dispatch) => {
    dispatch(updateCoursesDataRequest());

    try {
      const response = camelCaseObject(await fetchLicensedCourses(launchId, keyword));
      dispatch(updateCoursesDataSuccess(response.data));
    } catch (error) {
      dispatch(updateCoursesDataFailed());
      logError(error);
    }
  };
}

function fetchCourseClassesData(launchId, keyword) {
  return async (dispatch) => {
    dispatch(updateCourseClassesDataRequest());

    try {
      const response = camelCaseObject(await fetchCoursesClasses(launchId, keyword));
      dispatch(updateCourseClassesDataSuccess(response.data));
    } catch (error) {
      dispatch(updateCourseClassesDataFailed());
      logError(error);
    }
  };
}

export { fetchCoursesData, fetchCourseClassesData };
