import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import 'antd/dist/antd.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  CalendarOutlined,
  IdcardOutlined,
  SolutionOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';
import biocareLogo from '../../Image/Components/SideMenu/biocare-logo.svg';
import reportsIcon from '../../Image/Components/SideMenu/reportsIcon.svg';
import { useMergeState } from '../../Helpers/customHooks';

const { SubMenu } = Menu;
const SideBar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [state, setState] = useMergeState({
    pathname: '',
  });
  const getIcon = (name) => {
    switch (name) {
      case 'Appointments':
        return <CalendarOutlined className="side-bar-item-icon" />;
      case 'Patients':
        return <IdcardOutlined className="side-bar-item-icon" />;
      case 'Reports':
        return <SolutionOutlined className="side-bar-item-icon" />;
      default:
        break;
    }
  };
  useEffect(() => {
    const pathname = location.pathname.split('/');
    if (pathname.length > 3) {
      pathname.length = 3;
    }
    setState({ pathname: pathname.join('/') });
  }, [location.pathname]);
  const root = `/${location.pathname.split('/')[1]}`;
  const { menu } = props;
  return (
    <div className="side-bar-main">
      <div className="side-bar-logo">
        <img src={biocareLogo} alt="biocare-logo" />
      </div>
      <Menu mode="inline" defaultOpenKeys={[root]} selectedKeys={[state.pathname]}>
        {_.map(menu, item => (item.sub ? (
          <SubMenu
            className="side-bar-submenu"
            key={item.link}
            title={(
              <>
                {getIcon(item.name)}
                <span className="side-bar-item-text">{item.name}</span>
              </>
              )}
          >
            {_.map(item.sub, d => (
              <Menu.Item key={d.link}>
                <NavLink key={d.link} to={d.link}>
                  {d.name}
                </NavLink>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.link} className="side-bar-menu">
            <NavLink key={item.link} to={item.link}>
              {getIcon(item.name)}
              <span className="side-bar-item-text">{item.name}</span>
            </NavLink>
          </Menu.Item>
        )))}
      </Menu>
    </div>
  );
};

SideBar.defaultProps = {
  menu: [],
};
SideBar.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape()),
};

export default SideBar;
