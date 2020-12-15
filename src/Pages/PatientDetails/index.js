import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import {
  PageHeader, Row, Col, Tabs, Empty, Button, Modal,
} from 'antd';
import { useHistory, useLocation } from 'react-router';
import _ from 'lodash';
import { carePlanFakeData, ReportSettingsDefaultData } from '../../Data/carePlanData';
import PatientInfo from '../../Components/PatientInfoDrawer';
import InitialIntakeInfo from './InitialIntake.js/initialIntakeInfo';
import BaselineInfo from './Baseline/baselineInfo';
import InputBaselineInfo from './Baseline/inputBaselineInfo';
import CarePlan from './CarePlan/carePlan';
import MedicalTestResult from './MedicalTestResult/medicalTestResult';
import AssignDrawer from '../../Components/AssignDrawer/assignDrawer';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';
import StopHealthCareModal from './Layout/stopHealthCareModal';
import DrawerModalCT from '../../Components/UI/drawerModalCT';
import { AppTableData, DefaultInputBaselineData } from '../../Data';
import PatientDetailsReport from './Reports';
import auth from '../../Helpers/auth';


const { TabPane } = Tabs;

const PatientDetails = (props) => {
  const history = useHistory();
  const isMD = auth.isMD();
  const { goBack } = history;
  const [state, setState] = useMergeState({
    activeTab: '1',
    allTabs: [],

    isOpenAssignNurse: false,
    isOpenAssignMD: false,
    isInputBaselineInfo: false,
    stopHCModal: false,

    patientData: {},

    // BASELINE INFORMATION
    baselineInformation: {}, // DefaultInputBaselineData,

    // CARE PLAN
    cpOverview: {},
    cpDiseasesInfo: {},
    cpPrescription: [],
    cpReportSettings: {},

    // MEDICAL TEST RESULT
    stressTest: [],
    completeBloodCount: [],
    liverFunction: [],
    fastingBloodSugar: [],
    lipidProfile: [],
    otherTest: [],

    isStarted: false,
  });
  const location = useLocation();

  const configTabs = (name = '') => {
    const defaultTabs = ['Initial intake info', 'Baseline info', 'Care plan'];
    if (!name || name.includes('new')) return defaultTabs;
    defaultTabs.push('Medical test results', 'Reports');
    return defaultTabs;
  };

  const setReportDefault = () => {
    const {
      isMonthlyRA,
      heartRateMin, heartRateMax, bloodPressureMin, bloodPressureMax, inrMin, inrMax, ehraScoreMin, ehraScoreMax,
      mediNotiForNurse, mediNotiForMD, bloodPressureMinUnit, bloodPressureMaxUnit,
      increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC,
    } = ReportSettingsDefaultData;
    const cpReportSettings = {
      isMonthlyRA,
      heartRateMin,
      heartRateMax,
      bloodPressureMin,
      bloodPressureMax,
      inrMin,
      inrMax,
      ehraScoreMin,
      ehraScoreMax,
      mediNotiForNurse,
      mediNotiForMD,
      bloodPressureMinUnit,
      bloodPressureMaxUnit,
      increasingSOB,
      chestPain,
      abnormalBleeding,
      lightHeadedness,
      sleepDC,
    };
    setState({ cpReportSettings });
  };

  useEffect(() => {
    console.log('location.state: ', location.state);
    if (_.isEmpty(location.state) || !location?.state?.patientID) {
      history.push('/patients/active');
      return;
    }
    const { patientID, name } = location.state;
    const patientData = _.find(AppTableData, x => x.patientID === patientID);
    if (_.isEmpty(patientData)) {
      history.push('/patients/active');
      return;
    }

    console.log('role, patientData, name: ', patientData, name);
    let isStarted = false;
    if (name === 'active') isStarted = true;
    setState({ patientData, allTabs: configTabs(name), isStarted });
    setReportDefault();
  }, []);

  const {
    patientData, baselineInformation, cpOverview, cpDiseasesInfo, cpPrescription, cpReportSettings,
    stopHCModal, isStarted, activeTab, allTabs, isInputBaselineInfo, stressTest, completeBloodCount, liverFunction, fastingBloodSugar, lipidProfile, otherTest,

    isOpenAssignNurse, isOpenAssignMD,
  } = state;
  const { patientID } = patientData;

  const navigateTab = (tab) => { if (tab !== activeTab) setState({ activeTab: tab }); };

  const onChange = (key, value) => setState({ [key]: value });

  const handleClickAssign = (name = '') => {
    if (name === 'Nurse') setState({ isOpenAssignNurse: true });
    else setState({ isOpenAssignMD: true });
  };

  const toggleStopHC = () => setState({ stopHCModal: !stopHCModal });

  const toggleInputBaselineInfo = () => setState({ isInputBaselineInfo: !isInputBaselineInfo });

  const getInputBaselineInfo = info => setState({ baselineInformation: info, isInputBaselineInfo: false });

  const getHeaderExtra = () => {
    if (isMD) {
      if (isStarted) {
        return (
          <Button type="primary" ghost onClick={toggleStopHC}>
            Stop health care program
          </Button>
        );
      }
      return (
        <Button type="primary" onClick={() => setState({ isStarted: true })}>
          Start health care program
        </Button>
      );
    }
    return null;
  };

  const showTabDetails = (i) => {
    switch (i) {
      case 1:
        return <InitialIntakeInfo />;
      case 2:
        return (
          <BaselineInfo
            baselineInformation={baselineInformation}
            onClickInputBaselineInfo={toggleInputBaselineInfo}
            fetchData={onChange} // call after edit or add data
          />
        );
      case 3:
        return (
          <CarePlan
            fetchData={onChange} // call after edit or add data
            overview={cpOverview}
            diseasesInfo={cpDiseasesInfo}
            prescription={cpPrescription}
            reportSettings={cpReportSettings}
          />
        );
      case 4:
        return (
          <MedicalTestResult
            stressTest={stressTest}
            completeBloodCount={completeBloodCount}
            liverFunction={liverFunction}
            fastingBloodSugar={fastingBloodSugar}
            lipidProfile={lipidProfile}
            otherTest={otherTest}
            fetchData={onChange}
          />
        );
      case 5:
        return <PatientDetailsReport />;
      default:
        return null;
    }
  };

  return (
    <div className="details-page-main">
      <PageHeader
        className="details-page-header"
        onBack={goBack}
        title={patientData?.patientName}
        extra={[getHeaderExtra()]}
      />

      <Row gutter={[24]} className="details-page-content">

        <Col span={6} className="f-c-wh100">
          <div className="details-page-content-left">
            <PatientInfo name={location?.state?.name} patientID={patientID} onClickButton={handleClickAssign} type="DETAILS" />
          </div>
        </Col>

        <Col span={18} className="f-c-wh100">
          {isInputBaselineInfo ? (
            <InputBaselineInfo
              onClickFinish={getInputBaselineInfo}
              onClickCancelBaselineInfo={toggleInputBaselineInfo}
            />
          ) : (
            <div className="details-page-content-right">
              <Tabs activeKey={activeTab} onChange={navigateTab}>
                {_.map(allTabs, (x, i) => (
                  <TabPane tab={<span className="tab-header">{x}</span>} key={`${i + 1}`}>
                    {showTabDetails(i + 1)}
                  </TabPane>
                ))}
              </Tabs>
            </div>
          )}
        </Col>

      </Row>

      <DrawerModalCT visible={stopHCModal} type="MODAL" className="modal-add-interpretation">
        <StopHealthCareModal
          onClickCancel={toggleStopHC}
          onClickAdd={(stopReason) => {
            console.log('stop reason: ', stopReason);
            setState({ stopHCModal: false, isStarted: false });
          }}
        />
      </DrawerModalCT>

      <AssignDrawer
        visible={isOpenAssignNurse || isOpenAssignMD}
        title={isOpenAssignNurse ? 'Assign nurse' : 'Assign MD'}
        type={isOpenAssignNurse ? 'nurse' : 'MD'}
        onClose={() => setState({ isOpenAssignNurse: false, isOpenAssignMD: false })}
      />
    </div>
  );
};


PatientDetails.defaultProps = {
};
PatientDetails.propTypes = {
};

export default PatientDetails;
