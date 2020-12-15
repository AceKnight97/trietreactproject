import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import moment from 'moment';
import { Checkbox } from 'antd';
import { dateFormated, timeFormated } from '../../Ultis';


const NormalCell = (props) => {
  const {
    className, cell, type, onChange, row, onClick,
  } = props;

  let cellCT = cell;

  switch (type) {
    case 'DATE':
      cellCT = dateFormated(cell);
      break;
    case 'TIME':
      cellCT = timeFormated(cell);
      break;
    case 'CHECKBOX':
      return (
        <button className={classnames('normal-cell-wrapper', 'bas-btn', className)} onClick={() => onChange(cell, row)}>
          <Checkbox
            onChange={() => onChange(cell, row)}
            checked={cellCT}
          />
        </button>
      );
    default:
      break;
  }

  return (
    <button className={classnames('normal-cell-wrapper', 'bas-btn', className)} onClick={onClick}>
      <span>{cellCT}</span>
    </button>
  );
};
NormalCell.defaultProps = {
  className: '',
  cell: '',
  type: 'text',
  onChange: () => { },
  row: {},
  onClick: () => {},
};
NormalCell.propTypes = {
  className: PropTypes.string,
  cell: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.string,
  onChange: PropTypes.func,
  row: PropTypes.shape(),
  onClick: PropTypes.func,
};
export default NormalCell;
