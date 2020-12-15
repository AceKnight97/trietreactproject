import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer, Button, // Space,Tag, Typography, Avatar,Input,
} from 'antd';
import classnames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import AssignSelect from '../Input/assignSelect';
import { useMergeState } from '../../Helpers/customHooks';

const PreparedData = [
  {
    firstName: 'Marielle',
    lastName: 'Wigington',
  },
  {
    firstName: 'Daryl',
    lastName: 'Nehls',
  },
];

const AssignDrawer = (props) => {
  const [state, setState] = useMergeState({
    // searchText: '',
    tagValue: '',
  });
  const {
    type, title, onClose, visible,
  } = props;
  const { tagValue } = state; // searchText,

  const isNurse = type === 'nurse';
  return (
    <Drawer
      title={title}
      placement="right"
      width={400}
      closeIcon={<CloseOutlined style={{ color: '#262626' }} />}
      headerStyle={{ padding: 20 }}
      onClose={onClose}
      visible={visible}
      destroyOnClose
    >
      <div className="assign-drawer-wrapper">
        <span className="search-title">
          {`Search ${isNurse ? 'a nurse' : 'a MD'} to assign`}
        </span>

        <AssignSelect
          className="mt16"
          data={PreparedData}
          value={tagValue}
          onChange={x => setState({ tagValue: x })}
          // onSearch={x => setState({ searchText: x })}
          onDeleteTag={() => setState({ tagValue: '' })}
        />

        <div className={classnames('assign-button-group f1-r', 'mt40')}>
          {isNurse ? <Button onClick={onClose} className="btn-assign-to-me">Assign to me</Button> : null}
          <Button type="primary" className="btn-assign">Assign</Button>
        </div>
      </div>
    </Drawer>
  );
};


AssignDrawer.defaultProps = {
  type: '',
  onClose: () => {},
  visible: false,
  title: '',
};
AssignDrawer.propTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  title: PropTypes.string,
};

export default AssignDrawer;
