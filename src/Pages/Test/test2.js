import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import moment from 'moment';
import { useMergeState } from '../../Helpers/customHooks';
import PrescriptionTable from '../PatientDetails/Layout/prescriptionTable';
import { PrescriptionTempData } from '../../Data';

const Test2 = (props) => {
  const [state, setState] = useMergeState({
  });
  const { className } = props;

  return (
    <div className={classnames('test2-wrapper', className)}>

      <div className="header-56" />

      <div className="test2-body">
        <Row gutter={24}>
          <Col span={6}>
            <div className="left-details" />
          </Col>
          <Col span={18}>
            <div className="right-details">
              <div className="right-details-header" />
              <div className="right-details-body">
                <div className="body-column" />
                <div className={classnames('wh100', 'pad24')}>
                  <PrescriptionTable
                    tableClassName="mt16"
                    title="ABC"
                    data={PrescriptionTempData[0].data}
                    isNoFooter
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

    </div>
  );
};
Test2.defaultProps = {
  className: '',
};
Test2.propTypes = {
  className: PropTypes.string,
};

export default Test2;
