import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Divider } from 'antd';
import _ from 'lodash';
import CompleteBloodCount from '../Form/completeBloodCount';
import { useMergeState } from '../../Helpers/customHooks';

const { Title } = Typography;
const EditCompleteBloodCount = (props) => {
  const [state, setState] = useMergeState({
    completeBloodCount: {
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
    const newStateData = _.cloneDeep(state.completeBloodCount);
    newStateData.date = value;
    setState({ completeBloodCount: newStateData });
  };
  const onChangeInput = (value, name) => {
    const newStateData = _.cloneDeep(state.completeBloodCount);
    newStateData.summary = value;
    setState({ completeBloodCount: newStateData });
  };
  const onChangeUpload = (fileList, name) => {
    const newStateData = _.cloneDeep(state.completeBloodCount);
    newStateData.attachment = fileList;
    setState({ completeBloodCount: newStateData });
  };
  return (
    <>
      <Title level={4}>Edit Complete blood count</Title>
      <Divider />
      <CompleteBloodCount
        data={state.completeBloodCount}
        onChangeDate={onChangeDate}
        onChangeInput={onChangeInput}
        onChangeUpload={onChangeUpload}
        name="completeBloodCount"
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
EditCompleteBloodCount.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditCompleteBloodCount.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditCompleteBloodCount;
