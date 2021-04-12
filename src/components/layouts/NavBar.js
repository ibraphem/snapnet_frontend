import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <h5 style={{ color: "#fff" }}>QUESTION 2</h5>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link active">
                <i className="nav-icon fas fa-th" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/asset/type" className="nav-link">
                <i className="nav-icon fas fa-sitemap" />
                <p>Asset Types</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/assets" className="nav-link">
                <i className="nav-icon fas fa-university" />
                <p>Assets</p>
              </Link>
            </li>

            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-archive" />
                <p>
                  Asset Owners
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={`/owner/Individuals`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Individuals</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/owner/Groups`} className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Groups</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default NavBar;
