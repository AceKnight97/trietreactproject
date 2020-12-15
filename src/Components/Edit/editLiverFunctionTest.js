import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Divider } from 'antd';
import _ from 'lodash';
import LiverFunctionTest from '../Form/liverFunctionTest';
import { useMergeState } from '../../Helpers/customHooks';

const { Title } = Typography;
const EditLiverFunctionTest = (props) => {
  const [state, setState] = useMergeState({
    liverFunctionTest: {
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
    const newStateData = _.cloneDeep(state.liverFunctionTest);
    newStateData.date = value;
    setState({ liverFunctionTest: newStateData });
  };
  const onChangeInput = (value, name) => {
    const newStateData = _.cloneDeep(state.liverFunctionTest);
    newStateData.summary = value;
    setState({ liverFunctionTest: newStateData });
  };
  const onChangeUpload = (fileList, name) => {
    const newStateData = _.cloneDeep(state.liverFunctionTest);
    newStateData.attachment = fileList;
    setState({ liverFunctionTest: newStateData });
  };
  return (
    <>
      <Title level={4}>Edit Liver function test</Title>
      <Divider />
      <LiverFunctionTest
        data={state.liverFunctionTest}
        onChangeDate={onChangeDate}
        onChangeInput={onChangeInput}
        onChangeUpload={onChangeUpload}
        name="liverFunctionTest"
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
EditLiverFunctionTest.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditLiverFunctionTest.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditLiverFunctionTest;
