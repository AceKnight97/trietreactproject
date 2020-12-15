import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Radio } from 'antd';
// import { useMergeState } from '../../Helpers/customHooks';
import InputTitle from './inputTitle';

const RadioCT = (props) => {
  // const [state, setState] = useMergeState({
  // });
  const {
    className, data, type, title, value, textClass, onChange,
    titleClassName, radioItemClassName,
  } = props;

  let itemMagrinTop = 'mt18';
  let itemClassName = '';
  let titleClass = '';
  switch (type) {
    case 'QUESTION':
      itemMagrinTop = 'mt8';
      itemClassName = 'question-item-normal';
      titleClass = titleClassName || 'question-title';
      break;
    case 'SCORE':
      itemClassName = 'score-ct';
      itemMagrinTop = '';
      break;
    case 'BIG':
      itemClassName = 'big-margin';
      break;
    case 'NONE':
      itemMagrinTop = 'mt12';
      itemClassName = 'fw-normal';
      break;
    default:
      break;
  }

  return (
    <div className={classnames('radio-ct-wrapper', className)}>
      <InputTitle title={title} className={titleClass} />
      <Radio.Group
        onChange={e => onChange(e.target.value)}
        value={value}
      >
        {_.map(data, (x, i) => (
          <div key={i} className={classnames('radio-item', radioItemClassName)}>
            <Radio
              value={x}
              className={classnames(itemMagrinTop, itemClassName, textClass, x.content ? 'fw-600' : '')}
            >
              {x.title}
            </Radio>
            {x.content ? (
              <div className="radio-content">
                <span>{x.content}</span>
              </div>
            ) : null}
          </div>
        ))}
      </Radio.Group>
    </div>
  );
};
RadioCT.defaultProps = {
  className: '',
  textClass: '',
  titleClassName: '',
  radioItemClassName: '',
  onChange: () => {},
  data: [],
  // itemMagrinTop: 'mt18',
  type: 'SCORE',
  title: '',
  value: {},
};
RadioCT.propTypes = {
  className: PropTypes.string,
  textClass: PropTypes.string,
  titleClassName: PropTypes.string,
  radioItemClassName: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape()),
  // itemMagrinTop: PropTypes.string,
  value: PropTypes.shape(),
  title: PropTypes.string,
  type: PropTypes.string,
};

export default RadioCT;
