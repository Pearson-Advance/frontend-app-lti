import PropTypes from 'prop-types';
import {
  Col, DataTable, Row,
} from '@edx/paragon';

import './index.scss';

const TableLayout = ({
  data,
  columns,
  handleChangeSelectedCourses,
  actionButton,
  ...props
}) => (
  <Row className="justify-content-center my-4">
    <Col>
      <DataTable
        itemCount={data.length}
        onSelectedRowsChanged={handleChangeSelectedCourses}
        columns={columns}
        data={data}
        additionalColumns={actionButton ? [
          {
            id: 'action',
            Header: 'Action',
            Cell: ({ row }) => actionButton(row.original.custom.resourceId),
          },
        ] : []}
        {...props}
      >
        <DataTable.Table />
        <DataTable.EmptyTable content="No courses found." />
      </DataTable>
    </Col>
  </Row>
);

TableLayout.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
  columns: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  handleChangeSelectedCourses: PropTypes.func,
  actionButton: PropTypes.func,
};

TableLayout.defaultProps = {
  data: [],
  actionButton: null,
  handleChangeSelectedCourses: null,
};

export default TableLayout;
