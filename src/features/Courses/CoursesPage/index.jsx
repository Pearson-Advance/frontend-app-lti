/* eslint-disable react/no-danger */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from '@edx/paragon';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { fetchCoursesData } from 'features/Courses/data';
import CoursesTable from 'features/Courses/CoursesTable';
import CoursesFilters from 'features/Courses/CoursesFilters';
import { validateContentSelection } from 'features/Courses/data/api';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { launchId } = useParams();
  const { table } = useSelector((state) => state.courses);

  const [searchParams, setSearchParams] = useState({
    keyword: '',
    page: 1,
  });
  const [selectedCourses, setSelectedCourses] = useState({});
  const [htmlResponse, setHtmlResponse] = useState(null);

  const handleChangeSelectedCourses = (courses) => {
    setSelectedCourses(courses);
  };

  const handleSearchValues = (e) => {
    if (e) { e.preventDefault(); }
    dispatch(fetchCoursesData(launchId, searchParams));
  };

  const handleSetKeyword = (keyword) => {
    setSearchParams((prevState) => ({ ...prevState, keyword }));
  };

  const handleResetSearch = () => {
    setSearchParams((prevState) => ({ ...prevState, keyword: '' }));
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
    const contentItems = table.data.filter((course, idx) => courseIndexes.includes(idx.toString()));

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

  useEffect(() => {
    dispatch(fetchCoursesData(launchId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchId]);

  const hasSelectedCourses = Object.keys(selectedCourses).some(key => selectedCourses[key]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlResponse) }} />

      <Container size="xl" className="px-4 pt-3">
        <h2 className="title-page mt-3 mb-3">Courses</h2>
        <div className="page-content-container p-4 d-flex flex-column">
          <CoursesFilters
            handleSetKeyword={handleSetKeyword}
            handleResetSearch={handleResetSearch}
            keyword={searchParams.keyword}
            handleSearchValues={handleSearchValues}
          />

          <CoursesTable
            data={table.data}
            count={table.count}
            handleChangeSelectedCourses={handleChangeSelectedCourses}
          />

          <Button className="align-self-end" onClick={handleSubmitSelectedCourses} disabled={!hasSelectedCourses}>
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
};

export default CoursesPage;
