/*
it: This file finds donors and receivers; however, a seed file should be creating them.
*/

var db = require('./models');

// db.Donor.find({}, function(err, success) {
// 	console.log("\nDONOR ENTRIES TOTAL : " + success.length);
// 	success.forEach(function (dbEntry) {
// 		console.log(dbEntry.email);
// 	})
// 	process.exit(0);
// })

db.Receiver.find({}, function(err, success) {
	console.log("\nRECEIVER ENTRIES TOTAL : " + success.length);
	success.forEach(function (dbEntry) {
		console.log(dbEntry.email);
		console.log(dbEntry.password);
	})
	process.exit(0);
})