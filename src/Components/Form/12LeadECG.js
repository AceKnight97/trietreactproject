import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from 'antd';
import DatePickerCT from '../Input/datepickerCT';
import InputCT from '../Input/inputCT';
import UploadFileCT from '../Input/updateFileCT';

const { Title, Text } = Typography;
const LeadECG = (props) => {
  const {
    onChangeDate, onChangeInput, onChangeUpload, data, name,
  } = props;
  return (
    <>
      <Title level={5}>12 leads ECG</Title>
      <DatePickerCT
        title="Date"
        className="mt16"
        onChange={onChangeDate}
        value={data.date}
        name={name}
      />
      <InputCT
        value={data.summary}
        className="mt16"
        title="Summary"
        type="TEXTAREA"
        onChange={onChangeInput}
        placeholder="Enter your summary"
        name={name}
      />
      <UploadFileCT title="Attachment" className="mt16" onChange={onChangeUpload} name={name} />
    </>
  );
};

LeadECG.propTypes = {
  onChangeDate: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onChangeUpload: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
  name: PropTypes.string.isRequired,
};

export default LeadECG;
