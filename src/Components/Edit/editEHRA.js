import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Divider } from 'antd';
import { useMergeState } from '../../Helpers/customHooks';
import RadioCT from '../Input/radioCT';
import { EHRA_SCORE } from '../../Constants';

const { Title, Text } = Typography;
const EditEHRA = (props) => {
  const [state, setState] = useMergeState({
    EHRAScore: EHRA_SCORE[0],
  });
  const onClickBottomButton = (isSaveClicked) => {
    if (isSaveClicked) {
    } else {
      props.onClickCancel();
    }
  };
  const onChangeRadio = (value) => {
    setState({ EHRAScore: value });
  };
  return (
    <>
      <div>
        <Title level={4}>Edit EHRA score</Title>
        <Divider />
        <Title level={5}>EHRA score</Title>
        <RadioCT
          data={EHRA_SCORE}
          value={state.EHRAScore}
          onChange={onChangeRadio}
          type="SCORE"
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
        >
          Save
        </Button>
      </div>
    </>
  );
};

EditEHRA.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
};
EditEHRA.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default EditEHRA;
