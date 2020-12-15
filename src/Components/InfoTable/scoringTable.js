import React from 'react';
import PropTypes from 'prop-types';
import { Table, Typography } from 'antd';
import classnames from 'classnames';
import EditButton from '../Button/editButton';

const { Title } = Typography;
const ScoringTable = (props) => {
  const {
    onClickEdit, className, dataSource, indexNames,
  } = props;
  const {
    // step 6
    cha2ds2VascFinalScore, step6TotalScore,
    // step 7
    hasbledClinicalFinalScore, step7TotalScore,
    // step 8
    ehraScore,
    // step 9
    step9TotalScore, cvgRisk, heartRate, risk,
  } = dataSource;

  const temp = ehraScore?.title?.split(' ');

  const tableData = [
    {
      key: '1',
      index: indexNames[0],
      score: step6TotalScore,
      riskFactors: cha2ds2VascFinalScore,
    },
    {
      key: '2',
      index: indexNames[1],
      score: step7TotalScore,
      riskFactors: hasbledClinicalFinalScore,
    },
    {
      key: '3',
      index: indexNames[2],
      score: temp ? temp[2] : '',
      riskFactors: temp ? temp[0] : '',
    },
    {
      key: '4',
      index: indexNames[3],
      score: step9TotalScore,
      riskFactors: `10 year CVD risk: ${cvgRisk}%\nHeart age: ${heartRate} years\nRisk: ${risk}`,
    },
  ];
  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      width: '33.33%',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      width: '33.33%',
    },
    {
      title: 'Risk factors',
      dataIndex: 'riskFactors',
      key: 'riskFactors',
      width: '33.33%',
      render: (text, record, index) => {
        console.log('record: ', record);
        return (
          <div className="scoring-table-row">
            <span>{text}</span>
            <EditButton
              id={`edit-button-row-${index}`}
              className="d-none"
              onClick={() => onClickEdit(record?.index)}
            />
          </div>
        );
      },
    },
  ];
  const onRowEvent = (record, rowIndex) => ({
    onMouseEnter: () => {
      const el = document.getElementById(`edit-button-row-${rowIndex}`);
      if (el) {
        el.classList.remove('d-none');
      }
    },
    onMouseLeave: () => {
      const el = document.getElementById(`edit-button-row-${rowIndex}`);
      if (el) {
        el.classList.add('d-none');
      }
    },
  });
  return (
    <div className={classnames('scoring-table', className)}>
      <Title level={5} className="font-weight-bold">Scoring</Title>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        onRow={onRowEvent}
      />
    </div>
  );
};
ScoringTable.defaultProps = {
  onClickEdit: () => {},
  className: '',
  dataSource: {},
  indexNames: [],
};
ScoringTable.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  onClickEdit: PropTypes.func,
  indexNames: PropTypes.arrayOf(PropTypes.string),
};

export default ScoringTable;
