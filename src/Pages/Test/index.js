import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { removeitemFromArr } from '../../Ultis';
import { useMergeState } from '../../Helpers/customHooks';
import SelectCT from '../../Components/Input/selectCT';
import DatepickerCT from '../../Components/Input/datepickerCT';
import InputCT from '../../Components/Input/inputCT';
import UploadImgCT from '../../Components/Input/uploadImgCT';
import UploadFileCT from '../../Components/Input/updateFileCT';
import CheckboxCT from '../../Components/Input/checkboxCT';
import RadioCT from '../../Components/Input/radioCT';
import YesNoRadio from '../../Components/Input/yesNoRadio';
import PairInput from '../../Components/Input/pairInput';
import UnitInput from '../../Components/Input/unitInput';

const MulipleRadio = [
  {
    title: 'None - 1',
    content: '',
  },
  {
    title: 'None - 2',
    content: 'Normal daily activity not affected; symptoms not troublesome to patient',
  },
  {
    title: 'None - 3',
    content: 'Normal daily activity not affected but patient troubled by symptoms',
  },
  {
    title: 'None - 4',
    content: 'Normal daily activity affected',
  },
  {
    title: 'None - 5',
    content: 'Normal daily activity discontinued',
  },
];
function Test(props) {
  const [state, setState] = useMergeState({
    data: [],
    isCheck: false,
    unitValue: undefined,
    firstName: '',
    lastName: '',
    multiRadioValue: {},
    datepickerValue: moment(),
    textValue: '',
    outisdeValue: [],
    numberValue: '',
  });
  const { className } = props;
  const {
    isCheck, unitValue, firstName, lastName, datepickerValue, textValue,
    outisdeValue, numberValue,
  } = state;

  function showUnitAndpairInput() {
    return (
      <>
        <UnitInput
          title="Height"
          placeholder="--"
          onChangeUnit={x => setState({ unitValue: x })}
          unitValue={unitValue}
        />

        <PairInput
          className="mt24"
          valueLeft={firstName}
          titleLeft="First name"
          placeholderLeft="Enter first name"
          onChangeLeft={x => setState({ firstName: x })}
          valueRight={lastName}
          titleRight="Last name"
          placeholderRight="Enter last name"
          onChangeRight={x => setState({ lastName: x })}
        />
      </>
    );
  }

  function showRadioInput() {
    return (
      <>
        <YesNoRadio value="Yes" className="mt24" title="Smoker" />

        <RadioCT
          className="mt24"
          data={MulipleRadio}
          value={MulipleRadio[3]}
          onChange={x => setState({ multiRadioValue: x })}
        />
      </>
    );
  }

  function showSelectAndDatepicker() {
    return (
      <>
        <SelectCT
          className="mt24"
          title="AFib confirmed via"
          data={['a', 'b', 'c']}
          onChange={x => console.log('x: ', x)}
        />

        <DatepickerCT
          className="mt24"
          title="Date"
          onChange={x => setState({ datepickerValue: x })}
          value={datepickerValue}
        />
      </>
    );
  }

  function showInputs() {
    return (
      <>
        <InputCT
          className="mt24"
          disabled
          title="First name"
          placeholder="Enter first name"
          onChange={x => console.log('x: ', x)}
        />

        <InputCT
          className="mt24"
          type="TEXTAREA"
          placeholder="Enter your summary"
          title="Summary"
          onChange={x => setState({ textValue: x })}
          value={textValue}
        />
      </>
    );
  }

  function showUploads() {
    return (
      <>
        <UploadImgCT
          className="mt24"
          title="Attachment"
          onChange={x => console.log('x: ', x)}
        />

        <UploadFileCT
          className="mt24"
          title="Attachment"
          onChange={x => console.log('x: ', x)}
        />
      </>
    );
  }

  function showCheckboxes() {
    return (
      <>
        <CheckboxCT className="mt24" data="line 1" suffix={1} />
        <CheckboxCT
          className="mt24"
          data="line 2"
          isCheck={isCheck}
          onChange={x => setState({ isCheck: x })}
          type="SELECT_DATE"
        />
        <CheckboxCT className="mt24" data="line 3" />
        <CheckboxCT
          className="mt24"
          data="Ensure the patient aged 30-79 years with no prior history of coronary heart
disease, no intermittent claudication or diabetes"
        />
        <CheckboxCT
          className="mt24"
          data="line 5"
          isCheck={isCheck}
          onChange={x => setState({ isCheck: x })}
          type="TEXTAREA"
          placeholder="Enter conditions..."
        />
      </>
    );
  }

  function test() {
    return (
      <>
        {null}
      </>
    );
  }

  return (
    <div className={classnames('test-wrapper', className)}>

      {showUnitAndpairInput()}

      {showRadioInput()}

      {showSelectAndDatepicker()}

      {showInputs()}

      {showUploads()}

      {showCheckboxes()}

      <SelectCT
        isValueOutside
        className="mt24"
        title="AFib confirmed via"
        data={['a', 'b', 'c']}
        value={outisdeValue}
        onChange={(x) => {
          if (outisdeValue.includes(x)) {
            const array = removeitemFromArr(x, outisdeValue);
            setState({ outisdeValue: array });
          } else {
            outisdeValue.push(x);
            setState({ outisdeValue });
          }
        }}
      />

      <InputCT
        className="mt24"
        type="NUMBER"
        title="Number custom"
        placeholder="Enter your age"
        onChange={x => setState({ numberValue: x })}
        value={numberValue}
      />

    </div>
  );
}
Test.defaultProps = {
  className: '',
};
Test.propTypes = {
  className: PropTypes.string,
};

export default Test;
