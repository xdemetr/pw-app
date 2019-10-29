import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../store/reducers/auth-reducer';
import s from './AppHeader.module.css';
import {getAuth} from '../../store/selectors';
import IAppHeader from '../../models/IAppHeader';

const AppHeader: React.FC<IAppHeader> = (
    {auth: {profile, isAuth}, logoutUser}
) => {

  const {name, balance} = profile;

  const onLogout = () => {
    logoutUser()
  };

  const userGuest = (
      <>
        <li className="nav-item">
          <NavLink to={"/login"} className="nav-link" activeClassName={"active"}>Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/registration"} className="nav-link" activeClassName={"active"}>Registration</NavLink>
        </li>
      </>
  );

  const userAuth = (
      <>
        <li className="nav-item mr-2">
          <NavLink to="/transaction-add" className=" btn btn-info pt-1 pb-1">
            <span className="badge badge-pill badge-light mr-1">+</span>
            New transaction
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/transaction-history" className="nav-link">
            Transaction history
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/profile" className="nav-link">
            {name}
            <span className={`${s.balance} badge badge-warning ml-1`}>{balance}</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={onLogout}>Logout</Link>
        </li>
      </>
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

const mapStateToProps = (state: any) => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps, {logoutUser})(AppHeader);
