import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';


const ModalFooter = (props) => {
  const {
    className, leftTitle, rightTitle, onClickRightBtn, onClickLeftBtn, disabled,
  } = props;
  return (
    <div className={classnames('modal-footer-wrapper', className)}>
      <div />

      <div className={classnames('modal-footer-buttons')}>
        <Button className="mr8" onClick={onClickLeftBtn}>
          {leftTitle}
        </Button>

        <Button type="primary" onClick={onClickRightBtn} disabled={disabled}>
          {rightTitle}
        </Button>
      </div>

    </div>
  );
};
ModalFooter.defaultProps = {
  className: '',
  leftTitle: 'Cancel',
  rightTitle: 'Add',
  onClickRightBtn: () => {},
  onClickLeftBtn: () => { },
  disabled: false,
};
ModalFooter.propTypes = {
  className: PropTypes.string,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  onClickRightBtn: PropTypes.func,
  onClickLeftBtn: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ModalFooter;
