import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker } from 'antd';
import classnames from 'classnames';
import moment from 'moment';
import InputTitle from './inputTitle';


const DatepickerCT = (props) => {
  const {
    className, title, placeholder, format, value, name, suffixIcon, type,
    disabledDate,
  } = props;

  function onChange(date, dateString) {
    props.onChange(date, name);
  }

  let disabledDateCT;
  switch (disabledDate) {
    case 'PAST':
      disabledDateCT = current => current > moment().endOf('day');
      break;
    case 'FUTURE':
      disabledDateCT = current => current <= moment().endOf('day');
      break;
    default:
      break;
  }


  return (
    <div className={classnames('datepicker-ct-wrapper', className)}>
      <InputTitle title={title} />

      {type === 'TIME'
        ? (
          <TimePicker
            suffixIcon={suffixIcon}
            placeholder={placeholder}
            onChange={onChange}
            format={format}
            value={value}
            disabledDate={disabledDateCT}
          />
        ) : (
          <DatePicker
            suffixIcon={suffixIcon}
            placeholder={placeholder}
            onChange={onChange}
            format={format}
            value={value}
            disabledDate={disabledDateCT}
          />
        )}


    </div>
  );
};
DatepickerCT.defaultProps = {
  className: '',
  format: 'YYYY-MM-DD',
  title: '',
  placeholder: 'Select date',
  onChange: () => { },
  value: undefined,
  name: '',
  disabledDate: undefined,
  suffixIcon: undefined,
  type: 'DATE',
};
DatepickerCT.propTypes = {
  className: PropTypes.string,
  format: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  name: PropTypes.string,
  disabledDate: PropTypes.string,
  suffixIcon: PropTypes.shape(),
  type: PropTypes.string,
};

export default DatepickerCT;
