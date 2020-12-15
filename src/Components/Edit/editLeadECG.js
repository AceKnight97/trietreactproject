import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Divider } from 'antd';
import _ from 'lodash';
import LeadECG from '../Form/12LeadECG';
import { useMergeState } from '../../Helpers/customHooks';
import { LEAD_ECG } from '../../Constants';

const { Title } = Typography;
const EditLeadECG = (props) => {
  const [state, setState] = useMergeState({
    leadECG: {
      date: '',
      summary: '',
      attachment: '',
    },
    isDisableSaveButton: false,
  });
  const onClickBottomButton = (isSaveClicked) => {
    if (isSaveClicked) {

    } else {
      props.onClickCancel();
    }
  };
  const onChangeDate = (value, name) => {
    const newStateData = _.cloneDeep(state.leadECG);
    newStateData.date = value;
    setState({ leadECG: newStateData });
  };
  const onChangeInput = (value, name) => {
    const newStateData = _.cloneDeep(state.leadECG);
    newStateData.summary = value;
    setState({ leadECG: newStateData });
  };
  const onChangeUpload = (fileList, name) => {
    const newStateData = _.cloneDeep(state.leadECG);
    newStateData.attachment = fileList;
    setState({ leadECG: newStateData });
  };
  return (
    <>
      <Title level={4}>Edit 12-lead ECG</Title>
      <Divider />
      <LeadECG
        data={state.leadECG}
        onChangeDate={onChangeDate}
        onChangeInput={onChangeInput}
        onChangeUpload={onChangeUpload}
        name="leadECG"
      />
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
EditLeadECG.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditLeadECG.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditLeadECG;
