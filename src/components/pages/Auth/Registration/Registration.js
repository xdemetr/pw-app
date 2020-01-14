import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from './RegistrationForm';
import {compose} from 'redux';
import {getAuth} from '../../../../store/selectors';
import {Redirect} from 'react-router-dom';
import {registration} from '../../../../store/actions/auth';

const Registration = (props) => {

  const onSubmit = ({username, email, password}) => {
    props.registration(username, email, password)
  };

  if (props.auth.isAuth) {
    return <Redirect to={`/profile`} />
  }

  return (
      <div className="registration-page col-md-6 m-auto">
        <h1>Registration</h1>
        <RegistrationForm onSubmit={onSubmit}/>
      </div>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state)
});

export default compose(
    connect(mapStateToProps, {registration}),
)(Registration)
