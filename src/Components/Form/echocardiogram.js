import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from 'antd';
import DatePickerCT from '../Input/datepickerCT';
import InputCT from '../Input/inputCT';
import UploadFileCT from '../Input/updateFileCT';

const { Title, Text } = Typography;
const Echocardiogram = (props) => {
  const {
    onChangeDate, onChangeInput, data, name,
  } = props;
  return (
    <>
      <Text strong>Echocardiogram</Text>
      <DatePickerCT
        className="mt16"
        title="Date"
        value={data.date}
        onChange={onChangeDate}
        name={name}
      />
      <InputCT
        className="mt16"
        title="LVEF (%)"
        type="NUMBER"
        placeholder="Enter a number"
        value={data.input}
        onChange={onChangeInput}
        name={name}
      />
    </>
  );
};

Echocardiogram.propTypes = {
  onChangeDate: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
  name: PropTypes.string.isRequired,
};

export default Echocardiogram;
