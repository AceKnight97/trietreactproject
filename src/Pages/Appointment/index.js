import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import AppointmentCalendar from './Layout/appointmentCalendar';
import AppointmentTableView from './Layout/appointmentTableView';
import { useMergeState } from '../../Helpers/customHooks';

// const Today = moment().toISOString();

const Appointment = (props) => {
  const [state, setState] = useMergeState({
    calendarDate: '',
  });
  const { calendarDate } = state;
  const { className } = props;
  return (
    <div className={classnames('appointment-wrapper', className)}>
      <Row gutter={24}>
        <Col span={6}>
          <AppointmentCalendar getAppointmentDate={x => setState({ calendarDate: x })} />
        </Col>
        <Col span={18}>
          <AppointmentTableView calendarDate={calendarDate} />
        </Col>
      </Row>
    </div>
  );
};
Appointment.defaultProps = {
  className: '',
};
Appointment.propTypes = {
  className: PropTypes.string,
};
export default Appointment;
