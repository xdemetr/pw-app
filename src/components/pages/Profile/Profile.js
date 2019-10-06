import React from 'react';
import {withAuthRedirect} from '../../../hoc';

const Profile = (props) => {
  return (
      <div className="profile-page">
        <h1>Profile</h1>
      </div>
  );
};

export default withAuthRedirect(Profile);
