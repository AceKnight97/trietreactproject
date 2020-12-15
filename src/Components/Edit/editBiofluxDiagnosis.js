import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider } from 'antd';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';

import BiofluxDiagnosis from '../Form/biofluxDiagnosis';

const { Title, Text } = Typography;
const EditBiofluxDiagnosis = (props) => {
  const [state, setState] = useMergeState({
    biofluxDiagnosis: {
      diagnosisInfo: '',
      technicianComment: '',
      attachments: '',
    },
    isUsingBiofluxDiagnosisInfo: false,
    isDisableSaveButton: false,
  });
  const onClickBottomButton = (isSaveClicked) => {
    if (isSaveClicked) {
    } else {
      props.onClickCancel();
    }
  };
  const onClickCheckbox = (checked) => {
    setState({ isUsingBiofluxDiagnosisInfo: checked });
  };
  const onChangeInput = (value, name) => {
    const newState = { ...state.biofluxDiagnosis };
    newState[name] = value;
    setState({ biofluxDiagnosis: newState });
  };
  const onChangeUpload = (fileList, name) => {
    const newState = { ...state.biofluxDiagnosis };
    newState.attachments = fileList;
    setState({ biofluxDiagnosis: newState });
  };
  return (
    <>
      <div>
        <Title level={4}>Edit Bioflux diagnosis</Title>
        <Divider />
        <BiofluxDiagnosis
          isUsingBiofluxDiagnosisInfo={state.isUsingBiofluxDiagnosisInfo}
          onClickCheckbox={onClickCheckbox}
          onChangeInput={onChangeInput}
          onChangeUpload={onChangeUpload}
          data={state.biofluxDiagnosis}
        />
      </div>
      <div className="mt48 fr-sb">
        <Button
          style={{ width: '177px', color: '#595959' }}
          onClick={() => onClickBottomButton(false)}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          style={{ width: '177px' }}
          onClick={() => onClickBottomButton(true)}
          disabled={state.isDisableSaveButton}
        >
          Save
        </Button>
      </div>
    </>
  );
};

EditBiofluxDiagnosis.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditBiofluxDiagnosis.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditBiofluxDiagnosis;
