
import React, {
  useEffect,
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button, Divider } from 'antd';
import { useMergeState } from '../../../../Helpers/customHooks';
import { NewPatientData } from '../../../../Constants';
import { isValidEmail, getRealPhone, getStateData } from '../../../../Ultis';
import SelectCT from '../../../../Components/Input/selectCT';
import DatepickerCT from '../../../../Components/Input/datepickerCT';
import InputCT from '../../../../Components/Input/inputCT';
import YesNoRadio from '../../../../Components/Input/yesNoRadio';
import PairInput from '../../../../Components/Input/pairInput';
import UnitInput from '../../../../Components/Input/unitInput';
import InputAddress from '../../../../Components/Input/inputAddress';
import RadioCT from '../../../../Components/Input/radioCT';

const {
  GenderData, HeightUnitData, WeightUnitData, CountryData,
  InsuranceData,
} = NewPatientData.GeneralInformationData;


const NewPatientStep1 = (props) => {
  const [state, setState] = useMergeState({
    // BASIC INFO
    firstName: '',
    lastName: '',
    dob: undefined,
    gender: GenderData[0],

    height: undefined,
    heightUnit: HeightUnitData[0],
    weight: undefined,
    weightUnit: WeightUnitData[0],

    // CONTACT
    email: '',
    phoneNumber: '',
    country: undefined,
    address: '',
    city: '',
    stateAddress: '',

    // INSURANCE
    insurance: InsuranceData[0],
  });

  useEffect(() => {
    setState(getStateData(props.info));
  }, []);

  const showBasicInformation = () => {
    const {
      firstName, lastName, dob, gender,
      height, weight, heightUnit, weightUnit,
    } = state;
    return (
      <div className="step1-basic-info">
        <div className="page-title">
          <span>Basic information</span>
        </div>

        <PairInput
          className="mt16"
          valueLeft={firstName}
          titleLeft="First name"
          placeholderLeft="Enter first name"
          onChangeLeft={x => setState({ firstName: x })}
          valueRight={lastName}
          titleRight="Last name"
          placeholderRight="Enter last name"
          onChangeRight={x => setState({ lastName: x })}
        />

        <DatepickerCT
          className="mt16"
          title="Date of birth"
          onChange={x => setState({ dob: x })}
          value={dob}
          disabledDate="PAST"
        />

        {/* <YesNoRadio
          value={gender}
          className="mt16"
          title="Gender"
          data={GenderData}
        /> */}

        <RadioCT
          title="Gender"
          titleClassName={classnames('fw-normal', 'mb0')}
          className="mt16"
          textClass="mt8"
          data={GenderData}
          value={gender}
          onChange={x => setState({ gender: x })}
          type="QUESTION"
        />

        <UnitInput
          className="mt16"
          value={height}
          title="Height"
          onChange={x => setState({ height: x })}
          placeholder="--"
          onChangeUnit={x => setState({ heightUnit: x })}
          unitValue={heightUnit}
          data={HeightUnitData}
        />

        <UnitInput
          className="mt16"
          value={weight}
          onChange={x => setState({ weight: x })}
          title="Weight"
          placeholder="--"
          onChangeUnit={x => setState({ weightUnit: x })}
          unitValue={weightUnit}
          data={WeightUnitData}
        />

      </div>
    );
  };

  const showContact = () => {
    const {
      email, phoneNumber, country, address, city, stateAddress,
    } = state;
    return (
      <div className="step1-contact">
        <div className="page-title">
          <span>Contact</span>
        </div>

        <InputCT
          className="mt16"
          title="Email"
          value={email}
          placeholder="johnsmith@example.com"
          onChange={x => setState({ email: x })}
        />

        <InputCT
          className="mt16"
          title="Phone number"
          value={phoneNumber}
          placeholder="(012) - 456 - 7890"
          onChange={x => setState({ phoneNumber: x })}
          type="NUMBER"
          mask="_"
          format="(###) - ### - ####"
        />

        <SelectCT
          className="mt16"
          title="Country"
          value={country}
          data={CountryData}
          onChange={x => setState({ country: x })}
        />

        <InputAddress
          className="mt16"
          name="create-new-patient"
          value={address}
          onChange={x => setState({ address: x })}
          city={city}
          stateAddress={stateAddress}
          onChangeCity={x => setState({ city: x })}
          onChangeSate={x => setState({ stateAddress: x })}
        />

      </div>
    );
  };

  const showInsurance = () => {
    const { insurance } = state;
    return (
      <div className="step1-insurance">
        <div className="page-title">
          <span>Insurance</span>
        </div>

        <RadioCT
          className="mt4"
          textClass="mt12"
          data={InsuranceData}
          value={insurance}
          onChange={x => setState({ insurance: x })}
          type="QUESTION"
        />

      </div>
    );
  };

  const isDisabled = () => {
    const {
      firstName, lastName, dob, // gender,
      height, weight, // heightUnit, weightUnit,
      email, phoneNumber, country, address, // city, stateAddress,
      insurance,
    } = state;
    if (firstName && lastName && dob && height && weight
      && email && isValidEmail(email) && phoneNumber && getRealPhone(phoneNumber) === 10
      && country && address && !_.isEmpty(insurance)) return false;
    return true;
  };
  const { className, onClickNext } = props;

  return (
    <div className={classnames('new-patient-step1-wrapper', className)}>

      {showBasicInformation()}

      <Divider />

      {showContact()}

      <Divider />

      {showInsurance()}

      <div className="footer-buttton-div">
        <div />
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
NewPatientStep1.defaultProps = {
  className: '',
  onClickNext: () => { },
  info: {},
};
NewPatientStep1.propTypes = {
  className: PropTypes.string,
  onClickNext: PropTypes.func,
  info: PropTypes.shape(),
};

export default NewPatientStep1;

// const {
//   // BASIC INFO
//   firstName, lastName, dob, gender,
//   height, heightUnit, weight, weightUnit,
//   // CONTACT
//   email, phoneNumber, country, address, city, stateAddress,
//   // INSURANCE
//   insurance,
// } = props.info;
