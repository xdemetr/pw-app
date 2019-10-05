import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from './RegistrationForm';
import {registration} from '../../../../store/reducers/auth-reducer';
import {Redirect} from 'react-router-dom';
import Spinner from '../../../Spinner';
import Error from '../../../Error';

const Registration = (props) => {

  if (props.auth.isAuth) {
    return <Redirect to={`/profile`}/>
  }

  const onSubmit = ({username, email, password}) => {
    props.registration(username, email, password)
  };

  if (props.auth.loading) {
    return <Spinner />
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
  auth: state.auth
});

export default connect(mapStateToProps, {registration})(Registration);
