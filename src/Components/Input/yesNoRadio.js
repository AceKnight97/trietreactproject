import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Radio } from 'antd';
// import { useMergeState } from '../../Helpers/customHooks';
import InputTitle from './inputTitle';

const YesNoRadio = (props) => {
  // const [state, setState] = useMergeState({
  //   value: props.value,
  // });
  const {
    className, title, data, value, onChange,
  } = props;

  return (
    <div className={classnames('yes-no-radio-wrapper', className)}>

      <InputTitle title={title} className="mb8" />

      <Radio.Group
        onChange={e => onChange(e.target.value)}
        value={value}
        className={classnames('yes-no-radio-main')}
      >
        {_.map(data, (x, i) => (
          <div key={i} className="radio-item">
            <Radio value={x} className={i !== 0 ? 'mt8' : ''}>
              {x}
            </Radio>
          </div>
        ))}
      </Radio.Group>
    </div>
  );
};
YesNoRadio.defaultProps = {
  className: '',
  title: '',
  onChange: () => {},
  data: ['No', 'Yes'],
  value: undefined,
};
YesNoRadio.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
};

export default YesNoRadio;
