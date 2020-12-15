import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import { Menu, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMergeState } from '../../../../Helpers/customHooks';
import { PNMenu } from '../../../../Constants';

const NewHeader = (props) => {
  const [state, setState] = useMergeState({
    current: PNMenu[0],
  });

  const handleClickMenu = (e) => {
    setState({ current: e.key });
    props.getCurrentTab(e.key);
  };

  const { className, onClickAdd } = props;
  return (
    <div className={classnames('new-header-wrapper', className)}>
      <Menu
        onClick={handleClickMenu}
        selectedKeys={[state.current]}
        mode="horizontal"
      >
        {_.map(PNMenu, x => (
          <Menu.Item key={x}>
            {x}
          </Menu.Item>
        ))}
      </Menu>

      <div className="div-add-new-patient">
        <Button type="primary" icon={<PlusOutlined />} onClick={onClickAdd}>
          Add new patient
        </Button>
      </div>

    </div>
  );
};
NewHeader.defaultProps = {
  className: '',
  getCurrentTab: () => {},
  onClickAdd: () => {},
};
NewHeader.propTypes = {
  className: PropTypes.string,
  getCurrentTab: PropTypes.func,
  onClickAdd: PropTypes.func,
};

export default NewHeader;
