import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CalendarHeaderButton = (props) => {
  const {
    className, icon, title, onClick,
  } = props;
  return (
    <button className={classnames('calendar-header-button-wrapper', className)} onClick={onClick}>
      {icon ? <img src={icon} alt="Calendar icon" /> : null }
      {title ? <span>{title}</span> : null }
    </button>
  );
};
CalendarHeaderButton.defaultProps = {
  className: '',
  icon: '',
  title: '',
  onClick: () => {},
};
CalendarHeaderButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};
export default CalendarHeaderButton;
