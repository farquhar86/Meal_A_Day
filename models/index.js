var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/meal_a_day5");

module.exports.Receiver = require("./receiver").receiver;
module.exports.Donor = require("./receiver").donor;

