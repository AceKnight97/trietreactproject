import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import {
  Button, Empty, Divider, Typography,
} from 'antd';
import { EditFilled, PlusOutlined } from '@ant-design/icons';
import { useMergeState } from '../../../../Helpers/customHooks';
import noDocumentIc from '../../../../Image/Pages/PatientDetails/no-document-ic.svg';
import Blue1BgButton from '../../../../Components/Button/blue1BgButton';
import { checkNoData, getTestResult } from '../../../../Ultis';
import DisplayData2 from '../../../../Components/UI/displayData2';
import AddNewTestResult from './addNewTestResult';
import EditTestResult from './editTestResult';

const MedicalTestResultContent = (props) => {
  const [state, setState] = useMergeState({
    current: 'EMPTY', // DISPLAY or INPUT or EMPTY or EDIT
    initCurrent: 'EMPTY',
    editKey: undefined,
  });
  const {
    className, data, fetchData, type,
  } = props;
  const { current, initCurrent, editKey } = state;

  useEffect(() => {
    if (checkNoData(data)) {
      setState({ current: 'EMPTY', initCurrent: 'EMPTY' });
      return;
    }
    setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
  }, [data]);

  const handleAddNewTestResult = (result) => {
    if (result) {
      result.editKey = data.length; // add edit key
      const newData = [...data, result];
      fetchData(type, newData);
      setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
      return;
    }
    setState({ current: initCurrent });
  };

  const handleSaveTestResult = (result, editKey) => {
    if (result) {
      const newData = [...data];
      newData[editKey] = result;
      fetchData(type, newData);
      setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
      return;
    }
    setState({ current: initCurrent });
  };

  const showEmpty = () => (
    <Empty
      className="mt80"
      image={<img src={noDocumentIc} alt="No data icon" />}
      description={<span>There is no data to display</span>}
    >
      <Button
        onClick={() => setState({ current: 'INPUT' })}
        className="f1-cen"
        type="primary"
        icon={<PlusOutlined />}
      >
        Add new test result
      </Button>
    </Empty>
  );

  const getData = (x) => {
    if (type === 'otherTest') {
      return getTestResult(x.Summary, x.Attachment, x.TestTitle);
    }
    return getTestResult(x.Summary, x.Attachment);
  };

  const showDisplay = () => (
    <>
      <Blue1BgButton
        title="Add new test result"
        onClick={() => setState({ current: 'INPUT' })}
      />
      {_.map(data, (x, i) => (
        <>
          <Divider />
          <DisplayData2
            key={i}
            className="mt16"
            title={moment(x.Date).format('MM/DD/YYYY')}
            data={getData(x)}
            onClickEdit={() => setState({ editKey: i, current: 'EDIT' })}
            isEditable
            isStrip={type === 'otherTest'}
          />
        </>
      ))}
    </>
  );

  return (
    <div className={classnames('content-wrapper', className)}>
      {current === 'EMPTY' ? showEmpty() : null}

      {current === 'DISPLAY' ? showDisplay() : null}

      {current === 'INPUT' ? <AddNewTestResult onClickAdd={handleAddNewTestResult} type={type} /> : null}

      {current === 'EDIT' ? <EditTestResult onClickSave={handleSaveTestResult} result={data[editKey]} type={type} /> : null}

    </div>
  );
};

MedicalTestResultContent.defaultProps = {
  className: '',
  data: [],
  fetchData: () => { },
  type: '',
};
MedicalTestResultContent.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  fetchData: PropTypes.func,
  type: PropTypes.string,
};

export default MedicalTestResultContent;
