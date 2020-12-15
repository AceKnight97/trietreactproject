import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { StopHCData } from '../../../Data';
import { useMergeState } from '../../../Helpers/customHooks';
import ModalHeader from '../../../Components/UI/modalHeader';
import ModalFooter from '../../../Components/UI/modalFooter';
import RadioCT from '../../../Components/Input/radioCT';
import InputCT from '../../../Components/Input/inputCT';

const StopHealthCareModal = (props) => {
  const [state, setState] = useMergeState({
    stopReason: StopHCData[0].title,
    otherReason: '',
  });
  const {
    className, onClickCancel, onClickAdd, name,
  } = props;
  const { stopReason, otherReason } = state;

  const reasonDisplayed = () => {
    let res = StopHCData[0];
    _.forEach(StopHCData, (x) => { if (x.title === stopReason) res = x; });
    return res;
  };

  const getBoldName = () => <span className="b">{` ${name || 'Eduardo Cooper'}. `}</span>;

  return (
    <div className={classnames('stop-health-care-modal-wrapper', className)}>

      <ModalHeader title="Stop health care program" onClick={onClickCancel} />

      <div className="shc-modal-body">
        <div className="size-14-n-g9">
          <span>
            You are going to stop the health care program of
          </span>
          {getBoldName()}
          <span>
            What is the reason for completion?
          </span>
        </div>

        <RadioCT
          textClass="mt16"
          data={StopHCData}
          value={reasonDisplayed()}
          onChange={x => setState({ stopReason: x.title })}
          type="BIG"
        />
        {stopReason === 'Other' ? (
          <InputCT
            className="mt4-padl24"
            placeholder="Enter other option"
            onChange={x => setState({ otherReason: x })}
            value={otherReason}
          />
        ) : null}
      </div>

      <ModalFooter
        disabled={stopReason === 'Other' && !otherReason}
        leftTitle="Cancel"
        rightTitle="Stop health care program"
        onClickLeftBtn={onClickCancel}
        onClickRightBtn={() => onClickAdd(stopReason === 'Other' ? otherReason : stopReason)}
      />

    </div>
  );
};
StopHealthCareModal.defaultProps = {
  className: '',
  name: '',
  onClickCancel: () => {},
  onClickAdd: () => { },
};
StopHealthCareModal.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onClickCancel: PropTypes.func,
  onClickAdd: PropTypes.func,
};

export default StopHealthCareModal;
