import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import { AppTableData, PNAssignedTableHeader, PNAssignedTableDataVar } from '../../../../Data';
import TableBasic from '../../../../Components/Table';
import SearchBar from '../../../../Components/Search/searchBar';

const NewAssignedBody = (props) => {
  const [state, setState] = useMergeState({
    seachValue: '',
  });
  const setSeachValue = seachValue => setState({ seachValue });
  const { className } = props;
  const { seachValue } = state;
  return (
    <div className={classnames('new-assigned-body-wrapper', className)}>
      <div className={classnames('patients-new-body-main')}>
        <Row gutter={24}>
          <Col span={8}>
            <SearchBar value={seachValue} onChange={setSeachValue} />
          </Col>
          <Col span={16} />
        </Row>

        <TableBasic
          name="new-assigned"
          totalData={AppTableData}
          headerData={PNAssignedTableHeader}
          varData={PNAssignedTableDataVar}
        />
      </div>
    </div>
  );
};
NewAssignedBody.defaultProps = {
  className: '',
};
NewAssignedBody.propTypes = {
  className: PropTypes.string,
};

export default NewAssignedBody;
