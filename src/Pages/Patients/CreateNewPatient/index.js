import React, {
  useEffect,
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'antd';
import { NewPatientData } from '../../../Constants';
import { useMergeState } from '../../../Helpers/customHooks';
import CloseBar from '../../../Components/HeaderBar/closeBar';
import StepCT from '../../../Components/Step/stepCT';
import NewPatientStep1 from './Layout/newPatientStep1';
import NewPatientStep2 from './Layout/newPatientStep2';
import NewPatientStep3 from './Layout/newPatientStep3';

const { StepData } = NewPatientData;

const CreateNewPatient = (props) => {
  const history = useHistory();

  const [state, setState] = useMergeState({
    current: 0,
    newPatientInfo: {
      basicInfo: undefined,
      historyInfo: undefined,
      qualityInfo: undefined,
    },
  });
  const { className } = props;
  const { current } = state;

  useEffect(() => () => {
    setState({ newPatientInfo: {} });
  }, []);

  const getInfo = (info = undefined, current = 0, newCurrent = 1) => {
    if (!info || _.isEmpty(info)) return;
    console.log('getInfo: ', info, current, newCurrent);

    const { newPatientInfo } = state;
    switch (current) {
      case 0:
        _.assign(newPatientInfo, { basicInfo: { ...info } });
        break;
      case 1:
        _.assign(newPatientInfo, { historyInfo: { ...info } });
        break;
      case 2:
        _.assign(newPatientInfo, { qualityInfo: { ...info } });
        break;
      default:
        break;
    }
    setState({ current: newCurrent });
    console.log('change current: ', newPatientInfo);
    if (newCurrent === 3) {
      console.log('completed create new patient: ', newPatientInfo);
      history.push('/patients/new');
    }
  };

  const showBodyRight = () => {
    const { basicInfo, historyInfo, qualityInfo } = state.newPatientInfo;
    switch (current) {
      case 0:
        return (
          <NewPatientStep1 onClickNext={info => getInfo(info, 0, 1)} info={basicInfo} />
        );
      case 1:
        return (
          <NewPatientStep2
            onClickPrevious={info => getInfo(info, 1, 0)}
            onClickNext={info => getInfo(info, 1, 2)}
            info={historyInfo}
          />
        );
      case 2:
        return (
          <NewPatientStep3
            onClickPrevious={info => getInfo(info, 2, 1)}
            onClickFinish={info => getInfo(info, 2, 3)}
            info={qualityInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={classnames('create-new-patient-wrapper', className)}>
      <CloseBar title="Create new patient" onClick={() => history.push('/patients/new')} />

      <div className="create-new-patient-body">
        <Row gutter={24}>
          <Col span={6}>
            <div className="create-new-patient-body-left">
              <StepCT data={StepData} current={current} className="body-step-height" />
            </div>
          </Col>
          <Col span={18}>
            <div className="create-new-patient-body-right">
              {showBodyRight()}
            </div>
          </Col>
        </Row>
      </div>

    </div>
  );
};
CreateNewPatient.defaultProps = {
  className: '',
};
CreateNewPatient.propTypes = {
  className: PropTypes.string,
};
export default CreateNewPatient;
