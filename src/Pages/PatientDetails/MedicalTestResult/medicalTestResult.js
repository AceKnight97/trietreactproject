import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { useMergeState } from '../../../Helpers/customHooks';
import TabMenu from '../Layout/tabMenu';
import MedicalTestResultContent from './Layout/medicalTestResultContent';

const MedicalTestResultTabs = [
  'Stress test', 'Complete blood count', 'Liver function', 'Fasting blood sugar', 'Lipid profile', 'Other test',
];
const MedicalTestResult = (props) => {
  const [state, setState] = useMergeState({
    activeTab: '1',
  });
  const { activeTab } = state;

  const {
    className, stressTest, completeBloodCount, liverFunction, fastingBloodSugar, lipidProfile, otherTest, fetchData,
  } = props;
  const dataArr = [stressTest, completeBloodCount, liverFunction, fastingBloodSugar, lipidProfile, otherTest];
  const typeArr = ['stressTest', 'completeBloodCount', 'liverFunction', 'fastingBloodSugar', 'lipidProfile', 'otherTest'];

  const navigateTab = e => setState({ activeTab: e.key });

  const renderContent = () => {
    const index = parseInt(activeTab, 10) - 1;
    return <MedicalTestResultContent data={dataArr[index]} type={typeArr[index]} fetchData={fetchData} />;
  };
  return (
    <div className={classnames('medical-test-result-main f-row', className)}>

      <TabMenu data={MedicalTestResultTabs} activeTab={activeTab} navigateTab={navigateTab} />

      <div className="medical-test-result-content f1-just-cen">
        {renderContent()}
      </div>
    </div>
  );
};

MedicalTestResult.defaultProps = {
  className: '',
  stressTest: [],
  completeBloodCount: [],
  liverFunction: [],
  fastingBloodSugar: [],
  lipidProfile: [],
  otherTest: [],
  fetchData: () => { },
};
MedicalTestResult.propTypes = {
  className: PropTypes.string,
  stressTest: PropTypes.arrayOf(PropTypes.shape()),
  completeBloodCount: PropTypes.arrayOf(PropTypes.shape()),
  liverFunction: PropTypes.arrayOf(PropTypes.shape()),
  fastingBloodSugar: PropTypes.arrayOf(PropTypes.shape()),
  lipidProfile: PropTypes.arrayOf(PropTypes.shape()),
  otherTest: PropTypes.arrayOf(PropTypes.shape()),
  fetchData: PropTypes.func,
};

export default MedicalTestResult;
