import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = (props) => {
  const {
    className, icon, placeholder, onChange, value,
  } = props;
  return (
    <div className={classnames('search-bar-wrapper')}>
      <Input
        className={classnames(value ? '' : 'is-inactive', className)}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        prefix={icon ? <img src={icon} alt="Search bar icon" /> : <SearchOutlined />}
      />
    </div>
  );
};
SearchBar.defaultProps = {
  className: '',
  icon: '',
  placeholder: 'Search',
  onChange: () => { },
  value: '',
};
SearchBar.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
export default SearchBar;
