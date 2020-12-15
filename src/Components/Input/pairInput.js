import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { Input } from 'antd';
// import { useMergeState } from '../../Helpers/customHooks';
import InputCT from './inputCT';


const PairInput = (props) => {
  const {
    className,
    titleLeft, titleRight, onChangeLeft, onChangeRight,
    placeholderLeft, placeholderRight, disabledLeft, disabledRight,
    pad, valueLeft, valueRight, typeLeft, typeRight,
    isUnitLeft, isUnitRight, unitPlaceholderLeft, unitPlaceholderRight,
    unitValueLeft, unitValueRight, onChangeUnitLeft, onChangeUnitRight,
    unitTypeLeft, unitTypeRight,
  } = props;

  const getPadLeft = () => `left-${pad}`;
  const getPadRight = () => `right-${pad}`;

  return (
    <div className={classnames('pair-input-wrapper', className)}>

      <div className={classnames('pair-input-left', getPadLeft())}>
        <InputCT
          value={valueLeft}
          title={titleLeft}
          placeholder={placeholderLeft}
          onChange={onChangeLeft}
          disabled={disabledLeft}
          type={typeLeft}
        />

        {isUnitLeft ? (
          <div className="pair-input-unit-sep">
            <span>/</span>
          </div>
        ) : null}

        {isUnitLeft ? (
          <div className="pair-input-unit">
            <InputCT
              value={unitValueLeft}
              placeholder={unitPlaceholderLeft}
              onChange={onChangeUnitLeft}
              type={unitTypeLeft}
            />
          </div>
        ) : null}
      </div>

      <div className={classnames('pair-input-right', getPadRight())}>
        <InputCT
          value={valueRight}
          title={titleRight}
          placeholder={placeholderRight}
          onChange={onChangeRight}
          disabled={disabledRight}
          type={typeRight}
        />
        {isUnitRight ? (
          <div className="pair-input-unit-sep">
            <span>/</span>
          </div>
        ) : null}

        {isUnitRight ? (
          <div className="pair-input-unit">
            <InputCT
              value={unitValueRight}
              placeholder={unitPlaceholderRight}
              onChange={onChangeUnitRight}
              type={unitTypeRight}
            />
          </div>
        ) : null}
      </div>

    </div>
  );
};
PairInput.defaultProps = {
  className: '',

  titleLeft: '',
  titleRight: '',
  onChangeLeft: () => {},
  onChangeRight: () => { },
  pad: 8,
  placeholderLeft: '',
  placeholderRight: '',

  disabledLeft: false,
  disabledRight: false,
  valueLeft: undefined,
  valueRight: undefined,
  typeLeft: '',
  typeRight: '',

  isUnitLeft: false,
  isUnitRight: false,
  unitPlaceholderLeft: '',
  unitPlaceholderRight: '',
  unitValueLeft: '',
  unitValueRight: '',
  onChangeUnitLeft: () => {},
  onChangeUnitRight: () => { },
  unitTypeLeft: '',
  unitTypeRight: '',
};
PairInput.propTypes = {
  className: PropTypes.string,

  titleLeft: PropTypes.string,
  titleRight: PropTypes.string,
  onChangeLeft: PropTypes.func,
  onChangeRight: PropTypes.func,
  pad: PropTypes.number,
  placeholderLeft: PropTypes.string,
  placeholderRight: PropTypes.string,

  disabledLeft: PropTypes.bool,
  disabledRight: PropTypes.bool,
  valueLeft: PropTypes.string,
  valueRight: PropTypes.string,
  typeLeft: PropTypes.string,
  typeRight: PropTypes.string,

  isUnitLeft: PropTypes.bool,
  isUnitRight: PropTypes.bool,
  unitPlaceholderLeft: PropTypes.string,
  unitPlaceholderRight: PropTypes.string,
  unitValueLeft: PropTypes.string,
  unitValueRight: PropTypes.string,
  onChangeUnitLeft: PropTypes.func,
  onChangeUnitRight: PropTypes.func,
  unitTypeLeft: PropTypes.string,
  unitTypeRight: PropTypes.string,
};

export default PairInput;
