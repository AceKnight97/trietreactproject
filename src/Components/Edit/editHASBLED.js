import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider } from 'antd';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';

import CheckboxCT from '../Input/checkboxCT';

const { Title, Text } = Typography;
const EditHASBLED = (props) => {
  const [state, setState] = useMergeState({
    clinicalCharacteristic: [
      {
        label: 'Hypertension',
        isCheck: false,
        suffix: 1,
        name: 'cb1',
      },
      {
        label: 'Abnormal liver function',
        isCheck: false,
        suffix: 1,
        name: 'cb2',
      },
      {
        label: 'Abnormal renal function',
        isCheck: false,
        suffix: 1,
        name: 'cb3',
      },
      {
        label: 'Stroke',
        isCheck: false,
        suffix: 1,
        name: 'cb4',
      },
      {
        label: 'Bleeding',
        isCheck: false,
        suffix: 1,
        name: 'cb5',
      },
      {
        label: 'Labile INRs',
        isCheck: false,
        suffix: 1,
        name: 'cb6',
      },
      {
        label: 'Elderly (Age >65)',
        isCheck: false,
        suffix: 1,
        name: 'cb7',
      },
      {
        label: 'Drugs',
        isCheck: false,
        suffix: 1,
        name: 'cb8',
      },
      {
        label: 'Alcohol',
        isCheck: false,
        suffix: 1,
        name: 'cb9',
      },
    ],
    totalScore: undefined,
    clinicalRiskEstimation: undefined,
    isDisableSaveButton: false,
  });
  const onClickBottomButton = (isSaveClicked) => {
    if (isSaveClicked) {
    } else {
      props.onClickCancel();
    }
  };
  const onClickCheckbox = (checked, name) => {
    const newState = { ...state.clinicalCharacteristic };
    _.forEach(newState, (item) => {
      if (item.name === name) {
        item.isCheck = checked;
      }
    });
    setState({ CHAScore: newState });
  };
  const getScore = (isEstimation = false) => {
    let count = 0;
    _.forEach(state.clinicalCharacteristic, (item) => {
      if (item.isCheck) {
        count += item.suffix;
      }
    });
    if (count === 0) {
      return '--';
    }
    if (isEstimation) {
      return count;
    }
    return count;
  };
  return (
    <>
      <div>
        <Title level={4}>Edit HAS-BLED clinical characteristic</Title>
        <Divider />
        <Title level={5}>HAS-BLED clinical characteristic</Title>
        {_.map(state.clinicalCharacteristic, item => (
          <div className="mt16">
            <CheckboxCT data={item.label} isCheck={item.isCheck} suffix={item.suffix} name={item.name} onChange={onClickCheckbox} />
          </div>
        ))}
        <Divider />
        <div className="fr-sb">
          <Text strong>Total score:</Text>
          <Text strong>{getScore()}</Text>
        </div>
        <div className="fr-sb mt8">
          <Text>HASBLED clinical risk estimation (%)</Text>
          <Text>{getScore(true)}</Text>
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

EditHASBLED.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditHASBLED.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditHASBLED;
