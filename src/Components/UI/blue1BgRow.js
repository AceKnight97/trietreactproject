import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CloseButton from '../Button/closeButton';

const Blue1BgRow = (props) => {
  const { className, value, onClick } = props;
  return (
    <div className={classnames('blue-1-bg-row-wrapper', className)}>
      <div className="blue-1-bg-row-value">
        <span>{value}</span>
      </div>

      <CloseButton onClick={onClick} className="blue-1-bg-row-button" />
    </div>
  );
};
Blue1BgRow.defaultProps = {
  className: '',
  value: '',
  onClick: () => {},
};
Blue1BgRow.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Blue1BgRow;
