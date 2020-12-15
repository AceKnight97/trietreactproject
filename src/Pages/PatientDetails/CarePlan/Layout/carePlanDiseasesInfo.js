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
import DisplayData3 from '../../../../Components/UI/displayData3';
import MDDiseasesInformation from '../../Layout/mdDiseasesInformation';
import noDiseasesIc from '../../../../Image/Pages/PatientDetails/no-deseases-ic.svg';
import auth from '../../../../Helpers/auth';

const description = 'There are no diseases information yet';

const CarePlanDiseasesInfo = (props) => {
  const [state, setState] = useMergeState({
    current: 'EMPTY', // DISPLAY or INPUT or EMPTY
    initCurrent: 'EMPTY',
  });
  const {
    className, diseasesInfo, fetchData,
  } = props;
  const { current, initCurrent } = state;
  const { currentDiseases, monitoredDiseases } = diseasesInfo;

  useEffect(() => {
    const conditionArr = [currentDiseases, monitoredDiseases];
    // console.log('conditionArr: ', conditionArr);
    if (checkNoData(conditionArr)) return;
    setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
  }, []);


  const showEmpty = () => (
    <Empty
      className="mt80"
      image={<img src={noDiseasesIc} alt="No data icon" />}
      description={<span>{description}</span>}
    >
      {auth.role() === 'MD' ? (
        <Button
          onClick={() => setState({ current: 'INPUT' })}
          className="f1-cen"
          type="primary"
          icon={<PlusOutlined />}
        >
          Add diseases information
        </Button>
      ) : null}
    </Empty>
  );

  const showDisplay = () => (
    <div className="">

      <DisplayData3
        title="The current diseases"
        data={currentDiseases}
      />

      <DisplayData3
        className="mt24"
        title="The diseases are being monitored"
        data={monitoredDiseases}
      />

      <Button
        ghost
        type="primary"
        icon={<EditFilled />}
        onClick={() => setState({ current: 'INPUT' })}
        className={classnames('edit-care-plan-button', 'f1-cen')}
      >
        Edit diseases information
      </Button>
    </div>
  );

  return (
    <div className={classnames('care-plan-diseases-info-wrapper', className)}>

      {current === 'EMPTY' ? showEmpty() : null}

      {current === 'DISPLAY' ? showDisplay() : null}

      {current === 'INPUT'
        ? (
          <MDDiseasesInformation
            diseasesInfo={diseasesInfo}
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
CarePlanDiseasesInfo.defaultProps = {
  className: '',
  diseasesInfo: {},
  fetchData: () => { },
};
CarePlanDiseasesInfo.propTypes = {
  className: PropTypes.string,
  diseasesInfo: PropTypes.shape(),
  fetchData: PropTypes.func,
};

export default CarePlanDiseasesInfo;
