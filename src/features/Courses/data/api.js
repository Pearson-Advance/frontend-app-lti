/* eslint-disable import/prefer-default-export */
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const DEEP_LINKING_URL = 'lti/deep_linking';

function fetchLicensedCourses(launchId, { keyword = '', page = 1, courseId = '' } = {}) {
  const apiV2BaseUrl = getConfig().COURSE_OPERATIONS_API_V2_BASE_URL;

  const URL = [apiV2BaseUrl, DEEP_LINKING_URL, launchId, 'content_items/courses'].join('/');

  const params = {
    search: keyword,
    page,
    course_id: courseId,
  };

  return getAuthenticatedHttpClient().get(URL, { params });
}

function fetchCoursesClasses(launchId, { keyword = '', page = 1, courseId = '' } = {}) {
  const apiV2BaseUrl = getConfig().COURSE_OPERATIONS_API_V2_BASE_URL;

  const URL = [apiV2BaseUrl, DEEP_LINKING_URL, launchId, 'content_items/classes'].join('/');

  const params = {
    search: keyword,
    page,
    course_id: courseId,
  };

  return getAuthenticatedHttpClient().get(URL, { params });
}

function validateContentSelection(launchId, data) {
  const apiBaseUrl = getConfig().OPENEDX_LTI_TOOL_PLUGIN_URL;

  const URL = [apiBaseUrl, 'deep_linking', launchId].join('/');

  return getAuthenticatedHttpClient().post(URL, data);
}

export { fetchLicensedCourses, fetchCoursesClasses, validateContentSelection };
