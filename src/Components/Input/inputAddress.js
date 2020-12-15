import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { UncontrolledPopover } from 'reactstrap';
import _ from 'lodash';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete';
import { NewPatientData } from '../../Constants';
import InputTitle from './inputTitle';
import PairInput from './pairInput';

const { CitySign, StateSign } = NewPatientData.GeneralInformationData.AddressSigns;
const InputAddress = (props) => {
  const {
    onChange,
    value, className, placeholder,
    type, maxLength, onBlur, name, disabled,
    city, stateAddress, onChangeCity, onChangeSate,
  } = props;

  const getID = () => `id-${name}-popover`;

  const displayLocations = (loading, suggestions, getSuggestionItemProps) => {
    const target = getID();
    return (
      <UncontrolledPopover
        className="dropdown-input-address-popover"
        // trigger="legacy"
        trigger="focus"
        placement="bottom-start"
        target={target}
      >
        <div className={classnames('suggestion-inner', suggestions.length > 0 ? 'have-suggestions' : '')}>
          {_.map(suggestions, (suggestion, i) => ( // not much info
            <div
              key={i}
              className={classnames('suggestion-item', suggestion.active ? 'active-item' : '')}
              {...getSuggestionItemProps(suggestion, {})}
            >
              <span>{suggestion.description}</span>
            </div>
          ))}
        </div>
      </UncontrolledPopover>
    );
  };

  const getDataFromPlaceId = (placeId) => {
    geocodeByPlaceId(placeId)
      .then((results) => {
        if (results.length === 0) {
          onChangeCity('');
          onChangeSate('');
          return;
        }
        const data = results[0]?.address_components;
        // console.log('city and state:', data);
        let tempCity = '';
        let tempState = '';
        _.forEach(data, (x) => {
          if (x?.types?.[0] === CitySign) tempCity = x.long_name;
          if (x?.types?.[0] === StateSign) tempState = x.long_name;
        });
        onChangeCity(tempCity);
        onChangeSate(tempState);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className={classnames('input-address-wrapper', className)}>
      <InputTitle title="Address" />

      <PlacesAutocomplete
        value={value}
        onChange={location => onChange(location)}
        onSelect={(location, placeId, suggestion) => {
          onChange(location);
          console.log('id, suggestion: ', placeId, suggestion);
          getDataFromPlaceId(placeId);
        }}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <>
            <input
              {...getInputProps({
                placeholder,
                className: classnames('input-address-main', disabled ? 'disaled-input' : ''),
                disabled,
                type,
                maxLength,
                onBlur,
                id: getID(),
              })}
            />
            {displayLocations(loading, suggestions, getSuggestionItemProps)}
          </>
        )}
      </PlacesAutocomplete>

      <PairInput
        className="mt16"
        valueLeft={city}
        titleLeft="City"
        placeholderLeft="Enter city"
        onChangeLeft={onChangeCity}
        valueRight={stateAddress}
        titleRight="State"
        placeholderRight="Enter state"
        onChangeRight={onChangeSate}
      />

    </div>
  );
};
InputAddress.defaultProps = {
  className: '',
  title: '',
  icon: '',
  name: '',
  onChange: () => {},
  onSelect: () => {},
  value: '',
  inputClassName: '',
  placeholder: 'Search',
  type: 'text',
  maxLength: 50,
  onBlur: () => { },
  disabled: false,

  city: '',
  stateAddress: '',
  onChangeCity: () => {},
  onChangeSate: () => {},
};
InputAddress.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,

  city: PropTypes.string,
  stateAddress: PropTypes.string,
  onChangeCity: PropTypes.func,
  onChangeSate: PropTypes.func,
};

export default InputAddress;
