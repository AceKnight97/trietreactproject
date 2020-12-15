import { Row, Col } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import loginbg from '../../Image/Components/Form/loginbg.jpg';
import logo from '../../Image/Pages/Login/appLogo.svg';


const LoginAuthorization = (props) => {
  const { className, children } = props;
  return (
    <div className={classnames('login-authorization-wrapper', className)}>
      <div className="login-authorization-bg-wrapper">
        <div className="login-authorization-bg" style={{ backgroundImage: `url(${loginbg})` }} />
        <div className="bg-cover" />
      </div>


      <Row gutter={24} className="login-authorization-page">
        <Col span={4} />
        <Col span={4} className="login-authorization-left">
          <img src={logo} alt="Project logo" className="min-w-200" />
        </Col>
        <Col span={4} />
        <Col span={8} className={classnames('over-vi', 'fcen')}>
          <div className="login-authorization-main">
            <div className="login-authorization-body">
              {children}
            </div>
          </div>
        </Col>
        <Col span={4} />
      </Row>

    </div>
  );
};
LoginAuthorization.defaultProps = {
  className: '',
  children: {},
};
LoginAuthorization.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default LoginAuthorization;

// <Row gutter={24}>
//         <Col span={12} />
//         <Col span={12}>
//           <div className="login-authorization-main">
//             <div className="login-authorization-body">
//               {children}
//             </div>
//           </div>
//         </Col>
// </Row>
