import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Typography, Divider } from 'antd';
import DatePickerCT from '../Input/datepickerCT';
import InputCT from '../Input/inputCT';
import UploadFileCT from '../Input/updateFileCT';

const { Title, Text } = Typography;

const DateSummaryAttachment = (props) => {
  const {
    onChange, date, summary, attachment,
    className, title, subTitle,
  } = props;
  return (
    <div className={classnames('date-summary-attachment-wrapper', className)}>

      {title
        ? <Title level={5}>{title}</Title>
        : null}

      {subTitle ? (
        <div className="mt24">
          <Text strong>{subTitle}</Text>
        </div>
      ) : null}

      <DatePickerCT
        title="Date"
        className="mt16"
        value={date}
        onChange={x => onChange('Date', x)}
        disabledDate="PAST"
      />

      <InputCT
        className="mt16"
        title="Summary"
        type="TEXTAREA"
        onChange={x => onChange('Summary', x)}
        value={summary}
        placeholder="Enter your summary"
      />

      <UploadFileCT
        title="Attachment"
        className="mt16"
        onChange={x => onChange('Attachment', x)}
        data={attachment}
      />
    </div>
  );
};

DateSummaryAttachment.defaultProps = {
  onChange: () => {},
  className: '',
  title: '',
  subTitle: '',
  date: undefined,
  summary: '',
  attachment: undefined,
};
DateSummaryAttachment.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  date: PropTypes.shape(),
  summary: PropTypes.string,
  attachment: PropTypes.arrayOf(PropTypes.shape()),
};

export default DateSummaryAttachment;
