/* eslint-disable import/prefer-default-export */
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const DEEP_LINKING_URL = 'lti/deep_linking';

function fetchLicensedCourses(launchId) {
  const apiV2BaseUrl = getConfig().COURSE_OPERATIONS_API_V2_BASE_URL;

  const URL = [apiV2BaseUrl, DEEP_LINKING_URL, launchId, 'content_items/courses'].join('/');

  return getAuthenticatedHttpClient().get(URL);
}

function validateContentSelection(launchId, data) {
  const apiBaseUrl = getConfig().OPENEDX_LTI_TOOL_PLUGIN_URL;

  const URL = [apiBaseUrl, 'deep_linking', launchId].join('/');

  return getAuthenticatedHttpClient().post(URL, data);
}

export { fetchLicensedCourses, validateContentSelection };
