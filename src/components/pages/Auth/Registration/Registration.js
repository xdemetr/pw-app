import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from './RegistrationForm';
import {registration} from '../../../../store/reducers/auth-reducer';
import Error from '../../../Error';
import {compose} from 'redux';
import {getAuth} from '../../../../store/selectors/auth-selectors';
import {Redirect} from 'react-router-dom';

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
          <Error message={props.auth.error} />
          <RegistrationForm onSubmit={onSubmit}/>
      </div>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state)
});

export default compose(
    connect(mapStateToProps, {registration}),
    //withAuthRedirect
)(Registration)
