import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

function AuthButton(props) {
  if (props.loggedIn) {
    return (
      <li className="nav-item">
        <a onClick={props.logoutButtonClick} className="nav-link" id="logout">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    );
  } else {
    return (
      <li className="nav-item">
        <Link className="nav-link" to={"/login"}>
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
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
    console.log("logout button click");
  }

  loggedIn = () => {
    return false;
  }

  render() {
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

          {this.loggedIn() &&
            <div className="navbar-text d-block text-center">
              Hello username
            </div>
          }

          <ul className="navbar-nav text-center">
            <AuthButton loggedIn={this.loggedIn()} logoutButtonClick={this.logoutButtonClick} />
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;
