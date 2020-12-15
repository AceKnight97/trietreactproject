import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider } from 'antd';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';

import CheckboxCT from '../Input/checkboxCT';

const { Title, Text } = Typography;
const EditCHAScore = (props) => {
  const [state, setState] = useMergeState({
    CHAScore: [
      {
        label: 'Congestive heart failure',
        isCheck: false,
        suffix: 1,
        name: 'cb1',
      },
      {
        label: 'Hypertension',
        isCheck: false,
        suffix: 1,
        name: 'cb2',
      },
      {
        label: 'Age ≥ 75',
        isCheck: false,
        suffix: 2,
        name: 'cb3',
      },
      {
        label: 'Age 65-74',
        isCheck: false,
        suffix: 1,
        name: 'cb4',
      },
      {
        label: 'Diabetes mellitus',
        isCheck: false,
        suffix: 1,
        name: 'cb5',
      },
      {
        label: 'Stroke/TIA/thrombo-embolism',
        isCheck: false,
        suffix: 2,
        name: 'cb6',
      },
      {
        label: 'Vascular disease',
        isCheck: false,
        suffix: 1,
        name: 'cb7',
      },
      {
        label: 'Sex Female',
        isCheck: false,
        suffix: 1,
        name: 'cb8',
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
    const newState = { ...state.CHAScore };
    _.forEach(newState, (item) => {
      if (item.name === name) {
        item.isCheck = checked;
      }
    });
    setState({ CHAScore: newState });
  };
  const getScore = (isEstimation = false) => {
    let count = 0;
    _.forEach(state.CHAScore, (item) => {
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
        <Title level={4}>Edit CHA2DS2-VASc score</Title>
        <Divider />
        <Title level={5}>CHA2DS2-VASc score</Title>
        {_.map(state.CHAScore, item => (
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
          <Text>CHA2DS2-VASc clinical risk estimation (%)</Text>
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

EditCHAScore.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditCHAScore.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditCHAScore;
