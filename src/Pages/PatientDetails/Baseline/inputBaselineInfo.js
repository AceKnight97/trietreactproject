import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Button, Typography, Progress, Divider,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useMergeState, useUpdateEffect } from '../../../Helpers/customHooks';
// import InputBaselineInfoStep1 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep1';
import InputBaselineInfoStep2 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep2';
import InputBaselineInfoStep3 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep3';
// import InputBaselineInfoStep4 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep4';
// import InputBaselineInfoStep5 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep5';
import InputBaselineInfoStep6 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep6';
import InputBaselineInfoStep7 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep7';
import InputBaselineInfoStep8 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep8';
import InputBaselineInfoStep9 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep9';
import AFIBInformation from '../../../Components/Form/afibInformation';
import BiofluxDiagnosis from '../../../Components/Form/biofluxDiagnosis';
import PastMedicalConditions from '../../../Components/Form/pastMedicalConditions';

const { Title } = Typography;

const InputBaselineInfo = (props) => {
  const [state, setState] = useMergeState({
    step: 1,
  });

  const { onClickCancelBaselineInfo, onClickFinish, baselineInformation } = props;

  const { step } = state;

  useEffect(() => {
    console.log('baselineInformation: ', baselineInformation);
    if (_.isEmpty(baselineInformation)) return;
    setState({ type: 'EDIT' });
  }, []);

  const getInfo = (info = undefined, current = 0, newCurrent = 0) => {
    console.log('getInfo: ', info, current, newCurrent);
    if (newCurrent === 0) {
      console.log('out');
      onClickCancelBaselineInfo();
      return;
    }
    console.log('previous or save');
    if (newCurrent === 10) {
      const fullData = { ...state, ...info };
      console.log('FUll data: ', fullData);
      setState({ ...info });
      onClickFinish(fullData);
      return;
    }
    setState({ ...info, step: newCurrent });
  };

  const renderStepContent = (step) => {
    let compo = null;
    const type = 'INPUT';
    switch (step) {
      case 1:
        compo = (
          <AFIBInformation
            data={state}
            onClickLeft={info => getInfo(info, 1, 0)}
            onClickRight={info => getInfo(info, 1, 2)}
            type={type}
          />
        );
        break;
      case 2:
        compo = (
          <InputBaselineInfoStep2
            data={state}
            onClickLeft={info => getInfo(info, 2, 1)}
            onClickRight={info => getInfo(info, 2, 3)}
            type={type}
          />
        );
        break;
      case 3:
        compo = (
          <InputBaselineInfoStep3
            data={state}
            onClickLeft={info => getInfo(info, 3, 2)}
            onClickRight={info => getInfo(info, 3, 4)}
            type={type}
          />
        );
        break;
      case 4:
        compo = (
          <BiofluxDiagnosis
            data={state}
            onClickLeft={info => getInfo(info, 4, 3)}
            onClickRight={info => getInfo(info, 4, 5)}
            type={type}
          />
        );
        break;
      case 5:
        compo = (
          <PastMedicalConditions
            data={state}
            onClickLeft={info => getInfo(info, 5, 4)}
            onClickRight={info => getInfo(info, 5, 6)}
            type={type}
          />
        );
        break;
      case 6:
        compo = (
          <InputBaselineInfoStep6
            data={state}
            onClickLeft={info => getInfo(info, 6, 5)}
            onClickRight={info => getInfo(info, 6, 7)}
            type={type}
          />
        );
        break;
      case 7:
        compo = (
          <InputBaselineInfoStep7
            data={state}
            onClickLeft={info => getInfo(info, 7, 6)}
            onClickRight={info => getInfo(info, 7, 8)}
            type={type}
          />
        );
        break;
      case 8:
        compo = (
          <InputBaselineInfoStep8
            data={state}
            onClickLeft={info => getInfo(info, 8, 7)}
            onClickRight={info => getInfo(info, 8, 9)}
            type={type}
          />
        );
        break;
      case 9:
        compo = (
          <InputBaselineInfoStep9
            data={state}
            onClickLeft={info => getInfo(info, 9, 8)}
            onClickRight={info => getInfo(info, 9, 10)}
            type={type}
          />
        );
        break;
      default:
        compo = null;
        break;
    }
    return (
      <div className="input-baseline-show-steps">
        {compo}
      </div>
    );
  };

  return (
    <div className="input-baseline-info">

      <div className="input-baseline-info-header fr-sb fitems-center">
        <div className="fr fitems-center">
          <Title level={4} className="m-0">Input baseline information</Title>
          <div className="step ml16">
            <span>{`Step ${step}/9`}</span>
          </div>
        </div>
        <Button className="close-button" icon={<CloseOutlined />} onClick={onClickCancelBaselineInfo} />
      </div>

      <Progress percent={(step / 9) * 100} showInfo={false} strokeWidth={1} strokeColor="#1890FF" />

      <div className="input-baseline-info-content fc-sb">
        {renderStepContent(step)}
      </div>
    </div>
  );
};

InputBaselineInfo.defaultProps = {
  onClickCancelBaselineInfo: () => {},
  onClickFinish: () => { },
  baselineInformation: {},
};
InputBaselineInfo.propTypes = {
  onClickCancelBaselineInfo: PropTypes.func,
  onClickFinish: PropTypes.func,
  baselineInformation: PropTypes.shape(),
};

export default InputBaselineInfo;
