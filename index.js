var express = require('express'),
    bodyParser = require('body-parser'),
    db = require("./models"),
    app = express();
    session = require("express-session"),
    path = require('path'),

    // var app = express(),
    views = path.join(__dirname, "views");

app.use(bodyParser.urlencoded({extended: true}))
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// create our session



app.get("/", function (req, res) {
  var homePath = path.join(views, "index.html");
  res.sendFile(homePath);
});

app.get("/signup", function (req, res) {
  res.sendFile(path.join(views, "signup.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(views, "login.html"));
});


// where the user submits the sign-up form
app.post(["/users", "/receiverSignup"], function signup(req, res) {
  // grab the user from the params
  var receiver = req.body.receiver;
  // pull out their email & password
  var userName = receiver.userName
  var passwordDigest = receiver.passwordDigest;
  var firstName = receiver.firstName;
  var lastName = receiver.lastName;
  var email = receiver.email;
  var currentCity = receiver.currentCity;
  var sex = receiver.sex;
  var birthdate = receiver.birthdate;
  var story = receiver.story;
  
  // create the new user
  db.Receiver.createSecure(userName, passwordDigest, firstName, lastName, email, currentCity, sex, birthdate, story  function (err, user) {
    // res.send(email + " is registered!\n");
    req.login(receiver)
    res.redirect('/receiveAMealProfile')
  });

});

app.get("/receiveAMealProfile", function (req, res) {
  res.sendFile(path.join(views, "receiveAMealProfile.html"));
});




var listener = app.listen(3000, function () {
  console.log("Listening on port " + listener.address().port);
});