import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import classnames from 'classnames';
import { QuestionCircleOutlined } from '@ant-design/icons';
// import { useMergeState } from '../../../../Helpers/customHooks';

const ConfirmationLayoutType = {
  SEND: 'SEND_REPORT',
  SAVE: 'SAVE_CHANGES',
};

const { SEND, SAVE } = ConfirmationLayoutType;

const ConfirmationLayout = (props) => {
  const {
    className, toggleClick, type, onClick,
  } = props;

  let title;
  let content;
  let leftBtnTitle;
  let rightBtnTitle;

  switch (type) {
    case SEND:
      title = 'Send report';
      content = 'Send this notification report to MD?';
      leftBtnTitle = 'Cancel';
      rightBtnTitle = 'Send';
      break;
    case SAVE:
      title = 'Save changes';
      content = 'Do you want to save the changes?';
      leftBtnTitle = 'Discard';
      rightBtnTitle = 'Save';
      break;
    default:
      break;
  }

  return (
    <div className={classnames('confirmation-layout-wrapper', className)}>

      <div className="confirmation-layout-body">

        <div className="cl-body-row">
          <QuestionCircleOutlined className="row-icon" />
          <div className="row-title">
            <span>{title}</span>
          </div>
        </div>

        <div className="cl-body-content">
          <span>{content}</span>
        </div>

      </div>

      {/* FOOTER */}
      <div className="confirmation-layout-footer">
        <div />

        <div className={classnames('cl-footer-buttons')}>
          <Button className="mr8" onClick={toggleClick}>
            {leftBtnTitle}
          </Button>

          <Button type="primary" onClick={onClick}>
            {rightBtnTitle}
          </Button>
        </div>

      </div>

    </div>
  );
};
ConfirmationLayout.defaultProps = {
  className: '',
  toggleClick: () => { },
  type: SEND,
  onClick: () => { },
};
ConfirmationLayout.propTypes = {
  className: PropTypes.string,
  toggleClick: () => { },
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default ConfirmationLayout;
