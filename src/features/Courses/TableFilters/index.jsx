import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from '@edx/paragon';
import { Button } from 'react-paragon-topaz';
import { Search } from '@edx/paragon/icons';

const TableFilters = ({
  handleSetKeyword, handleResetSearch, keyword, handleSubmitSearch,
}) => {
  const [currentSearchedKeyword, setCurrentSearchedKeyword] = useState('');
  return (
    <div>
      <Form onSubmit={(event) => {
        setCurrentSearchedKeyword(keyword);
        handleSubmitSearch(event);
      }}
      >
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
              onClick={() => {
                handleResetSearch();
                setCurrentSearchedKeyword('');
              }}
              variant="subtle"
            >
              Reset
            </Button>
            <Button
              disabled={!keyword || keyword === currentSearchedKeyword}
              variant="outline-primary"
              type="submit"
            >
              Apply
            </Button>
          </div>
        </Form.Row>
      </Form>
    </div>
  );
};

TableFilters.propTypes = {
  handleSetKeyword: PropTypes.func.isRequired,
  handleResetSearch: PropTypes.func.isRequired,
  handleSubmitSearch: PropTypes.func.isRequired,
  keyword: PropTypes.string,
};

TableFilters.defaultProps = {
  keyword: '',
};

export default TableFilters;
