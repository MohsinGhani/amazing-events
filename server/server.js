const dotenv = require("dotenv");
dotenv.config();

const createError = require("http-errors"),
  express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  bodyParser = require("body-parser"),
  LOCALHOST_MONGODB_URI = process.env.LOCALHOST_MONGODB_URI,
  CLOUD_MONGODB_URI = process.env.CLOUD_MONGODB_URI,
  accounts = require("./routes/accounts"),
  eventRoute = require("./routes/event"),
  port = process.env.PORT || 5000,
  mongoose = require("mongoose"),
  cors = require("cors"),
  app = express();

mongoose
  .connect(CLOUD_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    (db) => {
      console.log(`Server correctly connected with mongodb`);
    },
    (err) => {
      console.log("Error occured while connecting with mongodb ", err);
    }
  );
mongoose.set("useFindAndModify", false);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use("/accounts", accounts);
app.use("/event", eventRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => console.log(`server is running at ${port}`));
module.exports = app;
