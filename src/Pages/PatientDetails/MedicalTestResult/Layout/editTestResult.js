import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import DateSummaryAttachment from '../../../../Components/Form/dateSummaryAttachment';
import FullWidthButtons from '../../../../Components/Button/fullWidthButtons';
import { useMergeState } from '../../../../Helpers/customHooks';
import { checkNoData } from '../../../../Ultis';
import InputCT from '../../../../Components/Input/inputCT';

const EditTestResult = (props) => {
  const { result, onClickSave, type } = props;
  const { editKey } = result;
  const [state, setState] = useMergeState({
    result,
  });
  const {
    TestTitle, Date, Summary, Attachment,
  } = state.result;
  const onChange = (key, value) => {
    const newResult = { ...state.result };
    newResult[key] = value;
    setState({ result: newResult });
  };
  const isDisabled = () => {
    const condition = [Date, Summary, Attachment];
    if (type === 'otherTest') {
      condition.push(TestTitle);
    }
    return checkNoData(condition);
  };
  return (
    <div className="edit-test-result">
      <Title level={4}>Edit test result</Title>
      <Divider />
      {type === 'otherTest'
      && (
      <InputCT
        value={TestTitle}
        className="mt16"
        title="Test title"
        onChange={(x) => {
          const newResult = { ...state.result };
          newResult.TestTitle = x;
          setState({ result: newResult });
        }}
        placeholder="Enter test title"
      />
      )}
      <DateSummaryAttachment
        onChange={onChange}
        date={Date}
        summary={Summary}
        attachment={Attachment}
      />
      <FullWidthButtons
        rightTitle="Save"
        leftTitle="Cancel"
        disabled={isDisabled()}
        onClickLeft={() => onClickSave()}
        onClickRight={() => onClickSave(state.result, editKey)}
      />
    </div>
  );
};
EditTestResult.defaultProps = {
  onClickSave: () => {},
  result: {},
  type: '',
};
EditTestResult.propTypes = {
  onClickSave: PropTypes.func,
  result: PropTypes.shape(),
  type: PropTypes.string,
};

export default EditTestResult;
