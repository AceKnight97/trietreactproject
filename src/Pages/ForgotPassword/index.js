import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useHistory } from 'react-router';
import _ from 'lodash';
import ReactCodeInput from 'react-verification-code-input';
import {
  Form, Input, Button, Checkbox,
} from 'antd';
import { useMergeState } from '../../Helpers/customHooks';
import LoginAuthorization from '../../Components/Form/loginAuthorization';
import InputCT from '../../Components/Input/inputCT';
import LoginHeader from '../../Components/Login/loginHeader';
import LoginFooter from '../../Components/Login/loginFooter';
import SuccessPage from './Layout/successPage';

const ForgotPassword = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    step: '1',
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: '',

  });
  const { className } = props;
  const {
    email, step, newPassword, confirmPassword,
  } = state;

  const onClickSend = () => {
    setState({ step: '2' });
  };

  const onClickResend = () => {
    console.log('onClickResend: ');
  };

  const onClickUpdate = () => {
    setState({ step: '3' });
  };

  const onChangeCode = x => setState({ code: x });

  const onChange = (key, value) => setState({ [key]: value });

  const showForgotForm = () => (
    <Form
      // name="basic"
      className="mt40"
      // onFinish={onClickSend}
      // onFinishFailed={() => console.log('fail')}
    >
      <Form.Item
        className="mb0"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Please input your Username!' }]}
      >
        <InputCT
          title="Email"
          placeholder="johnsmith@example.com"
          value={email}
          onChange={x => setState({ email: x })}
        />
      </Form.Item>

      <Form.Item className={classnames('mb0', 'mt40')}>
        {/*  // htmlType="submit"> */}
        <Button type="primary" block onClick={onClickSend}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );

  const showUpdateForm = () => (
    <div className="mt40">
      <div className={classnames('size-14-n-g9')}>
        <span>Verification code</span>
      </div>

      <ReactCodeInput
        type="text"
        className="mt8"
        fieldWidth={32}
        fieldHeight={40}
        autoFocus
          // loading={isLoading}
        fields={6}
        placeholder={['-', '-', '-', '-', '-', '-']}
        onChange={onChangeCode}
      />

      <LoginFooter className="mt8" buttonTitle="Resend" content="Did not get the code?" onClick={onClickResend} />

      <Form>

        <Form.Item
          className={classnames('mb0', 'mt16')}
          name="newPassword"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <InputCT
            title="New password"
            placeholder="Enter new password"
            value={newPassword}
            type="PASSWORD"
            onChange={x => onChange('newPassword', x)}
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          className={classnames('mb0', 'mt16')}
          name="confirmPassword"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <InputCT
            title="Confirm new password"
            placeholder="Enter new password again"
            value={confirmPassword}
            type="PASSWORD"
            onChange={x => onChange('confirmPassword', x)}
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item className={classnames('mb0', 'mt32')}>
          <Button type="primary" block onClick={onClickUpdate}>
            Update
          </Button>
        </Form.Item>

      </Form>
    </div>
  );

  const showMainView = () => {
    let title = 'Forgot password';
    let content = 'Please enter your email to send the verification code';
    let compo = showForgotForm();
    switch (step) {
      case '2':
        title = 'Update password';
        content = 'We’ve sent a verification code to your email address. Please check your inbox and enter this code here.';
        compo = showUpdateForm();
        break;
      default:
        break;
    }
    return (
      <div className={classnames('forgot-password-wrapper', className)}>

        <div className="">
          <LoginHeader title={title} content={content} />

          {compo}
        </div>

        <LoginFooter buttonTitle="Back to sign in" content="Just a mistake?" onClick={history.goBack} />

      </div>
    );
  };

  return (
    <LoginAuthorization>
      {step === '3' ? <SuccessPage onClick={history.goBack} /> : showMainView()}
    </LoginAuthorization>
  );
};
ForgotPassword.defaultProps = {
  className: '',
};
ForgotPassword.propTypes = {
  className: PropTypes.string,
};

export default ForgotPassword;
