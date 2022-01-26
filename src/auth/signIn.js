import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getLogInState } from "../store/action/getLogInState";
import Axios from "axios";
import { toast } from "react-toastify";
import authImage from "../assets/img/bg.jpeg";
import Copyright from "./../common/Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${authImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSignIn = (event) => {
    event.preventDefault();
    const signInUrl = "/accounts/signin";
    Axios.post(signInUrl, {
      email,
      password,
    })
      .then((res) => {
        if (res.data.success) {
          props.getLogInState(true);
          localStorage.setItem("token", res.data.token);
          props.history.push("/");
        } else {
          toast.error(res.data.message);
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message, {
          hideProgressBar: true,
          autoClose: false,
          position: "top-center",
        });
        setError(err.message);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleSignIn}>
            <p
              style={{
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!(email && password)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
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

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(SignIn));
