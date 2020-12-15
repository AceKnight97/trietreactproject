import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Menu } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';


const TabMenu = (props) => {
  const {
    className, data, activeTab, navigateTab,
  } = props;
  return (
    <div className={classnames('tab-menu-wrapper', className)}>
      <Menu mode="inline" selectedKeys={activeTab} onClick={navigateTab}>
        {_.map(data, (x, i) => (
          <Menu.Item key={`${i + 1}`}>
            {x}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};
TabMenu.defaultProps = {
  className: '',
  data: [],
  activeTab: '',
  navigateTab: () => {},
};
TabMenu.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  activeTab: PropTypes.string,
  navigateTab: PropTypes.func,
};

export default TabMenu;
