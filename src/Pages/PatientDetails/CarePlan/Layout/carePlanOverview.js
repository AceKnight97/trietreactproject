import React, {
  useState, useContext, useEffect, useCallback, useMemo, Children,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button, Empty } from 'antd';
import { EditFilled, PlusOutlined } from '@ant-design/icons';
import { checkNoData } from '../../../../Ultis';
import { useMergeState } from '../../../../Helpers/customHooks';
import RowSelection from '../../../../Components/Input/rowSelection';
import DisplayData1 from '../../../../Components/UI/displayData1';
import DisplayData2 from '../../../../Components/UI/displayData2';
import DisplayData3 from '../../../../Components/UI/displayData3';
import {
  patientEducationData, RequiedEPData, TestTypeData, ScheduleData,
} from '../../../../Data/carePlanData';
import noDocumentIc from '../../../../Image/Pages/PatientDetails/no-document-ic.svg';
import CarePlanOverviewInput from './carePlanOverviewInput';
import auth from '../../../../Helpers/auth';


const description = 'There is no data to display';

const CarePlanOverview = (props) => {
  const [state, setState] = useMergeState({
    current: 'EMPTY', // DISPLAY or INPUT or EMPTY
    initCurrent: 'EMPTY',
  });
  const role = auth.role();
  const {
    className, overview, fetchData,
  } = props;
  const { current, initCurrent } = state;
  const {
    patientEducation, requiredEP,
    bloodFrequency, bloodTheNextDate, testType, bloodFrequencyUnit,
    stressFrequency, stressTheNextDate, stressFrequencyUnit,
    schedule, notes,
  } = overview;

  useEffect(() => {
    const conditionArr = [
      patientEducation, requiredEP,
      bloodFrequency, bloodTheNextDate, testType, bloodFrequencyUnit,
      stressFrequency, stressTheNextDate, stressFrequencyUnit,
      schedule,
    ];
    // console.log('conditionArr: ', conditionArr);
    if (checkNoData(conditionArr)) return;
    setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
  }, []);

  const bloodData = [
    {
      title: 'Frequency',
      data: bloodFrequency,
      unit: bloodFrequencyUnit,
    },
    {
      title: 'The next date',
      data: bloodTheNextDate,
    },
    {
      title: 'Test type',
      data: testType,
    },
  ];
  const stressData = [
    {
      title: 'Frequency',
      data: stressFrequency,
      unit: stressFrequencyUnit,
    },
    {
      title: 'The next date',
      data: stressTheNextDate,
    },
  ];

  const showEmpty = () => (
    <Empty
      className="mt80"
      image={<img src={noDocumentIc} alt="No data icon" />}
      description={<span>{description}</span>}
    >
      {/* {role === 'MD' ? ( */}
      <Button
        onClick={() => setState({ current: 'INPUT' })}
        className="f1-cen"
        type="primary"
        icon={<PlusOutlined />}
      >
        Add care plan overview
      </Button>
      {/* ) : null} */}
    </Empty>
  );

  const showDisplay = () => (
    <div className="">
      <RowSelection
        disabled
        title="Patient education"
        data={patientEducationData}
        value={patientEducation}
      />

      <DisplayData1
        className="mt24"
        title="Required equipment provided"
        data={requiredEP}
      />

      <DisplayData2
        className="mt24"
        title="Bloodwork"
        data={bloodData}
        isStrip
      />

      <DisplayData2
        className="mt24"
        title="Stress test"
        data={stressData}
        isStrip
      />

      <DisplayData3
        className="mt24"
        title="Follow up schedule"
        data={schedule}
      />

      <DisplayData3
        className="mt24"
        title="Notes"
        data={notes}
      />

      <Button
        ghost
        type="primary"
        icon={<EditFilled />}
        onClick={() => setState({ current: 'INPUT' })}
        className={classnames('edit-care-plan-button', 'f1-cen')}
      >
        Edit care plan overview
      </Button>
    </div>
  );

  return (
    <div className={classnames('care-plan-overview-wrapper', className)}>

      {current === 'EMPTY' ? showEmpty() : null}

      {current === 'DISPLAY' ? showDisplay() : null}

      {current === 'INPUT'
        ? (
          <CarePlanOverviewInput
            overview={overview}
            onClickCancel={() => setState({ current: initCurrent })}
            onClickSaveAdd={(key, value) => {
              fetchData(key, value);
              setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
            }}
          />
        ) : null}

    </div>
  );
};
CarePlanOverview.defaultProps = {
  className: '',
  overview: {},
  fetchData: () => { },
};
CarePlanOverview.propTypes = {
  className: PropTypes.string,
  overview: PropTypes.shape(),
  fetchData: PropTypes.func,
};

export default CarePlanOverview;
