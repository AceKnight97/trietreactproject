import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Upload, message, Button } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import InputTitle from './inputTitle';

const UploadFileCT = (props) => {
  const {
    className, title, placeholder, titleClassName, name, data,
  } = props;
  const uploadProps = {
    data,
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      console.log('info: ', info.file.status);
      if (info.file.status !== 'uploading') console.log(info.file, info.fileList);
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') message.error(`${info.file.name} file upload failed.`);
      props.onChange(info.fileList, name);
    },
    progress: {
      strokeColor: { '0%': '#108ee9', '100%': '#87d068' },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
    className: classnames('upload-files-ct-main', props.uploadClassName),
    // fileList: props.fileList,
  };

  return (
    <div className={classnames('upload-files-ct-wrapper', className)}>

      <InputTitle title={title} className={titleClassName} />

      <Upload {...uploadProps}>
        <Button ghost className="upload-files-button">
          {placeholder}
        </Button>
      </Upload>

    </div>
  );
};
UploadFileCT.defaultProps = {
  className: '',
  titleClassName: '',
  uploadClassName: '',
  title: '',
  placeholder: 'Click or drag files to this area to upload',
  onChange: () => { },
  name: '',
  data: undefined,
};
UploadFileCT.propTypes = {
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  uploadClassName: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())]),
};

export default UploadFileCT;
