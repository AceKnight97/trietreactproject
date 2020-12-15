import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Checkbox } from 'antd';
import InputTitle from './inputTitle';

const MultipleCheckbox = (props) => {
  const {
    className, data, suffix, title, isBoldValue,
    titleClassName, rowClassName,
  } = props;

  const onChange = (x, e) => {
    props.onChange(x, e.target.checked);
  };

  return (
    <div className={classnames('multiple-checkbox-wrapper', className)}>

      <InputTitle title={title} className={classnames('checkbox-ct-title', titleClassName)} />

      {_.map(data, (x, i) => (
        <div key={i} className={classnames('multiple-checkbox-main', rowClassName)}>
          <div className="multiple-checkbox-value">
            <Checkbox
              className={classnames('checkbox-item', isBoldValue ? 'fw600' : '')}
              checked={x?.isCheck}
              disabled={x?.disabled}
              onChange={e => onChange(x, e)}
            >
              {x?.value}
            </Checkbox>
            {x?.content ? (
              <div className="multiple-checkbox-content">
                <span>{x.content}</span>
              </div>
            ) : null}
          </div>

          {x?.suffix ? (
            <div className="checkbox-suffix">
              <span>{x.suffix}</span>
            </div>
          ) : null}
        </div>
      ))}

    </div>
  );
};
MultipleCheckbox.defaultProps = {
  className: '',
  titleClassName: '',
  rowClassName: '',
  title: '',
  data: [],
  onChange: () => {},
  suffix: '',
  isBoldValue: false,
};
MultipleCheckbox.propTypes = {
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  onChange: PropTypes.func,
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isBoldValue: PropTypes.bool,
};

export default MultipleCheckbox;
