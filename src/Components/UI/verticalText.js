import React, {
  // useState, useContext, useEffect, useCallback, useMemo,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { useMergeState } from '../../Helpers/customHooks';

const VerticalText = (props) => {
  // const [state, setState] = useMergeState({
  //   data: [],
  // });
  const {
    className, title, content, contentClass, isNoSeparator, onClick,
  } = props;
  return (
    <Fragment>
      <div className={classnames('vertical-text-wrapper', className)}>
        <div className="vertical-text-title">
          <span>{title}</span>
        </div>

        {title === 'Patient' ? (
          <button className={classnames('vertical-text-content', 'bas-0-btn', contentClass)} onClick={onClick}>
            <span>{content}</span>
          </button>
        )
          : (
            <div className={classnames('vertical-text-content', contentClass)}>
              <span>{content}</span>
            </div>
          )}
      </div>

      {isNoSeparator ? null : <div className="vertical-text-separator" /> }
    </Fragment>
  );
};
VerticalText.defaultProps = {
  className: '',
  title: '',
  content: '',
  contentClass: '',
  isNoSeparator: false,
  onClick: () => {},
};
VerticalText.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  contentClass: PropTypes.string,
  isNoSeparator: PropTypes.bool,
  onClick: PropTypes.func,
};

export default VerticalText;
