import PropTypes from 'prop-types';
import {
  Col, DataTable, Row,
} from '@edx/paragon';

import './index.scss';

const TableLayout = ({
  data,
  columns,
  count,
  numPages,
  handleChangeSelectedCourses,
  isLoading,
  actionButton,
  handleRefetchData,
}) => (
  <Row className="justify-content-center my-4">
    <Col>
      <DataTable
        isSelectable
        isPaginated
        manualPagination
        itemCount={count}
        pageCount={numPages}
        fetchData={handleRefetchData}
        onSelectedRowsChanged={handleChangeSelectedCourses}
        isLoading={isLoading}
        columns={columns}
        data={data}
        additionalColumns={actionButton ? [
          {
            Header: 'Action',
            Cell: ({ row }) => actionButton(row.original.url),
          },
        ] : []}
      >
        <DataTable.Table />
        <DataTable.EmptyTable content="No courses found." />
        <DataTable.TableFooter className="table-footer" />
      </DataTable>
    </Col>
  </Row>
);

TableLayout.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
  columns: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  handleChangeSelectedCourses: PropTypes.func.isRequired,
  handleRefetchData: PropTypes.func.isRequired,
  count: PropTypes.number,
  numPages: PropTypes.number,
  isLoading: PropTypes.bool,
  actionButton: PropTypes.func,
};

TableLayout.defaultProps = {
  data: [],
  count: 0,
  numPages: 0,
  isLoading: true,
  actionButton: null,
};

export default TableLayout;
