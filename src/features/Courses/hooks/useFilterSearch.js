import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { resetCourseClassesData } from 'features/Courses/data/slice';
import { initialPage } from 'features/constants';

/**
 * Custom hook for managing search and pagination state in a course list table.
 *
 * @param {Object} props - The properties for configuring the hook.
 * @param {string} props.launchId - The deep linking launch ID.
 * @param {string} props.courseId - The ID of the course to filter by.
 * @param {Function} props.fetchData - A thunk that fetches the course list data.
 * @returns {Object} The search and pagination state, and functions to manipulate them.
 * @returns {{
 *   handleSetKeyword: Function,
 *   handleResetSearch: Function,
 *   handleSubmitSearch: Function,
 *   handleFetchDataFromPage: Function,
 *   searchParams: {
 *     keyword: string,
 *     page: number,
 *   },
 * }}
 */
const useFilterSearch = ({
  launchId, courseId, fetchData,
}) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(initialPage);

  const handleSetKeyword = (newKeyword) => {
    setKeyword(newKeyword);
  };

  const handleResetSearch = () => {
    if (keyword !== '' || page !== initialPage) {
      setKeyword('');
      setPage(initialPage);
      dispatch(fetchData(launchId, { keyword: '', page: initialPage, courseId }));
    }
  };

  const handleFetchDataFromPage = (newPage) => {
    setPage(newPage);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    dispatch(fetchData(launchId, { keyword, courseId }));
  };

  useEffect(() => {
    dispatch(fetchData(launchId, { page, courseId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, launchId]);

  useEffect(() => () => {
    dispatch(resetCourseClassesData());
  }, [launchId, dispatch]);

  return {
    handleSetKeyword,
    handleResetSearch,
    handleSubmitSearch,
    handleFetchDataFromPage,
    searchParams: { keyword, page },
  };
};

export default useFilterSearch;
