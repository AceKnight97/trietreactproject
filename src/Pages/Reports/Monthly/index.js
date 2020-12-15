import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import SearchBar from '../../../Components/Search/searchBar';
import { AppTableData, RMonTableHeader, RMonTableDataVar } from '../../../Data';
import TableBasic from '../../../Components/Table';


const ReportsMonthly = (props) => {
  const [state, setState] = useMergeState({
    seachValue: '',
  });
  const setSeachValue = seachValue => setState({ seachValue });
  const { className } = props;
  const { seachValue } = state;
  return (
    <div className={classnames('reports-monthly-wrapper', className)}>
      <div className="reports-monthly-body-main">

        <Row gutter={24}>
          <Col span={8}>
            <SearchBar value={seachValue} onChange={setSeachValue} />
          </Col>
          <Col span={16} />
        </Row>

        <TableBasic
          name="monthly"
          totalData={AppTableData}
          headerData={RMonTableHeader}
          varData={RMonTableDataVar}
        />

      </div>
    </div>
  );
};
ReportsMonthly.defaultProps = {
  className: '',
};
ReportsMonthly.propTypes = {
  className: PropTypes.string,
};

export default ReportsMonthly;
