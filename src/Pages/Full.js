import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link, Switch, Route, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import Appointment from './Appointment';
import PatientsNew from './Patients/New';
import PatientsActive from './Patients/Active';
import PatientsInactive from './Patients/Inactive';
import ReportsNotification from './Reports/Notification';
import ReportsMonthly from './Reports/Monthly';
import SideBar from '../Components/SideBar';
import PageHeader from '../Components/Header';
import PatientDetails from './PatientDetails';
import CreateNewPatient from './Patients/CreateNewPatient';
import ReportDetails from './Reports/ReportDetails';
import auth from '../Helpers/auth';

import Test from './Test';
import Test2 from './Test/test2';

const Menu = [
  {
    name: 'Patients',
    link: '/patients',
    sub: [
      {
        name: 'New',
        link: '/patients/new',
      },
      {
        name: 'Active',
        link: '/patients/active',
      },
      {
        name: 'Inactive',
        link: '/patients/inactive',
      },
    ],
  },
  {
    name: 'Reports',
    link: '/reports',
    sub: [
      {
        name: 'Notification',
        link: '/reports/notification',
      },
      {
        name: 'Monthly',
        link: '/reports/monthly',
      },
    ],
  },
];

const {
  Header, Sider, Content,
} = Layout;

class Full extends Component {
  componentDidMount() {
    window.onbeforeunload = () => {};
    window.onload = () => { };
  }

  render() {
    const role = this.props?.login?.user?.role || auth?.role();
    console.log('this.props.role: ', role);
    return (
      <Layout className="div-root">
        <Sider><SideBar menu={role === 'MD' ? Menu : [{ name: 'Appointments', link: '/appointment' }, ...Menu]} /></Sider>
        <Layout>
          <Header className="div-root-header"><PageHeader /></Header>
          <Content>
            <Switch>
              <Route exact path="/appointment" name="Appointment" component={Appointment} />
              <Route exact path="/patients/new" name="Patients New" component={PatientsNew} />
              <Route exact path="/patients/active" name="Patients Active" component={PatientsActive} />
              <Route exact path="/patients/inactive" name="Patients Inactive" component={PatientsInactive} />
              <Route exact path="/reports/notification" name="Reports Notification" component={ReportsNotification} />
              <Route exact path="/reports/monthly" name="Reports Monthly" component={ReportsMonthly} />

              <Route exact path="/reports/notification/details" name="Reports Notification Details" component={ReportDetails} />
              <Route exact path="/reports/monthly/details" name="Reports Monthly Details" component={ReportDetails} />

              <Route path="/patients/new/new-md/details" name="Patient New MD Details" component={PatientDetails} />
              <Route path="/patients/new/new-registered/details" name="Patient New Registered Details" component={PatientDetails} />
              <Route path="/patients/new/new-assigned/details" name="Patient New Assigned Details" component={PatientDetails} />

              <Route path="/patients/active/details" name="Patient Active Details" component={PatientDetails} />
              <Route path="/patients/inactive/details" name="Patient Inactive Details" component={PatientDetails} />
              <Route path="/patients/new/create-new-patient" name="Create New Patient" component={CreateNewPatient} />

              <Route exact path="/test" name="Test" component={Test} />
              <Route exact path="/test2" name="Test" component={Test2} />

              <Redirect from="/" to="/patients/new" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Full.defaultProps = {

};

Full.propTypes = {
  login: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Full);
