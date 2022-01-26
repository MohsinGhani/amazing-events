const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isVirtual: {
    type: Boolean,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

var model = mongoose.model("Event", eventSchema);
exports.modules = {
  model,
  eventSchema,
};
