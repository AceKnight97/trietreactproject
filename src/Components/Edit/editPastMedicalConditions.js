import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider } from 'antd';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';

import PastMedicalConditions from '../Form/pastMedicalConditions';

const { Title, Text } = Typography;
const EditPastMedicalConditions = (props) => {
  const [state, setState] = useMergeState({
    pastMedicalConditions: [
      {
        label: 'Hypertension',
        isChecked: false,
        name: 'cb1',
      },
      {
        label: 'Diabetes mellitus',
        isChecked: false,
        name: 'cb2',
      },
      {
        label: 'Myocardial infarction',
        isChecked: false,
        name: 'cb3',
        type: 'DATE',
        value: '',
        placeholder: 'Select date',
      },
      {
        label: 'Stroke Transient Ischemic Attack (mini stroke)',
        isChecked: false,
        name: 'cb4',
      },
      {
        label: 'Congestive Heart Failure or LV Dysfunction',
        isChecked: false,
        name: 'cb5',
      },
      {
        label: 'Obesity',
        isChecked: false,
        name: 'cb6',
      },
      {
        label: 'Obstructive sleep apnea',
        isChecked: false,
        name: 'cb7',
      },
      {
        label: 'Cardiothoracic surgery',
        isChecked: false,
        name: 'cb8',
      },
      {
        label: 'Smoker',
        isChecked: false,
        name: 'cb9',
      },
      {
        label: 'Hyperthyroidism or Hypothyroidism',
        isChecked: false,
        name: 'cb10',
      },
      {
        label: 'Family history of AFib',
        isChecked: false,
        name: 'cb11',
      },
      {
        label: 'Others...',
        isChecked: false,
        name: 'cb12',
        type: 'TEXTAREA',
        value: '',
        placeholder: 'Enter conditions...',
      },
    ],
    isDisableSaveButton: false,
  });
  const onClickBottomButton = (isSaveClicked) => {
    if (isSaveClicked) {
    } else {
      props.onClickCancel();
    }
  };
  const onClickCheckbox = (checked, name) => {
    const newState = { ...state.pastMedicalConditions };
    _.forEach(newState, (arrItem) => {
      if (arrItem.name === name) {
        arrItem.isChecked = checked;
        if (!arrItem.isChecked && arrItem.value) {
          arrItem.value = '';
        }
      }
    });
    setState({ pastMedicalConditions: newState });
  };
  const onChangeInput = (value, type, name) => {
    const newState = { ...state.pastMedicalConditions };
    _.forEach(newState, (arrItem) => {
      if (arrItem.name === name) {
        if (arrItem.type === 'DATE') {
          arrItem.value = value;
        } else {
          arrItem.value = value;
        }
      }
    });
    setState({ pastMedicalConditions: newState });
  };
  return (
    <>
      <div>
        <Title level={4}>Edit Past medical conditions</Title>
        <Divider />
        <PastMedicalConditions
          data={state.pastMedicalConditions}
          onChangeInput={onChangeInput}
          onClickCheckbox={onClickCheckbox}
        />
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

EditPastMedicalConditions.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditPastMedicalConditions.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditPastMedicalConditions;
