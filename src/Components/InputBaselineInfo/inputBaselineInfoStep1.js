import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Divider } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';
import FullWidthButtons from '../Button/fullWidthButtons';
import AFIBInformation from '../Form/afibInformation';

const InputBaselineInfoStep1 = (props) => {
  const [state, setState] = useMergeState({
    step1Data: {
      afibConfirm: undefined,
      afibPattern: undefined,
      heartValveIssue: 'No issue',
      whichValve: [
        {
          label: 'Left',
          isChecked: false,
          name: 'left',
        },
        {
          label: 'Right',
          isChecked: false,
          name: 'right',
        },
      ],
      valveStatus: 'Normal',
    },
    isDisableNextButton: false, // true
  });

  const onClickBottomButton = (isNextClicked) => {
    props.handleClick(isNextClicked);
  };
  const onChangeSelect = (value, name) => {
    const newStep1Data = { ...state.step1Data };
    newStep1Data[name] = value;
    setState({ step1Data: newStep1Data });
  };
  const onClickCheckBox = (checked, name) => {
    const newStep1Data = { ...state.step1Data };
    _.forEach(newStep1Data.whichValve, (item) => {
      if (item.name === name) {
        item.isChecked = checked;
      }
    });
    setState({ step1Data: newStep1Data });
  };

  const isDisabled = () => true;

  console.log(state);
  return (
    <>
      <AFIBInformation data={state.step1Data} onClickCheckBox={onClickCheckBox} onChangeSelect={onChangeSelect} />

      <Divider />

      <FullWidthButtons
        rightTitle="Next step"
        disabled={isDisabled()}
        onClickRight={() => onClickBottomButton(true)}
      />
    </>
  );
};

InputBaselineInfoStep1.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default InputBaselineInfoStep1;
