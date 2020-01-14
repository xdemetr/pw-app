import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../components/Spinner';
import {getAuth} from '../store/selectors';
import {getAuthUser} from '../store/actions/auth';

const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {

    componentDidMount() {
      this.props.getAuthUser()
    }

    render() {
      const {loading, isAuth} = this.props.auth;

      if (!isAuth) return <Redirect to={`/login`}/>;

      if (loading) return <Spinner />;

      return <Component {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    auth: getAuth(state)
  });

  return connect(mapStateToProps, {getAuthUser})(RedirectComponent);

};

export default withAuthRedirect;
