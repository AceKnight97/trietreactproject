import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import {
  Typography, Button, Divider, Space,
} from 'antd';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';
import SelectCT from '../Input/selectCT';
import CheckboxCT from '../Input/checkboxCT';
import DatePicketCT from '../Input/datepickerCT';
import InputCT from '../Input/inputCT';
import UploadFileCT from '../Input/updateFileCT';

import PastMedicalConditions from '../Form/pastMedicalConditions';


const { Title, Text } = Typography;
const InputBaselineInfoStep5 = (props) => {
  const initialStep5Data = useRef([
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
  ]);
  const [state, setState] = useMergeState({
    step5Data: initialStep5Data.current,
    isDisableNextButton: false, // true
  });
  const onClickBottomButton = (isNextClicked) => {
    console.log(state.step5Data);
    props.handleClick(isNextClicked);
  };
  const onClickCheckbox = (checked, name) => {
    const newStep5Data = _.cloneDeep(state.step5Data);
    _.forEach(newStep5Data, (arrItem) => {
      if (arrItem.name === name) {
        arrItem.isChecked = checked;
        if (!arrItem.isChecked && arrItem.value) {
          arrItem.value = '';
        }
      }
    });
    setState({ step5Data: newStep5Data });
  };
  const onChangeInput = (value, type, name) => {
    const newStep5Data = _.cloneDeep(state.step5Data);
    _.forEach(newStep5Data, (arrItem) => {
      if (arrItem.name === name) {
        if (arrItem.type === 'DATE') {
          arrItem.value = moment(value).format('YYYY-MM-DD');
        } else {
          arrItem.value = value;
        }
      }
    });
    setState({ step5Data: newStep5Data });
  };
  // useEffect(() => {
  //   if (JSON.stringify(initialStep5Data.current) === JSON.stringify(state.step5Data)) {
  //     setState({ isDisableNextButton: true });
  //   } else {
  //     setState({ isDisableNextButton: false });
  //   }
  // }, [state.step5Data]);
  return (
    <>
      <PastMedicalConditions
        data={state.step5Data}
        onChangeInput={onChangeInput}
        onClickCheckbox={onClickCheckbox}
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

InputBaselineInfoStep5.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default InputBaselineInfoStep5;
