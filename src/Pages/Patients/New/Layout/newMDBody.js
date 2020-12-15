import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import SearchBar from '../../../../Components/Search/searchBar';
import { AppTableData, PNTableHeaderMD, PNTableDataVarMD } from '../../../../Data';
import TableBasic from '../../../../Components/Table';

const NewMDBody = (props) => {
  const [state, setState] = useMergeState({
    seachValue: '',
  });
  const setSeachValue = seachValue => setState({ seachValue });
  const { className } = props;
  const { seachValue } = state;
  return (
    <div className={classnames('new-md-body-wrapper', className)}>
      <div className={classnames('patients-new-body-main')}>
        <Row gutter={24}>
          <Col span={8}>
            <SearchBar value={seachValue} onChange={setSeachValue} />
          </Col>
          <Col span={16} />
        </Row>

        <TableBasic
          name="new-md"
          className="mt24"
          totalData={AppTableData}
          headerData={PNTableHeaderMD}
          varData={PNTableDataVarMD}
        />

      </div>
    </div>
  );
};
NewMDBody.defaultProps = {
  className: '',
};
NewMDBody.propTypes = {
  className: PropTypes.string,
};

export default NewMDBody;
