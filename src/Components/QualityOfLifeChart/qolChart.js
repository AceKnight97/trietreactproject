import React from 'react';
import PropTypes from 'prop-types';
import { PolarArea } from '@reactchartjs/react-chart.js';
import { Typography } from 'antd';
import classnames from 'classnames';

const BackgroundColorData = ['#ffc53d', '#95de64', '#9254de', '#eaff8f', '#87e8de', ' #ff4d4f', '#597ef7', '#ff85c0'];

const { Title } = Typography;
const QOLChart = (props) => {
  const { data, className } = props;
  const {
    physicalFunctioning, physicalHealth, emotionalProblems, energy, emotional, socialFunctioning, pain, generalHealth,
  } = data;
  const patientData = [physicalFunctioning, physicalHealth, emotionalProblems, energy, emotional, socialFunctioning, pain, generalHealth];
  const chartData = {
    labels: [
      `Physical functioning: ${patientData[0]}%`,
      `Role limitations due to physical health: ${patientData[1]}%`,
      `Role limitations due to emotional problems: ${patientData[2]}%`,
      `Energy/fatigue: ${patientData[3]}%`,
      `Emotional well-being: ${patientData[4]}%`,
      `Social functioning: ${patientData[5]}%`,
      `Pain: ${patientData[6]}%`,
      `General health: ${patientData[7]}%`,
    ],
    datasets: [
      {
        data: patientData,
        backgroundColor: BackgroundColorData,
        borderWidth: 0,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: { // right comments
      display: true,
      position: 'right',
      align: 'start',
      labels: {
        boxWidth: 14, fontSize: 14, fontColor: '#262626', padding: 15,
      },
    },
    scale: { ticks: { display: false } },
  };
  return (
    <div className={classnames('quality-of-life', className)}>
      <Title level={5}>Quality of life</Title>
      <div className="quality-of-life-chart">
        <PolarArea data={chartData} options={options} />
      </div>
    </div>
  );
};
QOLChart.defaultProps = {
  className: '',
  data: {},
};
QOLChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape(),
};

export default QOLChart;

// [
//   'rgba(255,197,61,1)',
//   'rgba(149,222,100,1)',
//   'rgba(146,84,222,1)',
//   'rgba(234,255,143,1)',
//   'rgba(135,232,222,1)',
//   'rgba(255,77,79,1)',
//   'rgba(89, 126, 247, 1)',
//   'rgba(255, 133, 192, 1)',
// ]
