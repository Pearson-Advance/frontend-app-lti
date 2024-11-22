import { Form, Icon } from '@edx/paragon';
import { Button } from 'react-paragon-topaz';
import { Search } from '@edx/paragon/icons';
import PropTypes from 'prop-types';

const CoursesFilters = ({
  handleSetKeyword, handleResetSearch, keyword, handleSearchValues,
}) => (
  <div>
    <Form onSubmit={handleSearchValues}>
      <Form.Row className="col-12 ">
        <Form.Group className="col m-0" size="lg">
          <Form.Control
            leadingElement={<Icon src={Search} size="lg" />}
            value={keyword}
            onChange={(e) => handleSetKeyword(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex">
          <Button
            className="mr-2"
            onClick={handleResetSearch}
            variant="subtle"
          >
            Reset
          </Button>
          <Button variant="outline-primary" type="submit">Apply</Button>
        </div>
      </Form.Row>
    </Form>
  </div>
);

CoursesFilters.propTypes = {
  handleSetKeyword: PropTypes.func.isRequired,
  handleResetSearch: PropTypes.func.isRequired,
  handleSearchValues: PropTypes.func.isRequired,
  keyword: PropTypes.string,
};

CoursesFilters.defaultProps = {
  keyword: '',
};

export default CoursesFilters;
