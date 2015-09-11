$(document).ready(function() {

	$('#myModal').on('shown.bs.modal', function () {
	  $('#myInput').focus()
	})

	    $("#alertButton").click(function (){
	        $("#el-alert").addClass("in");
	    })

	// function deleteDonor(context) {
	//   var cardId = $(context).data()._id;
	//   $.ajax({
	//     url: '/donor'
	//     type: 'DELETE',
	//     success: function(res) {
	      
	//       // getEveryCard();
	//     }
	//   });
	// }



});




(jQuery, window, document);