var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/meal_a_day");

module.exports.Receiver = require("./receiver");

