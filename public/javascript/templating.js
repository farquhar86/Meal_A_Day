$(document).ready(function() {
  // getReceivers()
  getCurrentReceiver()
})
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


//this is to get only the one users
function getCurrentReceiver() {
  $.get("/getCurrentReceiver", function(res){
  console.log(res)
    
    // grab user template
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





