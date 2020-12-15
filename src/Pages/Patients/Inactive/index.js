import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import SearchBar from '../../../Components/Search/searchBar';
import TableBasic from '../../../Components/Table';
import { AppTableData, PInactiveTableHeader, PInactiveTableDataVar } from '../../../Data';


const PatientsInactive = (props) => {
  const [state, setState] = useMergeState({
    seachValue: '',
  });
  const setSeachValue = seachValue => setState({ seachValue });
  const { className } = props;
  const { seachValue } = state;
  return (
    <div className={classnames('patients-inactive-wrapper', className)}>
      <div className="patients-inactive-body-main">

        <Row gutter={24}>
          <Col span={8}>
            <SearchBar value={seachValue} onChange={setSeachValue} />
          </Col>
          <Col span={16} />
        </Row>

        <TableBasic
          name="inactive"
          totalData={AppTableData}
          headerData={PInactiveTableHeader}
          varData={PInactiveTableDataVar}
        />

      </div>
    </div>
  );
};
PatientsInactive.defaultProps = {
  className: '',
};
PatientsInactive.propTypes = {
  className: PropTypes.string,
};

export default PatientsInactive;
