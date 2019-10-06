import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from './RegistrationForm';
import {registration} from '../../../../store/reducers/auth-reducer';
import Error from '../../../Error';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../../hoc';

const Registration = (props) => {

  const onSubmit = ({username, email, password}) => {
    props.registration(username, email, password)
  };

  return (
      <div className="registration-page col-md-6 m-auto">
          <h1>Registration</h1>
          <Error message={props.auth.error} />
          <RegistrationForm onSubmit={onSubmit}/>
      </div>
  );
};

export default compose(
    connect(null, {registration}),
    withAuthRedirect
)(Registration)
