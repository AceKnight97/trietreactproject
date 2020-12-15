import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from 'antd';
import classnames from 'classnames';
import CheckboxCT from '../Input/checkboxCT';
import InputCT from '../Input/inputCT';
import UploadFileCT from '../Input/updateFileCT';
import { useMergeState, useUpdateEffect } from '../../Helpers/customHooks';
import { checkNoData, getStateData } from '../../Ultis';
import FullWidthButtons from '../Button/fullWidthButtons';

const { Title } = Typography;

const BiofluxDiagnosis = (props) => {
  const [state, setState] = useMergeState({
    isUsingBiofluxDiagnosisInfo: true,
    biofluxDiagnosisTechComment: undefined,
    biofluxDiagnosisInfo: undefined,
    biofluxDiagnosisAttachment: [],
  });
  const {
    isUsingBiofluxDiagnosisInfo,
    biofluxDiagnosisTechComment, biofluxDiagnosisInfo, biofluxDiagnosisAttachment,
  } = state;
  const {
    className, type, onClickRight, onClickLeft, data,
  } = props;

  useEffect(() => {
    const {
      isUsingBiofluxDiagnosisInfo,
      biofluxDiagnosisTechComment, biofluxDiagnosisInfo, biofluxDiagnosisAttachment,
    } = data;
    const tempArr = {
      isUsingBiofluxDiagnosisInfo,
      biofluxDiagnosisTechComment,
      biofluxDiagnosisInfo,
      biofluxDiagnosisAttachment,
    };
    setState(getStateData(tempArr));
  }, []);

  const onChange = (key = '', value = '') => setState({ [key]: value });


  const isDisabled = () => {
    if (!isUsingBiofluxDiagnosisInfo) return false;
    if (!biofluxDiagnosisTechComment || !biofluxDiagnosisInfo) return true;
    return false;
  };


  const showFooterButtons = () => {
    const rightTitle = type === 'INPUT' ? 'Next step' : 'Save';
    const leftTitle = type === 'INPUT' ? 'Previous step' : 'Cancel';
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
    <div className={classnames('bioflux-diagnosis-wrapper', className)}>
      <div className="">
        <Title level={5}>Bioflux diagnosis</Title>

        <CheckboxCT
          className="mt24"
          data="Using Bioflux diagnosis info"
          isCheck={isUsingBiofluxDiagnosisInfo}
          onChange={x => setState({ isUsingBiofluxDiagnosisInfo: x })}
        />

        {isUsingBiofluxDiagnosisInfo && (
          <div className="">
            <InputCT
              className="mt16"
              title="Diagnosis info"
              type="TEXTAREA"
              onChange={x => onChange('biofluxDiagnosisInfo', x)}
              value={biofluxDiagnosisInfo}
              placeholder="Diagnosis info..."
            />

            <InputCT
              className="mt16"
              title="Technician comments"
              type="TEXTAREA"
              onChange={x => onChange('biofluxDiagnosisTechComment', x)}
              value={biofluxDiagnosisTechComment}
              placeholder="Comments..."
            />

            <UploadFileCT
              title="Attachment"
              className="mt16"
              onChange={x => onChange('biofluxDiagnosisAttachment', x)}
              data={biofluxDiagnosisAttachment}
            />
          </div>
        )}
      </div>

      {showFooterButtons()}

    </div>
  );
};
BiofluxDiagnosis.defaultProps = {
  className: '',
  type: '',
  onClickLeft: () => {},
  onClickRight: () => { },
  data: {},
};

BiofluxDiagnosis.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  data: PropTypes.shape(),
};
export default BiofluxDiagnosis;
