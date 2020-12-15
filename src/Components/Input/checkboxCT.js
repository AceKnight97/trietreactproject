import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DatepickerCT from './datepickerCT';
import InputCT from './inputCT';
import SelectCT from './selectCT';
import InputTitle from './inputTitle';

const CheckboxCT = (props) => {
  const {
    className, data, type, disabled, isCheck,
    placeholder, suffix, title,
    value, selectData, name, mode,
    checkboxClassName,
  } = props;

  const onChange = (e) => {
    props.onChange(e.target.checked, e.target.name);
  };

  function onChangeInput(value) {
    props.onChangeInput(value, type, name);
  }
  return (
    <div className={classnames('checkbox-ct-wrapper', className)}>

      <InputTitle title={title} className="checkbox-ct-title" />

      <div className={classnames('checkbox-ct-main', checkboxClassName)}>
        <Checkbox
          name={name}
          checked={isCheck}
          disabled={disabled}
          onChange={onChange}
        >
          {data}
        </Checkbox>

        {suffix ? (
          <div className="checkbox-suffix">
            <span>{suffix}</span>
          </div>
        ) : null}
      </div>

      {type === 'DATE' && isCheck
        ? (
          <DatepickerCT
            className="date-sub-component"
            placeholder={placeholder}
            onChange={onChangeInput}
          />
        ) : null}

      {type === 'TEXTAREA' && isCheck
        ? (
          <InputCT
            type="TEXTAREA"
            className="date-sub-component"
            placeholder={placeholder}
            onChange={onChangeInput}
          />
        ) : null}

      {type === 'SELECT'
        ? (
          <SelectCT
            mode={mode}
            suffixIcon={<SearchOutlined />}
            className="mt8"
            placeholder={placeholder}
            value={value}
            data={selectData}
            onChange={onChangeInput}
            isValueOutside
            // suffixIcon={() => <SearchOutlined />}
            // menuItemSelectedIcon={() => <SearchOutlined />}
            // title={}
            // isValueOutside
          />
        ) : null}
    </div>
  );
};
CheckboxCT.defaultProps = {
  className: '',
  title: '',
  data: '',
  onChange: () => {},
  onChangeInput: () => {},
  isCheck: false,
  disabled: false,
  type: '',
  placeholder: '',
  suffix: '',
  value: [],
  selectData: [],
  name: '',
  mode: undefined,
  checkboxClassName: '',
};
CheckboxCT.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.string,
  onChange: PropTypes.func,
  onChangeInput: PropTypes.func,
  isCheck: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.arrayOf(PropTypes.string),
  selectData: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  mode: PropTypes.string,
  checkboxClassName: PropTypes.string,
};

export default CheckboxCT;
