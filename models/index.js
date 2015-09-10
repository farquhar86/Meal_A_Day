var mongoose = require("mongoose");
 mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL || 
                      "mongodb://localhost/meal_a_day5" )

module.exports.Receiver = require("./receiver").receiver;
module.exports.Donor = require("./receiver").donor;

