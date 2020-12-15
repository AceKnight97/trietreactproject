import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Typography, Button, Divider } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';
import CheckboxCT from '../Input/checkboxCT';
import InputCT from '../Input/inputCT';
import YesNoRadio from '../Input/yesNoRadio';
import PairInput from '../Input/pairInput';
import FullWidthButtons from '../Button/fullWidthButtons';
import FooterScore from '../UI/footerScore';
import { AppTableData } from '../../Data';
import {
  getStep9TotalScore, getCVGRisk, getStep9HeartRate, getStep9Risk, getStateData,
} from '../../Ultis';

const InputBaselineInfoStep9 = (props) => {
  const [state, setState] = useMergeState({
    isEnsurePatientAge: true,
    gender: AppTableData[0].sex,
    age: AppTableData[0].age,
    smoker: 'No',
    totalCholesterol: '',
    HDLCholesterol: '',
    systolicBP: '',
    bloodPressure: 'No',
    step9TotalScore: 0,
    cvgRisk: undefined,
    heartRate: undefined,
    risk: undefined,
  });

  const {
    className, onClickLeft, onClickRight, type, data,
  } = props;

  useEffect(() => {
    const {
      isEnsurePatientAge, gender, age, smoker,
      totalCholesterol, HDLCholesterol, systolicBP, bloodPressure,
      step9TotalScore, cvgRisk, heartRate, risk,
    } = data;
    const tempArr = {
      isEnsurePatientAge,
      gender,
      age,
      smoker,
      totalCholesterol,
      HDLCholesterol,
      systolicBP,
      bloodPressure,
      step9TotalScore,
      cvgRisk,
      heartRate,
      risk,
    };
    setState(getStateData(tempArr));
  }, []);

  const {
    isEnsurePatientAge, gender, age, smoker,
    totalCholesterol, HDLCholesterol, systolicBP, bloodPressure,
    step9TotalScore, cvgRisk, heartRate, risk,
  } = state;

  useEffect(() => {
    const tempTotalScore = getStep9TotalScore(age, gender, smoker === 'Yes',
      totalCholesterol, HDLCholesterol, systolicBP, bloodPressure === 'Yes');
    const tempcvgRisk = getCVGRisk(tempTotalScore, gender);
    const tempheartRate = getStep9HeartRate(tempTotalScore, gender);
    const temprisk = getStep9Risk(tempcvgRisk);
    setState({
      step9TotalScore: tempTotalScore, cvgRisk: tempcvgRisk, heartRate: tempheartRate, risk: temprisk,
    });
  }, [state.totalCholesterol, state.HDLCholesterol, state.systolicBP, state.bloodPressure, state.smoker]);

  const isDisabled = () => {
    if (!totalCholesterol || !HDLCholesterol || !systolicBP) return true;
    return false;
  };

  const showInputNumbers = () => {
    const inputArr = [
      {
        title: 'Total cholesterol (mmol/L)',
        value: totalCholesterol,
        key: 'totalCholesterol',
      },
      {
        title: 'HDL cholesterol (mmol/L)',
        value: HDLCholesterol,
        key: 'HDLCholesterol',
      },
      {
        title: 'Systolic BP (mmHg)',
        value: systolicBP,
        key: 'systolicBP',
      },
    ];
    return (
      _.map(inputArr, (x, i) => (
        <InputCT
          key={i}
          className="mt16"
          title={x.title}
          placeholder="--"
          value={x.value}
          onChange={y => setState({ [x.key]: y })}
          type="NUMBER"
        />
      ))
    );
  };


  const showFooterButtons = () => {
    const rightTitle = type === 'INPUT' ? 'Finish' : 'Save';
    const leftTitle = type === 'INPUT' ? 'Previous step' : 'Cancel';
    return (
      <FullWidthButtons
        rightTitle={rightTitle}
        leftTitle={leftTitle}
        // disabled={isDisabled()}
        onClickLeft={() => onClickLeft(state)}
        onClickRight={() => onClickRight(state)}
      />
    );
  };

  return (
    <div className={classnames('input-baseline-info-step7-wrapper', className)}>
      <div>
        <div className={classnames('size-16-b-g9')}>
          <span>Framingham risk score (FRS)</span>
        </div>
        <CheckboxCT
          className="mt24"
          data="Ensure the patient aged 30-79 years with no prior history of coronary heart
            disease, no intermittent claudication or diabetes"
          isCheck={isEnsurePatientAge}
          onChange={x => setState({ isEnsurePatientAge: x })}
        />

        {isEnsurePatientAge ? (
          <div>
            <PairInput
              className="mt24"
              valueLeft={gender}
              valueRight={age}
              titleLeft="Gender"
              titleRight="Age"
              typeRight="NUMBER"
              typeLeft="text"
              disabledLeft
              disabledRight
            />
            <YesNoRadio
              className="mt16"
              value={smoker}
              title="Smoker"
              onChange={x => setState({ smoker: x })}
            />

            {showInputNumbers()}

            <YesNoRadio
              className="mt16"
              value={bloodPressure}
              title="Blood pressure being treated with medicines"
              onChange={x => setState({ bloodPressure: x })}
            />

            <Divider />

            <FooterScore
              totalScore={step9TotalScore}
              arrayData={[
                {
                  title: '10 year CVD risk (%)',
                  value: cvgRisk,
                },
                {
                  title: 'Heart age (years)',
                  value: heartRate,
                },
                {
                  title: 'Risk',
                  value: risk,
                },
              ]}
            />
          </div>
        ) : null}

      </div>

      {showFooterButtons()}

    </div>
  );
};

InputBaselineInfoStep9.defaultProps = {
  className: '',
  type: '',
  onClickLeft: () => {},
  onClickRight: () => { },
  data: {},
};

InputBaselineInfoStep9.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  data: PropTypes.shape(),
};
export default InputBaselineInfoStep9;
