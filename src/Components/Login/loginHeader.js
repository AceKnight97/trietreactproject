import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';


const LoginHeader = (props) => {
  const { className, title, content } = props;
  return (
    <div className={classnames('login-header-wrapper', className)}>
      {title ? (
        <div className="size-38-b-g9">
          <span>{title}</span>
        </div>
      ) : null}

      {content ? (
        <div className={classnames('size-16-n-g8', 'mt12')}>
          <span>{content}</span>
        </div>
      ) : null}
    </div>
  );
};
LoginHeader.defaultProps = {
  className: '',
  title: '',
  content: '',
};
LoginHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default LoginHeader;
