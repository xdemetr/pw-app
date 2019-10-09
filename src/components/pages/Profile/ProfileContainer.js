import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getAuth, getProfile} from '../../../store/selectors';
import Profile from './Profile';
import {withAuthRedirect} from '../../../hoc';
import {getAuthUser} from '../../../store/reducers/auth-reducer';


class ProfileContainer extends Component {
  render() {
    return <Profile profile={this.props.auth.profile} />
  }
}

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  profile: getProfile(state)
});

export default compose(
    connect(mapStateToProps, {getAuthUser}),
    withAuthRedirect
)(ProfileContainer)
