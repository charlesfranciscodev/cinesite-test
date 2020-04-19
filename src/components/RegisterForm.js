import React, { Component } from "react";
import { connect } from "react-redux";

import { USER_ACTIONS } from "../actions";

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(USER_ACTIONS.logout());

    this.state = {
      "username": "",
      "password": "",
      "submitted": false
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({"submitted": true});
    let { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(USER_ACTIONS.register({username, password}));
    }
  }

  render() {
    let { username, password, submitted } = this.state;

    let usernameClassName = "form-control";
    if (submitted && !username) {
      usernameClassName += " is-invalid";
    }

    let passwordClassName = "form-control";
    if (submitted && !password) {
      passwordClassName += " is-invalid";
    }

    return (
      <div className="container my-4">
        <form onSubmit={this.handleSubmit}>
          <h2 className="text-center mb-4">Register Form</h2>

          <div className="form-group row">
            <div className="input-group col-md-6 offset-md-3 col-lg-4 offset-lg-4">
              <input onChange={this.onChange} type="text" className={usernameClassName} value={username} id="username" name="username" placeholder="Username" />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <div className="invalid-feedback">
                Please enter your username.
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="input-group col-md-6 offset-md-3 col-lg-4 offset-lg-4">
              <input onChange={this.onChange} type="password" className={passwordClassName} value={password} id="password" name="password" placeholder="Password" />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fas fa-key fa-sm"></i>
                </span>
              </div>
              <div className="invalid-feedback">
                Please enter your password.
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="input-group col-md-6 offset-md-3 col-lg-4 offset-lg-4">
              <button className="btn btn-lg btn-block btn-primary" type="submit">
                <i className="fas fa-user-plus"></i> Register
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { registering } = state["authentication"];
  return {
    registering
  };
}

const connectedRegisterForm = connect(mapStateToProps)(RegisterForm);
export { connectedRegisterForm as RegisterForm};
