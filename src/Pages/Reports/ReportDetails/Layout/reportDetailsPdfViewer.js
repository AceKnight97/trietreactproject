import React, {
// useState, useContext, useEffect, useCallback, useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import {
  DownloadOutlined, SaveOutlined, MessageOutlined, FormOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import auth from '../../../../Helpers/auth';

const MDIcons = [<DownloadOutlined />, <MessageOutlined />, <FormOutlined />, <SaveOutlined />];
const NurseIcons = [<DownloadOutlined />, <MessageOutlined />, <SaveOutlined />];

const MDBtnClass = ['mr8', 'mh8', 'mh8', 'ml8'];
const NurseBtnClass = ['mr8', 'mh8', 'ml8'];


const ReportDetailsPdfViewer = (props) => {
  const {
    className, pdfURL,
    toggleAIModal, toggleASModal, toggleSCModal, // Add interpretation, Add signature, Save changes
  } = props;

  const iconArr = auth.isMD() ? MDIcons : NurseIcons;
  const btnClassArr = auth.isMD() ? MDBtnClass : NurseBtnClass;

  const onClickArr = [() => { }, toggleAIModal];
  if (auth.isMD()) onClickArr.push(toggleASModal, toggleSCModal);
  else onClickArr.push(toggleSCModal);


  const customBtn = (icon = '', className = '', i = 0, onClick = () => { }) => (
    <div className="custom-btn" key={i}>
      <Button ghost icon={icon} type="" className={className} onClick={onClick} />
      {i !== iconArr.length - 1 ? <div className="pdf-viewer-footer-stick" /> : null}
    </div>
  );

  return (
    <div className={classnames('report-details-pdf-viewer-wrapper', className)}>
      {pdfURL ? <iframe src={pdfURL} title="Notification PDF report" className="wh100" /> : <span>Notification PDF Viewer</span>}

      <div className="pdf-viewer-footer-buttons">
        {_.map(iconArr, (x, i) => customBtn(x, btnClassArr[i], i, onClickArr[i]))}
      </div>
    </div>
  );
};
ReportDetailsPdfViewer.defaultProps = {
  className: '',
  pdfURL: '',
  toggleAIModal: () => {},
  toggleSCModal: () => {},
  toggleASModal: () => {},
};
ReportDetailsPdfViewer.propTypes = {
  className: PropTypes.string,
  pdfURL: PropTypes.string,
  toggleAIModal: PropTypes.func,
  toggleSCModal: PropTypes.func,
  toggleASModal: PropTypes.func,
};

export default ReportDetailsPdfViewer;
