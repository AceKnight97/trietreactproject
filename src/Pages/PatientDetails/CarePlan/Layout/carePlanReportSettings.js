import React, {
  useState, useContext, useEffect, useCallback, useMemo, Children,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button, Empty, Divider } from 'antd';
import { EditFilled, SettingFilled } from '@ant-design/icons';
import { useMergeState } from '../../../../Helpers/customHooks';
import {
  handleNormalRangeData, handleMediComplianceNotiData, handleSymptomsData, checkNoData,
} from '../../../../Ultis';
import Blue1BgButton from '../../../../Components/Button/blue1BgButton';
import MDReportSettings from '../../Layout/mdReportSettings';
import DisplayData1 from '../../../../Components/UI/displayData1';
import DisplayData2 from '../../../../Components/UI/displayData2';
import DisplayData3 from '../../../../Components/UI/displayData3';
import noSettingIc from '../../../../Image/Pages/PatientDetails/no-setting-ic.svg';
import auth from '../../../../Helpers/auth';


const description = 'There are no report settings yet';

const CarePlanReportSettings = (props) => {
  const [state, setState] = useMergeState({
    current: 'EMPTY', // DISPLAY or INPUT or EMPTY
    initCurrent: 'EMPTY',
  });
  const role = auth.role();
  const {
    className, reportSettings, fetchData,
  } = props;

  const {
    isMonthlyRA,
    heartRateMin, heartRateMax, bloodPressureMin, bloodPressureMax, inrMin, inrMax, ehraScoreMin, ehraScoreMax,
    mediNotiForNurse, mediNotiForMD, bloodPressureMinUnit, bloodPressureMaxUnit,
    increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC,
    notes,
  } = reportSettings;

  useEffect(() => {
    const {
      heartRateMin, heartRateMax, bloodPressureMin, bloodPressureMax, inrMin, inrMax, ehraScoreMin, ehraScoreMax,
      mediNotiForNurse, mediNotiForMD, bloodPressureMinUnit, bloodPressureMaxUnit,
      increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC,
    } = reportSettings;
    const conditionsArr = [
      heartRateMin, heartRateMax, bloodPressureMin, bloodPressureMax, inrMin, inrMax, ehraScoreMin, ehraScoreMax,
      mediNotiForNurse, mediNotiForMD, bloodPressureMinUnit, bloodPressureMaxUnit,
      increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC,
    ];

    if (checkNoData(conditionsArr)) return;
    setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
  }, []);

  const { current, initCurrent } = state;

  const showEmpty = () => (
    <Empty
      className="mt80"
      image={<img src={noSettingIc} alt="No data icon" />}
      description={<span>{description}</span>}
    >
      {role === 'MD' ? (
        <Button
          onClick={() => setState({ current: 'INPUT' })}
          className="f1-cen"
          type="primary"
          icon={<SettingFilled />}
        >
          Config report settings
        </Button>
      ) : null}
    </Empty>
  );

  const showDisplay = () => {
    const NormalRangeData = handleNormalRangeData({
      heartRateMin,
      heartRateMax,
      bloodPressureMin,
      bloodPressureMax,
      inrMin,
      inrMax,
      ehraScoreMin,
      ehraScoreMax,
      bloodPressureMinUnit,
      bloodPressureMaxUnit,
    });
    const MediComplianceNotiData = handleMediComplianceNotiData({
      mediNotiForNurse, mediNotiForMD,
    });
    const SymptomsData = handleSymptomsData({
      increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC,
    });

    return (
      <div className="f-c-wh100">
        <DisplayData1
          icon="CHECK"
          title="MONTHLY REPORT ACCESS"
          data={[
            {
              value: 'Monthly report access for nurse',
              isCheck: isMonthlyRA,
            },
          ]}
        />

        <div className={classnames('size-16-b-g9', 'mt24')}>
          <span>NOTIFICATION REPORT TRIGGERS</span>
        </div>

        <DisplayData2
          className="mt24"
          title="Normal range"
          data={NormalRangeData}
          isStrip
          type="RANGE"
        />

        <DisplayData2
          className="mt24"
          title="Medication compliance notifications"
          data={MediComplianceNotiData}
          isStrip
        />

        <DisplayData2
          className="mt24"
          title="Symptoms"
          data={SymptomsData}
          isStrip
        />

        <DisplayData3
          className="mt24"
          title="Notes"
          data={notes}
        />


        {role === 'MD' ? (
          <Button
            ghost
            type="primary"
            icon={<EditFilled />}
            onClick={() => setState({ current: 'INPUT' })}
            className={classnames('edit-care-plan-button', 'f1-cen')}
          >
            Edit report settings
          </Button>
        ) : null}
      </div>
    );
  };

  return (
    <div className={classnames('care-plan-report-settings-wrapper', className)}>

      {current === 'EMPTY' ? showEmpty() : null}

      {current === 'DISPLAY' ? showDisplay() : null}

      {current === 'INPUT'
        ? (
          <MDReportSettings
            reportSettings={reportSettings}
            onClickCancel={() => setState({ current: initCurrent })}
            onClickSaveAdd={(key, value) => {
              fetchData(key, value);
              setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
            }}
          />
        ) : null}

    </div>
  );
};
CarePlanReportSettings.defaultProps = {
  className: '',
  reportSettings: {},
  fetchData: () => { },
};
CarePlanReportSettings.propTypes = {
  className: PropTypes.string,
  reportSettings: PropTypes.shape(),
  fetchData: PropTypes.func,
};

export default CarePlanReportSettings;
