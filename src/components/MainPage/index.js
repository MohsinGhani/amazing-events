import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";

function MainPage(props) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const getEvents = "event/get-events";
    setLoading(true);
    Axios.get(getEvents, {
      params: {
        userId: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setEvents(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  }, []);

  return (
    <div className="main-page-container">
      <div className="bg-image">
        {props.isAuthenticated ? <></> : <Alert
          style={{position: 'fixed', width: '98%'}}
          color="info"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => history.push("/signin")}
            >
              Sign In
            </Button>
          }
        >
          Please Signin to discover your interested Events
        </Alert>}
       <div className="main-container">
          <div className="main-page-contant">
            {loading && <CircularProgress size={80} color="info"/>}
            {!loading &&
              events.map((event) => (
                <>
                  <EventCard event={event} />
                  <br />
                </>
              ))}
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </div>
  );
}

const EventCard = ({ event }) => {
  const { title, category, description, address } = event;
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description.slice(0, 100)} ...
        </Typography>
        <Typography variant="body2">address: {address}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More</Button>
      </CardActions>
    </Card>
  );
};

function mapStateToProp(state) {
  return {
    isAuthenticated: state.getLogInState.isAuthenticated,
  };
}
// function mapDispatchToProp(dispatch) {
//   return {
//     getLogInState: (state) => dispatch(getLogInState(state)),
//   };
// }
export default connect(mapStateToProp, null)(MainPage);

