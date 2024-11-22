/* eslint-disable import/prefer-default-export */
/**
 * Given a URL, return the course ID at the end of it.
 * @param {string} url - URL from which to extract course ID
 * @returns {string} course ID
 */
export const getCourseIdFromUrl = (url) => {
  const urlSplit = url.split('/');
  return urlSplit[urlSplit.length - 1];
};
