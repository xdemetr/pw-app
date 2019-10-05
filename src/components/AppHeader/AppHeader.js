import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../store/reducers/auth-reducer';
import s from './AppHeader.module.css';

const AppHeader = (props) => {

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
            {props.auth.user.username}
            <span className={`${s.balance} badge badge-warning ml-1`}>{props.auth.user.balance}</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={onLogout}>Logout</Link>
        </li>
      </React.Fragment>
    );

  const renderItems = props.auth.isAuth ? userAuth : userGuest;

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
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(AppHeader);
