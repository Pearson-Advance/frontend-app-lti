import PropTypes from 'prop-types';
import {
  Col, DataTable, Row,
} from '@edx/paragon';

import './index.scss';

const TableLayout = ({
  data,
  columns,
  handleChangeSelectedCourses,
  isLoading,
  actionButton,
}) => (
  <Row className="justify-content-center my-4">
    <Col>
      <DataTable
        isSelectable
        itemCount={data.length}
        onSelectedRowsChanged={handleChangeSelectedCourses}
        isLoading={isLoading}
        columns={columns}
        data={data}
        additionalColumns={actionButton ? [
          {
            id: 'action',
            Header: 'Action',
            Cell: ({ row }) => actionButton(row.original.url),
          },
        ] : []}
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
  handleChangeSelectedCourses: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  actionButton: PropTypes.func,
};

TableLayout.defaultProps = {
  data: [],
  isLoading: true,
  actionButton: null,
};

export default TableLayout;
