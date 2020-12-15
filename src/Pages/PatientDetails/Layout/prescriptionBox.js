import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Collapse } from 'antd';
import _ from 'lodash';
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';
import Blue1BgButton from '../../../Components/Button/blue1BgButton';
import { useMergeState } from '../../../Helpers/customHooks';

const { Panel } = Collapse;
const boxHeaderArr = ['Medication', 'Quantity & frequency', 'Notes'];

const PrescriptionBox = (props) => {
  const [state, setState] = useMergeState({
    isCollapsed: props.isCollapsed,
  });

  const {
    className, data, onClickAdd, isNoFooter, title, titleClassName,
  } = props;

  const { isCollapsed } = state;

  if (isNoFooter && data.length === 0) return null;

  const showFre = (object = {}) => {
    const { quantity, timeToTake } = object;
    if (!quantity || !timeToTake) return null;
    const quantityCT = `${quantity} pill${quantity > 1 ? 's' : ''} / time`;
    const timeToTakeCT = `${timeToTake?.length} time${timeToTake?.length > 1 ? 's' : ''} / day`;
    const frequencyArr = [quantityCT, timeToTakeCT];
    return (
      <div className="data-item">
        {_.map(frequencyArr, (x, i) => (
          <div key={i}>
            <span>{x}</span>
          </div>
        ))}
      </div>
    );
  };

  const headerView = () => (
    <div className={classnames('size-16-b-g9', titleClassName)}>
      <span>{title}</span>
    </div>
  );

  const showBody = () => (
    <div className="prescription-box-body">
      {data.length === 0 ? (
        <div className="no-data-item">
          <span>There is no medication yet</span>
        </div>
      ) : _.map(data, (x, i) => (
        <div key={i} className="data-item-row">
          <div className="data-item">
            <span>{x.medication}</span>
          </div>
          {showFre(x)}
          <div className="data-item">
            <span>{x.notes}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const showInput = () => (
    <div className={classnames('prescription-box-wrapper', isNoFooter ? '' : 'no-border-bottom', className)}>
      <div className="prescription-box-header">
        {_.map(boxHeaderArr, (x, i) => (
          <div key={i} className="header-item">
            <span>{x}</span>
          </div>
        ))}
      </div>

      {showBody()}
    </div>
  );

  const expandIcon = () => {
    if (`${isCollapsed}`.includes('true')) return <CaretDownFilled />;
    return <CaretRightFilled />;
  };

  const onChange = (key = []) => setState({ isCollapsed: key });

  const showDisplay = () => (
    <Collapse
      onChange={onChange}
      expandIcon={expandIcon}
      defaultActiveKey={[`${isCollapsed}`]}
      expandIconPosition="right"
    >
      <Panel ghost header={headerView()} key="true">
        {showInput()}
      </Panel>
    </Collapse>
  );

  return (
    <>
      {isNoFooter ? showDisplay() : (
        <div className="">
          {headerView()}
          {showInput()}
        </div>
      )}

      {isNoFooter ? null : (
        <Blue1BgButton
          className="add-medication-button"
          title="Add medication"
          onClick={onClickAdd}
        />
      )}
    </>
  );
};
PrescriptionBox.defaultProps = {
  className: '',
  data: [],
  onClickAdd: () => { },
  isNoFooter: false,
  title: '',
  titleClassName: '',
  isCollapsed: false,
};
PrescriptionBox.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  onClickAdd: PropTypes.func,
  isNoFooter: PropTypes.bool,
  title: PropTypes.string,
  titleClassName: PropTypes.string,
  isCollapsed: PropTypes.bool,
};

export default PrescriptionBox;
