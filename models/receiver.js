// require dependencies
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt');

// the donor schema
var donorSchema = new Schema({

 email: {type: String}, 
 passwordDigest: {type: String},
 firstName: {type: String},
 lastName: {type: String},
 city: {type: String},
 createdAt: {type: Date, default: Date.now()}

});


// the receiver schema
var receiverSchema = new Schema({

 userName: {type: String},
 passwordDigest: {type: String},
 firstName: {type: String},
 lastName: {type: String},
 email: {type: String},
 currentCity: {type: String},
 sex: {type: String, required: true},
 birthDate: {type: Date},
 story: {type: String},
 donors: [donorSchema], 
 createdAt: {type: Date, default: Date.now()}

});

// create a new receiver with secure (hashed) password (for sign up)
receiverSchema.statics.createSecure = function (userName, password, firstName, lastName, email, currentCity, sex, birthDate, story, cb) {

  // `_this` now references our schema
  var _this = this;
  // generate some salt
  bcrypt.genSalt(function (err, salt) {
    // hash the password with the salt
    bcrypt.hash(password, salt, function (err, hash) {
      // build the user object
      var user = {
         userName: userName,
    		 passwordDigest: hash,
    		 firstName: firstName,
    		 lastName: lastName,
    		 email: email,
    		 currentCity: currentCity,
    		 sex: sex,
    		 birthDate: birthDate,
    		 story: story,
    		 donors: [donorSchema], 
    		 createdAt: Date.now()
      };
      // create a new user in the db with hashed password and execute the callback when done
      _this.create(user, cb);
    });
  });
};

// authenticate reciever (for login)
receiverSchema.statics.authenticate = function (userName, password, cb) {
  // find user by email entered at log in

  this.findOne({userName: userName}, function (err, user) {
    // throw error if can't find user
    if (user === null) {
      cb("Can\'t find user with that email", null);
    // if found user, check if password is correct
    } else if (user.checkPassword(password)) {
      // the user is found & password is correct, so execute callback
      // pass no error, just the user to the callback
      cb(null, user);
    } else {
      // user found, but password incorrect
      cb("password incorrect", user)
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
receiverSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password to compare with stored `passwordDigest`
  // `compareSync` is like `compare` but synchronous
  // returns true or false
  return bcrypt.compareSync(password, this.passwordDigest);
};




// create a new donor with secure (hashed) password (for sign up)
donorSchema.statics.createSecure = function (email, password, firstName, lastName, city, cb) {

  // `_this` now references our schema
  var _this = this;
  // generate some salt
  bcrypt.genSalt(function (err, salt) {
    // hash the password with the salt
    bcrypt.hash(password, salt, function (err, hash) {
      // build the user object
      var user = {
    		 email: email,         
    		 passwordDigest: hash,
    		 firstName: firstName,
    		 lastName: lastName,
    		 city: city,
    		 createdAt: Date.now()
      };
      // create a new user in the db with hashed password and execute the callback when done
      _this.create(user, cb);
    });
  });
};

// authenticate user (for login)
donorSchema.statics.authenticate = function (email, password, cb) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    // throw error if can't find user
    if (user === null) {
      cb("Can\'t find user with that email", null);
    // if found user, check if password is correct
    } else if (user.checkPassword(password)) {
      // the user is found & password is correct, so execute callback
      // pass no error, just the user to the callback
      cb(null, user);
    } else {
      // user found, but password incorrect
      cb("password incorrect", user)
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
donorSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password to compare with stored `passwordDigest`
  // `compareSync` is like `compare` but synchronous
  // returns true or false
  return bcrypt.compareSync(password, this.passwordDigest);
};


var Donor = mongoose.model("Giver", donorSchema);
var Receiver = mongoose.model("Receiver", receiverSchema);

module.exports.receiver = Receiver;
module.exports.donor = Donor;



