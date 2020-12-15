import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import DateSummaryAttachment from '../../../../Components/Form/dateSummaryAttachment';
import FullWidthButtons from '../../../../Components/Button/fullWidthButtons';
import { useMergeState } from '../../../../Helpers/customHooks';
import { checkNoData } from '../../../../Ultis';
import InputCT from '../../../../Components/Input/inputCT';

const AddNewTestResult = (props) => {
  const [state, setState] = useMergeState({
    Date: undefined,
    Summary: '',
    Attachment: [],
  });
  const { onClickAdd, type } = props;
  useEffect(() => {
    if (type === 'otherTest') {
      setState({ TestTitle: '' });
    }
  }, []);
  const {
    Date, Summary, Attachment, TestTitle,
  } = state;
  const onChange = (key, value) => {
    setState({ [key]: value });
  };
  const isDisabled = () => {
    const condition = [Date, Summary, Attachment];
    if (type === 'otherTest') {
      condition.push(TestTitle);
    }
    return checkNoData(condition);
  };
  return (
    <div className="add-new-test-result">
      <Title level={4}>Add new test result</Title>
      <Divider />
      {type === 'otherTest'
      && (
      <InputCT
        value={TestTitle}
        className="mt16"
        title="Test title"
        onChange={x => setState({ TestTitle: x })}
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
        rightTitle="Add test result"
        leftTitle="Cancel"
        disabled={isDisabled()}
        onClickLeft={() => onClickAdd()}
        onClickRight={() => onClickAdd(state)}
      />
    </div>
  );
};

AddNewTestResult.defaultProps = {
  onClickAdd: () => {},
  type: '',
};
AddNewTestResult.propTypes = {
  onClickAdd: PropTypes.func,
  type: PropTypes.string,
};

export default AddNewTestResult;
