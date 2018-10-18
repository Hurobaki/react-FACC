import React, { Component } from "react";

class FormComponent extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordVerification: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => null;

  render() {
    const { username, email, password, passwordVerification } = this.state;

    return (
      <div>
        <form>
          <p>
            <label>
              Username :
              <input
                name="username"
                type="text"
                value={username}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Email :
              <input
                name="email"
                type="email"
                value={email}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Password :
              <input
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Re-type password :
              <input
                name="passwordVerification"
                type="password"
                value={passwordVerification}
                onChange={this.handleChange}
              />
            </label>
          </p>
        </form>
      </div>
    );
  }
}

export const Form = FormComponent;
