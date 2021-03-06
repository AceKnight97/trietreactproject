import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { } from 'antd';


const DisplayData3 = (props) => {
  const {
    className, title, data,
  } = props;


  return (
    <div className={classnames('display-data-3-wrapper', className)}>

      <div className={classnames('size-16-b-g9', 'mb12')}>
        <span>{title}</span>
      </div>

      <div className={classnames('size-14-n-g9')}>
        <span>{data}</span>
      </div>

    </div>
  );
};
DisplayData3.defaultProps = {
  className: '',
  title: '',
  data: '',
};
DisplayData3.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.string,
};

export default DisplayData3;
