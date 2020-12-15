import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BellOutlined, CaretDownOutlined, UserOutlined, LogoutOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import {
  Menu, Badge, Dropdown, Typography, Button, Drawer,
} from 'antd';
import AvatarCT from '../Avatar/avatarCT';
import { useMergeState } from '../../Helpers/customHooks';
import { logoutRequest } from '../../Redux/Actions/login';
import UserNotification from './Layout/userNotification';
import Profile from '../Profile/profile';
import auth from '../../Helpers/auth';
import { NotiArrData } from '../../Data';

const { Text } = Typography;
const Header = (props) => {
  const [state, setState] = useMergeState({
    isNotiOpen: false,
    isOpenProfile: false,
  });
  const { isNotiOpen, isOpenProfile } = state;
  const history = useHistory();
  const loginData = auth.getDataLogin();
  console.log('loginData: ', loginData);
  const {
    fullName, firstName, lastName, dob, gender, email,
  } = loginData;

  const onClickSignOut = () => {
    console.log('onClickSignOut: ');
    props.logoutRequest();
    history.push('/sign-in');
  };

  const toggleNotiModal = () => setState({ isNotiOpen: !isNotiOpen });

  const toggleProfileDrawer = () => setState({ isOpenProfile: !isOpenProfile });

  const menu = (
    <Menu>
      <Menu.Item key="1" className="fitems-center" onClick={toggleProfileDrawer}>
        <UserOutlined />
        Your profile
      </Menu.Item>
      <Menu.Item key="2" className="fitems-center" onClick={onClickSignOut}>
        <LogoutOutlined />
        Sign out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-main">

      <div className="header-right flex-row__ic__je">

        <Button type="ghost" ghost className="header-notifi-button" onClick={toggleNotiModal}>
          {/* //offset={[1, 4]} */}
          <Badge count={_.countBy(NotiArrData, x => x.isRead)?.false} overflowCount={100} size="small">
            <BellOutlined className="header-bell-icon" />
          </Badge>
        </Button>

        <AvatarCT className="header-right-16" firstName={firstName} lastName={lastName} size={32} />

        <Dropdown className="header-menu" overlay={menu}>
          <Text strong>
            {fullName}
            <CaretDownOutlined size={8} className="header-arrow-icon ml-1" />
          </Text>
        </Dropdown>

      </div>

      <Drawer
        placement="right"
        width={400}
        onClose={toggleNotiModal}
        visible={isNotiOpen}
        closable={false}
        footer={null}
      >
        <UserNotification data={[]} />
      </Drawer>

      <Drawer
        placement="right"
        width={400}
        onClose={toggleProfileDrawer}
        visible={isOpenProfile}
        closable={false}
        footer={null}
      >
        <Profile onClose={toggleProfileDrawer} />
      </Drawer>

    </div>
  );
};
Header.defaultProps = {

};
Header.propTypes = {
  logoutRequest: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  logoutRequest,
};

export default connect(null, mapDispatchToProps)(Header);
