import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider } from 'antd';
import classnames from 'classnames';
import { useMergeState } from '../../Helpers/customHooks';

import DateSummaryAttachment from '../Form/dateSummaryAttachment';
import InputCT from '../Input/inputCT';
import DatePickerCT from '../Input/datepickerCT';
import FullWidthButtons from '../Button/fullWidthButtons';
import { checkNoData, getStateData } from '../../Ultis';

const { Text } = Typography;

const InputBaselineInfoStep3 = (props) => {
  const [state, setState] = useMergeState({
    exerciseStressTestingDate: undefined,
    exerciseStressTestingSummary: undefined,
    exerciseStressTestingAttachment: [],
    echocardiogramDate: undefined,
    echocardiogramLVEF: undefined,
  });

  const {
    className, onClickLeft, onClickRight, type, data, Step3Titles,
  } = props;
  console.log('Step3Titles: ', Step3Titles);
  const {
    exerciseStressTestingDate, exerciseStressTestingSummary, exerciseStressTestingAttachment,
    echocardiogramDate, echocardiogramLVEF,
  } = state;

  useEffect(() => {
    const {
      exerciseStressTestingDate, exerciseStressTestingSummary, exerciseStressTestingAttachment,
      echocardiogramDate, echocardiogramLVEF,
    } = data;
    const tempArr = {
      exerciseStressTestingDate,
      exerciseStressTestingSummary,
      exerciseStressTestingAttachment,
      echocardiogramDate,
      echocardiogramLVEF,
    };
    setState(getStateData(tempArr));
  }, []);

  const onChange = (key = '', value = '', head = '') => {
    const keyCT = `${head}${key}`;
    setState({ [keyCT]: value });
  };

  const isDisabled = () => {
    const condition = [
      exerciseStressTestingDate, exerciseStressTestingSummary, // exerciseStressTestingAttachment,
      echocardiogramDate, echocardiogramLVEF,
    ];
    return checkNoData(condition);
  };

  const showEchocardiogram = () => {
    const title = 'Echocardiogram';
    return (
      <div className="">
        <Text strong>{title}</Text>

        <DatePickerCT
          className="mt16"
          title="Date"
          value={echocardiogramDate}
          onChange={x => setState({ echocardiogramDate: x })}
          disabledDate="PAST"
        />

        <InputCT
          className="mt16"
          title="LVEF (%)"
          type="NUMBER"
          placeholder="Enter a number"
          value={echocardiogramLVEF}
          // onChange={x => setState({ echocardiogramLVEF: x })}
          onChange={(value) => {
            let tempVal = value;
            if (parseInt(value, 10) > 100) tempVal = '100';
            setState({ echocardiogramLVEF: tempVal });
          }}
        />
      </div>
    );
  };


  const showFooterButtons = () => {
    const rightTitle = type === 'INPUT' ? 'Next step' : 'Save';
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
    <div className={classnames('input-baseline-info-step3-wrapper', className)}>

      <div className="">
        {Step3Titles.includes('Exercise stress testing') ? (
          <DateSummaryAttachment
            onChange={(key, value) => onChange(key, value, 'exerciseStressTesting')}
            className=""
            title="Previous cardiac monitor results"
            subTitle="Exercise stress testing"
            date={exerciseStressTestingDate}
            summary={exerciseStressTestingSummary}
            attachment={exerciseStressTestingAttachment}
          />
        ) : null}

        {Step3Titles.includes('') ? null : <Divider />}

        {Step3Titles.includes('Echocardiogram') ? showEchocardiogram() : null}
      </div>

      {showFooterButtons()}

    </div>
  );
};
InputBaselineInfoStep3.defaultProps = {
  className: '',
  type: '',
  onClickLeft: () => {},
  onClickRight: () => { },
  data: {},
  Step3Titles: ['Exercise stress testing', 'Echocardiogram'],
};

InputBaselineInfoStep3.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  data: PropTypes.shape(),
  Step3Titles: PropTypes.arrayOf(PropTypes.string),
};

export default InputBaselineInfoStep3;
