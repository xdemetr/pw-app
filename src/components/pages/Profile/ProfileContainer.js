import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getAuth, getProfile} from '../../../store/selectors';
import Profile from './Profile';
import {withAuthRedirect} from '../../../hoc';
import {getAuthUser} from '../../../store/actions/auth';

const ProfileContainer = (props) => {
  return <Profile profile={props.auth.profile}/>
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  profile: getProfile(state)
});

export default compose(
    connect(mapStateToProps, {getAuthUser}),
    withAuthRedirect
)(ProfileContainer)
