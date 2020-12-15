import React, {
  useState, useContext, useEffect, useCallback, useMemo, useRef,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button, Divider } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import { removeitemFromArr, checkNoData, getStateData } from '../../../../Ultis';
import {
  patientEducationData, RequiedEPData, TestTypeData, ScheduleData, FrequencyUnitsData,
} from '../../../../Data/carePlanData';
import InputCT from '../../../../Components/Input/inputCT';
import RadioCT from '../../../../Components/Input/radioCT';
import RowSelection from '../../../../Components/Input/rowSelection';
import MultipleCheckbox from '../../../../Components/Input/multipleCheckbox';


const CarePlanOverviewInput = (props) => {
  const [state, setState] = useMergeState({
    patientEducation: '',
    requiredEP: [],
    // BLOODWORK
    bloodFrequency: '',
    bloodFrequencyUnit: FrequencyUnitsData[0],
    bloodTheNextDate: '',
    testType: [],
    // STRESS TEST
    stressFrequency: '',
    stressFrequencyUnit: FrequencyUnitsData[0],
    stressTheNextDate: '',
    // Follow up schedule
    schedule: ScheduleData[0].title,
    // Notes
    notes: '',
  });
  const {
    className, onClickCancel, overview, onClickSaveAdd,
  } = props;
  const initBtnTitle = useRef('Add');
  const initOverview = useRef(JSON.stringify(overview));

  const initRequiredEP = () => {
    const { requiredEP } = state;
    _.forEach(RequiedEPData, (x) => {
      requiredEP.push({ value: x.value, isCheck: x.isCheck });
    });
    setState({ requiredEP });
  };

  useEffect(() => {
    const {
      patientEducation, requiredEP,
      bloodFrequency, bloodTheNextDate, testType, bloodFrequencyUnit,
      stressFrequency, stressTheNextDate, stressFrequencyUnit,
      schedule, notes,
    } = overview;
    const conditionArr = [
      patientEducation, requiredEP,
      bloodFrequency, bloodTheNextDate, testType, bloodFrequencyUnit,
      stressFrequency, stressTheNextDate, stressFrequencyUnit,
      schedule,
    ];
    // console.log('conditionArr: ', conditionArr);
    if (checkNoData(conditionArr)) {
      initRequiredEP();
      return;
    }
    initBtnTitle.current = 'Save';
    setState(getStateData(overview));
  }, []);

  const {
    patientEducation, requiredEP,
    bloodFrequency, bloodTheNextDate, testType, bloodFrequencyUnit,
    stressFrequency, stressTheNextDate, stressFrequencyUnit,
    schedule,
    notes,
  } = state;

  const onChange = (key, value) => setState({ [key]: value });

  const onChangeMultiCheckbox = (keyValue, obj, x) => {
    const data = state[keyValue];
    const item = _.find(data, x => x.value === obj.value);
    _.assign(item, { isCheck: x });
    setState({ [keyValue]: data });
  };

  const onChangeArr = (keyValue, x) => {
    const data = state[keyValue];
    if (data.includes(x)) {
      const array = removeitemFromArr(x, data);
      setState({ [keyValue]: array });
    } else {
      data.push(x);
      setState({ [keyValue]: data });
    }
  };

  const isDisabled = () => {
    const conditionArr = [
      patientEducation, requiredEP,
      bloodFrequency, bloodTheNextDate, testType, bloodFrequencyUnit,
      stressFrequency, stressTheNextDate, stressFrequencyUnit,
      schedule,
    ];
    if (checkNoData(conditionArr)) return true;
    if (initOverview.current === JSON.stringify(state) && initBtnTitle.current === 'Save') return true;
    return false;
  };

  const showTitle = () => {
    const title = 'Add care plan overview';
    return (
      <div className="size-20-b-g9">
        <span>{title}</span>
      </div>
    );
  };

  const sessionTitle = x => (
    <div className="size-16-b-g9">
      <span>{x}</span>
    </div>
  );

  const showRequiredEP = () => {
    const title = 'Required equipment provided';
    return (
      <div className="">
        {sessionTitle(title)}
        <MultipleCheckbox
          rowClassName="mt16"
          onChange={(obj, x) => onChangeMultiCheckbox('requiredEP', obj, x)}
          data={requiredEP}
        />
      </div>
    );
  };

  const showBloodwork = () => {
    const title = 'Bloodwork';
    const bloodworkArr = [
      {
        title: 'Frequency',
        placeholder: 'Enter frequency',
        value: bloodFrequency,
        type: 'FREQUENCY',
        keyValue: 'bloodFrequency',
        data: FrequencyUnitsData,
        unitValue: bloodFrequencyUnit,
      },
      {
        title: 'The next date',
        placeholder: 'Select date',
        value: bloodTheNextDate,
        type: 'DATE',
        keyValue: 'bloodTheNextDate',
        disabledDate: 'FUTURE',
      },
      {
        title: 'Test type',
        placeholder: 'Select all items that apply',
        value: testType,
        type: 'SELECT',
        data: TestTypeData,
        keyValue: 'testType',
        mode: 'multiple',
      },
    ];

    return (
      <div className="">
        {sessionTitle(title)}

        {_.map(bloodworkArr, (x, i) => (
          <InputCT
            key={i}
            mode={x.mode}
            className="mt16"
            title={x.title}
            placeholder={x.placeholder}
            value={x.value}
            type={x.type}
            data={x.data}
            unitValue={x.unitValue}
            onChange={(y) => {
              const val = x.keyValue;
              if (x.type === 'SELECT') {
                onChangeArr(val, y);
                return;
              }
              onChange(val, y);
            }}
            onChangeUnit={u => setState({ bloodFrequencyUnit: u })}
            disabledDate={x.disabledDate}
          />
        ))}

      </div>
    );
  };

  const showStressTest = () => {
    const title = 'Stress test';
    const stressTestkArr = [
      {
        title: 'Frequency',
        placeholder: 'Enter frequency',
        value: stressFrequency,
        type: 'FREQUENCY',
        keyValue: 'stressFrequency',
        data: FrequencyUnitsData,
        unitValue: stressFrequencyUnit,
      },
      {
        title: 'The next date',
        placeholder: 'Select date',
        value: stressTheNextDate,
        type: 'DATE',
        keyValue: 'stressTheNextDate',
        disabledDate: 'FUTURE',
      },
    ];

    return (
      <div className="">
        {sessionTitle(title)}

        {_.map(stressTestkArr, (x, i) => (
          <InputCT
            key={i}
            className="mt16"
            title={x.title}
            placeholder={x.placeholder}
            value={x.value}
            unitValue={x.unitValue}
            type={x.type}
            data={x.data}
            onChange={y => onChange(x.keyValue, y)}
            onChangeUnit={u => setState({ stressFrequencyUnit: u })}
            disabledDate={x.disabledDate}
          />
        ))}

      </div>
    );
  };

  const showFollowUpSchedule = () => {
    const title = 'Follow up schedule';
    let scheduleDisplayed = ScheduleData[0];
    _.forEach(ScheduleData, (x) => {
      if (x.title === schedule) scheduleDisplayed = x;
    });
    return (
      <div className="">
        {sessionTitle(title)}

        <RadioCT
          textClass="mt16"
          data={ScheduleData}
          value={scheduleDisplayed}
          onChange={x => setState({ schedule: x.title })}
          type="BIG"
        />

      </div>
    );
  };

  const showNotes = () => {
    const title = 'Notes';
    const content = 'Used to indicate to the MD that these items are outstanding so that corrective action can be taken';
    return (
      <div>
        {sessionTitle(title)}

        <div className={classnames('size-14-n-g8', 'mt4')}>
          <span>{content}</span>
        </div>

        <InputCT
          className="mt16"
          value={notes}
          placeholder="Notes..."
          type="TEXTAREA"
          onChange={x => setState({ notes: x })}
        />
      </div>
    );
  };

  return (
    <div className={classnames('care-plan-overview-input-wrapper', className)}>
      <div className="care-plan-overview-input-main">

        {showTitle()}

        <Divider />

        <RowSelection
          onClick={x => setState({ patientEducation: x })}
          title="Patient education"
          data={patientEducationData}
          value={patientEducation}
        />

        <Divider />

        {showRequiredEP()}

        <Divider />

        {showBloodwork()}

        <Divider />

        {showStressTest()}

        <Divider />

        {showFollowUpSchedule()}

        <Divider />

        {showNotes()}

        <div className="footer-buttton-div">
          <Button onClick={onClickCancel} className="buttton-with">
            Cancel
          </Button>
          <Button
            type="primary"
            className="buttton-with"
            disabled={isDisabled()}
            onClick={() => onClickSaveAdd('cpOverview', state)}
          >
            {initBtnTitle.current}
          </Button>
        </div>

      </div>
    </div>
  );
};
CarePlanOverviewInput.defaultProps = {
  className: '',
  onClickCancel: () => { },
  overview: {},
  onClickSaveAdd: () => {},
};
CarePlanOverviewInput.propTypes = {
  className: PropTypes.string,
  onClickCancel: PropTypes.func,
  overview: PropTypes.shape(),
  onClickSaveAdd: PropTypes.func,
};

export default CarePlanOverviewInput;
