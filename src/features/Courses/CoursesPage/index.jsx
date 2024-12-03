import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from '@edx/paragon';
import { useHistory, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { extractLastPathSegment } from 'helpers';
import { fetchCoursesData } from 'features/Courses/data';
import { RequestStatus } from 'features/constants';
import TableFilters from 'features/Courses/TableFilters';
import TableLayout from 'features/Courses/TableLayout';
import { columns } from 'features/Courses/CoursesPage/columns';
import useManageTableSelection from 'features/Courses/hooks/useManageTableSelection';
import useFilterSearch from 'features/Courses/hooks/useFilterSearch';
import TableFooter from 'features/Courses/TableFooter';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { launchId } = useParams();
  const { table } = useSelector((state) => state.courses);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCoursesData(launchId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    htmlResponse,
    handleChangeSelectedCourses,
    handleSubmitSelectedCourses,
    hasSelectedCourses,
  } = useManageTableSelection({
    launchId, tableData: table, fetchData: fetchCoursesData,
  });

  const {
    handleSetKeyword,
    handleResetSearch,
    handleFetchDataFromPage,
    handleSubmitSearch,
    searchParams,
  } = useFilterSearch({
    launchId, tableData: table, fetchData: fetchCoursesData,
  });

  const actionButton = (url) => {
    const courseId = extractLastPathSegment(url);

    return (
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => courseId && history.push(`${launchId}/${courseId}`)}
      >
        View class list
      </Button>
    );
  };

  return (
    <>
      {/* eslint-disable react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlResponse) }} />

      <Container size="xl" className="px-4 pt-3">
        <h2 className="title-page mt-3 mb-3">Courses</h2>
        <div className="page-content-container p-4 d-flex flex-column">
          <TableFilters
            keyword={searchParams.keyword}
            handleSetKeyword={handleSetKeyword}
            handleResetSearch={handleResetSearch}
            handleSubmitSearch={handleSubmitSearch}
          />

          <TableLayout
            data={table.data}
            columns={columns}
            handleChangeSelectedCourses={handleChangeSelectedCourses}
            isLoading={table.status === RequestStatus.LOADING}
            actionButton={actionButton}
          />

          <TableFooter
            numPages={table.numPages}
            currentPage={searchParams.page}
            handleFetchDataFromPage={handleFetchDataFromPage}
          />

          <Button className="align-self-end mt-4" onClick={handleSubmitSelectedCourses} disabled={!hasSelectedCourses}>
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
};

export default CoursesPage;
