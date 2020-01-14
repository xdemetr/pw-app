import * as React from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getAuth, getProfile} from '../../../store/selectors';
import Profile from './Profile';
import {withAuthRedirect} from '../../../hoc';
import {getAuthUser} from '../../../store/actions/auth';

const ProfileContainer:React.FC<{auth: any}> = ({auth}) => {
  return <Profile profile={auth.profile}/>
};

const mapStateToProps = (state:any) => ({
  auth: getAuth(state),
  profile: getProfile(state)
});

export default compose(
    connect(mapStateToProps, {getAuthUser}),
    withAuthRedirect
)(ProfileContainer)
