/* eslint-disable react/no-danger */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from '@edx/paragon';
import { useParams, useHistory } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { ArrowBack } from '@edx/paragon/icons';

import { extractLastPathSegment } from 'helpers';
import { RequestStatus } from 'features/constants';
import TableLayout from 'features/Courses/TableLayout';
import { columns } from 'features/Courses/ClassesPage/columns';
import { fetchCourseClassesData, fetchCoursesData } from 'features/Courses/data';
import useManageTableSelection from 'features/Courses/hooks/useManageTableSelection';

const ClassesPage = () => {
  const dispatch = useDispatch();
  const { launchId, courseId } = useParams();
  const { classesTable, table } = useSelector((state) => state.courses);
  const history = useHistory();

  const masterCourse = table.data.find((c) => extractLastPathSegment(c.url) === courseId);

  useEffect(() => {
    if (!masterCourse) {
      dispatch(fetchCoursesData(launchId));
    }

    dispatch(fetchCourseClassesData(launchId, { courseId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    htmlResponse,
    handleChangeSelectedCourses,
    handleSubmitSelectedCourses,
    hasSelectedCourses,
  } = useManageTableSelection({
    launchId, courseId, tableData: classesTable, fetchData: fetchCourseClassesData,
  });

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlResponse) }} />

      <Container size="xl" className="px-4 py-3">
        <div className="d-flex align-items-center">
          <Button variant="tertiary" onClick={() => history.push(`/deep_linking/${launchId}`)}>
            <ArrowBack />
          </Button>
          <h2 className="title-page my-3 ml-2">Class list</h2>
        </div>
        <div className="page-content-container p-4 d-flex flex-column">
          <h3 className="mb-4">{masterCourse?.title}</h3>
          <TableLayout
            data={classesTable.data}
            columns={columns}
            count={classesTable.count}
            numPages={classesTable.numPages}
            handleChangeSelectedCourses={handleChangeSelectedCourses}
            isLoading={classesTable.status === RequestStatus.LOADING}
          />

          <Button className="align-self-end" onClick={handleSubmitSelectedCourses} disabled={!hasSelectedCourses}>
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ClassesPage;
