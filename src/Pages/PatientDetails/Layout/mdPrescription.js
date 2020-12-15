import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { Divider, Button } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import PrescriptionBox from './prescriptionBox';
import AddMedication from './addMedication';
import DrawerModalCT from '../../../Components/UI/drawerModalCT';
import HalfRightButtons from '../../../Components/Button/halfRightButtons';

const MDPrescription = (props) => {
  const [state, setState] = useMergeState({
    isAddMedi: false,
    meicationData: [],
  });
  const {
    className, onClickCancel, onClickSaveAdd, prescription,
  } = props;
  const { isAddMedi, meicationData } = state;

  useEffect(() => {

  }, []);

  const togleAddMedi = () => setState({ isAddMedi: !isAddMedi });

  const onClickAddMedi = (info) => {
    console.log('onClickAddMedi: ', info);
    meicationData.push(info);
    setState({ isAddMedi: false });
  };

  const handleAdd = () => {
    const obj = {
      date: moment(),
      data: meicationData,
    };
    prescription.unshift(obj);
    onClickSaveAdd('cpPrescription', prescription);
  };

  return (
    <div className={classnames('md-prescription-wrapper', className)}>
      <div className="md-prescription-main">
        <div className="size-20-b-g9">
          <span>Add new prescription</span>
        </div>

        <Divider />

        <PrescriptionBox data={meicationData} onClickAdd={togleAddMedi} />

        <HalfRightButtons
          className="mt50"
          disabled={meicationData.length === 0}
          rightTitle="Add prescription"
          onClickLeft={onClickCancel}
          onClickRight={handleAdd}
        />

      </div>

      <DrawerModalCT visible={isAddMedi} type="MODAL" className="modal-add-interpretation">
        <AddMedication onClickCancel={togleAddMedi} onClickAdd={onClickAddMedi} />
      </DrawerModalCT>

    </div>
  );
};
MDPrescription.defaultProps = {
  className: '',
  onClickCancel: () => { },
  onClickSaveAdd: () => { },
  prescription: [],
};
MDPrescription.propTypes = {
  className: PropTypes.string,
  onClickCancel: PropTypes.func,
  onClickSaveAdd: PropTypes.func,
  prescription: PropTypes.arrayOf(PropTypes.shape()),
};

export default MDPrescription;
