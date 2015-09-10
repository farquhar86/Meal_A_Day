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

// extending the `req` object to help manage Receiver sessions
app.use(function (req, res, next) {
  // login a user
  req.login = function (user) {
    console.log("I am loging in a user 111122223333")
    console.log(user);
    req.session.userId = user._id;
    console.log("This should be equal to the session number", req.session.userId)
    user = req.user;
    console.log("this is the user console.loged ", user)
    return user

  };
  // find the current user
  
  req.currentUser = function (cb) {
      db.Donor.
      findOne({ _id: req.session.userId },
      function (err, user) {
        req.user = user;
        cb(null, user);
      })
    }
  
  req.currentReceiver = function(cb) {
    db.Receiver.
      findOne({ _id: req.session.userId },
      function (err, user) {
        req.user = user;
        cb(null, user);
    });
  }
  // logout the current user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }
  // call the next middleware in the stack
  next(); 
});


var views = path.join(process.cwd(), "views");


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
  console.log("this is me signing up")
  console.log("this is the information I entered", receiver)
  // pull out their email & password
  var userName = receiver.userName;
  var password = receiver.password;
  var firstName = receiver.firstName;
  var lastName = receiver.lastName;
  var email = receiver.email;
  var currentCity = receiver.currentCity;
  var sex = receiver.sex;
  var birthDate = receiver.birthDate;
  var story = receiver.story;
  
  console.log("this is my username", userName)
  // create the new Receiver
  db.Receiver.createSecure(userName, password, firstName, lastName, email, currentCity, sex, birthDate, story,  function (err, receiver) {
    if(err) {return console.log(err);}
    //res.send(email + " is registered!\n");
    console.log("I am now going to login the user")
    req.login(receiver);
    console.log(receiver);
    res.redirect('/receiver_profile')
  });

});

app.get("/receiver_profile", function (req, res) {
  console.log("I got the notice to send you to your profile page 1111112222222 ")
  req.currentReceiver(function (err, user) {
    console.log("this is where I should have the user in my hand 1111112222222")
    console.log("And the user is:", user);
    // if(!user){
    // res.send(user)
    //   res.redirect('/')
    // }
    res.sendFile(path.join(views, "receiver_profile.html"));
  });
});


// where the donor submits the sign-up form
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
  db.Donor.createSecure(email, password, firstName, lastName, city,  function (err, donor) {
    if(err) {return console.log(err);}
    //res.send(email + " is registered!\n");
    req.login(donor)
    res.redirect('/donor_profile')
  });

});

app.get("/donor_profile", function (req, res) {
   req.currentUser(function (err, user) {
    
    // if(!user){
    //   // res.send(user)
    //   res.redirect('/')
    // }
  res.sendFile(path.join(views, "donor_profile.html"));
  });
});


// where the receiver submits the login form
app.post(["/sessions", "/receiver_login"], function login(req, res) {
  console.log("RECEIVE LOGIN ATTEMPT")
  var user = req.body.receiver;
  var userName = user.userName;
  var password = user.password;
  db.Receiver.authenticate(userName, password, function (err, user) {
    if (err) {
      console.log(err)
      res.redirect("/login");
    }
    // login the user
    req.login(user);
    // redirect to user profile
    res.redirect("/receiver_profile"); 
  });
});

// where the donor submits the login form
app.post(["/sessions", "/donor_login"], function login(req, res) {
    console.log("DONOR LOGIN ATTEMPT")
  var user = req.body.donor;
  var email = user.email;
  var password = user.password;
    console.log("User:", user, "Email:", email, "Password:", password)
  db.Donor.authenticate(email, password, function (err, user) {
    if (err) {
      console.log(err)
      res.redirect("/login");
    }
    // login the user
    req.login(user);
    // redirect to user profile
    res.redirect("/donor_profile"); 
  });
});

// this is getting all the receivers out of the database
app.get("/receivers", function(req, res){

    db.Receiver.find({}, function(err, receiver_list){
        if (err) {
            console.log("BAD THING!");
            return res.sendStatus(400);
        }
        res.send(receiver_list);
    })

})

// this is getting current receivers out of the database
app.get("/getCurrentReceiver", function userShow(req, res) {
  console.log("got request for current users info and req =")
  req.currentReceiver(function (err, user) {
    console.log("receiver is", user);
    if (user === null) {
      res.redirect("/signup")
      console.log("I cant find the user info")
    } else {
      res.send(user)
      console.log("I got the user")
     
    }
  })
});

// this is getting current receivers out of the database
app.get("/getCurrentDonor", function donorShow(req, res) {
  
  req.currentUser(function (err, user) {
    console.log("receiver is", user);
    if (user === null) {
      res.redirect("/signup")
      
    } else {
      res.send(user)
      
     
    }
  })
});

// Updating the Donors Profile
app.post("/updateDonorProfile", function(req, res){
 
  req.currentUser(function(err, user){
    email = req.body.email;
    password = req.body.password;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    city = req.body.city;
    
    console.log("this is the passed through user", firstName, lastName, city)

 db.Donor.update({_id: user._id}, { $set: { email: email, password: password, firstName: firstName, lastName: lastName, city: city}}, function(err, user){
  console.log("this is the new user", user)

  })

  })
});


// Updating the Receiver Profile
app.post("/updateReceiverProfile", function(req, res){
 console.log("I hear that you are calling me")
  req.currentReceiver(function(err, user){
    userName = req.body.userName;
    password = req.body.password;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    currentCity = req.body.currentCity;
    sex = req.body.sex;
    birthDate = req.body.birthDate;
    story = req.body.story;

    
    // console.log("this is the passed through user", firstName, lastName)

 db.Receiver.update({_id: user._id}, { $set: { userName: userName, password: password, firstName: firstName, lastName: lastName, currentCity: currentCity, sex: sex, birthDate: birthDate, story: story}}, function(err, user){
  console.log("this is the new user", user)

  })

  })
});







// app.get("/getCurrentReceiver", function(req, res){
//   req.currentUser()
//   console.log("hello")
//   console.log(db.Receiver.findOne({ _id: req.session.userId }))
//   var user = db.Receiver.findOne({ _id: req.session.userId });
  

//   req.currentUser(function(err, user){
//     res.send(JSON.stringify(user))
    
//   }) 

  // console.log("current user is - " + user._id);


  

// db.Receiver.findOne({ _id: req.session.userId }, function(err, receiver) {
//     if (err) {
//         console.log("BAD THING!");
//         return res.sendStatus(400);
//     }
//     console.log(receiver)
     // res.send(user);
// })

// })

app.get(["/logout", "/sessions"], function (req, res){
  req.logout()
  res.sendFile(path.join(views, "/"));
})


// Trying to get photo uploads to work

// var done = false;
// app.use(multer( {dest:'./uploads/',
//                  rename:function(fieldname,filename){
//                     console.log('Field Name value ',fieldname);
//                     console.log('Field Name value ',filename);
//                     return filename;
//                  }, 
//                 onFileUploadStart : function(file){
//                     console.log('File recieved:');
//                     console.log(file);
//                 },
//                  onFileUploadData:function (file,data){
//                     console.log('Data recieved');
//                 },
//               }).single('photo'));

// app.use(express.static(__dirname+"/views"));

// app.post('/upload',require(__dirname+'/upload.js').upload);









var listener = app.listen(process.env.PORT || 3000)

