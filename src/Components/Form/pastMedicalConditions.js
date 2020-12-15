import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import { Typography, Space } from 'antd';
import InputCT from '../Input/inputCT';
import MultipleCheckbox from '../Input/multipleCheckbox';
import { useMergeState } from '../../Helpers/customHooks';
import { NewPatientData } from '../../Constants';
import { setMultipleCheckboxData, checkNoData, isCheckOne } from '../../Ultis';
import FullWidthButtons from '../Button/fullWidthButtons';

const {
  PastMedicalHistorQuestion,
  OtherOption,
  Myocardial,
} = NewPatientData.AfibHistoryData;

const { pastMedicalHistoryTitle, pastMedicalHistoryData } = PastMedicalHistorQuestion;

const PastMedicalConditions = (props) => {
  const [state, setState] = useMergeState({
    pastMedicalHistory: [],
    pastMedicalOther: '',
    myocardialInfarction: '',
  });
  const {
    className, onClickLeft, onClickRight, type, data,
  } = props;
  const { pastMedicalHistory, pastMedicalOther, myocardialInfarction } = state;

  useEffect(() => {
    const { pastMedicalHistory, pastMedicalOther, myocardialInfarction } = data;
    if (!pastMedicalHistory || pastMedicalHistory.length === 0) {
      setState({ pastMedicalHistory: setMultipleCheckboxData(pastMedicalHistoryData) });
      return;
    }
    setState({ pastMedicalHistory, pastMedicalOther, myocardialInfarction });
  }, []);

  const onChange = (keyValue, x) => { setState({ [keyValue]: x }); };

  const onChangeMultiCheckbox = (keyValue, obj, x) => {
    const data = state[keyValue];
    const item = _.find(data, x => x.value === obj.value);
    _.assign(item, { isCheck: x });
    setState({ [keyValue]: data });
  };


  const isOtherPastMedi = _.find(pastMedicalHistory, x => x.value === OtherOption);
  const isMyocar = _.find(pastMedicalHistory, x => x.value === Myocardial);

  const pastMedicalHistoryData1 = pastMedicalHistory.slice(0, 3);
  const pastMedicalHistoryData2 = pastMedicalHistory.slice(3, pastMedicalHistory.length);


  const isDisabled = () => {
    if (isOtherPastMedi?.isCheck && pastMedicalOther || isMyocar?.isCheck && myocardialInfarction) return false;
    return !isCheckOne([...pastMedicalHistory.slice(0, 2), ...pastMedicalHistory.slice(3, pastMedicalHistory.length - 1)]);
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
    <div className={classnames('past-medical-conditions-wrapper', className)}>
      <div>
        <div className={classnames('size-16-b-g9')}>
          <span>Past medical conditions</span>
        </div>

        <MultipleCheckbox
          // title='Past medical conditions'
          className="mt24"
          rowClassName="mt16"
          data={pastMedicalHistoryData1}
          onChange={(obj, x) => onChangeMultiCheckbox('pastMedicalHistory', obj, x)}
        />

        {isMyocar?.isCheck ? (
          <InputCT
            className="mt4-padl24"
            type="DATE"
            placeholder="Enter other option"
            onChange={x => onChange('myocardialInfarction', x)}
            value={myocardialInfarction}
            disabledDate="PAST"
          />
        ) : null}

        <MultipleCheckbox
        // title='Past medical conditions'
          rowClassName="mt16"
          data={pastMedicalHistoryData2}
          onChange={(obj, x) => onChangeMultiCheckbox('pastMedicalHistory', obj, x)}
        />

        {isOtherPastMedi?.isCheck ? (
          <InputCT
            type="TEXTAREA"
            className="mt4-padl24"
            placeholder="Enter other option"
            onChange={x => onChange('pastMedicalOther', x)}
            value={pastMedicalOther}
          />
        ) : null}
      </div>

      {showFooterButtons()}

    </div>
  );
};

PastMedicalConditions.defaultProps = {
  className: '',
  type: '',
  onClickLeft: () => {},
  onClickRight: () => { },
  data: {},
};

PastMedicalConditions.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  data: PropTypes.shape(),
};
export default PastMedicalConditions;
