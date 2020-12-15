import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RightOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { getTableColumns } from '../../Ultis/table';
import BoxItem from '../UI/boxItem';

const TableCT = (props) => {
  const {
    className, getRowData, name, headerData, varData,
    data, current, onNextClick, isOutOfData, handleCheckBox,
  } = props;

  const itemRender = (currentPage, type, originalElement) => {
    if (type === 'prev') {
      if (current === 1) return null;
      return originalElement;
    }
    if (type === 'next') {
      if (isOutOfData) return null;
      return <BoxItem icon={<RightOutlined />} onClick={onNextClick} />;
    }
    return originalElement;
  };

  const columns = () => getTableColumns(headerData, varData, name === 'appointment' ? handleCheckBox : () => {});

  return (
    <Table
      key="id"
      className={classnames(`${name}-table-wrapper`, className)}
      columns={columns()}
      dataSource={data}
      onRow={record => ({
        onClick: (e) => { // click row
          if (e?.target?.tagName === 'INPUT') return;
          getRowData({ ...record });
        },
      })}
      pagination={{ itemRender, current }}
    />
  );
};
TableCT.defaultProps = {
  name: '',
  className: '',
  getRowData: () => { },
  data: [],
  headerData: [],
  varData: [],
  current: 0,
  onNextClick: () => {},
  isOutOfData: false,
  handleCheckBox: () => {},
};
TableCT.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  getRowData: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.string),
  headerData: PropTypes.arrayOf(PropTypes.string),
  varData: PropTypes.arrayOf(PropTypes.string),
  current: PropTypes.number,
  onNextClick: PropTypes.func,
  isOutOfData: PropTypes.bool,
  handleCheckBox: PropTypes.func,
};
export default TableCT;
