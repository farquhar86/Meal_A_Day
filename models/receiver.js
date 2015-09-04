// require dependencies
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt');

// the giver schema
var giverSchema = new Schema({

 email: {type: String, unique: true, required: true}, 
 passwordDigest: {type: String, required: true},
 firstName: {type: String, required: true},
 lastName: {type: String, required: true},
 createdAt: {type: Date, default: Date.now()}

});


// the receiver schema
var receiverSchema = new Schema({

 userName: {type: String, required: true},
 passwordDigest: {type: String, required: true},
 firstName: {type: String, required: true},
 lastName: {type: String, required: true},
 email: {type: String, unique: true},
 currentCity: {type: String},
 sex: {type: String},
 birthDate: {type: Date},
 story: {type: String, required: true},
 donors: [giverSchema] 
 createdAt: {type: Date, default: Date.now()}

});


var Giver = mongoose.model("Giver", giverSchema);
var Receiver = mongoose.model("Receiver", receiverSchema);

module.exports = Receiver;