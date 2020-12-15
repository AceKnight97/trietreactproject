
import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import successIcon from '../../../Image/Pages/Login/successIcon.svg';


const SuccessPage = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className, onClick } = props;
  return (
    <div className={classnames('success-page-wrapper', className)}>
      <div className="success-page-main">

        <div className="">
          <img src={successIcon} alt="Success icon" />
        </div>

        <div className={classnames('size-16-n-g9', 'mt16')}>
          <span>Password updated succesfully</span>
        </div>

        <Button type="link" onClick={onClick} className="mt48">
          Back to sign in
        </Button>
      </div>
    </div>
  );
};
SuccessPage.defaultProps = {
  className: '',
  onClick: () => {},
};
SuccessPage.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default SuccessPage;
