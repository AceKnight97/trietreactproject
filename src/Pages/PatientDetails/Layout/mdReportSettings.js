import React, {
  useState, useContext, useEffect, useCallback, useMemo, useRef,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Divider, Button } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import CheckboxCT from '../../../Components/Input/checkboxCT';
import MDNotificationReportTriggers from './mdNotificationReportTriggers';
import InputCT from '../../../Components/Input/inputCT';
import FullWidthButtons from '../../../Components/Button/fullWidthButtons';
import { checkNoData, getStateData } from '../../../Ultis';

const MDReportSettings = (props) => {
  const [state, setState] = useMergeState({
    // Monthly report access
    isMonthlyRA: false,
    // NORMAL RANGE
    heartRateMin: '',
    heartRateMax: '',
    bloodPressureMin: '',
    bloodPressureMax: '',
    inrMin: '',
    inrMax: '',
    ehraScoreMin: '',
    ehraScoreMax: '',
    // MEDICATION COMPLIANCE NOTIFICATIONS
    mediNotiForNurse: '',
    mediNotiForMD: '',

    bloodPressureMinUnit: '',
    bloodPressureMaxUnit: '',
    // SYMPTOMS
    increasingSOB: '',
    chestPain: '',
    abnormalBleeding: '',
    lightHeadedness: '',
    sleepDC: '',
    // NOTOES
    notes: '',
  });
  const {
    className, reportSettings, onClickCancel, onClickSaveAdd,
  } = props;
  const initBtnTitle = useRef('Add');
  const initReportSettings = useRef(JSON.stringify(reportSettings));

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
    setState(getStateData(reportSettings));
    initBtnTitle.current = 'Save';
  }, []);

  const {
    isMonthlyRA,
    heartRateMin, heartRateMax, bloodPressureMin, bloodPressureMax, inrMin, inrMax, ehraScoreMin, ehraScoreMax,
    mediNotiForNurse, mediNotiForMD, bloodPressureMinUnit, bloodPressureMaxUnit,
    increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC,
    notes,
  } = state;

  const onChange = (key, value) => setState({ [key]: value });

  const isDisabled = () => {
    const conditionsArr = [
      heartRateMin, heartRateMax, bloodPressureMin, bloodPressureMax, inrMin, inrMax, ehraScoreMin, ehraScoreMax,
      mediNotiForNurse, mediNotiForMD, bloodPressureMinUnit, bloodPressureMaxUnit,
      increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC,
    ];
    if (checkNoData(conditionsArr)) return true;
    if (initReportSettings.current === JSON.stringify(state) && initBtnTitle.current === 'Save') return true;
    return false;
  };

  const showTitle = () => {
    const title = 'Add new prescription';
    const content = 'Report settings are used to trigger notification reports';
    return (
      <>
        <div className="size-20-b-g9">
          <span>{title}</span>
        </div>

        <div className={classnames('size-14-n-g8', 'mt4')}>
          <span>{content}</span>
        </div>
      </>
    );
  };

  const showMonthlyRA = () => {
    const title = 'Monthly report access';
    const data = 'Monthly report access for nurse';
    return (
      <>
        <div className="size-16-b-g9">
          <span>{title}</span>
        </div>

        <CheckboxCT
          className="mt16"
          checkboxClassName="height-auto"
          data={data}
          isCheck={isMonthlyRA}
          onChange={x => setState({ isMonthlyRA: x })}
        />
      </>
    );
  };

  const showNotes = () => (
    <>
      <div className="size-16-b-g9">
        <span>Notes</span>
      </div>

      <InputCT
        className="mt16"
        value={notes}
        placeholder="Notes..."
        type="TEXTAREA"
        onChange={x => setState({ notes: x })}
      />
    </>
  );

  return (
    <div className={classnames('md-report-settings-wrapper', className)}>
      <div className="md-report-settings-main">

        {showTitle()}

        <Divider />

        {showMonthlyRA()}

        <Divider />

        <MDNotificationReportTriggers
          data={state}
          onChange={onChange}
        />

        <Divider />

        {showNotes()}

        <FullWidthButtons
          rightTitle={initBtnTitle.current}
          leftTitle="Cancel"
          disabled={isDisabled()}
          onClickLeft={onClickCancel}
          onClickRight={() => onClickSaveAdd('cpReportSettings', state)}
        />

      </div>
    </div>
  );
};
MDReportSettings.defaultProps = {
  className: '',
  reportSettings: {},
  onClickCancel: () => { },
  onClickSaveAdd: () => { },
};
MDReportSettings.propTypes = {
  className: PropTypes.string,
  reportSettings: PropTypes.shape(),
  onClickCancel: PropTypes.func,
  onClickSaveAdd: PropTypes.func,
};

export default MDReportSettings;
