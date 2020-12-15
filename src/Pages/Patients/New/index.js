import React, {
// useState, useContext, useEffect, useCallback, useMemo,
} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { useMergeState } from '../../../Helpers/customHooks';
import NewHeader from './Layout/newHeader';
import NewRegisteredBody from './Layout/newRegisteredBody';
import NewAssignedBody from './Layout/newAssignedBody';
import NewMDBody from './Layout/newMDBody';
import { PNMenu } from '../../../Constants';
import auth from '../../../Helpers/auth';


const PatientsNew = (props) => {
  const [state, setState] = useMergeState({
    current: PNMenu[0],
  });
  const role = auth.role();
  const getCurrentTab = current => setState({ current });

  const { className, history } = props;
  const { current } = state;
  return (
    <div className={classnames('patients-new-wrapper', className)}>
      {role === 'MD' ? (
        <NewMDBody />
      ) : (
        <div className="">
          <NewHeader getCurrentTab={getCurrentTab} onClickAdd={() => history.push('/patients/new/create-new-patient')} />
          {current === PNMenu[0] ? <NewRegisteredBody /> : <NewAssignedBody />}
        </div>
      )}

    </div>
  );
};
PatientsNew.defaultProps = {
  className: '',
};
PatientsNew.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape().isRequired,
};

// export default PatientsNew;
export default withRouter(PatientsNew);
