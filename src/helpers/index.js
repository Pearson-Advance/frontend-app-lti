/* eslint-disable import/prefer-default-export */
/**
 * Extracts the last path segment (typically a course ID) from a given URL.
 * @param {string} url - The URL to extract the segment from.
 * @returns {string} The last path segment, or an empty string if invalid.
 */
export const extractLastPathSegment = (url) => {
  if (!url || typeof url !== 'string') { return ''; }

  const segments = url.trim().split('/').filter(Boolean);
  return segments.pop() || '';
};
