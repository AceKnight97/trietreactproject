import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';


const FullWidthButtons = (props) => {
  const {
    className, leftTitle, rightTitle, onClickLeft, onClickRight, disabled,
  } = props;
  return (
    <div className={classnames('full-width-buttons-wrapper', className)}>
      {leftTitle ? (
        <Button
          onClick={onClickLeft}
          className="buttton-with"
        >
          {leftTitle}
        </Button>
      ) : <div />}

      <Button
        type="primary"
        disabled={disabled}
        className="buttton-with"
        onClick={onClickRight}
      >
        {rightTitle}
      </Button>
    </div>
  );
};
FullWidthButtons.defaultProps = {
  className: '',
  leftTitle: '',
  rightTitle: '',
  onClickLeft: () => {},
  onClickRight: () => {},
  disabled: false,
};
FullWidthButtons.propTypes = {
  className: PropTypes.string,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FullWidthButtons;
