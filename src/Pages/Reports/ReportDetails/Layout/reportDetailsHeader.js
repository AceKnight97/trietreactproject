import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { useHistory } from 'react-router';
import { Button, Checkbox, Drawer } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMergeState } from '../../../../Helpers/customHooks';
import VerticalText from '../../../../Components/UI/verticalText';
import { timeFormated } from '../../../../Ultis';
import PatientInfo from '../../../../Components/PatientInfoDrawer';

import auth from '../../../../Helpers/auth';


const ReportDetailsHeader = (props) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    isReviewedChecked: false,
    patientID: '',
  });
  const role = auth.role();
  const {
    className, data, onClickCheck, onClickBack, toggleSRModal,
  } = props;
  console.log('data: ', data);
  useEffect(() => {
    console.log('data?.status: ', data?.status);
    setState({ isReviewedChecked: data?.status === 'Reviewed' });
  }, [props.data]);

  const goToDetails = () => {
    const paramData = {
      patientID: data?.patientID,
      name: props.name,
    };
    const tab = 'patients';
    const name = 'active';
    history.push({
      pathname: `/${tab}/${name}/details`,
      state: paramData,
    });
  };

  const getPatientID = () => setState({ patientID: data?.patientID });

  const { isReviewedChecked, patientID } = state;

  const leftHeaderArr = [
    {
      title: 'Patient',
      content: data?.patientName,
      className: 'text-color-blue-7',
      onClick: getPatientID, // goToDetails,
    },
    {
      title: 'MD',
      content: `${data?.md}${role === 'MD' ? ' (You)' : ''}`,
    },
    {
      title: 'Nurse',
      content: `${data?.nurse}${role === 'MD' ? '' : ' (You)'}`,
    },
    {
      title: props.name === 'notification' ? 'Notification time' : 'Date of service',
      content: timeFormated(props.name === 'notification' ? data?.notificationTime : data?.dateOfService),
    },
  ];
  const isLast = leftHeaderArr.length - 1;

  const handleOnReviewedCheck = (e) => {
    const val = e?.target?.checked;
    onClickCheck(val);
    setState({ isReviewedChecked: val });
  };

  return (
    <div className={classnames('report-details-header-wrapper', className)}>

      <div className={classnames('report-details-header-left-view')}>
        <ArrowLeftOutlined className="back-icon-btn" onClick={onClickBack} />

        {_.map(leftHeaderArr, (x, i) => (
          <VerticalText
            className={i !== 0 ? 'ml16' : ''}
            key={i}
            title={x.title}
            content={x.content}
            contentClass={x.className || ''}
            isNoSeparator={i === isLast}
            onClick={x?.onClick}
          />
        ))}
      </div>

      <div className={classnames('report-details-header-right-view')}>
        {role === 'MD' || data?.status === 'Sent' ? null : (
          <Button className="mr24" type="primary" icon={null} onClick={toggleSRModal}>
            Send report
          </Button>
        )}

        <div className={classnames('report-details-header-reviewed-btn', isReviewedChecked ? 'reviewed-check' : '')}>
          <Checkbox checked={isReviewedChecked} onChange={handleOnReviewedCheck}>Reviewed</Checkbox>
        </div>

      </div>


      <Drawer
        className=""
        placement="right"
        onClose={() => setState({ patientID: '' })}
        visible={!!patientID}
        width={400}
        closable={false}
      >
        <PatientInfo
          name={props.name}
          patientID={patientID}
          type="DRAWER"
          onClose={() => setState({ patientID: '' })}
        />
      </Drawer>
    </div>
  );
};
ReportDetailsHeader.defaultProps = {
  className: '',
  data: {},
  onClickCheck: () => {},
  onClickBack: () => {},
  toggleSRModal: () => { },
  name: '',
};
ReportDetailsHeader.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape(),
  onClickCheck: PropTypes.func,
  onClickBack: PropTypes.func,
  toggleSRModal: PropTypes.func,
  name: PropTypes.string,
};

export default ReportDetailsHeader;
