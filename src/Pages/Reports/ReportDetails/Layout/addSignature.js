import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { PDFDocument, degrees, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { UndoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import { useMergeState } from '../../../../Helpers/customHooks';
import ModalHeader from '../../../../Components/UI/modalHeader';
import ModalFooter from '../../../../Components/UI/modalFooter';
import InputCT from '../../../../Components/Input/inputCT';
import CheckboxCT from '../../../../Components/Input/checkboxCT';

const AddSignature = (props) => {
  const [state, setState] = useMergeState({
    signature: '',
    isRemember: true,
  });
  const { className, toggleASModal } = props;

  const { signature, isRemember } = state;

  const onClickAddSignature = () => {
    console.log('onClickAddSignature: ', signature);
    // call API
  };

  return (
    <div className={classnames('add-modal-wrapper', className)}>
      {/* HEADER */}
      <ModalHeader title="Add signature" onClick={toggleASModal} />

      {/* BODY */}
      <div className="add-modal-body">
        <div className="add-body-signature">
          <InputCT
            type="TEXTAREA"
            placeholder="Signature..."
            onChange={x => setState({ signature: x })}
            value={signature}
          />
          <Button className={classnames('undo-button', 'bas-0-btn')} type="ghost">
            <UndoOutlined />
          </Button>
        </div>
        <CheckboxCT
          className="mt16"
          data="Remember signature"
          isCheck={isRemember}
          onChange={x => setState({ isRemember: x })}
        />
      </div>

      {/* FOOTER */}
      <ModalFooter
        leftTitle="Cancel"
        rightTitle="Add signature"
        onClickLeftBtn={toggleASModal}
        onClickRightBtn={onClickAddSignature}
      />

    </div>
  );
};
AddSignature.defaultProps = {
  className: '',
  toggleASModal: () => {},
};
AddSignature.propTypes = {
  className: PropTypes.string,
  toggleASModal: () => {},
};

export default AddSignature;
