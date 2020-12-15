
import React, {
  useEffect,
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import { NewPatientData } from '../../../../Constants';
import InputCT from '../../../../Components/Input/inputCT';
import { getStateData } from '../../../../Ultis';

const { QualitiOfLifeTitles } = NewPatientData;

const NewPatientStep3 = (props) => {
  const [state, setState] = useMergeState({
    physicalFunctioning: '',
    physicalHealth: '',
    emotionalProblems: '',
    energy: '',
    emotional: '',
    socialFunctioning: '',
    pain: '',
    generalHealth: '',
  });

  const {
    className, onClickFinish, onClickPrevious, info,
  } = props;
  useEffect(() => { setState(getStateData(info)); }, []);

  const {
    physicalFunctioning, physicalHealth, emotionalProblems, energy,
    emotional, socialFunctioning, pain, generalHealth,
  } = state;

  const values = [physicalFunctioning, physicalHealth, emotionalProblems, energy,
    emotional, socialFunctioning, pain, generalHealth];

  const keys = ['physicalFunctioning', 'physicalHealth', 'emotionalProblems', 'energy',
    'emotional', 'socialFunctioning', 'pain', 'generalHealth'];

  const isDisabled = () => {
    if (values.includes('')) return true;
    return false;
  };

  return (
    <div className={classnames('new-patient-step3-wrapper', className)}>

      {_.map(QualitiOfLifeTitles, (x, i) => (
        <InputCT
          key={i}
          className={i !== 0 ? 'mt24' : ''}
          type="NUMBER"
          title={x}
          placeholder="Enter result"
          onChange={(value) => {
            let tempVal = value;
            if (parseInt(value, 10) > 100) tempVal = '100';
            setState({ [keys[i]]: tempVal });
          }}
          value={values[i]}
        />
      ))}

      <div className="footer-buttton-div">
        <Button onClick={() => onClickPrevious({ ...state })} className="buttton-with">
          Previous step
        </Button>
        <Button
          type="primary"
          className="buttton-with"
          onClick={() => onClickFinish(state)}
          disabled={isDisabled()}
        >
          Finish
        </Button>
      </div>

    </div>
  );
};
NewPatientStep3.defaultProps = {
  className: '',
  onClickFinish: () => { },
  onClickPrevious: () => { },
  info: {},
};
NewPatientStep3.propTypes = {
  className: PropTypes.string,
  onClickFinish: PropTypes.func,
  onClickPrevious: PropTypes.func,
  info: PropTypes.shape(),
};

export default NewPatientStep3;
