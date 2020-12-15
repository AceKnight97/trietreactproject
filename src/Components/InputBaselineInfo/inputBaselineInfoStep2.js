import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import _ from 'lodash';
import { Divider } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';
import { checkNoData, getStateData } from '../../Ultis';
import DateSummaryAttachment from '../Form/dateSummaryAttachment';
import FullWidthButtons from '../Button/fullWidthButtons';

const InputBaselineInfoStep2 = (props) => {
  const [state, setState] = useMergeState({
    completeBloodCountDate: undefined,
    completeBloodCountSummary: '',
    completeBloodCountAttachment: [],

    liverFunctionTestDate: undefined,
    liverFunctionTestSummary: '',
    liverFunctionTestAttachment: [],

    leadECGDate: undefined,
    leadECGSummary: '',
    leadECGAttachment: [],
  });
  const {
    completeBloodCountDate, liverFunctionTestDate, leadECGDate,
    completeBloodCountSummary, liverFunctionTestSummary, leadECGSummary,
    completeBloodCountAttachment, liverFunctionTestAttachment, leadECGAttachment,
  } = state;

  const {
    className, onClickLeft, onClickRight, type, data,
    Step2Titles,
  } = props;
  useEffect(() => {
    const {
      completeBloodCountDate, liverFunctionTestDate, leadECGDate,
      completeBloodCountSummary, liverFunctionTestSummary, leadECGSummary,
      completeBloodCountAttachment, liverFunctionTestAttachment, leadECGAttachment,
    } = data;
    const tempArr = {
      completeBloodCountDate,
      liverFunctionTestDate,
      leadECGDate,
      completeBloodCountSummary,
      liverFunctionTestSummary,
      leadECGSummary,
      completeBloodCountAttachment,
      liverFunctionTestAttachment,
      leadECGAttachment,
    };
    setState(getStateData(tempArr));
  }, []);

  const isDisabled = () => {
    const condition = [
      completeBloodCountDate, liverFunctionTestDate, leadECGDate,
      completeBloodCountSummary, liverFunctionTestSummary, leadECGSummary,
      // completeBloodCountAttachment, liverFunctionTestAttachment, leadECGAttachment,
    ];
    return checkNoData(condition);
  };

  const onChange = (key = '', value = '', i = -1) => {
    let head = '';
    switch (i) {
      case 0:
        head = 'completeBloodCount';
        break;
      case 1:
        head = 'liverFunctionTest';
        break;
      case 2:
        head = 'leadECG';
        break;
      default:
        break;
    }
    const keyCT = `${head}${key}`;
    setState({ [keyCT]: value });
  };

  const dates = [completeBloodCountDate, liverFunctionTestDate, leadECGDate];
  const summaries = [completeBloodCountSummary, liverFunctionTestSummary, leadECGSummary];
  const attachments = [completeBloodCountAttachment, liverFunctionTestAttachment, leadECGAttachment];

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
    <div className={classnames('input-baseline-info-step2-wrapper', className)}>
      <div className="">
        {_.map(Step2Titles, (x, i) => (
          x ? (
            <div>
              <DateSummaryAttachment
                key={i}
                onChange={(key, value) => onChange(key, value, i)}
                className=""
                title={x}
                date={dates[i]}
                summary={summaries[i]}
                attachment={attachments[i]}
              />
              {i !== Step2Titles.length - 1 && !Step2Titles.includes('') ? <Divider /> : null}
            </div>
          ) : null
        ))}
      </div>

      {showFooterButtons()}

    </div>
  );
};
InputBaselineInfoStep2.defaultProps = {
  className: '',
  type: '',
  onClickLeft: () => {},
  onClickRight: () => { },
  data: {},
  Step2Titles: ['Complete blood count', 'Liver Function Test', '12 leads ECG'],
};

InputBaselineInfoStep2.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  data: PropTypes.shape(),
  Step2Titles: PropTypes.arrayOf(PropTypes.string),
};

export default InputBaselineInfoStep2;
