import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import SearchBar from '../../../../Components/Search/searchBar';
import { AppTableData, PNTableHeader, PNTableDataVar } from '../../../../Data';
import TableBasic from '../../../../Components/Table';

const NewRegisteredBody = (props) => {
  const [state, setState] = useMergeState({
    seachValue: '',
  });
  const setSeachValue = seachValue => setState({ seachValue });
  const { className } = props;
  const { seachValue } = state;
  return (
    <div className={classnames('new-resigtered-body-wrapper', className)}>
      <div className={classnames('patients-new-body-main')}>
        <Row gutter={24}>
          <Col span={8}>
            <SearchBar value={seachValue} onChange={setSeachValue} />
          </Col>
          <Col span={16} />
        </Row>
        <TableBasic
          name="new-registered"
          totalData={AppTableData}
          headerData={PNTableHeader}
          varData={PNTableDataVar}
        />

      </div>
    </div>
  );
};
NewRegisteredBody.defaultProps = {
  className: '',
};
NewRegisteredBody.propTypes = {
  className: PropTypes.string,
};

export default NewRegisteredBody;
