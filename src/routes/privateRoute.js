import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.getLogInState.isAuthenticated,
  };
}

export default connect(mapStateToProps, null)(PrivateRoute);
