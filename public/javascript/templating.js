$(document).ready(function() {
   getReceivers()
  getCurrentReceiver()
   getCurrentDonor()
})


//******************************************************************************
// This is to get all users
function getReceivers() {
  $.get("/receivers", function(res){
    var receivers = res.reverse();
    console.log(receivers)
    // grab foods template
    renderReceivers(receivers)
  });
}

function renderReceivers(receivers) {
  template = _.template($("#receiver-template").html());
  // input user into template and append to parent
  eachReceiver = receivers.map(function(receiver) {
    return template({receiver: receiver});
    console.log(template(receiver))
  });
  // clear content (for repeated use)
  // $("#name").html("");
  // append user to ul
  $("#name").append(eachReceiver);
}


//******************************************************************************
//this is to get only the one receiver
function getCurrentReceiver() {
  $.get("/getCurrentReceiver", function(res){
  // console.log("This is the current user", res)
    
    // grab user template
    sendCurrentReceiver(res)
    renderCurrentReceiver(res)
  });
}

function renderCurrentReceiver(receiver) {
  template = _.template($("#current-receiver-template").html());
  // input user into template and append to parent
  eachReceiver = template(receiver);
    // console.log(template(eachReceiver))
  
  // clear content (for repeated use)
  // $("#name").html("");
  // append user to ul
  $("#receiver").append(eachReceiver);
}
//this info will be sent into the edit page
function sendCurrentReceiver(receiver) {
  template = _.template($("#edit-receiver-template").html());
  console.log("hello")
  // input user into template and append to parent
  eachRec = template(receiver);
    // console.log(template(eachReceiver))
  
  // clear content (for repeated use)
  // $("#name").html("");
  // append user to ul
  $("#editReceiver").append(eachRec);
}

//******************************************************************************
//this is to get only the one DONOR
function getCurrentDonor() {
  $.get("/getCurrentDonor", function(res){
  console.log(res)
    
    // grab user template
    renderCurrentDonor(res)
  });
}

function renderCurrentDonor(donor) {
  template = _.template($("#edit-donor-template").html());
  console.log("hello")
  // input user into template and append to parent
  eachDonor = template(donor);
    // console.log(template(eachReceiver))
  
  // clear content (for repeated use)
  // $("#name").html("");
  // append user to ul
  $("#donor").append(eachDonor);
}
//******************************************************************************






