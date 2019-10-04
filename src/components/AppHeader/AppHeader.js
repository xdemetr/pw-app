import React from 'react';
import {NavLink} from 'react-router-dom';

const AppHeader = () => {
  return (
      <div className="navbar navbar-expand-lg navbar-dark bg-primary app-header mb-4">
        <div className="container">
          <NavLink to={"/"} className="navbar-brand">Parrow Wings</NavLink>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to={"/login"} className="nav-link" activeClassName={"active"}>Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/registration"} className="nav-link" activeClassName={"active"}>Registration</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default AppHeader;
