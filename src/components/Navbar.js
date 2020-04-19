import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { USER_ACTIONS } from "../actions";

import "./Navbar.scss";

function AuthButtons(props) {
  if (props.user) {
    return (
      <ul className="navbar-nav text-center">
        <li className="nav-item">
          <a onClick={props.logoutButtonClick} className="nav-link" id="logout">
            <i className="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="navbar-nav text-center">
        <li className="nav-item">
          <Link className="nav-link" to={"/register"}>
            <i className="fas fa-user-plus"></i> Register
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={"/login"}>
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
        </li>
      </ul>
    );
  }
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "collapse": "true"
    };
  }

  toggleMenu = () => {
    this.setState({
      "collapse": !this.state["collapse"]
    });
  }

  logoutButtonClick = () => {
    const { dispatch } = this.props;
    dispatch(USER_ACTIONS.logout());
  }

  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    let className = "navbar-collapse justify-content-between align-items-center w-100";
    if (this.state.collapse) {
      className += " collapse";
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-center">
        <button onClick={this.toggleMenu} className="navbar-toggler ml-1" type="button" data-toggle="collapse" data-target="#navbarLinks" aria-controls="navbarLinks">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={className} id="navbarLinks">

          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
          </ul>

          {user &&
            <div className="navbar-text d-block text-center">
              Hello {user["username"]}
            </div>
          }

          <AuthButtons user={user} logoutButtonClick={this.logoutButtonClick} />
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state["authentication"];
  return {
    loggedIn
  };
}

const connectedNavBar = connect(mapStateToProps)(Navbar);
export {connectedNavBar as Navbar};
