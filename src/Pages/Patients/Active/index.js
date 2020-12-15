import React, {
  useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import SearchBar from '../../../Components/Search/searchBar';
import {
  AppTableData, PATableHeader, PATableDataVar, PATableHeaderMD, PATableDataVarMD,
} from '../../../Data';
import TableBasic from '../../../Components/Table';
import auth from '../../../Helpers/auth';

const name = 'active';

const PatientsActive = (props) => {
  const [state, setState] = useMergeState({
    seachValue: '',
  });
  const role = auth.role();
  console.log('role: ', role);
  let headerCT = PATableHeader;
  let varCT = PATableDataVar;

  if (role === 'MD') {
    headerCT = PATableHeaderMD;
    varCT = PATableDataVarMD;
  }
  const history = useHistory();
  const { className } = props;
  const setSeachValue = seachValue => setState({ seachValue });
  const getRowData = (x) => {
    const paramData = { rowData: { ...x }, role, name };
    history.push({
      pathname: '/patients/active/details',
      state: paramData,
    });
  };
  const { seachValue } = state;
  return (
    <div className={classnames('patients-active-wrapper', className)}>
      <div className="patients-active-body-main">

        <Row gutter={24}>
          <Col span={8}>
            <SearchBar value={seachValue} onChange={setSeachValue} />
          </Col>
          <Col span={16} />
        </Row>

        <TableBasic
          name={name}
          totalData={AppTableData}
          headerData={headerCT}
          varData={varCT}
        />
      </div>
    </div>
  );
};
PatientsActive.defaultProps = {
  className: '',
};
PatientsActive.propTypes = {
  className: PropTypes.string,
};

export default PatientsActive;
