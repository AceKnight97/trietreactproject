import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from 'antd';
import DatePickerCT from '../Input/datepickerCT';
import InputCT from '../Input/inputCT';
import UploadFileCT from '../Input/updateFileCT';

const { Title, Text } = Typography;
const ExerciseStressTesting = (props) => {
  const {
    onChangeDate, onChangeInput, onChangeUpload, data, name,
  } = props;
  return (
    <>
      <Text strong>
        Exercise stress testing
      </Text>
      <DatePickerCT
        className="mt16"
        title="Date"
        value={data.date}
        onChange={onChangeDate}
        name={name}
      />
      <InputCT
        className="mt16"
        title="Summary"
        type="TEXTAREA"
        placeholder="Enter your summary"
        value={data.input}
        onChange={onChangeInput}
        name={name}
      />
      <UploadFileCT title="Attachment" className="mt16" onChange={onChangeUpload} name={name} />
    </>
  );
};

ExerciseStressTesting.propTypes = {
  onChangeDate: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onChangeUpload: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
  name: PropTypes.string.isRequired,
};

export default ExerciseStressTesting;
