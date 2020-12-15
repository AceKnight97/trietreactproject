import React, {
  useState, useContext, useEffect, useRef, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Divider, Button } from 'antd';
import { useMergeState } from '../../../Helpers/customHooks';
import InputCT from '../../../Components/Input/inputCT';
import { getStateData, checkNoData } from '../../../Ultis';

const MDDiseasesInformation = (props) => {
  const [state, setState] = useMergeState({
    currentDiseases: '',
    monitoredDiseases: '',
  });
  const {
    className, onClickCancel, diseasesInfo, onClickSaveAdd,
  } = props;
  const initBtnTitle = useRef('Add');
  const initDiseasesInfo = useRef(JSON.stringify(diseasesInfo));

  useEffect(() => {
    const { currentDiseases, monitoredDiseases } = diseasesInfo;
    const conditionArr = [currentDiseases, monitoredDiseases];
    if (checkNoData(conditionArr)) return;
    setState(getStateData(diseasesInfo));
    initBtnTitle.current = 'Save';
  }, []);

  const { currentDiseases, monitoredDiseases } = state;

  const onChange = (key, value) => setState({ [key]: value });

  const isDisabled = () => {
    const conditionsArr = [currentDiseases, monitoredDiseases];
    if (checkNoData(conditionsArr)) return true;
    if (initDiseasesInfo.current === JSON.stringify(state) && initBtnTitle.current === 'Save') return true;
    return false;
  };

  const showTitle = () => {
    const title = 'Diseases information';
    return (
      <div className="size-20-b-g9">
        <span>{title}</span>
      </div>
    );
  };

  const showDiseases = (title = '', key = '', value = '', className = '') => (
    <div className={className}>
      <div className="size-16-b-g9">
        <span>{title}</span>
      </div>

      <InputCT
        className="mt16"
        value={value}
        placeholder="Conclusion..."
        type="TEXTAREA"
        onChange={x => onChange(key, x)}
      />
    </div>
  );

  return (
    <div className={classnames('md-diseases-information-wrapper', className)}>
      <div className="md-diseases-information-main">

        {showTitle()}

        <Divider />

        {showDiseases('The current diseases', 'currentDiseases', currentDiseases)}

        {showDiseases('The diseases are being monitored', 'monitoredDiseases', monitoredDiseases, 'mt24')}

        <div className="footer-buttton-div">
          <Button onClick={onClickCancel} className="buttton-with">
            Cancel
          </Button>
          <Button
            type="primary"
            className={classnames('buttton-with')}
            onClick={() => onClickSaveAdd('cpDiseasesInfo', state)}
            disabled={isDisabled()}
          >
            Save
          </Button>
        </div>

      </div>
    </div>
  );
};
MDDiseasesInformation.defaultProps = {
  className: '',
  onClickCancel: () => { },
  diseasesInfo: {},
  onClickSaveAdd: () => {},
};
MDDiseasesInformation.propTypes = {
  className: PropTypes.string,
  onClickCancel: PropTypes.func,
  diseasesInfo: PropTypes.shape(),
  onClickSaveAdd: PropTypes.func,
};

export default MDDiseasesInformation;
