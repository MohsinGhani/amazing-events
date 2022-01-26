import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../auth/signIn";
import SignUp from "../auth/signUp";
import PrivateRoute from "./privateRoute";
import MainPage from "../components/MainPage";
import Navbar from "../common/Navbar";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
