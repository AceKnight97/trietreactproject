import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import InputTitle from './inputTitle';
import Blue1BgRow from '../UI/blue1BgRow';
import AvatarCT from '../Avatar/avatarCT';
import AssignTag from '../UI/assignTag';

const { Option } = Select;
const AssignSelect = (props) => {
  const {
    className, placeholder, data, title, // onChange,
    showSearch, defaultValue, onSearch,
    value, mode, suffixIcon, name,
    onDeleteTag,
  } = props;

  function onChange(value) {
    props.onChange(value, name);
  }

  const valueItem = _.find(data, x => `${x.firstName} ${x.lastName}` === value);
  console.log('valueItem: ', valueItem);

  return (
    <div className={classnames('assign-select-wrapper', className)}>

      <InputTitle title={title} />

      <Select
        suffixIcon={suffixIcon || <SearchOutlined />}
        mode={mode}
          // onChange={onChange}
        defaultValue={defaultValue}
        value={[]}
        showSearch={showSearch}
        placeholder={placeholder}
        optionFilterProp="children"
        onSelect={onChange}
        onSearch={onSearch}
        filterOption={(input, option) => {
          console.log('input, option, index: ', input, option);
          if (option?.value?.toLowerCase().includes(input.toLowerCase())) return option.children[option.key];
        }}
        dropdownClassName="assign-drawer-dropdown"
      >
        {_.map(data, (x, i) => (
          <Option key={i} value={`${x.firstName} ${x.lastName}`}>
            <AvatarCT firstName={x.firstName} lastName={x.lastName} size={32} />
            <div className="ml12">
              {`${x.firstName} ${x.lastName}`}
            </div>
          </Option>
        ))}
      </Select>

      <div className="assign-select-outside-res">
        {valueItem && !_.isEmpty(valueItem) ? (
          <AssignTag
            onDeleteTag={onDeleteTag}
            firstName={valueItem.firstName}
            lastName={valueItem.lastName}
          />
        ) : null}
      </div>
    </div>
  );
};
AssignSelect.defaultProps = {
  className: '',
  title: '',
  placeholder: 'Select...',
  data: [],
  onChange: () => { },
  onSearch: () => { },
  onDeleteTag: () => { },
  showSearch: true,
  defaultValue: undefined,
  mode: undefined, // 'tags', // or multiple
  value: '',
  suffixIcon: undefined,
  name: '',
};
AssignSelect.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onDeleteTag: PropTypes.func,
  showSearch: PropTypes.bool,
  defaultValue: PropTypes.string,
  mode: PropTypes.string,
  value: PropTypes.string,
  suffixIcon: PropTypes.node,
  name: PropTypes.string,
};
export default AssignSelect;
