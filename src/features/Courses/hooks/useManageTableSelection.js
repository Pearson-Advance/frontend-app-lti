import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { validateContentSelection } from 'features/Courses/data/api';
import { resetCourseClassesData } from 'features/Courses/data/slice';

const useManageTableSelection = ({
  launchId, tableData, fetchData,
}) => {
  const dispatch = useDispatch();

  const [selectedCourses, setSelectedCourses] = useState({});
  const [htmlResponse, setHtmlResponse] = useState(null);

  const handleChangeSelectedCourses = (courses) => {
    setSelectedCourses(courses);
  };

  /**
 * Submits the selected courses for validation.
 * It filters the selected courses from the table data, converts them into
 * a JSON string, and appends them to a FormData object. The FormData is
 * then sent to the server for validation using handleValidateCoursesSelection.
 * The server's HTML response is set to the component's state.
 */
  const handleSubmitSelectedCourses = async () => {
    const courseIndexes = Object.keys(selectedCourses);
    const contentItems = tableData.data.filter((course, idx) => courseIndexes.includes(idx.toString()));

    const formData = new FormData();
    formData.append('content_items', JSON.stringify(contentItems));

    const res = await validateContentSelection(launchId, formData);
    setHtmlResponse(res.data);
  };

  useEffect(() => {
    // The HTML response from before is rendered so here we can submit and go back to the platform
    if (htmlResponse) {
      document.getElementById('lti13_deep_link_auto_submit').submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlResponse]);

  useEffect(
    () => () => {
      dispatch(resetCourseClassesData());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [launchId, fetchData],
  );

  const hasSelectedCourses = Object.keys(selectedCourses).some(key => selectedCourses[key]);

  return {
    htmlResponse,
    handleChangeSelectedCourses,
    handleSubmitSelectedCourses,
    hasSelectedCourses,
  };
};

export default useManageTableSelection;
