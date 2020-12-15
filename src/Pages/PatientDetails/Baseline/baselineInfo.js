import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMergeState } from '../../../Helpers/customHooks';
import noDocumentIc from '../../../Image/Pages/PatientDetails/no-document-ic.svg';
import BaselineInfoView from './baselineInfoView';
import 'antd/dist/antd.css';
import InputBaselineInfo from './inputBaselineInfo';

const description = 'There is no data to display';

const BaselineInfo = (props) => {
  const [state, setState] = useMergeState({
    current: 'EMPTY', // DISPLAY or INPUT or EMPTY
  });
  const { current } = state; // initCurrent, editKey

  const { baselineInformation, onClickInputBaselineInfo, fetchData } = props;

  useEffect(() => {
    if (_.isEmpty(baselineInformation)) return;
    setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
  }, []);

  const onFinishInputBaseline = (info = {}) => {
    fetchData('baselineInformation', { ...baselineInformation, ...info });
    setState({ current: 'DISPLAY', initCurrent: 'DISPLAY' });
  };

  const showEmpty = () => (
    <Empty
      className="mt80 fitems-center f-col"
      image={<img src={noDocumentIc} alt="no document" />}
      description={<span>{description}</span>}
    >
      <Button
        className="f1-r"
        type="primary"
        icon={<PlusOutlined />}
        onClick={onClickInputBaselineInfo}
      >
        Input baseline information
      </Button>
    </Empty>
  );

  return (
    <div className="baseline-info-main">
      {current === 'EMPTY' ? showEmpty() : null}

      {current === 'DISPLAY' ? (
        <BaselineInfoView
          baselineInformation={baselineInformation}
          fetchData={fetchData}
        />
      ) : null}

      {current === 'INPUT' ? (
        <InputBaselineInfo
          onClickCancelBaselineInfo={onClickInputBaselineInfo}
          onClickFinish={onFinishInputBaseline}
        />
      ) : null}

    </div>
  );
};
BaselineInfo.defaultProps = {
  baselineInformation: {},
  onClickInputBaselineInfo: () => { },
  fetchData: () => {},
};
BaselineInfo.propTypes = {
  baselineInformation: PropTypes.shape(),
  onClickInputBaselineInfo: PropTypes.func,
  fetchData: PropTypes.func,
};

export default BaselineInfo;
