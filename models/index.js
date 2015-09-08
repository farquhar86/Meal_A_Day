var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/meal_a_day4");

module.exports.Receiver = require("./receiver").receiver;
module.exports.Donor = require("./receiver").donor;

