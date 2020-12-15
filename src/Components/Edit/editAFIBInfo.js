import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Divider } from 'antd';
import _ from 'lodash';
import AFIBInformation from '../Form/afibInformation';
import { useMergeState } from '../../Helpers/customHooks';
import FullWidthButtons from '../Button/fullWidthButtons';

const { Title } = Typography;
const EditAFIBInfo = (props) => {
  const [state, setState] = useMergeState({
    afibInfo: {
      afibConfirm: '',
      afibPattern: '',
      heartValveIssue: 'No issue',
      whichValve: [
        {
          label: 'Left',
          isChecked: false,
          name: 'left',
        },
        {
          label: 'Right',
          isChecked: false,
          name: 'right',
        },
      ],
      valveStatus: 'Normal',
    },
    isDisableSaveButton: false,
  });
  const { afibInfo } = state;
  const { onSaveClick } = props;

  const isDisabled = () => {
    const a = 'b';
    if (a === 'b') return true;
    return false;
  };
  const onChangeSelect = (value, name) => {
    const newAfibInfo = { ...afibInfo };
    newAfibInfo[name] = value;
    setState({ afibInfo: newAfibInfo });
  };

  const onClickCheckBox = (checked, name) => {
    const newAfibInfo = { ...afibInfo };
    _.forEach(newAfibInfo.whichValve, (item) => {
      if (item.name === name) {
        item.isChecked = checked;
      }
    });
    setState({ afibInfo: newAfibInfo });
  };

  return (
    <div>
      <AFIBInformation
        data={afibInfo}
        onClickCheckBox={onClickCheckBox}
        onChangeSelect={onChangeSelect}
      />
      <Divider />
      <FullWidthButtons
        disabled={isDisabled()}
        rightTitle="Save"
        leftTitle="Cancel"
        onClickLeft={() => onSaveClick(false)}
        onClickRight={() => onSaveClick(true)}
      />
    </div>
  );
};
EditAFIBInfo.defaultProps = {
  onSaveClick: () => {},
};
EditAFIBInfo.propTypes = {
  onSaveClick: PropTypes.func,
};

export default EditAFIBInfo;

// <div>
// <Title level={4}>Edit AFib information</Title>

// <Divider />

// <AFIBInformation
//   data={state.afibInfo}
//   onClickCheckBox={onClickCheckBox}
//   onChangeSelect={onChangeSelect}
// />

// <FullWidthButtons
//   disabled={isDisableSaveButton}
//   rightTitle="Save"
//   leftTitle="Cancel"
//   onClickLeft={() => onClickBottomButton(false)}
//   onClickRight={() => onClickBottomButton(true)}
// />
// </div>
