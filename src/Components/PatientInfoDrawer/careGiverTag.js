import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Avatar, Typography } from 'antd';
import AvatarCT from '../Avatar/avatarCT';

const { Title, Text } = Typography;
const CareGiverTag = (props) => {
  const { title, role, avatar } = props;
  const { firstName, lastName } = avatar;
  return (
    <div className="care-giver-tag fr">
      <AvatarCT size={40} firstName={firstName} lastName={lastName} />
      <div className={classnames('f-c-just-center', 'ml16')}>
        <Text className="font-14" strong>{title}</Text>
        <Text className="font-12" type="secondary">{role}</Text>
      </div>
    </div>
  );
};

CareGiverTag.defaultProps = {
  title: '',
  role: '',
  avatar: {},
};
CareGiverTag.propTypes = {
  title: PropTypes.string,
  role: PropTypes.string,
  avatar: PropTypes.shape(),
};

export default CareGiverTag;
