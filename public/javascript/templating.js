$(document).ready(function() {
  getReceivers()
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
  // input foods into template and append to parent
  eachReceiver = receivers.map(function(receiver) {
    return template({receiver: receiver});
    console.log(template(receiver))
  });
  // clear content (for repeated use)
  // $("#name").html("");
  // append foods to ul
  $("#name").append(eachReceiver);
}

//this is to get only the one users
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
  // input foods into template and append to parent
  eachReceiver = receivers.map(function(receiver) {
    return template({receiver: receiver});
    console.log(template(receiver))
  });
  // clear content (for repeated use)
  // $("#name").html("");
  // append foods to ul
  $("#name").append(eachReceiver);
}