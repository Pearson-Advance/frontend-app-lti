/* eslint-disable react/no-danger */
import { useSelector } from 'react-redux';
import { Button, Container } from '@edx/paragon';
import { useHistory, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { getCourseIdFromUrl } from 'helpers';
import { RequestStatus } from 'features/constants';
import TableLayout from 'features/Courses/TableLayout';
import { fetchCoursesData } from 'features/Courses/data';
import TableFilters from 'features/Courses/TableFilters';
import { columns } from 'features/Courses/CoursesPage/columns';
import useManageTableSelection from 'features/Courses/hooks/useManageTableSelection';
import useSearchBar from 'features/Courses/hooks/useSearchBar';

const CoursesPage = () => {
  const { launchId } = useParams();
  const { table } = useSelector((state) => state.courses);
  const history = useHistory();

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
    handleSearchValues,
    handleSetCurrentPage,
    searchParams,
  } = useSearchBar({
    launchId, tableData: table, fetchData: fetchCoursesData,
  });

  const handleRefetchData = ({ pageIndex }) => {
    const currentPage = pageIndex + 1;
    handleSetCurrentPage(currentPage);
  };

  const actionButton = (url) => {
    const courseId = getCourseIdFromUrl(url);

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
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlResponse) }} />

      <Container size="xl" className="px-4 pt-3">
        <h2 className="title-page mt-3 mb-3">Courses</h2>
        <div className="page-content-container p-4 d-flex flex-column">
          <TableFilters
            handleSetKeyword={handleSetKeyword}
            handleResetSearch={handleResetSearch}
            keyword={searchParams.keyword}
            handleSearchValues={handleSearchValues}
          />

          <TableLayout
            data={table.data}
            columns={columns}
            count={table.count}
            numPages={table.numPages}
            handleChangeSelectedCourses={handleChangeSelectedCourses}
            isLoading={table.status === RequestStatus.LOADING}
            actionButton={actionButton}
            handleRefetchData={handleRefetchData}
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
