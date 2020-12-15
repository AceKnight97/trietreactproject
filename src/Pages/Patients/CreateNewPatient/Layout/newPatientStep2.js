
import React, {
  useEffect,
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import { NewPatientData } from '../../../../Constants';
import {
  getStateData, isCheckOne, removeitemFromArr, setMultipleCheckboxData,
} from '../../../../Ultis';
import UploadFileCT from '../../../../Components/Input/updateFileCT';
import CheckboxCT from '../../../../Components/Input/checkboxCT';
import MultipleCheckbox from '../../../../Components/Input/multipleCheckbox';
import RadioCT from '../../../../Components/Input/radioCT';
import InputCT from '../../../../Components/Input/inputCT';

const {
  AFibDurationQuestion,
  AFibStatusQuestion,
  CardioversionQuestion,
  ElectricalShockQuestion,
  CurrentSymptomsQuestion,
  PastMedicalHistorQuestion,
  MedicationsQuestion,
  HospitalizedQuestion,
  ImageOfECGQuestion,
  PalpitationsChildren,
  OtherOption,
} = NewPatientData.AfibHistoryData;

const { afibDurationTitle, afibDurationdata } = AFibDurationQuestion;

const { afibStatusTitle, afibStatusdata } = AFibStatusQuestion;

const { cardioversionTitle, cardioversiondata } = CardioversionQuestion;

const { electricalTitle, electricaldata } = ElectricalShockQuestion;

const { currentSymptomsTitle, currentSymptomsData } = CurrentSymptomsQuestion;

const { pastMedicalHistoryTitle, pastMedicalHistoryData } = PastMedicalHistorQuestion;

const { imgOETitle, imgOEPlaceholder } = ImageOfECGQuestion;

const {
  usedTitle, usedData, usedSelectData, usedPlaceholder,
  usingTitle, usingData, usingSelectData, usingPlaceholder,
} = MedicationsQuestion;

const { hospitalizedTitle, hospitalizeddata } = HospitalizedQuestion;

const defaultData = {
  afibDuration: afibDurationdata[0],
  afibStatus: afibStatusdata[0],
  cardioversion: cardioversiondata[1],
  electricalShock: electricaldata[1],

  // CURRENT SYMPTOMS
  currentSymptoms: [],
  palpitationTriggers: [],
  palpitationOther: '',

  // PAST MEDICAL HISTORY
  pastMedicalHistory: [],
  pastMedicalOther: '',

  usedMedications: [],
  noUsedMedications: false,
  usingMedications: [],
  noUsingMedications: false,

  hospitalized: hospitalizeddata[1],
  imgOE: [],
};

const NewPatientStep2 = (props) => {
  const [state, setState] = useMergeState({
    ...defaultData,
  });

  useEffect(() => {
    if (_.isEmpty(props.info)) {
      const currentSymptoms = setMultipleCheckboxData(currentSymptomsData);
      const palpitationTriggers = setMultipleCheckboxData(PalpitationsChildren.data);
      const pastMedicalHistory = setMultipleCheckboxData(pastMedicalHistoryData);
      setState({
        currentSymptoms, palpitationTriggers, pastMedicalHistory, usedMedications: [], usingMedications: [],
      });
    } else setState(getStateData(props.info));
  }, []);

  const onChangeArr = (keyValue, x) => {
    const data = state[keyValue];
    if (data.includes(x)) {
      const array = removeitemFromArr(x, data);
      setState({ [keyValue]: array });
    } else {
      data.push(x);
      setState({ [keyValue]: data });
    }
  };

  const onChange = (keyValue, x) => { setState({ [keyValue]: x }); };


  const onChangeMultiCheckbox = (keyValue, obj, x) => {
    const data = state[keyValue];
    const item = _.find(data, x => x.value === obj.value);
    _.assign(item, { isCheck: x });
    setState({ [keyValue]: data });
  };

  const showRadioQuestions = () => {
    const {
      afibDuration, afibStatus, cardioversion, electricalShock,
    } = state;
    return (
      <div>
        <RadioCT
          title={afibDurationTitle}
          data={afibDurationdata}
          value={afibDuration}
          onChange={x => onChange('afibDuration', x)}
          type="QUESTION"
        />

        <RadioCT
          className="mt24"
          title={afibStatusTitle}
          data={afibStatusdata}
          value={afibStatus}
          onChange={x => onChange('afibStatus', x)}
          type="QUESTION"
        />

        <RadioCT
          className="mt24"
          title={cardioversionTitle}
          data={cardioversiondata}
          value={cardioversion}
          onChange={x => onChange('cardioversion', x)}
          type="QUESTION"
        />

        <RadioCT
          className="mt24"
          title={electricalTitle}
          data={electricaldata}
          value={electricalShock}
          onChange={x => onChange('electricalShock', x)}
          type="QUESTION"
        />
      </div>
    );
  };

  const showCurrentSympAndPastMedi = () => {
    const {
      currentSymptoms, pastMedicalHistory, palpitationTriggers, palpitationOther, pastMedicalOther,
    } = state;
    const currentSymptoms1 = currentSymptoms[0];
    const currentSymptoms2 = currentSymptoms.slice(1);
    const { title } = PalpitationsChildren;
    const triggerItem = _.find(palpitationTriggers, x => x.value === OtherOption);
    const isOtherPastMedi = _.find(pastMedicalHistory, x => x.value === OtherOption);

    return (
      <div>
        <MultipleCheckbox
          isBoldValue
          className="mt24"
          title={currentSymptomsTitle}
          data={[currentSymptoms1]}
          onChange={(obj, x) => onChangeMultiCheckbox('currentSymptoms', obj, x)}
        />

        {currentSymptoms1?.isCheck
          ? (
            <div>
              <MultipleCheckbox
                className="mt4-padl24"
                titleClassName="fw-normal"
                title={title}
                data={palpitationTriggers}
                onChange={(obj, x) => onChangeMultiCheckbox('palpitationTriggers', obj, x)}
              />
              {triggerItem?.isCheck ? (
                <InputCT
                  className="mt4-padl48"
                  placeholder="Enter other option"
                  onChange={x => onChange('palpitationOther', x)}
                  value={palpitationOther}
                />
              ) : null}
            </div>
          ) : null}

        <MultipleCheckbox
          isBoldValue
          className="mt8"
          data={currentSymptoms2}
          onChange={(obj, x) => onChangeMultiCheckbox('currentSymptoms', obj, x)}
        />

        <MultipleCheckbox
          className="mt24"
          title={pastMedicalHistoryTitle}
          data={pastMedicalHistory}
          onChange={(obj, x) => onChangeMultiCheckbox('pastMedicalHistory', obj, x)}
        />

        {isOtherPastMedi?.isCheck ? (
          <InputCT
            className="mt4-padl24"
            placeholder="Enter other option"
            onChange={x => onChange('pastMedicalOther', x)}
            value={pastMedicalOther}
          />
        ) : null}
      </div>
    );
  };

  const showMedicationsQuestion = () => {
    const {
      usedMedications, noUsedMedications,
      usingMedications, noUsingMedications,
    } = state;
    return (
      <div>
        <CheckboxCT
          className="mt24"
          title={usedTitle}
          data={usedData}
          value={usedMedications}
          selectData={usedSelectData}
          placeholder={usedPlaceholder}
          isCheck={noUsedMedications}
          onChange={(x) => {
            const obj = { noUsedMedications: x };
            if (x) _.assign(obj, { usedMedications: [] });
            setState(obj);
          }}
          onChangeInput={x => onChangeArr('usedMedications', x)}
          type="SELECT"
          mode="multiple"
        />

        <CheckboxCT
          className="mt24"
          title={usingTitle}
          data={usingData}
          value={usingMedications}
          selectData={usingSelectData}
          placeholder={usingPlaceholder}
          isCheck={noUsingMedications}
          onChange={(x) => {
            const obj = { noUsingMedications: x };
            if (x) _.assign(obj, { usingMedications: [] });
            setState(obj);
          }}
          onChangeInput={x => onChangeArr('usingMedications', x)}
          type="SELECT"
          mode="multiple"
        />

      </div>
    );
  };

  const showHospitalizedQuestion = () => {
    const { hospitalized } = state;
    return (
      <RadioCT
        className="mt24"
        title={hospitalizedTitle}
        data={hospitalizeddata}
        value={hospitalized}
        onChange={x => onChange('hospitalized', x)}
        type="QUESTION"
      />
    );
  };

  const showUploadFiles = () => {
    const { imgOE } = state;
    const onUpdateImg = (fileList) => {
      const arr = [];
      _.forEach(fileList, (x) => { if (x.status === 'done') arr.push(x); });
      setState({ imgOE: [...arr] });
    };
    return (
      <UploadFileCT
        className="mt24"
        titleClassName="upload-files-title"
        title={imgOETitle}
        fileList={imgOE}
        onChange={onUpdateImg}
        placeholder={imgOEPlaceholder}
      />
    );
  };

  const isDisabled = () => {
    const {
      afibDuration, afibStatus, cardioversion, electricalShock,
      currentSymptoms, pastMedicalHistory, palpitationTriggers, palpitationOther, pastMedicalOther,
      usedMedications, noUsedMedications, usingMedications, noUsingMedications,
      hospitalized, // imgOE,
    } = state;
    // console.log('state: ', state);

    const triggerItem = _.find(palpitationTriggers, x => x.value === OtherOption);
    const lenPal = palpitationTriggers.length;

    const isOtherPastMedi = _.find(pastMedicalHistory, x => x.value === OtherOption);
    const lenMedi = pastMedicalHistory.length;


    const radioCondition = !_.isEmpty(afibDuration) && !_.isEmpty(afibStatus)
      && !_.isEmpty(cardioversion) && !_.isEmpty(electricalShock) && !_.isEmpty(hospitalized);

    const symptomCondition = isCheckOne(currentSymptoms.slice(1))
      || (triggerItem.isCheck && palpitationOther || isCheckOne(palpitationTriggers.slice(0, lenPal - 1)));

    const pastMediCondition = isCheckOne(pastMedicalHistory.slice(0, lenMedi - 1))
      || (isOtherPastMedi.isCheck && pastMedicalOther);

    const symptomAndMediCondition = symptomCondition && pastMediCondition;
    const meditionsCondition = (noUsedMedications || usedMedications.length !== 0)
      && (noUsingMedications || usingMedications.length !== 0);

    // console.log('isDisabled: ', radioCondition, symptomAndMediCondition, meditionsCondition);
    if (radioCondition && symptomAndMediCondition && meditionsCondition) return false;
    return true;
  };

  const { className, onClickNext, onClickPrevious } = props;
  return (
    <div className={classnames('new-patient-step2-wrapper', className)}>

      {showRadioQuestions()}

      {showCurrentSympAndPastMedi()}

      {showMedicationsQuestion()}

      {showHospitalizedQuestion()}

      {showUploadFiles()}

      <div className="footer-buttton-div">
        <Button onClick={() => onClickPrevious({ ...state })} className="buttton-with">
          Previous step
        </Button>
        <Button
          type="primary"
          className={classnames('buttton-with')}
          onClick={() => onClickNext(state)}
          disabled={isDisabled()}
        >
          Next
        </Button>
      </div>

    </div>
  );
};
NewPatientStep2.defaultProps = {
  className: '',
  onClickNext: () => { },
  onClickPrevious: () => { },
  info: {},
};
NewPatientStep2.propTypes = {
  className: PropTypes.string,
  onClickNext: PropTypes.func,
  onClickPrevious: PropTypes.func,
  info: PropTypes.shape(),
};

export default NewPatientStep2;
