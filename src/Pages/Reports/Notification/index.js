import React, {
  useState, useContext, useEffect, useCallback, useMemo, useRef,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Row, Col } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import SearchBar from '../../../Components/Search/searchBar';
// import NotificationDetails from './Layout/notificationDetails';
import {
  AppTableData, RNotiTableHeader, RNotiTableDataVar, RNotiTableHeaderMD, RNotiTableDataVarMD,
} from '../../../Data';
import TableBasic from '../../../Components/Table';
import auth from '../../../Helpers/auth';

const ReportsNotification = (props) => {
  const [state, setState] = useMergeState({
    seachValue: '',
    rowData: {},
    // Table
    data: [],
    current: 0,
    maxPage: 0,
  });
  const role = auth.role();
  let headerCT = RNotiTableHeader;
  let varCT = RNotiTableDataVar;
  if (role === 'MD') {
    headerCT = RNotiTableHeaderMD;
    varCT = RNotiTableDataVarMD;
  }
  const setSeachValue = seachValue => setState({ seachValue });

  const {
    rowData, data, current, maxPage, seachValue,
  } = state;
  const initRunOutOfData = useRef(false);

  const getData = (defaul = 0) => { // query data
    // if (defaul % 10 !== 0 || initRunOutOfData.current) { // out of data
    //   if (initRunOutOfData.current) return [];
    //   const element = document.getElementsByClassName(`ant-pagination-item-${state.current}`)[0];
    //   if (element) element.style.marginRight = 0;
    //   initRunOutOfData.current = true;
    //   setState({ maxPage: state.current });
    //   return [];
    // } else{
    //   CALL API
    //   return totalData.slice(defaul, defaul + 10);
    // }
  };

  useEffect(() => { setState({ data: getData(), current: 1, maxPage: 1 }); }, []);

  const onNextClick = (newCurrent = state.current + 1) => {
    if (initRunOutOfData.current) return; // was out of data
    const newData = [...getData(state.data.length)];
    if (newData.length === 0) return;

    const obj = { current: newCurrent };
    if (maxPage < newCurrent) {
      _.assign(obj, { maxPage: newCurrent, data: [...state.data, ...newData] });
      setState(obj);
      return;
    }
    setState(obj);
  };

  let currentClass = '';
  let currentView = null;

  currentClass = 'reports-notification-table-screen';
  currentView = (
    <div className="reports-notification-body-main">
      <Row gutter={24}>
        <Col span={8}>
          <SearchBar value={seachValue} onChange={setSeachValue} />
        </Col>
        <Col span={16} />
      </Row>

      <TableBasic
        name="notification"
        getRowData={x => setState({ rowData: x })}
        totalData={AppTableData}
        headerData={headerCT}
        varData={varCT}
          // data={data}
          // onNextClick={onNextClick}
          // current={current}
          // isOutOfData={initRunOutOfData.current}
      />
    </div>
  );

  return (
    <div className={classnames('reports-notification-wrapper', currentClass, props.className)}>
      {currentView}
    </div>
  );
};
ReportsNotification.defaultProps = {
  className: '',
};
ReportsNotification.propTypes = {
  className: PropTypes.string,
};

export default ReportsNotification;
