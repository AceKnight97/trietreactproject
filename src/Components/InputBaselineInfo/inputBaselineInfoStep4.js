import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from 'antd';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';

import BiofluxDiagnosis from '../Form/biofluxDiagnosis';

const { Title, Text } = Typography;
const InputBaselineInfoStep4 = (props) => {
  const initialStep4Data = useRef({
    diagnosisInfo: '',
    technicianComment: '',
    attachments: '',
  });
  const [state, setState] = useMergeState({
    step4Data: initialStep4Data.current,
    isUsingBiofluxDiagnosisInfo: false,
    isDisableNextButton: false,
  });
  const onClickBottomButton = (isNextClicked) => {
    props.handleClick(isNextClicked);
  };
  const onClickCheckbox = (checked) => {
    setState({ isUsingBiofluxDiagnosisInfo: checked });
  };
  const onChangeInput = (value, name) => {
    const newStep4Data = { ...state.step4Data };
    newStep4Data[name] = value;
    setState({ step4Data: newStep4Data });
  };
  const onChangeUpload = (fileList, name) => {
    const newStep4Data = { ...state.step4Data };
    newStep4Data.attachments = fileList;
    setState({ step4Data: newStep4Data });
  };
  // useEffect(() => {
  //   if (state.isUsingBiofluxDiagnosisInfo) {
  //     if (JSON.stringify(initialStep4Data.current) === JSON.stringify(state.step4Data)) {
  //       setState({ isDisableNextButton: true });
  //     } else {
  //       setState({ isDisableNextButton: false });
  //     }
  //   } else {
  //     setState({ isDisableNextButton: false });
  //   }
  // }, [state.step4Data, state.isUsingBiofluxDiagnosisInfo]);
  return (
    <>
      <BiofluxDiagnosis
        isUsingBiofluxDiagnosisInfo={state.isUsingBiofluxDiagnosisInfo}
        onClickCheckbox={onClickCheckbox}
        onChangeInput={onChangeInput}
        onChangeUpload={onChangeUpload}
        data={state.step4Data}
      />
      <div className="mt48 fr-sb">
        <Button
          style={{ width: '177px', color: '#595959' }}
          onClick={() => onClickBottomButton(false)}
        >
          Previous step
        </Button>
        <Button
          type="primary"
          style={{ width: '177px' }}
          onClick={() => onClickBottomButton(true)}
          disabled={state.isDisableNextButton}
        >
          Next step
        </Button>
      </div>
    </>
  );
};

InputBaselineInfoStep4.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default InputBaselineInfoStep4;
