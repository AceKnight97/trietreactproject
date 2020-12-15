import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { removeitemFromArr, fetchAPISearchMedication } from '../../../Ultis';
import { useMergeState } from '../../../Helpers/customHooks';
import ModalHeader from '../../../Components/UI/modalHeader';
import ModalFooter from '../../../Components/UI/modalFooter';
import InputCT from '../../../Components/Input/inputCT';
import SelectCT from '../../../Components/Input/selectCT';
import DatepickerCT from '../../../Components/Input/datepickerCT';
import InputTitle from '../../../Components/Input/inputTitle';

// const medicationList = ['Medication name 1', 'Medication name 2', 'Medication name 3'];

const AddMedication = (props) => {
  const [state, setState] = useMergeState({
    medication: '',
    quantity: '',
    timeToTake: [''],
    notes: '',
    medicationList: ['Medication name 1', 'Medication name 2', 'Medication name 3'],
  });
  const {
    className, onClickCancel, onClickAdd,
  } = props;
  const {
    quantity, medication, notes, timeToTake, medicationList,
  } = state;
  const timeOutCallAPI = useRef(undefined);
  const isDisabled = () => timeToTake.includes('') || timeToTake.includes(null) || medication.length === 0 || !quantity;

  const onClickAddMore = () => {
    if (timeToTake.includes('') || timeToTake.includes(null)) return;
    timeToTake.push('');
    setState({ timeToTake });
  };

  const onClickDeleteItem = (x) => {
    setState({ timeToTake: removeitemFromArr(x, timeToTake) });
  };

  const showTimes = () => {
    const addPos = timeToTake.length % 2 === 0;
    return (
      <div className="mt16">
        <InputTitle title="Time to take" className="mb0" />

        <div className="time-to-take-main">
          {_.map(timeToTake, (x, i) => (
            <div key={i} className={classnames('ttt-item', i % 2 === 0 ? 'item-left' : 'item-right')}>
              <DatepickerCT
                suffixIcon={<div />}
                placeholder="Select time"
                onChange={(val) => {
                  timeToTake[i] = val;
                  setState({ timeToTake });
                }}
                format="HH:mm"
                value={x}
                type="TIME"
              />
              {x || i === 0 ? null
                : (
                  <Button
                    className={classnames('item-button', i % 2 === 0 ? 'right-22' : 'right-10')}
                    onClick={() => onClickDeleteItem(x)}
                  >
                    <CloseOutlined />
                  </Button>
                )}
            </div>
          ))}

          <div className={classnames('button-wrapper', addPos ? 'item-left' : 'item-right')}>
            <Button
              type="link"
              className={classnames('add-more-button')}
              onClick={onClickAddMore}
            >
              <PlusOutlined className="mr4" />
              Add more
            </Button>
          </div>
        </div>

      </div>
    );
  };

  const callAPI = async (term = '') => {
    timeOutCallAPI.current = undefined;
    console.log('callAPI: ', term);
    try {
      const data = await fetchAPISearchMedication(term);
      console.log('Search result: ', data);
      // const searchResult = convertNewMedicationItem(data.data.products);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onChangeText = (value = '') => {
    // if (timeOutCallAPI.current) clearTimeout(timeOutCallAPI.current);
    setState({ medication: value });
    // timeOutCallAPI.current = setTimeout(() => callAPI(value), 500);
  };


  return (
    <div className={classnames('add-medication-wrapper', className)}>

      <ModalHeader title="Add medication" onClick={onClickCancel} />

      <div className="add-medication-body">

        <SelectCT
          suffixIcon=""
          title="Medication"
          placeholder="Find and select a medication"
          onChange={x => setState({ medication: x })}
          onSearch={onChangeText}
          data={medicationList}
          value={medication || undefined}
        />
        <InputCT
          decimalScale={0}
          className="mt16"
          type="NUMBER"
          title="Quantity"
          placeholder="--"
          onChange={x => setState({ quantity: x })}
          value={quantity}
        />

        {showTimes()}

        <InputCT
          className="mt16"
          type="TEXTAREA"
          title="Notes"
          placeholder="Notes..."
          onChange={x => setState({ notes: x })}
          value={notes}
        />
      </div>

      <ModalFooter
        leftTitle="Cancel"
        rightTitle="Add to prescription"
        onClickLeftBtn={onClickCancel}
        onClickRightBtn={() => onClickAdd(state)}
        disabled={isDisabled()}
      />

    </div>
  );
};
AddMedication.defaultProps = {
  className: '',
  onClickCancel: () => {},
  onClickAdd: () => { },
};
AddMedication.propTypes = {
  className: PropTypes.string,
  onClickCancel: PropTypes.func,
  onClickAdd: PropTypes.func,
};

export default AddMedication;
