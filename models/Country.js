const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const CountrySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  states: [StateSchema],
});

module.exports = mongoose.model("Country", CountrySchema);
