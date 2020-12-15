import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Amplify from '@aws-amplify/core';
import NotFound from './NotFound';
import Full from './Full';
import PrivateRoute from '../Components/PrivateRoute';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import auth from '../Helpers/auth';
import awsmobile from '../../aws-exports';

Amplify.configure(awsmobile);
class Main extends React.Component {
  render() {
    const { isSuccess } = this.props;
    const authenticated = isSuccess || auth.isSuccess();
    return (
      <main>
        <Router>
          <Switch>
            <Route path="/sign-in" name="Sign In" component={SignIn} />
            <Route path="/forgot-password" name="Forgot password" component={ForgotPassword} />
            <PrivateRoute path="/" name="full" component={Full} authenticated={!!authenticated} />
            <Route path="*" name="notFound" component={NotFound} />
          </Switch>
        </Router>
      </main>
    );
  }
}

Main.defaultProps = {
  isSuccess: false,
};

Main.propTypes = {
  isSuccess: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isSuccess: state.login.isSuccess,
  };
}
export default connect(mapStateToProps)(Main);
