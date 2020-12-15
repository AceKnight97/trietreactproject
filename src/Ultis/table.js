import _ from 'lodash';
import { RightOutlined } from '@ant-design/icons';
import React from 'react';
import NormalCell from '../Components/Table/normalCell';
import BoxItem from '../Components/UI/boxItem';

const SortableFields = [
  'patientID', 'patientName', 'done', 'startDate', 'stopDate', 'nextFollowUpDate', 'notificationTime', 'status', 'dateOfService',
];

export function getTableColumns(dataHeader = [], dataKey = [], onChange = () => {}, onClickPatientName = () => {}, onRowClick = () => {}) {
  const arr = [];
  if (dataHeader.length === 0) return arr;
  _.forEach(dataHeader, (x, i) => {
    const key = dataKey[i];
    const obj = {
      title: x,
      dataIndex: key,
      sorter: SortableFields.includes(key),
      showSorterTooltip: false,
      key,
      render: (cell, row) => {
        // console.log('row: ', row);
        let type = '';
        let className = '';
        if (key.toLocaleLowerCase().includes('date')) type = 'DATE';
        if (key.toLocaleLowerCase().includes('time')) type = 'TIME';
        if (key.toLocaleLowerCase().includes('done')) type = 'CHECKBOX';
        if (key === 'patientName') {
          className = 'text-color-blue-7 patient-name-pointer';
          type = 'BUTTON';
        }
        return (
          <NormalCell
            className={className}
            cell={cell}
            row={row}
            type={type}
            onChange={onChange}
            onClick={key === 'patientName' ? () => onClickPatientName(row?.patientID) : () => onRowClick(cell, row)}
          />
        );
      },
    };
    arr.push(obj);
  });
  return arr;
}

export function getPagingTotal(len = 0) { // 10 items per page
  if (len === 0) return 0;

  const exact = len / 10;
  const tempNumber = parseInt(exact, 10);

  const pagingTotal = exact > tempNumber ? tempNumber + 1 : tempNumber;
  // console.log('pagingTotal: ', pagingTotal);
  return pagingTotal;
}

export function ultiItemRender(
  current = 0, type = '', originalElement = null, currentPage = 0, isEnd = true, onNextClick = () => { },
) {
  if (type === 'prev') {
    if (currentPage === 1) return null;
    return originalElement;
  }
  if (type === 'next') {
    if (isEnd) return null;
    return <BoxItem icon={<RightOutlined />} onClick={() => onNextClick()} />;
  }
  return originalElement;
}
