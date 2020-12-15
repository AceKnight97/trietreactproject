import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { } from 'antd';
import UploadFileCT from '../Input/updateFileCT';
import EditButton from '../Button/editButton';


const DisplayData2 = (props) => {
  const {
    className, title, data, isStrip, type, rowClassName, leftWidth, titleClassName, isEditable, onClickEdit,
  } = props;

  let leftCT = 'w-l-2';
  let rightCT = 'w-r-2';
  switch (leftWidth) {
    case 1:
      leftCT = 'w-l-1';
      rightCT = 'w-r-1';
      break;
    case 3:
      leftCT = 'w-l-3';
      rightCT = 'w-r-3';
      break;
    default:
      break;
  }

  const showLineData = (content = '', itemClassName = '') => (
    <div className={classnames('data-item', 'right-item', rightCT, itemClassName)}>
      <span>{content}</span>
    </div>
  );

  const showColumnData = (data = {}, itemClassName = '') => (
    <div className={classnames('data-item', 'right-item', 'type-data', rightCT, itemClassName)}>
      {_.map(data, (y, i) => (
        <div key={i}>
          <span>{y}</span>
        </div>
      ))}
    </div>
  );

  const showUploadFiles = (attachment = []) => (
    <UploadFileCT data={attachment} />
  );

  const showData = (x = {}, itemClassName = '') => {
    const title = x?.title || '';
    const data = x?.data || '';
    const unit = x?.unit || '';
    const { type } = x;
    let content = data;

    if (type === '%' && content) content += ' %';

    if (type === 'ATTACHMENT') return showUploadFiles(data);

    if (title.toLowerCase().includes('date')) content = moment(data).isValid() ? moment(data).format('MMM DD, YYYY') : '';

    if (title.toLowerCase().includes('frequency')) content = `${data} time${parseInt(data, 10) > 1 ? 's' : ''} ${unit}`;

    if (title.toLowerCase().includes('type')) return showColumnData(data, itemClassName);

    return showLineData(content, itemClassName);
  };

  const showRightColumn = (x) => {
    switch (type) {
      case 'NONE':
        return null;
      case 'RANGE':
        return showColumnData(x?.data);
      default:
        return showData(x);
    }
  };

  return (
    <div className={classnames('display-data-2-wrapper', className)}>

      <div className={classnames('size-16-b-g9', 'mb12', titleClassName)}>
        <span>{title}</span>
      </div>

      {_.map(data, (x, i) => (
        <div
          key={i}
          className={classnames('display-data-2-item', rowClassName, i % 2 !== 0 && isStrip ? 'strip' : '')}
        >
          {/* LEFT COLUMN */}
          <div className={classnames('data-item', 'left-item', leftCT)}>
            <span>{x?.title}</span>
          </div>

          {/* RIGHT COLUMN */}
          {showRightColumn(x)}
        </div>
      ))}

      {isEditable ? (
        <div className="display-data-2-edit-button">
          <EditButton onClick={onClickEdit} />
        </div>
      ) : null}

    </div>
  );
};
DisplayData2.defaultProps = {
  className: '',
  rowClassName: '',
  title: '',
  data: [],
  isStrip: false,
  type: '',
  leftWidth: 2,
  titleClassName: '',
  isEditable: false,
  onClickEdit: () => {},
};
DisplayData2.propTypes = {
  className: PropTypes.string,
  rowClassName: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape()])),
  isStrip: PropTypes.bool,
  type: PropTypes.string,
  leftWidth: PropTypes.number,
  titleClassName: PropTypes.string,
  isEditable: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default DisplayData2;

// const basicInfo = [
//   {
//     title: 'DOB',
//     data: moment(dob)?.format('MM/DD/YYYY'),
//   },
//   {
//     title: 'Height',
//     data: `${height} m`,
//   },
//   {
//     title: 'Weight',
//     data: `${weight} kg`,
//   },
//   {
//     title: 'BMI',
//     data: bmi?.toFixed(1),
//   },
//   {
//     title: 'Insurance',
//     data: insurance,
//   },
// ];
