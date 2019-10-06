import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../components/Spinner';
import {getAuth} from '../store/selectors/auth-selectors';

const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {

      const {isAuth, loading} = this.props.auth;

      if (isAuth) {
        return <Redirect to={`/profile`}/>
      }

      if (!isAuth) {
        return <Redirect to={`/login`}/>
      }

      if (loading) {
        return <Spinner />
      }

      return <Component {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    auth: getAuth(state)
  });

  return connect(mapStateToProps)(RedirectComponent);

};

export default withAuthRedirect;
