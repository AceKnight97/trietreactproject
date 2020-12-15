import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider } from 'antd';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';

import CheckboxCT from '../Input/checkboxCT';
import InputCT from '../Input/inputCT';
import YesNoRadio from '../Input/yesNoRadio';
import PairInput from '../Input/pairInput';

const { Title, Text } = Typography;
const EditFRS = (props) => {
  const [state, setState] = useMergeState({
    checkbox: false,
    gender: '',
    age: '',
    smoker: 'No',
    totalCholesterol: '',
    HDLCholesterol: '',
    systolicBP: '',
    bloodPressure: 'No',
    isDisableSaveButton: false,
  });
  const onClickBottomButton = (isSaveClicked) => {
    if (isSaveClicked) {
    } else {
      props.onClickCancel();
    }
  };
  const onClickCheckBox = (checked) => {
    setState({ checkbox: checked });
  };
  const getScore = () => '--';
  return (
    <>
      <div>
        <Title level={5}>Framingham risk score (FRS)</Title>
        <CheckboxCT
          className="mt24"
          data="Ensure the patient aged 30-79 years with no prior history of coronary heart
            disease, no intermittent claudication or diabetes"
          isCheck={state.checkbox}
          onChange={onClickCheckBox}
        />
        <PairInput
          className="mt24"
          valueLeft={state.gender}
          titleLeft="Gender"
          onChangeLeft={x => setState({ gender: x })}
          valueRight={state.age}
          titleRight="Age"
          typeRight="NUMBER"
          onChangeRight={x => setState({ age: x })}
        />
        <YesNoRadio
          className="mt16"
          value={state.smoker}
          title="Smoker"
          onChange={x => setState({ smoker: x })}
        />
        <InputCT
          className="mt16"
          title="Total cholesterol (mmol/L)"
          placeholder="--"
          value={state.totalCholesterol}
          onChange={x => setState({ totalCholesterol: x })}
          type="NUMBER"
        />
        <InputCT
          className="mt16"
          title="HDL cholesterol (mmol/L)"
          placeholder="--"
          value={state.HDLCholesterol}
          onChange={x => setState({ HDLCholesterol: x })}
          type="NUMBER"
        />
        <InputCT
          className="mt16"
          title="Systolic BP (mmHg)"
          placeholder="--"
          value={state.systolicBP}
          onChange={x => setState({ systolicBP: x })}
          type="NUMBER"
        />
        <YesNoRadio
          className="mt16"
          value={state.bloodPressure}
          title="Blood pressure being treated with medicines"
          onChange={x => setState({ bloodPressure: x })}
        />
        <Divider />
        <div className="fr-sb">
          <Text strong>Total score:</Text>
          <Text strong>{getScore()}</Text>
        </div>
        <div className="fr-sb mt8">
          <Text>10 year CVD risk (%)</Text>
          <Text>{getScore()}</Text>
        </div>
        <div className="fr-sb mt8">
          <Text>Heart age (years)</Text>
          <Text>{getScore()}</Text>
        </div>
        <div className="fr-sb mt8">
          <Text>Risk</Text>
          <Text>{getScore()}</Text>
        </div>
      </div>
      <div className="mt48 fr-sb">
        <Button
          style={{ width: '177px', color: '#595959' }}
          onClick={() => onClickBottomButton(false)}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          style={{ width: '177px' }}
          onClick={() => onClickBottomButton(true)}
          disabled={state.isDisableSaveButton}
        >
          Save
        </Button>
      </div>
    </>
  );
};

EditFRS.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditFRS.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditFRS;
