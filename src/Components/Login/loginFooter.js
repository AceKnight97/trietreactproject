import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';

const LoginFooter = (props) => {
  const {
    className, buttonTitle, content, onClick,
  } = props;
  return (
    <div className={classnames('login-footer-wrapper', className)}>
      <span>{content}</span>
      <Button type="link" onClick={onClick}>
        {buttonTitle}
      </Button>
    </div>
  );
};
LoginFooter.defaultProps = {
  className: '',
  content: '',
  buttonTitle: '',
  onClick: () => {},
};
LoginFooter.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  buttonTitle: PropTypes.string,
  onClick: PropTypes.func,
};

export default LoginFooter;
