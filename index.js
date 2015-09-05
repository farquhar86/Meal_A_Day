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
app.post(["/users", "/receiver_signup"], function signup(req, res) {
  // grab the user from the params
  var receiver = req.body.receiver;
  console.log(receiver)
  // pull out their email & password
  var userName = receiver.userName
  var password = receiver.password;
  var firstName = receiver.firstName;
  var lastName = receiver.lastName;
  var email = receiver.email;
  var currentCity = receiver.currentCity;
  var sex = receiver.sex;
  var birthDate = receiver.birthDate;
  var story = receiver.story;
  
  // create the new user
  db.Receiver.createSecure(userName, password, firstName, lastName, email, currentCity, sex, birthDate, story,  function (err, user) {
    if(err) {return console.log(err);}
    // res.send(email + " is registered!\n");
    // req.login(receiver)
    res.redirect('/receiver_profile')
  });

});

app.get("/receiver_profile", function (req, res) {
  res.sendFile(path.join(views, "receiver_profile.html"));
});

// where the user submits the sign-up form
app.post(["/users", "/donor_signup"], function signup(req, res) {
  // grab the user from the params
  var receiver = req.body.receiver;
  console.log(receiver)
  // pull out their email & password
  var userName = receiver.userName
  var password = receiver.password;
  var firstName = receiver.firstName;
  var lastName = receiver.lastName;
  var email = receiver.email;
  var currentCity = receiver.currentCity;
  var sex = receiver.sex;
  var birthDate = receiver.birthDate;
  var story = receiver.story;
  
  // create the new user
  db.Receiver.createSecure(userName, password, firstName, lastName, email, currentCity, sex, birthDate, story,  function (err, user) {
    if(err) {return console.log(err);}
    // res.send(email + " is registered!\n");
    // req.login(receiver)
    res.redirect('/donor_profile')
  });

});

app.get("/donor_profile", function (req, res) {
  res.sendFile(path.join(views, "donor_profile.html"));
});



var listener = app.listen(3000, function () {
  console.log("Listening on port " + listener.address().port);
});