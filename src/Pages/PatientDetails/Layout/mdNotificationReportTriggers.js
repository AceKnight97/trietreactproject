import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Divider } from 'antd';
import PairInput from '../../../Components/Input/pairInput';
import InputCT from '../../../Components/Input/inputCT';


const MDNotificationReportTriggers = (props) => {
  const { className, data, onChange } = props;
  const {
    heartRateMin, heartRateMax, bloodPressureMin, bloodPressureMax, inrMin, inrMax, ehraScoreMin, ehraScoreMax,
    mediNotiForNurse, mediNotiForMD, bloodPressureMinUnit, bloodPressureMaxUnit,
    increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC,
  } = data;

  const showNormalRange = () => {
    const title = 'Normal range';
    const type = 'NUMBER';
    const NormalRangeDataCT = [
      {
        titleLeft: 'Heart rate min',
        titleRight: 'Heart rate max',
        valueLeft: heartRateMin,
        valueRight: heartRateMax,
        keyLeft: 'heartRateMin',
        keyRight: 'heartRateMax',
      },
      {
        titleLeft: 'Blood pressure min',
        titleRight: 'Blood pressure max',
        valueLeft: bloodPressureMin,
        valueRight: bloodPressureMax,
        placeholderLeft: 'Systolic',
        placeholderRight: 'Systolic',
        keyLeft: 'bloodPressureMin',
        keyRight: 'bloodPressureMax',

        unitValueLeft: bloodPressureMinUnit,
        unitValueRight: bloodPressureMaxUnit,
        unitPlaceholderLeft: 'Diastolic',
        unitPlaceholderRight: 'Diastolic',
        unitKeyLeft: 'bloodPressureMinUnit',
        unitKeyRight: 'bloodPressureMaxUnit',
      },
      {
        titleLeft: 'INR min',
        titleRight: 'INR max',
        valueLeft: inrMin,
        valueRight: inrMax,
        keyLeft: 'inrMin',
        keyRight: 'inrMax',
      },
      {
        titleLeft: 'EHRA score min',
        titleRight: 'EHRA score max',
        valueLeft: ehraScoreMin,
        valueRight: ehraScoreMax,
        keyLeft: 'ehraScoreMin',
        keyRight: 'ehraScoreMax',
      },
    ];

    return (
      <div className="mt24">

        <div className="trigger-title">
          <span>{title}</span>
        </div>

        {_.map(NormalRangeDataCT, (x, i) => (
          <PairInput
            key={i}
            isUnitLeft={i === 1}
            isUnitRight={i === 1}
            unitValueLeft={x.unitValueLeft}
            unitValueRight={x.unitValueRight}
            unitPlaceholderLeft={x.unitPlaceholderLeft}
            unitPlaceholderRight={x.unitPlaceholderRight}
            onChangeUnitLeft={val => onChange(x.unitKeyLeft, val)}
            onChangeUnitRight={val => onChange(x.unitKeyRight, val)}
            className="mt16"
            typeLeft={type}
            typeRight={type}
            valueLeft={x.valueLeft}
            titleLeft={x.titleLeft}
            placeholderLeft={x.placeholderLeft || '--'}
            onChangeLeft={val => onChange(x.keyLeft, val)}
            valueRight={x.valueRight}
            titleRight={x.titleRight}
            placeholderRight={x.placeholderRight || '--'}
            onChangeRight={val => onChange(x.keyRight, val)}
            unitTypeLeft={type}
            unitTypeRight={type}
          />
        ))}
      </div>
    );
  };

  const showMediComplianceNoti = () => {
    const title = 'Medication compliance notifications';
    const titleArr = ['For nurse (hours)', 'For MD (hours)'];
    const data = [mediNotiForNurse, mediNotiForMD];
    const dataKey = ['mediNotiForNurse', 'mediNotiForMD'];
    return (
      <div className="mt24">
        <div className="trigger-title">
          <span>{title}</span>
        </div>

        {_.map(titleArr, (x, i) => (
          <InputCT
            key={i}
            className="mt16"
            title={x}
            value={data[i]}
            placeholder="Enter hour(s)"
            type="NUMBER"
            onChange={x => onChange(dataKey[i], x)}
          />
        ))}
      </div>
    );
  };

  const showSymptoms = () => {
    const title = 'Symptoms';
    const titleArr = [
      'Increasing shortness of breath (days)',
      'Chest pain (days)',
      'Abnormal bleeding (days)',
      'Light headedness (days)',
      'Sleep disturbance changes (days)',
    ];
    const data = [increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC];
    const dataKey = ['increasingSOB', 'chestPain', 'abnormalBleeding', 'lightHeadedness', 'sleepDC'];
    return (
      <div className="mt24">
        <div className="trigger-title">
          <span>{title}</span>
        </div>
        {_.map(titleArr, (x, i) => (
          <InputCT
            key={i}
            className="mt16"
            title={x}
            value={data[i]}
            placeholder="Enter day(s)"
            type="NUMBER"
            onChange={x => onChange(dataKey[i], x)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={classnames('md-notification-report-triggers-wrapper', className)}>
      <div className="size-16-b-g9">
        <span>Notification report triggers</span>
      </div>

      {showNormalRange()}

      {showMediComplianceNoti()}

      {showSymptoms()}

    </div>
  );
};
MDNotificationReportTriggers.defaultProps = {
  className: '',
  data: {},
  onChange: () => {},
};
MDNotificationReportTriggers.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape(),
  onChange: PropTypes.func,
};

export default MDNotificationReportTriggers;
