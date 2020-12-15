import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { Button } from 'antd';
import { NotificationFilled, DeleteOutlined } from '@ant-design/icons';
import { useMergeState } from '../../../Helpers/customHooks';
import ModalHeader from '../../UI/modalHeader';
import { NotiArrData } from '../../../Data';


const UserNotification = (props) => {
  const [state, setState] = useMergeState({
  });
  const { className, data } = props;

  const notiItem = (x = {}, i = 0) => {
    const formatedTime = moment(x.time).isValid()
      ? moment(x.time).format('HH:mm - MM/DD/YYYY') : '';
    return (
      <div key={i} className={classnames('noti-item-wrapper', i === NotiArrData.length - 1 ? 'border-none' : '')}>
        <NotificationFilled className={classnames('noti-icon', x.isRead ? 'noti-icon-read' : '')} />

        <div className="noti-item-data">
          <div className={classnames('noti-item-title', x.isRead ? 'noti-item-title-read' : '')}>
            <span>{x.title}</span>
          </div>
          <div className={classnames('noti-item-content', x.isRead ? 'noti-item-content-read' : '')}>
            <span>{x.content}</span>
          </div>
          <div className="noti-item-time">
            <span>{formatedTime}</span>
          </div>
        </div>

        <Button className={classnames('noti-item-delete-btn')}>
          <DeleteOutlined />
        </Button>

      </div>
    );
  };

  return (
    <div className={classnames('user-notification-wrapper', className)}>
      <ModalHeader
        title="Notifications"
        btnTitle="Clear all"
        btnClassName="user-notification-clear-all"
        className="clear-all-btn"
      />

      <div className="user-notification-body">
        {_.map(_.sortBy(NotiArrData, y => y.isRead), (x, i) => notiItem(x, i))}
      </div>

    </div>
  );
};
UserNotification.defaultProps = {
  className: '',
  data: [],
};
UserNotification.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
};

export default UserNotification;
