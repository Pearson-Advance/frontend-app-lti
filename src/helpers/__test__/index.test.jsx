import { extractLastPathSegment } from '../index';

describe('extractLastPathSegment', () => {
  test('extracts the last segment of a URL', () => {
    const url = 'https://example.com/course/course-v1:edX+DemoX+Demo_Course';
    expect(extractLastPathSegment(url)).toBe('course-v1:edX+DemoX+Demo_Course');
  });

  test('returns an empty string if the given URL is empty', () => {
    const emptyString = '';
    expect(extractLastPathSegment(emptyString)).toBe('');
  });

  test('returns an empty string if the given URL is not a string', () => {
    const emptyString = false;
    expect(extractLastPathSegment(emptyString)).toBe('');
  });
});
