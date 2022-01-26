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
  OutlinedInput,
  MenuItem,
  Select,
  Chip,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as yup from "yup";
import { Formik } from "formik";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import authImage from "../assets/img/bg.jpeg";
import Copyright from './../common/Copyright'
import "react-toastify/dist/ReactToastify.css";

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

const SignUp = (props) => {
  const classes = useStyles();
  const eventCategories = [
    "Music",
    "Visual Arts",
    "Performing Arts",
    "Film",
    "Lectures & Books",
    "Fashion",
    "Nightlife",
    "Other",
  ];
  const theme = useTheme();
  const {
    values: { name, email, password, confirmPassword, interests },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    handleSubmit,
    setFieldValue,
  } = props;

  const onInputChange = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const [selectedEventCategories, setSelectedEventCategories] = React.useState(
    []
  );
  const handleEventCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedEventCategories(
      typeof value === "string" ? value.split(",") : value
    );
    setFieldValue(
      "interests",
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getStyles(name, selectedEventCategories, theme) {
    return {
      fontWeight:
        selectedEventCategories.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

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
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              value={name}
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              autoComplete="current-password"
              onChange={onInputChange.bind(null, "name")}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              value={email}
              autoFocus
              onChange={onInputChange.bind(null, "email")}
            />

            <Select
              labelId="event-categories"
              style={{ width: "100%" }}
              multiple
              id="interests"
              name={"interests"}
              value={interests}
              onChange={handleEventCategoryChange}
              helperText={touched.interests ? errors.interests : ""}
              error={touched.interests && Boolean(errors.interests)}
              input={
                <OutlinedInput label="Select your Interest" labelWidth={200} />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem disabled value="">
                <em>Select Your Interest</em>
              </MenuItem>
              {eventCategories.map((eventCategory) => (
                <MenuItem
                  key={eventCategory}
                  value={eventCategory}
                  style={getStyles(
                    eventCategory,
                    selectedEventCategories,
                    theme
                  )}
                >
                  {eventCategory}
                </MenuItem>
              ))}
            </Select>

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
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              onChange={onInputChange.bind(null, "password")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              helperText={touched.confirmPassword ? errors.confirmPassword : ""}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              autoComplete="current-password"
              onChange={onInputChange.bind(null, "confirmPassword")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!isValid}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signin">{"Already have an account Sign In"}</Link>
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
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  interests: yup
    .array(yup.string().required("Select your interets"))
    .required("Select your interets"),
  password: yup
    .string()
    .min(8, "Password must contain atleast 8 characters")
    .required("Enter Your Password"),
  confirmPassword: yup
    .string()
    .required("confirm your password")
    .oneOf([yup.ref("password")], "Password does not match"),
});

function SignUpForm() {
  const history = useHistory();

  const submitValues = ({
    name,
    email,
    confirmPassword,
    password,
    interests,
  }) => {
    const signUpUrl = "/accounts/signup";
    Axios.post(signUpUrl, {
      name,
      email,
      password,
      interests,
    })
      .then((res) => {
        console.log(`res`, res.data);
        history.push("/signin");
        toast.success(`Signed Up Successful`, {
          hideProgressBar: true,
          autoClose: false,
          position: "top-center",
        });
      })
      .catch((err) => {
        console.error(`error`, err);
        toast.error(err.message, {
          hideProgressBar: true,
          autoClose: false,
          position: "top-center",
        });
      });
  };

  

  return (
    <div>
      <Formik
        render={(props) => <SignUp {...props} />}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={submitValues}
      />
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </div>
  );
}

const initialValues = {
  name: "",
  email: "",
  interests: [],
  password: "",
  confirmPassword: "",
};

export default SignUpForm;
