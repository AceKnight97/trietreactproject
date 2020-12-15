import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';

import ExerciseStressTesting from '../Form/exerciseStressTesting';
import Echocardiogram from '../Form/echocardiogram';

const { Title, Text } = Typography;
const EditPreviousCardiacMonitor = (props) => {
  const [state, setState] = useMergeState({
    exerciseStressTesting: {
      date: '',
      input: '',
      attachment: '',
    },
    echocardiogram: {
      date: '',
      input: '',
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
    const newStateData = { ...state[name] };
    newStateData.date = value;
    setState({ [name]: newStateData });
  };
  const onChangeInput = (value, name) => {
    const newStateData = { ...state[name] };
    newStateData.input = value;
    setState({ [name]: newStateData });
  };
  const onChangeUpload = (fileList, name) => {
    const newStateData = _.cloneDeep(state);
    newStateData[name].attachment = fileList;
    setState({ state: newStateData });
  };
  return (
    <>
      <div>
        <Title level={4}>Edit Previous cardiac monitor results</Title>
        <Divider />
        <Title level={5} className="mb-4">Previous cardiac monitor results</Title>
        <ExerciseStressTesting
          data={state.exerciseStressTesting}
          onChangeDate={onChangeDate}
          onChangeInput={onChangeInput}
          onChangeUpload={onChangeUpload}
          name="exerciseStressTesting"
        />
        <Divider />
        <Echocardiogram
          data={state.echocardiogram}
          onChangeDate={onChangeDate}
          onChangeInput={onChangeInput}
          name="echocardiogram"
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

EditPreviousCardiacMonitor.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditPreviousCardiacMonitor.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditPreviousCardiacMonitor;
