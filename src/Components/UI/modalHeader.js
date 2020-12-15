import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';


const ModalHeader = (props) => {
  const {
    className, title, onClick, btnTitle, btnClassName,
  } = props;
  return (
    <div className={classnames('modal-header-wrapper', className)}>
      <div className="modal-header-title">
        <span>{title}</span>
      </div>

      <Button ghost onClick={onClick} className={btnClassName}>
        {btnTitle || <CloseOutlined />}
      </Button>
    </div>
  );
};
ModalHeader.defaultProps = {
  className: '',
  title: '',
  btnTitle: '',
  onClick: () => { },
  btnClassName: '',
};
ModalHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  onClick: PropTypes.func,
  btnClassName: PropTypes.string,
};

export default ModalHeader;
