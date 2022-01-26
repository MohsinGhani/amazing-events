const express = require("express"),
  bodyParser = require("body-parser"),
  eventRoute = express.Router(),
  user = require("../model/user"),
  eventModel = require("../model/event").modules.model;
eventRoute.use(bodyParser.json());

eventRoute.route("/add-event").post((req, res) => {
  const { body } = req;
  let { title, description, category, isVirtual, address } = body;

  console.log(`req.body`, req.body);

  let newEvent = new eventModel();
  newEvent.title = title;
  newEvent.description = description;
  newEvent.category = category;
  newEvent.date = new Date();
  newEvent.isVirtual = isVirtual;
  newEvent.address = address;
  newEvent.save((err, createdEvent) => {
    if (err) {
      return res.send({
        success: false,
        message: err,
      });
    }

    return res.send({
      success: true,
      message: {
        eventModel: createdEvent,
      },
    });
  });
});

eventRoute.route("/get-events").get(async (req, res, next) => {
  const userId = req.query.userId;
  if (userId) {
    const currentUser = await user.findById(userId);

    console.log("user interests", currentUser.interests);
    eventModel.find({ category: currentUser.interests }).then(
      (events) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(events);
      },
      (err) => next(err)
    );
  } else {
    eventModel.find().then(
      (events) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(events);
      },
      (err) => next(err)
    );
  }
});

module.exports = eventRoute;
