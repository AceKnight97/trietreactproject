import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import SearchBar from '../../../Components/Search/searchBar';
import { AppTableData, AppTableHeader, AppTableDataVar } from '../../../Data';
import TableBasic from '../../../Components/Table';
import { useMergeState, useUpdateEffect } from '../../../Helpers/customHooks';


const AppointmentTableView = (props) => {
  const [state, setState] = useMergeState({
    seachValue: '',
  });
  const { className, calendarDate } = props;
  const { seachValue } = state;
  const onSearch = value => setState({ seachValue: value });
  const customDate = moment(calendarDate).isValid()
    ? moment(calendarDate).format('dddd, MMMM DD, YYYY') : moment().format('dddd, MMMM DD, YYYY');
  return (
    <div className={classnames('appointment-table-view-wrapper', className)}>
      <Row gutter={24}>
        <Col span={11}>
          <div className="appointment-table-view-current-date">
            <span>{customDate}</span>
          </div>
        </Col>
        <Col span={2} />
        <Col span={11}>
          <SearchBar value={seachValue} onChange={onSearch} />
        </Col>
      </Row>

      <TableBasic
        name="appointment"
        totalData={AppTableData}
        headerData={AppTableHeader}
        varData={AppTableDataVar}
      />

    </div>
  );
};
AppointmentTableView.defaultProps = {
  className: '',
  calendarDate: '',
};
AppointmentTableView.propTypes = {
  className: PropTypes.string,
  calendarDate: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
};
export default AppointmentTableView;
