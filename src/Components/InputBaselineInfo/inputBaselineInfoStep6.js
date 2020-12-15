import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import { Typography, Button, Divider } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';
import MultipleCheckbox from '../Input/multipleCheckbox';
import { CHA2DS2VASCScoreData, AdjustedStrokeRateData } from '../../Constants';
import { setMultipleCheckboxData, checkNoData, isCheckOne } from '../../Ultis';
import FullWidthButtons from '../Button/fullWidthButtons';
import FooterScore from '../UI/footerScore';

const InputBaselineInfoStep6 = (props) => {
  const [state, setState] = useMergeState({
    cha2ds2VascScore: [],
    step6TotalScore: 0,
    cha2ds2VascFinalScore: '',
  });
  const {
    className, onClickLeft, onClickRight, type, data,
  } = props;

  useEffect(() => {
    const { cha2ds2VascScore, step6TotalScore, cha2ds2VascFinalScore } = data;
    if (!cha2ds2VascScore || _.isEmpty(cha2ds2VascScore)) {
      setState({ cha2ds2VascScore: setMultipleCheckboxData(CHA2DS2VASCScoreData) });
      return;
    }
    setState({ cha2ds2VascScore, step6TotalScore, cha2ds2VascFinalScore });
  }, []);

  useEffect(() => {
    const cha2ds2VascFinalScore = `${AdjustedStrokeRateData[state.step6TotalScore]}%`;
    setState({ cha2ds2VascFinalScore });
  }, [state.step6TotalScore]);

  const { cha2ds2VascScore, step6TotalScore, cha2ds2VascFinalScore } = state;

  const onChangeMultiCheckbox = (keyValue, obj, x) => {
    const data = state[keyValue];
    const item = _.find(data, x => x.value === obj.value);
    if (item.value === CHA2DS2VASCScoreData[2].value && x) {
      const item2 = _.find(data, x => x.value === CHA2DS2VASCScoreData[3].value);
      _.assign(item2, { isCheck: !x });
    } else if (item.value === CHA2DS2VASCScoreData[3].value && x) {
      const item2 = _.find(data, x => x.value === CHA2DS2VASCScoreData[2].value);
      _.assign(item2, { isCheck: !x });
    }

    _.assign(item, { isCheck: x });

    let count = 0;
    _.forEach(data, (item) => {
      if (item.isCheck) count += item.suffix;
    });

    setState({ [keyValue]: data, step6TotalScore: count });
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
    <div className={classnames('input-baseline-info-step6-wrapper', className)}>
      <div>
        <div className={classnames('size-16-b-g9')}>
          <span>CHA2DS2-VASc score</span>
        </div>

        <MultipleCheckbox
          className="mt24"
          rowClassName="mt16"
          data={cha2ds2VascScore}
          onChange={(obj, x) => onChangeMultiCheckbox('cha2ds2VascScore', obj, x)}
        />

        <Divider />

        <FooterScore
          totalScore={step6TotalScore}
          arrayData={[{
            title: 'CHA2DS2-VASc clinical risk estimation (%)',
            value: cha2ds2VascFinalScore,
          }]}
        />
      </div>

      {showFooterButtons()}

    </div>
  );
};
InputBaselineInfoStep6.defaultProps = {
  className: '',
  type: '',
  onClickLeft: () => {},
  onClickRight: () => { },
  data: {},
};

InputBaselineInfoStep6.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  data: PropTypes.shape(),
};
export default InputBaselineInfoStep6;
