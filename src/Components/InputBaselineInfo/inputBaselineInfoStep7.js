import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Typography, Button, Divider } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';
import FooterScore from '../UI/footerScore';
import FullWidthButtons from '../Button/fullWidthButtons';
import MultipleCheckbox from '../Input/multipleCheckbox';
import { HASBLEDClinicalCharacteristicData, BleedsPer100PatientYears } from '../../Constants';
import { setMultipleCheckboxData } from '../../Ultis';


const InputBaselineInfoStep7 = (props) => {
  const [state, setState] = useMergeState({
    step7TotalScore: 0,
    hasbledClinical: [],
    hasbledClinicalFinalScore: '',
  });

  const {
    className, onClickLeft, onClickRight, type, data,
  } = props;

  useEffect(() => {
    const { hasbledClinical, step7TotalScore, hasbledClinicalFinalScore } = data;
    if (!hasbledClinical || _.isEmpty(hasbledClinical)) {
      setState({ hasbledClinical: setMultipleCheckboxData(HASBLEDClinicalCharacteristicData) });
      return;
    }
    setState({ hasbledClinical, step7TotalScore, hasbledClinicalFinalScore });
  }, []);


  useEffect(() => {
    const hasbledClinicalFinalScore = BleedsPer100PatientYears[state.step7TotalScore];
    setState({ hasbledClinicalFinalScore });
  }, [state.step7TotalScore]);

  const { hasbledClinical, step7TotalScore, hasbledClinicalFinalScore } = state;

  const onChangeMultiCheckbox = (keyValue, obj, x) => {
    const data = state[keyValue];
    const item = _.find(data, x => x.value === obj.value);
    _.assign(item, { isCheck: x });

    let count = 0;
    _.forEach(data, (item) => {
      if (item.isCheck) count += item.suffix;
    });

    setState({ [keyValue]: data, step7TotalScore: count });
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
    <div className={classnames('input-baseline-info-step7-wrapper', className)}>

      <div>
        <div className={classnames('size-16-b-g9')}>
          <span>HAS-BLED clinical characteristic</span>
        </div>

        <MultipleCheckbox
          className="mt24"
          rowClassName="mt16"
          data={hasbledClinical}
          onChange={(obj, x) => onChangeMultiCheckbox('hasbledClinical', obj, x)}
        />
        <Divider />


        <FooterScore
          totalScore={step7TotalScore}
          arrayData={[{
            // title: 'HASBLED clinical risk estimation (%)',
            title: hasbledClinicalFinalScore,
          }]}
        />

      </div>

      {showFooterButtons()}
    </div>
  );
};

InputBaselineInfoStep7.defaultProps = {
  className: '',
  type: '',
  onClickLeft: () => {},
  onClickRight: () => { },
  data: {},
};

InputBaselineInfoStep7.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  data: PropTypes.shape(),
};
export default InputBaselineInfoStep7;
