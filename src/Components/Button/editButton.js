import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { EditFilled } from '@ant-design/icons';
import { Button } from 'antd';

const EditButton = (props) => {
  const { className, onClick, id } = props;
  return (
    <Button
      id={id}
      onClick={onClick}
      className={classnames('edit-button-wrapper fcen', className)}
      icon={<EditFilled />}
    >
      Edit
    </Button>
  );
};
EditButton.defaultProps = {
  className: '',
  onClick: () => {},
  id: '',
};
EditButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default EditButton;
