import React, {
  useState, useContext, useEffect, useCallback, useMemo, Children,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { Button, Empty, Divider } from 'antd';
import { EditFilled, PlusOutlined } from '@ant-design/icons';
import { useMergeState } from '../../../../Helpers/customHooks';
import Blue1BgButton from '../../../../Components/Button/blue1BgButton';
import MDPrescription from '../../Layout/mdPrescription';
import noPrescriptionIc from '../../../../Image/Pages/PatientDetails/no-prescription-ic.svg';
import PrescriptionBox from '../../Layout/prescriptionBox';
import auth from '../../../../Helpers/auth';
import { PrescriptionTempData } from '../../../../Data';

const description = 'There is no prescription yet';

const CarePlanPrescription = (props) => {
  const [state, setState] = useMergeState({
    current: 'EMPTY', // DISPLAY or INPUT or EMPTY
    initCurrent: 'EMPTY',
    isShowHis: false,
  });
  const {
    className, prescription, fetchData,
  } = props;
  const { current, initCurrent, isShowHis } = state;

  useEffect(() => {
    // if (PrescriptionTempData?.length === 0) return;
    if (prescription?.length === 0) return;
    setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
  }, []);

  const formatTitle = (time = moment(), i = 0) => {
    const title = 'Current prescription - Start on ';
    return i === 0 ? title : `${time.format('MM/DD/YYYY')} - `;
  };

  const showDisplay = () => {
    // const showingData = isShowHis ? PrescriptionTempData : [PrescriptionTempData[0]];
    const showingData = isShowHis ? prescription : [prescription[0]];
    return (
      <div className="">

        <Blue1BgButton
          title="Add new prescription"
          onClick={() => setState({ current: 'INPUT' })}
        />
        {_.map(showingData, (x, i) => (
          <div key={i}>

            <Divider />

            <PrescriptionBox
              className="mt16"
              title={`${formatTitle(x?.stopDate, i)}${x?.date.format('MM/DD/YYYY')}`}
              data={x.data}
              isNoFooter
              type={i !== 0 ? 'DISPLAY' : ''}
            />
          </div>
        ))}

        {isShowHis ? null : (
          <Button
            onClick={() => setState({ isShowHis: !isShowHis })}
            ghost
            type="primary"
            className={classnames('edit-care-plan-button', 'f1-cen')}
          >
            View prescription history
          </Button>
        )}
      </div>
    );
  };

  const showEmpty = () => (
    <Empty
      className="mt80"
      image={<img src={noPrescriptionIc} alt="No data icon" />}
      description={<span>{description}</span>}
    >
      {auth.role() === 'MD' ? (
        <Button
          onClick={() => setState({ current: 'INPUT' })}
          className="f1-cen"
          type="primary"
          icon={<PlusOutlined />}
        >
          Add new prescription
        </Button>
      ) : null}
    </Empty>
  );

  return (
    <div className={classnames('care-plan-prescription-wrapper', className)}>

      {current === 'EMPTY' ? showEmpty() : null}

      {current === 'DISPLAY' ? showDisplay() : null}

      {current === 'INPUT'
        ? (
          <MDPrescription
            prescription={prescription}
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
CarePlanPrescription.defaultProps = {
  className: '',
  prescription: [],
  fetchData: () => { },
};
CarePlanPrescription.propTypes = {
  className: PropTypes.string,
  prescription: PropTypes.arrayOf(PropTypes.shape()),
  fetchData: PropTypes.func,
};

export default CarePlanPrescription;
