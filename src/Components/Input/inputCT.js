import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import classnames from 'classnames';
import { EyeOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
// import { useMergeState } from '../../Helpers/customHooks';
import InputTitle from './inputTitle';
import SelectCT from './selectCT';
import DatepickerCT from './datepickerCT';

const { TextArea } = Input;


const InputCT = (props) => {
  const {
    className, type, rows, placeholder, title, disabled, value,
    inputClassName,
    maxLength, prefix, mask, format,
    allowedDecimalSeparators, decimalScale, allowLeadingZeros, thousandSeparator, name,
    data, mode, unitValue, onChangeUnit, disabledDate,
    suffix, autoComplete,
  } = props;

  function onChange(e) {
    if (type === 'SELECT' || type === 'DATE') {
      props.onChange(e, name);
      return;
    }
    props.onChange(e.target.value, name);
  }

  return (
    <div className={classnames('input-ct-wrapper', className)}>

      <InputTitle title={title} />

      {type === 'TEXTAREA'
        ? (
          <TextArea
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            rows={rows}
            onChange={onChange}
          />
        ) : null}
      {type === 'NUMBER'
        ? (
          <NumberFormat
            mask={mask}
            format={format}
            value={value}
            className={classnames('basic-number-format', inputClassName)}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            decimalScale={decimalScale}
          // allowedDecimalSeparators={allowedDecimalSeparators}
          // allowNegative={false}
          // allowLeadingZeros={allowLeadingZeros}
          // thousandSeparator={thousandSeparator}
          // inputMode="numeric"
          // prefix={prefix}
          />
        ) : null}
      {type === 'SELECT'
        ? (
          <SelectCT
            mode={mode}
            placeholder={placeholder}
            data={data}
            value={value}
            onChange={onChange}
          />
        ) : null}
      {type === 'DATE'
        ? (
          <DatepickerCT
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabledDate={disabledDate}
          />
        ) : null}
      {type === 'FREQUENCY' ? (
        <div className="frequency-input">
          <div className={classnames('input-left')}>
            <NumberFormat
              mask={mask}
              format={format}
              value={value}
              className={classnames('basic-number-format', inputClassName)}
              disabled={disabled}
              onChange={onChange}
              placeholder={placeholder}
              maxLength={maxLength}
              decimalScale={decimalScale}
            />
          </div>
          <div className={classnames('input-right')}>
            <SelectCT
              mode={mode}
            // placeholder={placeholder}
              data={data}
              value={unitValue}
              onChange={onChangeUnit}
            />
          </div>
        </div>
      ) : null}
      {type === 'text' ? (
        <Input
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          prefix={prefix}
          suffix={suffix}
        />
      ) : null}

      {type === 'PASSWORD' ? (
        <Input.Password
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          autoComplete={autoComplete}
        />
      ) : null}
    </div>
  );
};
InputCT.defaultProps = {
  className: '',
  rows: 4,
  type: 'text',
  title: '',
  placeholder: 'Enter...',
  onChange: () => {},
  onChangeUnit: () => {},
  disabled: false,
  value: '',

  inputClassName: '',
  maxLength: undefined,
  allowedDecimalSeparators: undefined,
  decimalScale: undefined,
  allowLeadingZeros: false,
  thousandSeparator: false,
  prefix: undefined,
  suffix: undefined,
  mask: undefined,
  format: undefined,
  name: '',
  data: [],
  mode: undefined, // 'tags', // or multiple
  unitValue: '',
  disabledDate: undefined,
  autoComplete: '',
};
InputCT.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.number,
  type: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onChangeUnit: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,

  inputClassName: PropTypes.string,
  maxLength: PropTypes.number,
  allowedDecimalSeparators: PropTypes.bool,
  decimalScale: PropTypes.number,
  allowLeadingZeros: PropTypes.bool,
  thousandSeparator: PropTypes.bool,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  mask: PropTypes.string,
  format: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  mode: PropTypes.string,
  unitValue: PropTypes.string,
  disabledDate: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default InputCT;
