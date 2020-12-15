import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from 'antd';
import DatePickerCT from '../Input/datepickerCT';
import InputCT from '../Input/inputCT';
import UploadFileCT from '../Input/updateFileCT';

const { Title, Text } = Typography;
const CompleteBloodCount = (props) => {
  const {
    onChangeDate, onChangeInput, onChangeUpload, data, name,
  } = props;
  return (
    <>
      <Title level={5}>Complete blood count</Title>
      <DatePickerCT
        title="Date"
        className="mt16"
        value={data.date}
        onChange={onChangeDate}
        name={name}
      />
      <InputCT
        className="mt16"
        title="Summary"
        type="TEXTAREA"
        onChange={onChangeInput}
        value={data.summary}
        placeholder="Enter your summary"
        name={name}
      />
      <UploadFileCT title="Attachment" className="mt16" onChange={onChangeUpload} name={name} />
    </>
  );
};

CompleteBloodCount.propTypes = {
  onChangeDate: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onChangeUpload: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
  name: PropTypes.string.isRequired,
};

export default CompleteBloodCount;
