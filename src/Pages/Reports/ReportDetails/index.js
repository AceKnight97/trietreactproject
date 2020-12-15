import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { useHistory, useLocation } from 'react-router';
import { Modal } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import ReportDetailsHeader from './Layout/reportDetailsHeader';
import ReportDetailsPdfViewer from './Layout/reportDetailsPdfViewer';
import AddInterpretation from './Layout/addInterpretation';
import ConfirmationLayout from './Layout/confirmationLayout';
import AddSignature from './Layout/addSignature';
import { AppTableData } from '../../../Data';
import auth from '../../../Helpers/auth';


const ReportDetails = (props) => {
  const [state, setState] = useMergeState({
    addInterpretationModal: false,
    addSignatureModal: false,
    sendReportModal: false,
    saveChangesModal: false,
    patientData: {},
    name: 'notification',
    interpretation: '',
  });
  const role = auth.role();
  const { className } = props;
  const {
    addInterpretationModal, sendReportModal, saveChangesModal, patientData, name,
    addSignatureModal,
  } = state;

  const history = useHistory();
  const location = useLocation();
  const { goBack } = history;
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
    console.log('name: ', name);
    setState({ patientData, name });
  }, []);

  const toggleAIModal = () => setState({ addInterpretationModal: !addInterpretationModal });
  const toggleASModal = () => setState({ addSignatureModal: !addSignatureModal });
  const toggleSRModal = () => setState({ sendReportModal: !sendReportModal });
  const toggleSCModal = () => setState({ saveChangesModal: !saveChangesModal });

  return (
    <div className={classnames('report-details-wrapper', className)}>
      <ReportDetailsHeader
        onClickBack={goBack}
        data={patientData}
        name={name}
        toggleSRModal={toggleSRModal}
      />

      <ReportDetailsPdfViewer
        toggleAIModal={toggleAIModal}
        toggleASModal={toggleASModal}
        toggleSCModal={toggleSCModal}
      />

      <Modal visible={addInterpretationModal} closable={false} footer={null} destroyOnClose>
        <AddInterpretation toggleAIModal={toggleAIModal} />
      </Modal>

      <Modal visible={addSignatureModal} closable={false} footer={null} destroyOnClose>
        <AddSignature toggleASModal={toggleASModal} />
      </Modal>

      <Modal visible={sendReportModal} closable={false} footer={null} className="modal-send-report" destroyOnClose>
        <ConfirmationLayout toggleClick={toggleSRModal} type="SEND_REPORT" />
      </Modal>

      <Modal visible={saveChangesModal} closable={false} footer={null} className="modal-save-changes" destroyOnClose>
        <ConfirmationLayout toggleClick={toggleSCModal} type="SAVE_CHANGES" />
      </Modal>

    </div>
  );
};
ReportDetails.defaultProps = {
  className: '',
};
ReportDetails.propTypes = {
  className: PropTypes.string,
};

export default ReportDetails;
