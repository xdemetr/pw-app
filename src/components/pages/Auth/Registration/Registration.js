import React from 'react';
import {connect} from 'react-redux';
import RegistrationForm from './RegistrationForm';

const Registration = (props) => {

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
      <div className="registration-page col-md-6 m-auto">
          <h1>Registration</h1>
          <RegistrationForm onSubmit={onSubmit}/>
      </div>
  );
};

export default connect(null, null)(Registration);
