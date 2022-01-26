import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getLogInState } from "../../store/action/getLogInState";
import * as Axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

function Navbar(props) {
  let history = useHistory();
  const classes = useStyles();
  const handleSignOut = () => {
    const signOutApi = "/accounts/signout";
    Axios.get(signOutApi, {
      params: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(`res`, res.data);
        props.getLogInState(false);
        localStorage.clear();
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Something went wrong`, {
          hideProgressBar: true,
          autoClose: false,
          position: "top-center",
        });
      });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
          >
            Amazing Events
          </Typography>
          {props.isAuthenticated ? (
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button color="inherit" onClick={() => history.push("/signin")}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </div>
  );
}
function mapStateToProp(state) {
  return {
    isAuthenticated: state.getLogInState.isAuthenticated,
  };
}
function mapDispatchToProp(dispatch) {
  return {
    getLogInState: (state) => dispatch(getLogInState(state)),
  };
}
export default connect(mapStateToProp, mapDispatchToProp)(withRouter(Navbar));
