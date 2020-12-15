import React from 'react';
import { Tag, Typography } from 'antd';
import classnames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AvatarCT from '../Avatar/avatarCT';
import { useMergeState } from '../../Helpers/customHooks';

const { Title } = Typography;

const AssignTag = (props) => {
  const {
    className, firstName, lastName, onDeleteTag,
  } = props;
  return (
    <Tag
      onClose={onDeleteTag}
      closable
      closeIcon={<CloseOutlined className="color-gray-10" />}
      className={classnames('result-tag', ' f1-r fr-sb', className)}
    >
      <div className="fr fitems-center">
        <AvatarCT size={32} firstName={firstName} lastName={lastName} />
        <Title level={5} className={classnames('ml16', 'mb0')}>{`${firstName} ${lastName}`}</Title>
      </div>
    </Tag>
  );
};
AssignTag.defaultProps = {
  className: '',
  firstName: '',
  lastName: '',
  onDeleteTag: () => {},
};
AssignTag.propTypes = {
  className: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onDeleteTag: PropTypes.func,
};

export default AssignTag;
