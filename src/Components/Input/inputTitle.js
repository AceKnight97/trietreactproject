import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const InputTitle = (props) => {
  const { className, title } = props;
  if (title) {
    return (
      <div className={classnames('input-title-wrapper', className)}>
        <span>{title}</span>
      </div>
    );
  }
  return null;
};
InputTitle.defaultProps = {
  className: '',
  title: '',
};
InputTitle.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

export default InputTitle;
