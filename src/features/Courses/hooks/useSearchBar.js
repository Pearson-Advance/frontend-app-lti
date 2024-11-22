import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { resetCourseClassesData } from 'features/Courses/data/slice';
import { initialPage } from 'features/constants';

const useSearchBar = ({
  launchId, courseId, fetchData,
}) => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(initialPage);

  const handleSearchValues = (e) => {
    if (e) { e.preventDefault(); }
    dispatch(fetchData(launchId, { keyword, page, courseId }));
  };

  const handleSetKeyword = (newKeyword) => {
    setKeyword(newKeyword);
  };

  const handleResetSearch = () => {
    setKeyword('');
  };

  const handleSetCurrentPage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    handleSearchValues();

    return () => {
      dispatch(resetCourseClassesData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchId, page]);

  return {
    handleSetKeyword,
    handleResetSearch,
    handleSearchValues,
    handleSetCurrentPage,
    searchParams: { keyword, page },
  };
};

export default useSearchBar;
