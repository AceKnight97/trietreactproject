import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useMergeState } from '../../../../Helpers/customHooks';
import ModalHeader from '../../../../Components/UI/modalHeader';
import ModalFooter from '../../../../Components/UI/modalFooter';
import InputCT from '../../../../Components/Input/inputCT';
import RadioCT from '../../../../Components/Input/radioCT';
import auth from '../../../../Helpers/auth';


const MDChoiceData = [
  {
    title: 'Continue with the current care plan',
  },
  {
    title: 'Modify care plan',
  },
];

const AddInterpretation = (props) => {
  const [state, setState] = useMergeState({
    data: [],
    interpretation: '',
    mdChoise: MDChoiceData[0],
  });
  const role = auth.role();
  const { className, toggleAIModal } = props;

  const onChange = mdChoise => setState({ mdChoise });
  const { interpretation, mdChoise } = state;

  const onClickAddInterpretation = () => {
    console.log('onClickAddInterpretation: ', interpretation);
    // call API
  };

  const showMDChoices = () => (
    <RadioCT
      className="mt4" // + 12 = 16
      data={MDChoiceData}
      value={mdChoise}
      onChange={onChange}
      type="NONE" // mt12
    />
  );

  return (
    <div className={classnames('add-modal-wrapper', className)}>
      {/* HEADER */}
      <ModalHeader title="Add interpretation" onClick={toggleAIModal} />

      {/* BODY */}
      <div className="add-modal-body">
        <div className="add-body-main">
          <InputCT
            type="TEXTAREA"
            placeholder="Interpretation..."
            onChange={x => setState({ interpretation: x })}
            value={interpretation}
          />
        </div>
        {role === 'MD' ? showMDChoices() : null}
      </div>

      {/* FOOTER */}
      <ModalFooter
        leftTitle="Cancel"
        rightTitle="Add interpretation"
        onClickLeftBtn={toggleAIModal}
        onClickRightBtn={onClickAddInterpretation}
      />

    </div>
  );
};
AddInterpretation.defaultProps = {
  className: '',
  toggleAIModal: () => {},
};
AddInterpretation.propTypes = {
  className: PropTypes.string,
  toggleAIModal: () => {},
};

export default AddInterpretation;
