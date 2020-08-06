import React from "react";
import firebase from "../../firebase";


import {
  Grid,
  Segment,
  Form,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };


  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleInputError = (errors, inputName) => {
    return errors.some((error) => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          })
        });

    }
  };

  isFormValid = ({ email, password }) => email && password;

  render() {
    const {
      email,
      password,
      errors,
      loading,
    } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="violet" icon textAlign="center">
            <Icon name="code branch" color='violet' />
            Sign In to DevChat
          </Header>

          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>

              <Form.Input
                fluid
                name="email"
                value={email}
                icon="mail"
                iconPositon="left"
                placeholder="Email Address"
                type="email"
                className={this.handleInputError(errors, "email")}
                onChange={this.handleChange}
              />

              <Form.Input
                fluid
                name="password"
                value={password}
                icon="lock"
                iconPositon="left"
                placeholder="Password"
                type="password"
                className={this.handleInputError(errors, "password")}
                onChange={this.handleChange}
              />

              {/* disabled={loading} means disable the button when it is loading */}
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>

          {errors.length > 0 && (
            <Message error>{this.displayErrors(errors)}</Message>
          )}

          <Message>
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
