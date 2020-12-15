import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from 'antd';
import _ from 'lodash';
import classnames from 'classnames';
import SelectCT from '../Input/selectCT';
import MultipleCheckbox from '../Input/multipleCheckbox';
import { useMergeState } from '../../Helpers/customHooks';
import FullWidthButtons from '../Button/fullWidthButtons';
import { getStateData } from '../../Ultis';
import {
  AfibConfirmData, AfibPatternData, HeartValveIssuseData, ValvularHeartDiseaseData, MitralValveStatusData,
} from '../../Constants';

const { Title, Text } = Typography;

const AFIBInformation = (props) => {
  const [state, setState] = useMergeState({
    afibConfirm: undefined,
    afibPattern: undefined,

    // Heart valve status
    heartValveIssue: undefined,

    valvularHeartDisease: undefined,
    heartValveReplacement: [
      {
        value: 'Left',
        isCheck: false,
      },
      {
        value: 'Right',
        isCheck: false,
      },
    ],
    mitralValveStatus: undefined,
  });

  const {
    className, type, onClickRight, onClickLeft, data,
  } = props;

  useEffect(() => {
    console.log('data: ', data);
    const {
      afibConfirm, afibPattern, heartValveIssue, valvularHeartDisease, heartValveReplacement, mitralValveStatus,
    } = data;
    const tempArr = {
      afibConfirm, afibPattern, heartValveIssue, valvularHeartDisease, heartValveReplacement, mitralValveStatus,
    };
    setState(getStateData(tempArr));
  }, []);

  const {
    afibConfirm, afibPattern, heartValveIssue, valvularHeartDisease, heartValveReplacement, mitralValveStatus,
  } = state;


  const onChangeMultiCheckbox = (keyValue, obj, x) => {
    const data = state[keyValue];
    const item = _.find(data, x => x.value === obj.value);
    _.assign(item, { isCheck: x });
    setState({ [keyValue]: data });
  };

  const onChange = (key = '', value = '') => setState({ [key]: value });

  const isDisabled = () => {
    const condition1 = !afibConfirm || !afibPattern || !heartValveIssue;
    if (condition1) return true;
    switch (heartValveIssue) {
      case HeartValveIssuseData[0]:
        return false;
      case HeartValveIssuseData[1]:
        if (valvularHeartDisease) return false;
        return true;
      case HeartValveIssuseData[2]:
        if ((heartValveReplacement[0].isCheck || heartValveReplacement[1].isCheck) && mitralValveStatus) return false;
        return true;
      default:
        return true;
    }
  };

  const showIssueDetails = () => {
    switch (heartValveIssue) {
      case HeartValveIssuseData[1]:
        return (
          <SelectCT
            className="mt16"
            title="Valvular Heart Disease"
            placeholder="Select..."
            data={ValvularHeartDiseaseData}
            value={valvularHeartDisease}
            onChange={x => onChange('valvularHeartDisease', x)}
          />
        );
      case HeartValveIssuseData[2]:
        return (
          <div className="">
            <MultipleCheckbox
              className="mt16"
              title="Which valve?"
              data={heartValveReplacement}
              onChange={(obj, x) => onChangeMultiCheckbox('heartValveReplacement', obj, x)}
            />
            <SelectCT
              className="mt16"
              title="Mitral valve status"
              placeholder="Select..."
              data={MitralValveStatusData}
              value={mitralValveStatus}
              onChange={x => onChange('mitralValveStatus', x)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const showFooterButtons = () => {
    const rightTitle = type === 'INPUT' ? 'Next step' : 'Save';
    const leftTitle = type === 'INPUT' ? '' : 'Cancel';
    return (
      <FullWidthButtons
        rightTitle={rightTitle}
        leftTitle={leftTitle}
        // disabled={isDisabled()}
        onClickLeft={() => onClickLeft(state)}
        onClickRight={() => onClickRight(state)}
      />
    );
  };

  return (
    <div className={classnames('afib-information-wrapper', className)}>
      <div className="">
        <Title level={5}>AFib information</Title>

        <SelectCT
          className="mt16"
          title="AFib confirmed via"
          placeholder="Select..."
          data={AfibConfirmData}
          value={afibConfirm}
          onChange={x => onChange('afibConfirm', x)}
          name="afibConfirm"
        />

        <SelectCT
          className="mt16"
          title="Pattern of AFib"
          placeholder="Select..."
          data={AfibPatternData}
          onChange={x => onChange('afibPattern', x)}
          name="afibPattern"
          value={afibPattern}
        />

        <Divider />

        <Title level={5}>Heart valve status</Title>

        <SelectCT
          className="mt16 mb16"
          title="Issues"
          placeholder="Select..."
          data={HeartValveIssuseData}
          value={heartValveIssue}
          onChange={x => onChange('heartValveIssue', x)}
          name="heartValveIssue"
        />

        {showIssueDetails()}
      </div>

      {showFooterButtons()}
    </div>
  );
};
AFIBInformation.defaultProps = {
  className: '',
  type: '',
  onClickLeft: () => {},
  onClickRight: () => { },
  data: {},
};

AFIBInformation.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  data: PropTypes.shape(),
};

export default AFIBInformation;
