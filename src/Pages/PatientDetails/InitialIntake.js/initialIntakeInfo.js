import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Row, Col,
} from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash';
import { AFIB_HISTORY } from '../../../Constants/index';
import { getRandom } from '../../../Data';
import InfoTable from '../../../Components/InfoTable';
import ecgStrip from '../../../Image/Pages/PatientDetails/ecg-strip.svg';
import QOLChart from '../../../Components/QualityOfLifeChart/qolChart';
import DisplayData2 from '../../../Components/UI/displayData2';

const { Title } = Typography;
const afibHistoryContent = ['From 12 to 24 months', 'Found on routine examination', 'No', 'No', 'Lorem ipsum dolo sit amet', 'Lorem ipsum dolo sit amet', 'Medication 1\nMedication 2', 'Medication 1\nMedication 2', 'Yes\nHospitalized at 10/09/2020'];
const InitialIntakeInfo = (props) => {
  const afibHistoryData = _.map(AFIB_HISTORY, (x, i) => ({
    title: x,
    data: afibHistoryContent[i],
  }));
  return (
    <div className="initial-intake-info-main">
      <div className="afib-history">
        <DisplayData2
          title="AFib history"
          data={afibHistoryData}
          isStrip
        />
      </div>
      <div className="ecg-image">
        <Title level={5}>ECG images</Title>
        <Row gutter={[16]} className="mt-3">
          {_.map(_.range(4), (image, i) => (
            <Col key={i}>
              <img src={ecgStrip} alt="ecg strip" />
            </Col>
          ))}
        </Row>
      </div>

      <QOLChart
        className="mt24 pb-3"
        data={{
          physicalFunctioning: getRandom(101),
          physicalHealth: getRandom(101),
          emotionalProblems: getRandom(101),
          energy: getRandom(101),
          emotional: getRandom(101),
          socialFunctioning: getRandom(101),
          pain: getRandom(101),
          generalHealth: getRandom(101),
        }}
      />
    </div>
  );
};

InitialIntakeInfo.propTypes = {

};

export default InitialIntakeInfo;
