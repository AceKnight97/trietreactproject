import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';
// import { useMergeState } from '../../Helpers/customHooks';
import CloseButton from '../Button/closeButton';

const CloseBar = (props) => {
  // const [state, setState] = useMergeState({
  //   data: [],
  // });
  const { className, title, onClick } = props;
  return (
    <div className={classnames('close-bar-wrapper', className)}>
      <div className="close-bar-title">
        <span>{title}</span>
      </div>

      <CloseButton className="close-bar-button" onClick={onClick} />
    </div>
  );
};
CloseBar.defaultProps = {
  className: '',
  title: '',
  onClick: () => {},
};
CloseBar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default CloseBar;
