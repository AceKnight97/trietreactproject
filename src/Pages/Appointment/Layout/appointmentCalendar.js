import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { Calendar } from 'antd';
// import locale from 'antd/lib/locale-provider/en_GB';

import CalendarHeaderButton from './calendarHeaderButton';

import nextIc from '../../../Image/Pages/Appointment/nextIcon.svg';
import previousIc from '../../../Image/Pages/Appointment/previousIcon.svg';

moment.updateLocale('en', {
  weekdaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  week: { dow: 1 },
});

const Today = moment();

const AppointmentCalendar = (props) => {
  const { className, getAppointmentDate } = props;
  const headerRender = ({
    value, type, onChange, onTypeChange,
  }) => {
    const month = value.format('MMMM');
    const year = value.format('YYYY');
    const btnArr = [
      {
        icon: previousIc,
        className: classnames('pad3', 'mr8'),
        value: moment(value).subtract(1, 'M'),
      },
      {
        className: classnames('padh8', 'mr8'),
        value: Today,
        title: 'Today',
      },
      {
        icon: nextIc,
        className: classnames('pad3'),
        value: moment(value).add(1, 'M'),
      },
    ];
    return (
      <div className="calendar-header">
        <div className="month-year-text">
          <div className="size-16-b-g9 ">
            <span>{month}</span>
          </div>
          <div className="size-12-n-g8">
            <span>{year}</span>
          </div>
        </div>

        <div className="calendar-header-buttons">
          {_.map(btnArr, (x, i) => (
            <CalendarHeaderButton
              key={i}
              onClick={() => {
                onChange(x.value);
                getAppointmentDate(x.value);
              }}
              icon={x.icon}
              className={x.className}
              title={x.title}
            />
          ))}
        </div>

      </div>
    );
  };
  return (
    <div className={classnames('appointment-calendar', className)}>
      <Calendar
        fullscreen={false}
        headerRender={headerRender}
        onPanelChange={(value, mode) => {
          console.log(value, mode);
        }}
        onSelect={getAppointmentDate}
        locale={{ weekFormat: 'YYYY-MM-DD' }}
      />
    </div>
  );
};
AppointmentCalendar.defaultProps = {
  className: '',
  getAppointmentDate: () => {},
};
AppointmentCalendar.propTypes = {
  className: PropTypes.string,
  getAppointmentDate: PropTypes.func,
};
export default AppointmentCalendar;
