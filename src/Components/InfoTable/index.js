import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Typography, Row, Col, Button,
} from 'antd';
import { EditFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import _ from 'lodash';
import EditButton from '../Button/editButton';

const { Title } = Typography;
const InfoTable = (props) => {
  const {
    isEdit, titleLevel, lightTitle, title, leftContent, rightContent, isStripe, onClickEdit,
    className,
  } = props;
  return (
    <div className={classnames('info-table-main', className)}>
      {isEdit ? <EditButton onClick={onClickEdit} className="d-none edit-button" /> : null}
      <Title level={titleLevel} className={lightTitle ? '' : 'font-weight-bold'}>{title}</Title>
      {_.map(leftContent, (item, i) => (
        <Row
          className={`info-table-row f1-r ${((i % 2 === 1) && isStripe) ? 'odd-row' : ''}`}
          key={i}
          style={{ minHeight: isStripe ? '40px' : '28px' }}
        >
          <Col span={8} className="info-table-column">{item}</Col>
          <Col className="info-table-column">
            {rightContent ? rightContent[i] : ''}
          </Col>
        </Row>
      ))}
    </div>
  );
};
InfoTable.defaultProps = {
  className: '',
  title: '',
  titleLevel: 5,
  lightTitle: true,
  isStripe: false,
  isEdit: false,
  onClickEdit: () => {},
};
InfoTable.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  leftContent: PropTypes.array.isRequired,
  rightContent: PropTypes.array.isRequired,
  titleLevel: PropTypes.number,
  isEdit: PropTypes.bool,
  isStripe: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default InfoTable;
