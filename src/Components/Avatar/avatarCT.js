import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Avatar } from 'antd';

const arr1 = 'abc';
const arr2 = 'de';
const arr3 = 'fgh';
const arr4 = 'ij';
const arr5 = 'klm';
const arr6 = 'no';
const arr7 = 'pqr';
const arr8 = 'stu';
const arr9 = 'vw';
const arr10 = 'xyz';

const AvatarCT = (props) => {
  const {
    className, firstName, lastName, size,
  } = props;

  // size = 32, 40, 80,
  const getBgCT = () => {
    const myChar = firstName[0].toLowerCase();
    const arr = [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10];
    let res = 'bg-avatar-1';
    _.forEach(arr, (x, i) => {
      if (x.includes(myChar)) res = `bg-avatar-${i + 1}`;
    });
    return res;
  };

  const getSizeText = () => {
    switch (size) {
      case 40:
        return 'size-40';
      case 80:
        return 'size-80';
      default:
        return 'size-32';
    }
  };

  const getName = () => `${firstName ? firstName[0].toUpperCase() : ''}${lastName ? lastName[0].toUpperCase() : ''}`;

  return (
    <div className="avatar-ct-wrapper">
      <Avatar size={size} className={classnames('avatar-ct', getBgCT(), getSizeText(), className)}>
        {getName()}
      </Avatar>
    </div>
  );
};
AvatarCT.defaultProps = {
  className: '',
  firstName: 'A',
  lastName: 'B',
  size: 32,
};
AvatarCT.propTypes = {
  className: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  size: PropTypes.number,
};

export default AvatarCT;
