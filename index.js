var express = require('express'),
    bodyParser = require('body-parser'),
    db = require("./models"),
    app = express();
    session = require("express-session"),
    path = require('path'),
    router = express.Router(),
    multer = require('multer'),
    sassMiddleware = require('node-sass-middleware');
    keygen = require('keygenerator'),


    // var app = express(),
    views = path.join(__dirname, "views");

app.use(bodyParser.urlencoded({extended: true}))
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
app.use(sassMiddleware({
  src: __dirname + "/assets",
  dest: __dirname + "/static",
  debug: true
}));

// create our session
app.use(
  session({
    // use keygen to generate a secret key for us
    secret: keygen._({specials: true}),
    resave: false,
    saveUninitialized: true
  })
);

// extending the `req` object to help manage sessions
app.use(function (req, res, next) {
  // login a user
  req.login = function (user) {
    req.session.userId = user._id;
  };
  // find the current user
  req.currentUser = function (cb) {
    db.Receiver.
      findOne({ _id: req.session.userId },
      function (err, user) {
        req.user = user;
        cb(null, user);
      })
  };
  // logout the current user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }
  // call the next middleware in the stack
  next(); 
});



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
  
  // create the new Receiver
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
  var donor = req.body.donor;
  console.log(donor)
  // pull out their email & password
  var email = donor.email;
  var password = donor.password;
  var firstName = donor.firstName;
  var lastName = donor.lastName;
  var city = donor.city;
  

  
  
  // create the new Donor
  db.Donor.createSecure(email, password, firstName, lastName, city,  function (err, user) {
    if(err) {return console.log(err);}
    // res.send(email + " is registered!\n");
    // req.login(receiver)
    res.redirect('/donor_profile')
  });

});

app.get("/donor_profile", function (req, res) {
  res.sendFile(path.join(views, "donor_profile.html"));
});


// where the user submits the login form
app.post(["/sessions", "/receiver_login"], function login(req, res) {
  var user = req.body.receiver;
  var userName = user.userName;
  var password = user.password;
  db.Receiver.authenticate(userName, password, function (err, user) {
    // login the user
    // req.login(receiver);
    // redirect to user profile
    res.redirect("/receiver_profile"); 
  });
});


app.get("/receivers", function(req, res){

    db.Receiver.find({}, function(err, receiver_list){
        if (err) {
            console.log("BAD THING!");
            return res.sendStatus(400);
        }
        res.send(receiver_list);
    })

})


// Trying to get photo uploads to work

var done = false;
app.use(multer( {dest:'./uploads/',
                 rename:function(fieldname,filename){
                    console.log('Field Name value ',fieldname);
                    console.log('Field Name value ',filename);
                    return filename;
                 }, 
                onFileUploadStart : function(file){
                    console.log('File recieved:');
                    console.log(file);
                },
                 onFileUploadData:function (file,data){
                    console.log('Data recieved');
                },
              }).single('photo'));

app.use(express.static(__dirname+"/views"));

app.post('/upload',require(__dirname+'/upload.js').upload);




// /*Configure the multer.*/
// var done = false;

// app.use(multer({ dest: './uploads/',
//  rename: function (fieldname, filename) {
//     return filename+Date.now();
//   },
// onFileUploadStart: function (file) {
//   console.log(file.originalname + ' is starting ...')
// },
// onFileUploadComplete: function (file) {
//   console.log(file.fieldname + ' uploaded to  ' + file.path)
//   done=true;
// }
// }).single('photo'));

// /*Handling routes.*/

// app.get('/',function(req,res){
//       res.sendfile("index.html");
// });

// app.post('/api/photo',function(req,res){
//   if(done==true){
//     console.log(req.files);
//     res.end("File uploaded.");
//   }
// });




var listener = app.listen(3000, function () {
  console.log("Listening on port " + listener.address().port);
});