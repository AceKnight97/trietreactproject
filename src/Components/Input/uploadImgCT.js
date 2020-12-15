import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import _ from 'lodash';
import { useMergeState } from '../../Helpers/customHooks';
import InputTitle from './inputTitle';
import { MessageData } from '../../Constants';

const { InvalidEx, InvalidSize } = MessageData;

const UploadImgCT = (props) => {
  const [state, setState] = useMergeState({
    loading: false,
    imageUrl: undefined,
  });

  const beforeUpload = async (file) => {
    console.log('event: ', file);
    const { type, size } = file;
    // const type = file?.type || '';
    // const size = file?.size || 0;
    let valid = false;
    _.forEach(['jpg', 'jpeg', 'png'], (x) => { if (type?.includes(x)) valid = true; });
    if (!valid) {
      console.log('object: ', InvalidEx);
      // this.props.dialogsRef?.showErrDialog(0, '', InvalidEx);
      // document.getElementById('id-hidden-input').value = '';
      return;
    }
    const limitSize = 1024 * 1024 * 19;
    if (size > limitSize) valid = false;

    if (valid) {
      console.log('object: valid file');
      setState({ imageUrl: file });
      // this.setState({ fileImage: file }, () => {
      //   document.getElementById('id-hidden-input').value = '';
      // });
    } else {
      console.log('object: ', InvalidSize);
      // document.getElementById('id-hidden-input').value = '';
      // this.props.dialogsRef?.showErrDialog(0, '', InvalidSize);
    }
  };

  const handleChange = (info) => {
    console.log('handleChange: ', info);
    props.onChange(info?.file);
  };


  const {
    className, title, placeholder,
  } = props;

  const { loading, imageUrl } = state;

  const uploadButton = () => (
    <div>
      {loading ? <LoadingOutlined /> : <div>{placeholder}</div>}
    </div>
  );

  return (
    <div className={classnames('upload-img-ct-wrapper', className)}>

      <InputTitle title={title} />

      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl
          ? <img src={URL.createObjectURL(imageUrl)} alt="File attachment" />
          : uploadButton()}
      </Upload>

    </div>
  );
};
UploadImgCT.defaultProps = {
  className: '',
  title: '',
  placeholder: 'Click or drag files to this area to upload',
  onChange: () => {},
};
UploadImgCT.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default UploadImgCT;
