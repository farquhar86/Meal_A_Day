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






var listener = app.listen(3000, function () {
  console.log("Listening on port " + listener.address().port);
});