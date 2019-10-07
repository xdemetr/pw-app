import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getAuth, getProfile} from '../../../store/selectors/auth-selectors';
import Profile from './Profile';
//import {withAuthRedirect} from '../../../hoc';
import {Redirect} from 'react-router-dom';
import {getAuthUser} from '../../../store/reducers/auth-reducer';
import Spinner from '../../Spinner';

class ProfileContainer extends Component {
  componentDidMount() {
      this.props.getAuthUser();
  }

  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to={`/login`} />
    }

    if (!this.props.auth.profile) {
      return <Spinner/>;
    }

    return <Profile profile={this.props.auth.profile} />
  }
}

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  profile: getProfile(state)
});

export default compose(
    connect(mapStateToProps, {getAuthUser}),
)(ProfileContainer)
