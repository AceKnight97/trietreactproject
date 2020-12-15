import React, {
  useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';


const Blue1BgButton = (props) => {
  const {
    className, onClick, icon, title,
  } = props;
  return (
    <div className={classnames('blue1-bg-button-wrapper', className)}>
      <Button
        type="link"
        className=""
        icon={icon || <PlusOutlined />}
        onClick={onClick}
      >
        {title}
      </Button>
    </div>
  );
};
Blue1BgButton.defaultProps = {
  className: '',
  onClick: () => {},
  icon: '',
  title: '',
};
Blue1BgButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string,
};

export default Blue1BgButton;
