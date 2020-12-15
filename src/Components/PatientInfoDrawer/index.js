import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import {
  Drawer, Typography, Button, Space,
} from 'antd';
import { UserAddOutlined, CloseOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import DisplayData3 from '../UI/displayData3';
import DisplayData2 from '../UI/displayData2';
import { AppTableData } from '../../Data';
import { limitedText } from '../../Ultis';
import CareGiverTag from './careGiverTag';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';
import AvatarCT from '../Avatar/avatarCT';
import ModalHeader from '../UI/modalHeader';
import DisplayCaregiver from '../UI/displayCaregiver';

const { Title } = Typography;

const nurseTag = {
  firstName: 'Harry',
  lastName: 'Schzender',
  role: 'Nurse',
};
const mdTage = {
  firstName: 'Emily',
  lastName: 'Cabello',
  role: 'MD',
};


const PatientInfo = (props) => {
  const [state, setState] = useMergeState({
    patientData: {},
  });
  const history = useHistory();
  const {
    className, patientID, type, onClose, onClickButton, name, // ,patientData
  } = props;

  console.log('PatientInfo - name: ', name);
  const tagArrData = name === 'new-registered' ? [] : name === 'new-assigned' || name === 'new-md' ? [nurseTag] : [nurseTag, mdTage];

  const isDetails = type === 'DETAILS';

  useEffect(() => {
    const patientData = _.find(AppTableData, x => x.patientID === patientID);
    if (patientData) setState({ patientData });
    const e = document.getElementsByClassName('ant-drawer-body')[0];
    if (e) e.scrollTo({ top: 0 });
  }, [props.patientID]);

  const { patientData } = state;

  const {
    email, phoneNumber, patientName, lastName, firstName,
    sex, age, dob, bmi, height, weight, insurance, address,
    reasonForCompletion,
  } = patientData;

  const basicInfo = [
    {
      title: 'DOB',
      data: moment(dob)?.format('MM/DD/YYYY'),
    },
    {
      title: 'Height',
      data: `${height} m`,
    },
    {
      title: 'Weight',
      data: `${weight} kg`,
    },
    {
      title: 'BMI',
      data: bmi?.toFixed(1),
    },
    {
      title: 'Insurance',
      data: insurance,
    },
  ];

  const contactInfo = [
    {
      title: 'Email',
      data: email,
    },
    {
      title: 'Phone',
      data: phoneNumber,
    },
    {
      title: 'Address',
      data: address,
    },
  ];

  const onClickBottomButton = () => {
    const tab = name.includes('new') ? 'patients/new' : 'patients';
    const paramData = {
      patientID: props?.patientID,
      name,
    };
    history.push({
      pathname: `/${tab}/${['notification', 'monthly', 'appointment'].includes(name) ? 'active' : name}/details`,
      state: paramData,
    });
  };

  const showInfoTitle = () => {
    const id = `ID ${patientID}`;
    const sexAge = `${sex} - ${age}`;
    return (
      <div className={classnames('patient-info-title')}>
        <Title level={4}>{patientName}</Title>
        <div className="patient-info-subtitle f-row">
          <div className="patient-id">
            <span>{id}</span>
          </div>
          <div className="patient-gender">
            <span>{sexAge}</span>
          </div>
        </div>
      </div>
    );
  };

  const showFooterButon = () => (
    <div className="patient-info-drawer-footer">
      <Button
        ghost
        type="primary"
        className="f1-cen"
        onClick={onClickBottomButton}
      >
        Go to patient details
        <ArrowRightOutlined className="ml4" />
      </Button>
    </div>
  );

  return (
    <div className={classnames('patient-info-drawer', className)}>

      {type === 'DRAWER' ? (
        <ModalHeader
          title={`${firstName} ${lastName}`}
          onClick={onClose}
          className="patient-info-drawer-header"
        />
      ) : null}

      <div className="patient-info-body">
        <div className="">
          <AvatarCT size={80} firstName={firstName} lastName={lastName} />

          {showInfoTitle()}

          {isDetails ? <div className="details-devider" /> : null}

          <DisplayData2
            className={isDetails ? '' : 'mt16'}
            rowClassName={isDetails ? 'padb0' : ''}
            title="Basic information"
            data={basicInfo}
            isStrip={!isDetails}
          />

          {isDetails ? <div className="details-devider" /> : null}

          <DisplayData2
            className={isDetails ? '' : 'mt16'}
            rowClassName={isDetails ? 'padb0' : ''}
            title="Contact"
            data={contactInfo}
            isStrip={!isDetails}
          />

          {isDetails ? <div className="details-devider" /> : null}

          <DisplayCaregiver
            className={isDetails ? '' : 'mt16'}
            isDetails={isDetails}
            onClickButton={onClickButton}
            caregiverInfo={tagArrData}
          />

          {isDetails && name === 'inactive' ? <div className="details-devider" /> : null}

          {name === 'inactive' ? (
            <DisplayData3
              className={isDetails ? '' : 'mt16'}
              title="Reason for completion"
              data={reasonForCompletion}
            />
          ) : null}
        </div>

        {isDetails ? null : showFooterButon()}

      </div>

    </div>
  );
};

PatientInfo.defaultProps = {
  className: '',
  onClose: () => {},
  onClickButton: () => {},
  patientID: '',
  name: '',
  type: '',
};
PatientInfo.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  onClickButton: PropTypes.func,
  patientID: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default PatientInfo;
