import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Select } from 'antd';
import InputTitle from './inputTitle';
import Blue1BgRow from '../UI/blue1BgRow';

const { Option } = Select;
const SelectCT = (props) => {
  const {
    className, placeholder, data, title, // onChange,
    showSearch, defaultValue, isValueOutside, onSearch,
    value, mode, suffixIcon, name,
  } = props;

  function onChange(value) {
    props.onChange(value, name);
  }

  return (
    <div className={classnames('select-ct-wrapper', className)}>

      <InputTitle title={title} />

      <Select
        suffixIcon={suffixIcon}
        mode={mode}
        // onChange={onChange}
        defaultValue={defaultValue}
        value={isValueOutside ? [] : value}
        showSearch={showSearch}
        placeholder={placeholder}
        optionFilterProp="children"
        onSelect={onChange}
        onSearch={onSearch}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {_.map(data, (x, i) => (
          <Option key={i} value={x}>{x}</Option>
        ))}
      </Select>

      {isValueOutside
        ? (
          <div className="select-ct-outside-res">
            {_.map(value, (x, i) => (
              <Blue1BgRow
                key={i}
                value={x}
                className="mt8"
                onClick={() => props.onChange(x)}
              />
            ))}
          </div>
        ) : null}
    </div>
  );
};
SelectCT.defaultProps = {
  className: '',
  title: '',
  placeholder: 'Select...',
  data: [],
  onChange: () => { },
  onSearch: () => { },
  showSearch: true,
  defaultValue: undefined,
  isValueOutside: false,
  mode: undefined, // 'tags', // or multiple
  value: [],
  suffixIcon: undefined,
  name: '',
};
SelectCT.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  showSearch: PropTypes.bool,
  defaultValue: PropTypes.string,
  isValueOutside: PropTypes.bool,
  mode: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  suffixIcon: PropTypes.node,
  name: PropTypes.string,
};
export default SelectCT;
