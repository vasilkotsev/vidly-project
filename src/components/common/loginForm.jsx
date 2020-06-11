import React from "react";
import Input from "./input";

class LoginForm extends React.Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  validate = () => {
    return { username: "Username is required" };
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors });
    if (errors) return;

    //call the server and redirect to other page
    console.log("Submit");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account: account });
  };

  render() {
    const { account } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Username"
            name="username"
            value={account.username}
            onChange={this.handleChange}
          />
          <Input
            label="Password"
            name="password"
            value={account.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
