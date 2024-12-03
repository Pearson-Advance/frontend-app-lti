import PropTypes from 'prop-types';
import { Pagination } from '@edx/paragon';

const TableFooter = ({
  numPages,
  currentPage,
  handleFetchDataFromPage,
}) => {
  if (numPages === 1) { return null; }
  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className=" mr-5">Page {currentPage} of {numPages}</div>
      <Pagination
        paginationLabel="pagination navigation"
        pageCount={numPages}
        currentPage={currentPage}
        variant="minimal"
        onPageSelect={(page) => handleFetchDataFromPage(page)}
      />
    </div>
  );
};

TableFooter.propTypes = {
  numPages: PropTypes.number,
  currentPage: PropTypes.number,
  handleFetchDataFromPage: PropTypes.func,
};

TableFooter.defaultProps = {
  numPages: 0,
  currentPage: 0,
  handleFetchDataFromPage: () => {},
};

export default TableFooter;
