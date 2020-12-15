import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import classnames from 'classnames';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Form, Input, Button, Checkbox,
} from 'antd';
import { loginRequest } from '../../Redux/Actions/login';
import { useMergeState } from '../../Helpers/customHooks';
import LoginAuthorization from '../../Components/Form/loginAuthorization';
import InputCT from '../../Components/Input/inputCT';
import LoginHeader from '../../Components/Login/loginHeader';
import LoginFooter from '../../Components/Login/loginFooter';

const SignIn = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    email: '',
    password: '',
    passwordStatus: undefined,
    loading: false,
  });
  const { className } = props;
  const {
    email, password, passwordStatus, loading,
  } = state;
  const onChange = (key, value) => setState({ [key]: value, passwordStatus: undefined });

  const onClickSignIn = async (formData = {}) => {
    const { email, password } = formData;
    setState({ loading: true });
    try {
      await Auth.signIn(email.trim(), password).then(async (success) => {
        console.log('success: ', success);
        const { username, attributes } = success;
        props.loginRequest({ ...attributes, username });
        setState({ loading: false });
      });
    } catch (error) {
      console.log('error: ', error);
      setState({ passwordStatus: 'error', loading: false });
    }
    // console.log('Success:', email, password);
    // props.loginRequest({ email, password });
    // setState({ passwordStatus: 'error' });
  };

  useEffect(() => {
    console.log('login: ', props.login);
    if (!_.isEmpty(props.login)) {
      if (props.login?.isSuccess) {
        console.log('isSuccess');
        history.push('/patients/active');
      } else {
        console.log('erro: ', props.login?.message);
      }
    }
  }, [props.login]);

  const showInputForm = () => (
    <Form
      name="basic"
      className="mt40"
      initialValues={{ remember: true }}
      onFinish={onClickSignIn}
      onFinishFailed={() => console.log('fail')}
    >
      <Form.Item
        className="mb0"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Wrong email format!' }]}
      >
        <InputCT
          title="Email"
          placeholder="johnsmith@example.com"
          value={email}
          onChange={x => onChange('email', x)}
        />
      </Form.Item>

      <Form.Item
        className={classnames('mb0', 'mt16')}
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }, { min: 8, message: 'The password must be at least 8 characters!' }]}
        validateStatus={passwordStatus}
      >
        <InputCT
          title="Password"
          placeholder="Enter your password"
          value={password}
          type="PASSWORD"
          onChange={x => onChange('password', x)}
        />
      </Form.Item>

      <div className={classnames('fr-sb', 'mt24')}>
        <Form.Item className="mb0" name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        {/*  history.push('/forgot-password') */}
        <Button type="link" onClick={() => history.push('/forgot-password')}>
          Forgot password
        </Button>
      </div>

      <Form.Item className={classnames('mb0', 'mt40')}>
        <Button loading={loading} type="primary" block htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <LoginAuthorization>
      <div className={classnames('sign-in-wrapper', className)}>

        <div className="">
          <LoginHeader title="Sign in" content="Please fill out all the fields below to sign in to your account" />

          {showInputForm()}
        </div>

        <LoginFooter buttonTitle="Register now" content="Don't have an account yet?" onClick={() => {}} />

      </div>
    </LoginAuthorization>
  );
};
SignIn.defaultProps = {
  className: '',
  loginRequest: () => {},
};
SignIn.propTypes = {
  className: PropTypes.string,
  loginRequest: PropTypes.func,
  login: PropTypes.shape().isRequired,
};
const mapStateToProps = state => ({
  login: state.login,
});
const mapDispatchToProps = { // to set
  loginRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
// export default SignIn;
