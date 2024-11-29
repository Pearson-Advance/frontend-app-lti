/* eslint-disable import/prefer-default-export */
/**
 * Given a URL, return the course ID at the end of it.
 * @param {string} url - URL from which to extract course ID
 * @returns {string} course ID
 */
export const extractLastPathSegment = (url) => {
  const segments = url.split('/');
  return segments[segments.length - 1];
};
