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
    renderCurrentReceiver(res)
    sendCurrentReceiver(res)
    addingReceiverName(res)
  });
}

function renderCurrentReceiver(receiver) {
  template = _.template($("#current-receiver-template").html());
  // input user into template and append to parent
  console.log("I am in renderCurrentReceiver")
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
//this info will be sent into the edit page
function addingReceiverName(receiver) {
  template = _.template($("#adding-name-template").html());
  console.log("hello")
  // input user into template and append to parent
  name = template(receiver);
    // console.log(template(eachReceiver))
  
  // clear content (for repeated use)
  // $("#name").html("");
  // append user to ul
  $("#welcomeName").append(name);
}

//******************************************************************************
//this is to get only the one DONOR
function getCurrentDonor() {
  $.get("/getCurrentDonor", function(res){
 
    
    // grab user template
    renderCurrentDonor(res)
    renderDonorName(res)
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

function renderDonorName(donor) {
  template = _.template($("#name-of-donor-template").html());
  console.log("hello")
  // input user into template and append to parent
  donorName = template(donor);
    // console.log(template(eachReceiver))
  
  // clear content (for repeated use)
  // $("#name").html("");
  // append user to ul
  $("#donorName").append(donorName);
}
//******************************************************************************






