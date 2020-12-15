import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import InputCT from './inputCT';
import SelectCT from './selectCT';


const UnitInput = (props) => {
  const {
    className, title, placeholder, disabled, data,
    onChangeUnit, unitValue, value,
  } = props;

  const onChange = (value) => {
    props.onChange(value);
  };

  return (
    <div className={classnames('unit-input-wrapper', className)}>

      <div className={classnames('unit-input-left')}>
        <InputCT
          title={title}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          type="NUMBER"
        />
      </div>

      <div className={classnames('unit-input-right')}>
        <SelectCT
          data={data}
          value={unitValue}
          // defaultValue={data[0]}
          onChange={onChangeUnit}
          showSearch={false}
        />
      </div>

    </div>
  );
};
UnitInput.defaultProps = {
  className: '',
  title: '',
  onChange: () => {},
  onChangeUnit: () => {},
  placeholder: '',
  disabled: false,
  data: ['inch', 'ft'],
  unitValue: undefined,
  value: undefined,
};
UnitInput.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  onChangeUnit: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.string),
  unitValue: PropTypes.string,
  value: PropTypes.string,
};

export default UnitInput;
