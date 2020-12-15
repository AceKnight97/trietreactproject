import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Row, Col } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import {
  AppTableData, RNotiTableHeaderDetails, RNotiTableDataVarDetails, RMonTableHeaderDetails, RMonTableDataVarDetails,
  RNotiTableHeaderDetailsMD, RNotiTableDataVarDetailsMD,
} from '../../../Data';
import TabMenu from '../Layout/tabMenu';
import TableBasic from '../../../Components/Table';
import SearchBar from '../../../Components/Search/searchBar';
import auth from '../../../Helpers/auth';


const ReportTabs = ['Notification reports', 'Monthly reports'];

const PatientDetailsReport = (props) => {
  const [state, setState] = useMergeState({
    activeTab: '1',
    seachValue: '',
  });
  const role = auth.role();
  const { className } = props;
  const { activeTab, seachValue } = state;
  const navigateTab = e => setState({ activeTab: e.key });
  const setSeachValue = seachValue => setState({ seachValue });

  let name = 'notification';
  let headerData = RNotiTableHeaderDetails;
  let varData = RNotiTableDataVarDetails;

  if (activeTab === '2') {
    name = 'monthly';
    headerData = RMonTableHeaderDetails;
    varData = RMonTableDataVarDetails;
  } else if (role === 'MD') {
    headerData = RNotiTableHeaderDetailsMD;
    varData = RNotiTableDataVarDetailsMD;
  }

  return (
    <div className={classnames('patient-details-report-wrapper', className)}>
      <TabMenu data={ReportTabs} activeTab={activeTab} navigateTab={navigateTab} />


      <div className="patient-details-report-body">
        <Row gutter={24}>
          <Col span={10}>
            <SearchBar value={seachValue} onChange={setSeachValue} />
          </Col>
          <Col span={13} />
        </Row>

        <TableBasic
          name={name}
          className="mt24"
          getRowData={x => setState({ rowData: x })}
          totalData={AppTableData}
          headerData={headerData}
          varData={varData}
        />
      </div>
    </div>
  );
};
PatientDetailsReport.defaultProps = {
  className: '',
};
PatientDetailsReport.propTypes = {
  className: PropTypes.string,
};

export default PatientDetailsReport;
