import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Table, Collapse } from 'antd';
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';
import _ from 'lodash';
import Blue1BgButton from '../../../Components/Button/blue1BgButton';
import { useMergeState } from '../../../Helpers/customHooks';

const dataHeader = ['Medication', 'Quantity & frequency', 'Notes'];
const dataKey = ['medication', 'frequency', 'notes'];
const { Panel } = Collapse;

const PrescriptionTable = (props) => {
  const [state, setState] = useMergeState({
    tableData: [],
    isCollapsed: props.isCollapsed,
  });
  const {
    className, data, onClickAdd, isNoFooter, title, titleClassName, tableClassName,
  } = props;

  useEffect(() => {
    const tableData = [];
    _.forEach(data, (x) => {
      const {
        quantity, timeToTake, medication, notes,
      } = x;
      const quantityCT = `${quantity} pill${quantity > 1 ? 's' : ''} / time`;
      const timeToTakeCT = `${timeToTake?.length} time${timeToTake?.length > 1 ? 's' : ''} / day`;
      const frequency = `${quantityCT}\n${timeToTakeCT}`;
      tableData.push({ medication, notes, frequency });
    });
    setState({ tableData });
  }, [props.data]);

  const { tableData, isCollapsed } = state;

  const onChange = (key = []) => setState({ isCollapsed: key });

  const getTableColumns = () => {
    const arr = [];
    if (dataHeader.length === 0) return arr;
    _.forEach(dataHeader, (x, i) => {
      const key = dataKey[i];
      const obj = {
        title: x,
        dataIndex: key,
        key,
        render: (cell, row) => (
          <div className="min-height-45">
            <span>{cell}</span>
          </div>
        ),
      };
      arr.push(obj);
    });
    return arr;
  };

  const headerView = () => (
    <div className={classnames('size-16-b-g9', titleClassName)}>
      <span>{title}</span>
    </div>
  );

  const expandIcon = () => {
    if (`${isCollapsed}`.includes('true')) return <CaretDownFilled />;
    return <CaretRightFilled />;
  };

  const showInput = () => (
    <Table
      key="medication"
      className={classnames('prescription-table-main', isNoFooter ? '' : 'no-border-bottom', tableClassName)}
      columns={getTableColumns()}
      dataSource={tableData}
      pagination={false}
      locale={{ emptyText: 'There is no medication yet' }}
    />
  );

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
    <div className={classnames('prescription-table-wrapper', className)}>

      {isNoFooter ? showDisplay() : (
        <div className="">
          {headerView()}
          {showInput()}
        </div>
      )}

      {isNoFooter ? null : (
        <Blue1BgButton
          className="prescription-table-footer-button"
          title="Add medication"
          onClick={onClickAdd}
        />
      )}

    </div>
  );
};
PrescriptionTable.defaultProps = {
  className: '',
  tableClassName: '',
  data: [],
  onClickAdd: () => { },
  isNoFooter: false,
  title: '',
  titleClassName: '',
  isCollapsed: false,
};
PrescriptionTable.propTypes = {
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  onClickAdd: PropTypes.func,
  isNoFooter: PropTypes.bool,
  title: PropTypes.string,
  titleClassName: PropTypes.string,
  isCollapsed: PropTypes.bool,
};

export default PrescriptionTable;
