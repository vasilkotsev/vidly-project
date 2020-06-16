import React from "react";
import Input from "./input";

class LoginForm extends React.Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    //call the server and redirect to other page
    console.log("Submit");
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
      // ... other rules
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required";
      // ... other rules
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account: account, errors: errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Username"
            name="username"
            value={account.username}
            onChange={this.handleChange}
            errors={errors.username}
          />
          <Input
            label="Password"
            name="password"
            value={account.password}
            onChange={this.handleChange}
            errors={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
