import React, {
  useEffect, useRef, // useState, useContext, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { useHistory } from 'react-router';
import { RightOutlined } from '@ant-design/icons';
import { Table, Drawer } from 'antd';
import { MessageData } from '../../Constants';
import { useMergeState } from '../../Helpers/customHooks';
import { getTableColumns } from '../../Ultis/table';
import BoxItem from '../UI/boxItem';
import PatientInfo from '../PatientInfoDrawer';
import { AppTableData } from '../../Data';

const { EmptyTableMes } = MessageData;

const TableBasic = (props) => {
  const [state, setState] = useMergeState({
    data: [],
    currentPage: 0,
    maxPage: 0,
    patientID: '',
  });

  const handleTableChange = (pagination, filters, sorter) => {
    const { columnKey, order } = sorter;
    if (!columnKey || !order) return;
    const data = _.orderBy(AppTableData, [columnKey], [order === 'descend' ? 'desc' : 'asc']);
    setState({ data });
  };

  const {
    className, getRowData, name, totalData, headerData, varData, // onClickPatientName,
  } = props;
  const {
    data, currentPage, maxPage, patientID,
  } = state;
  const history = useHistory();
  const initRunOutOfData = useRef(false);

  const getData = (defaul = 0) => { // query data
    if (defaul % 10 !== 0 || defaul === totalData.length) { // out of data
      const element = document.getElementsByClassName(`ant-pagination-item-${state.currentPage}`)[0];
      if (element) element.style.marginRight = 0;
      initRunOutOfData.current = true;
      setState({ maxPage: state.currentPage });
      return [];
    }
    return totalData.slice(defaul, defaul + 10);
  };

  useEffect(() => {
    let columnKey = '';
    let order = '';
    switch (name) {
      case 'appointment':
        columnKey = 'patientName';
        order = 'asc';
        break;
      case 'new-registered':
      case 'new-assigned':
      case 'new-md':
      case 'monthly':
        columnKey = 'patientID';
        order = 'asc';
        break;
      case 'active':
        columnKey = 'nextFollowUpDate';
        order = 'desc';
        break;
      case 'inactive':
        columnKey = 'stopDate';
        order = 'desc';
        break;
      case 'notification':
        columnKey = 'notificationTime';
        order = 'desc';
        break;
      default:
        break;
    }
    let data = getData();
    if (columnKey && order) data = _.orderBy(AppTableData, [columnKey], [order]).slice(0, 10);
    setState({ data, currentPage: 1, maxPage: 1 });
  }, []); // didmount

  const onNextClick = (newCurrent = state.currentPage + 1) => {
    if (initRunOutOfData.current) return; // was out of data
    const newData = [...getData(state.data.length)];
    if (newData.length === 0) return;

    const obj = { currentPage: newCurrent };
    if (maxPage < newCurrent) {
      _.assign(obj, { maxPage: newCurrent, data: [...state.data, ...newData] });
      setState(obj);
      return;
    }
    setState(obj);
  };

  const onChange = (current) => { setState({ currentPage: current }); };

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      if (currentPage === 1) return null;
      return originalElement;
    }
    if (type === 'next') {
      if (initRunOutOfData.current) return null;
      return <BoxItem icon={<RightOutlined />} onClick={() => onNextClick()} />;
    }
    return originalElement;
  };

  const handleCheckBox = (cell, row) => {
    const { data } = state;
    const item = _.find(data, x => x.key === row.key);
    if (item) {
      _.assign(item, { done: !cell });
      setState({ data });
    }
  };

  const onClickPatientName = (id = '') => setState({ patientID: id });

  const goToDetails = (cell = '', row = {}) => {
    if (name === 'appointment') return;
    const tab = ['notification', 'monthly'].includes(name) ? 'reports' : name.includes('new') ? 'patients/new' : 'patients';
    const paramData = {
      patientID: row?.patientID,
      name,
    };

    history.push({
      pathname: `/${tab}/${name}/details`,
      state: paramData,
    });
  };

  const columns = () => getTableColumns(headerData, varData, name === 'appointment' ? handleCheckBox : () => {}, onClickPatientName, goToDetails);

  return (
    <>
      <Table
        key="id"
        className={classnames(`${name}-table-wrapper`, className)}
        columns={columns()}
        dataSource={data}
        // dataSource={AppTableData}
        onRow={(record, rowIndex) => ({
          onClick: (e) => { // click row
            if (['INPUT', 'SPAN'].includes(e?.target?.tagName)) return;
            goToDetails(rowIndex, record);
          },
        })}
        pagination={{ itemRender, onChange, current: currentPage }}
        locale={{ emptyText: EmptyTableMes }}
        onChange={handleTableChange}
      />


      <Drawer
        className=""
        placement="right"
        onClose={() => setState({ patientID: '' })}
        visible={!!patientID}
        width={400}
        closable={false}
      >
        <PatientInfo
          name={name}
          patientID={patientID}
          type="DRAWER"
          onClose={() => setState({ patientID: '' })}
        />
      </Drawer>
    </>
  );
};
TableBasic.defaultProps = {
  name: '',
  className: '',
  getRowData: () => { },
  totalData: [],
  headerData: [],
  varData: [],
};
TableBasic.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  getRowData: PropTypes.func,
  totalData: PropTypes.arrayOf(PropTypes.shape()),
  headerData: PropTypes.arrayOf(PropTypes.string),
  varData: PropTypes.arrayOf(PropTypes.string),
};
export default TableBasic;
