import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

// setuser
import { setUser, clearUser } from './actions/index';

//Spinner
import Spinner from './Spinner'; 


import "semantic-ui-css/semantic.min.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import firebase from "./firebase";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import { createStore } from 'redux';
// {connect} from react-redux allows you to connect a redux state to a react component
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';
const store = createStore(rootReducer, composeWithDevTools())


class Root extends React.Component {
  componentDidMount() {
    // This is an event listener that checks if we have a new user logged in or signed up
    // If a user is logged in and tries to visit the login or sign up page, the user is 
    // redirected to the home route ('/')
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // the history object is a special object from react-router-dom. In this case we use the
        // push() method on the history object to redirect the user back to the home route on a
        // successful log in or sign up. But first you have to import the higher order component
        // withRouter() in order to put the history object within the Root of the app
        // So in this app, you must wrap Root with the withRouter HOC. This is done at the bottom
        // of the script
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.history.push('/login');
        // Then clear user from global sate
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? <Spinner /> : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

// This is done so we have access to the history object from 'react-router-dom for redirecting users

const mapStateToProps = state => ({
  // state.user.isLoading: the user.isLoading refers to the isLoading state from the user_reducer, which
  // was stored in a key called user in reducers/index.jsx 
  isLoading: state.user.isLoading
})

// The connect() function takes two arguments, mapStateToProps and mapDispatchToProps
// In this case mapStateToProps is null because we are not mapping any state from a reducer and passing into
// props of a component, and the second argument, mapDispatchToProps is destructured for easy reading
// The function itself is above
const RootWithAuth = withRouter(connect(mapStateToProps, { setUser, clearUser })(Root));

ReactDOM.render(
    // The Router wraps around the RootWithAuth so that we can only redirect to pages when we are in a Router Component
    <Provider store={store}>
      <Router>
        <RootWithAuth />
      </Router>
    </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
