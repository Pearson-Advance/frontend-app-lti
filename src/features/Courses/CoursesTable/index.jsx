import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Button, Col, DataTable, Row,
} from '@edx/paragon';

import { RequestStatus } from 'features/constants';
import { columns } from 'features/Courses/CoursesTable/columns';
import { getCourseIdFromUrl } from 'helpers';

const CoursesTable = ({ data, count, handleChangeSelectedCourses }) => {
  const coursesRequest = useSelector((state) => state.courses.table.status);
  const COLUMNS = useMemo(() => columns, []);
  const isLoading = coursesRequest === RequestStatus.LOADING;

  const actionButton = useCallback((url) => (
    <Button
      variant="outline-primary"
      size="sm"
      onClick={() => console.log(getCourseIdFromUrl(url))}
    >
      View class list
    </Button>
  ), []);

  return (
    <Row className="justify-content-center my-4">
      <Col>
        <DataTable
          isSelectable
          itemCount={count}
          onSelectedRowsChanged={handleChangeSelectedCourses}
          isLoading={isLoading}
          columns={COLUMNS}
          data={data}
          additionalColumns={
            [{
              Header: 'Action',
              Cell: ({ row }) => actionButton(row.original.url),
            }]
          }
        >
          <DataTable.Table />
          <DataTable.EmptyTable content="No courses found." />
          <DataTable.TableFooter />
        </DataTable>
      </Col>
    </Row>
  );
};

CoursesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
  handleChangeSelectedCourses: PropTypes.func.isRequired,
  count: PropTypes.number,
};

CoursesTable.defaultProps = {
  data: [],
  count: 0,
};

export default CoursesTable;
