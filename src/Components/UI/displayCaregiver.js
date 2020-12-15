import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { Typography, Button, Space } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import auth from '../../Helpers/auth';
import CareGiverTag from '../PatientInfoDrawer/careGiverTag';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';

const { Title } = Typography;

const DisplayCaregiver = (props) => {
  const [state, setState] = useMergeState({
    mdTag: {},
    nurseTag: {},
  });
  const {
    className, isDetails, onClickButton, caregiverInfo,
  } = props;

  useEffect(() => {
    const isMD = _.find(caregiverInfo, x => x.role === 'MD');
    const isNurse = _.find(caregiverInfo, x => x.role === 'Nurse');
    const mdTag = {};
    const nurseTag = {};
    if (isMD && !_.isEmpty(isMD)) {
      const { firstName, lastName, role } = isMD;
      _.assign(mdTag, {
        title: `${firstName} ${lastName}${auth.role() === role ? ' (You)' : ''}`,
        avatar: { firstName, lastName },
        role,
      });
    }
    if (isNurse && !_.isEmpty(isNurse)) {
      const { firstName, lastName, role } = isNurse;
      _.assign(nurseTag, {
        title: `${firstName} ${lastName}${auth.role() === role ? ' (You)' : ''}`,
        avatar: { firstName, lastName },
        role,
      });
    }
    setState({ mdTag, nurseTag });
  }, [props.caregiverInfo]);

  const { mdTag, nurseTag } = state;
  const tagArrData = [];
  if (!_.isEmpty(nurseTag)) tagArrData.push(nurseTag);
  if (!_.isEmpty(mdTag)) tagArrData.push(mdTag);

  return (
    <div className={classnames('display-caregiver-wrapper', className)}>

      <Title level={5} className="mb12">Caregiver</Title>

      <Space size={12} direction="vertical">
        {isDetails ? (
          _.map([nurseTag, mdTag], (x, i) => (_.isEmpty(x) ? (
            auth.isNurse() ? (
              <Button
                key={i}
                onClick={() => onClickButton(i === 0 ? 'Nurse' : 'MD')}
                type="primary"
                icon={<UserAddOutlined />}
                className="f1-r"
              >
                {`Assign a ${i === 0 ? 'Nurse' : 'MD'}`}
              </Button>
            ) : null
          ) : <CareGiverTag key={i} title={x.title} avatar={x.avatar} role={x.role} />))
        ) : _.map(tagArrData, (x, i) => <CareGiverTag key={i} title={x.title} avatar={x.avatar} role={x.role} />)}
      </Space>

    </div>
  );
};
DisplayCaregiver.defaultProps = {
  className: '',
  isDetails: false,
  onClickButton: () => {},
  caregiverInfo: [],
};
DisplayCaregiver.propTypes = {
  className: PropTypes.string,
  isDetails: PropTypes.bool,
  onClickButton: PropTypes.func,
  caregiverInfo: PropTypes.arrayOf(PropTypes.shape()),
};

export default DisplayCaregiver;
