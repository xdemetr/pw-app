import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../store/reducers/auth-reducer';
import s from './AppHeader.module.css';
import {getAuth} from '../../store/selectors/auth-selectors';

const AppHeader = (props) => {

  const {username, balance} = props.auth.user;
  const {isAuth} = props.auth;

  const onLogout = () => {
    props.logout()
  };

  const userGuest = (
        <React.Fragment>
          <li className="nav-item">
            <NavLink to={"/login"} className="nav-link" activeClassName={"active"}>Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/registration"} className="nav-link" activeClassName={"active"}>Registration</NavLink>
          </li>
        </React.Fragment>
    );

  const userAuth = (
      <React.Fragment>
        <li className="nav-item">
          <NavLink to="/profile" className="nav-link">
            {username}
            <span className={`${s.balance} badge badge-warning ml-1`}>{balance}</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={onLogout}>Logout</Link>
        </li>
      </React.Fragment>
    );

  const renderItems = isAuth ? userAuth : userGuest;

  return (
      <div className="navbar navbar-expand-lg navbar-dark bg-primary app-header mb-4">
        <div className="container">
          <NavLink to={"/"} className="navbar-brand">Parrow Wings</NavLink>

          <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto align-items-center">
                {renderItems}
              </ul>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps, {logout})(AppHeader);
