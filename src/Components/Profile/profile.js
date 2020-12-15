import React from 'react';
import PropTypes from 'prop-types';
import Title from 'antd/lib/typography/Title';
import { Button, Divider } from 'antd';
import { CloseOutlined, KeyOutlined } from '@ant-design/icons';
import { useMergeState } from '../../Helpers/customHooks';
import AvatarCT from '../Avatar/avatarCT';
import DisplayData2 from '../UI/displayData2';
import ChangePassword from './changePassword';
import auth from '../../Helpers/auth';

const Profile = (props) => {
  const [state, setState] = useMergeState({
    isChangePassword: false,
  });
  const { onClose } = props;

  const { isChangePassword } = state;
  const loginData = auth.getDataLogin();
  const {
    fullName, firstName, lastName, dob, gender, email, role,
  } = loginData;

  const handleChangePassword = (password) => {
    console.log('password', password);
    setState({ isChangePassword: false });
  };

  const userData = [
    {
      title: 'Role',
      data: role,
    },
    {
      title: 'Email',
      data: email,
    },
    {
      title: 'Phone',
      data: '(603) 732-9383',
    },
    {
      title: 'Address',
      data: '232 Lake Forest Ave., Ambler, PA 19002',
    },
  ];

  const showProfile = () => (
    <>
      <div className="profile-avatar">
        <AvatarCT size={80} firstName={firstName} lastName={lastName} />
        <Button className="ml24 blue-btn" onClick={() => {}}>
          Change image
        </Button>
      </div>
      <DisplayData2
        className="mt16"
        titleClassName="font-20"
        title={fullName}
        data={userData}
        isStrip
        leftWidth={1}
      />
      <Button
        className="mt56 blue-btn fcen"
        block
        onClick={() => setState({ isChangePassword: true })}
      >
        <KeyOutlined />
        Change your password
      </Button>
    </>
  );

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <Title className="m-0" level={4}>
          {isChangePassword ? 'Change password' : 'Your Profile'}
        </Title>
        <Button size="small" className="profile-close-btn p-0" onClick={onClose}>
          <CloseOutlined />
        </Button>
      </div>
      <div className="profile-content">
        {isChangePassword ? <ChangePassword handleChangePassword={handleChangePassword} /> : showProfile()}
      </div>
    </div>
  );
};

Profile.defaultProps = {
  onClose: () => {},
};
Profile.propTypes = {
  onClose: PropTypes.func,
};

export default Profile;
