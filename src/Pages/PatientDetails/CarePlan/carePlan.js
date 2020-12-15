import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Menu } from 'antd';
import _ from 'lodash';
import { useMergeState } from '../../../Helpers/customHooks';
import CarePlanOverview from './Layout/carePlanOverview';
import CarePlanDiseasesInfo from './Layout/carePlanDiseasesInfo';
import CarePlanPrescription from './Layout/carePlanPrescription';
import CarePlanReportSettings from './Layout/carePlanReportSettings';
import TabMenu from '../Layout/tabMenu';
import auth from '../../../Helpers/auth';


const CarePlanTabs = [
  'Overview',
  'Diseases information',
  'Prescription',
  'Report settings',
];

const CarePlan = (props) => {
  const [state, setState] = useMergeState({
    activeTab: '1',
  });

  const role = auth.role();
  const { activeTab } = state;
  const {
    className, overview, diseasesInfo, prescription, reportSettings, fetchData,
  } = props;

  const navigateTab = e => setState({ activeTab: e.key });

  const renderContent = () => {
    switch (activeTab) {
      case '1':
        return (
          <CarePlanOverview
            overview={overview}
            fetchData={fetchData}
          />
        );
      case '2':
        return (
          <CarePlanDiseasesInfo
            diseasesInfo={diseasesInfo}
            fetchData={fetchData}
          />
        );
      case '3':
        return (
          <CarePlanPrescription
            prescription={prescription}
            fetchData={fetchData}
          />
        );
      case '4':
        return (
          <CarePlanReportSettings
            reportSettings={reportSettings}
            fetchData={fetchData}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className={classnames('care-plan-main f-row', className)}>

      <TabMenu data={CarePlanTabs} activeTab={activeTab} navigateTab={navigateTab} />

      <div className="care-plan-content f1-just-cen">
        {renderContent()}
      </div>
    </div>
  );
};

CarePlan.defaultProps = {
  className: '',
  overview: {},
  diseasesInfo: {},
  prescription: [],
  reportSettings: {},
  fetchData: () => { },
};
CarePlan.propTypes = {
  className: PropTypes.string,
  overview: PropTypes.shape(),
  diseasesInfo: PropTypes.shape(),
  prescription: PropTypes.arrayOf(PropTypes.shape()),
  reportSettings: PropTypes.shape(),
  fetchData: PropTypes.func,
};

export default CarePlan;
