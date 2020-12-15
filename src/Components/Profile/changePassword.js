import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';
import InputCT from '../Input/inputCT';

const ChangePassword = (props) => {
  const [state, setState] = useMergeState({
    currPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const {
    currPassword,
    newPassword,
    confirmPassword,
  } = state;
  const { handleChangePassword } = props;
  const onChangePassword = (key, value) => {
    setState({ [key]: value });
  };
  return (
    <>
      <InputCT
        className="mt8"
        title="Current password"
        placeholder="Enter current password"
        value={currPassword}
        type="PASSWORD"
        onChange={x => onChangePassword('currPassword', x)}
        autoComplete="new-password"
      />
      <InputCT
        className="mt16"
        title="New password"
        placeholder="Enter new password"
        value={newPassword}
        type="PASSWORD"
        onChange={x => onChangePassword('newPassword', x)}
        autoComplete="new-password"
      />
      <InputCT
        className="mt16"
        title="Confirm new password"
        placeholder="Enter new password again"
        value={confirmPassword}
        type="PASSWORD"
        onChange={x => onChangePassword('confirmPassword', x)}
        autoComplete="new-password"
      />
      <Button
        className="mt56"
        type="primary"
        block
        onClick={() => handleChangePassword(state)}
      >
        Change
      </Button>
    </>
  );
};

ChangePassword.defaultProps = {
  handleChangePassword: () => {},
};
ChangePassword.propTypes = {
  handleChangePassword: PropTypes.func,
};

export default ChangePassword;
