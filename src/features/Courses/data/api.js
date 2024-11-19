/* eslint-disable import/prefer-default-export */
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const DEEP_LINKING_URL = 'lti/deep_linking';

function handleGetLicensedCourses(launchId) {
  const apiV2BaseUrl = getConfig().COURSE_OPERATIONS_API_V2_BASE_URL;

  return getAuthenticatedHttpClient()
    .get([apiV2BaseUrl, DEEP_LINKING_URL, launchId, 'content_items/courses'].join('/'));
}

export { handleGetLicensedCourses };
