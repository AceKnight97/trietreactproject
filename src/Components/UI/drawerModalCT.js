import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Modal, Drawer } from 'antd';
import _ from 'lodash';

const DrawerModalCT = (props) => {
  const {
    className, children, visible, onClose, width, onCancel,
    type,
  } = props;

  const propsCT = {
    destroyOnClose: true,
    visible,
    closable: false,
  };

  return (
    <div className="drawer-modal-ct-wrapper">
      {type === 'MODAL' ? (
        <Modal
          {...propsCT}
          onCancel={onClose}
          footer={null}
          className={classnames(className)}
        >
          {children}
        </Modal>
      ) : (
        <Drawer
          {...propsCT}
          onClose={onClose}
          placement="right"
          width={width}
          className={classnames(className)}
        >
          {children}
        </Drawer>
      )}
    </div>
  );
};
DrawerModalCT.defaultProps = {
  className: '',
  visible: false,
  onClose: () => { },
  onCancel: () => { },
  width: '518px',
  type: 'DRAWER',
};

DrawerModalCT.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  width: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};
export default DrawerModalCT;
