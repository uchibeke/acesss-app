var helpers = require('./helpers.js').helpers;

module.exports = function(app) {
	app.dataSources["access-mongo-db"].automigrate('Users', function(err) {
	  if (err) throw err;
	  
	  app.models.Users.create([{
	      userId: guid(),
	      accesses: asset (),
	      validity: "indefinite",
			timeAdded : helpers.currentTime(),
			contact : "u@ca.ca"
	    }, {
	      userId: guid(),
	      accesses: asset (),
	      validity: "indefinite",
			timeAdded : helpers.currentTime(),
			contact : "u@ca.ca"
	    }, {
	      userId: guid(),
	      accesses: asset (),
	      validity: "indefinite",
			timeAdded : helpers.currentTime(),
			contact : "u@ca.ca"
	    }, {
	      userId: guid(),
	      accesses: asset (),
	      validity: "indefinite",
			timeAdded : helpers.currentTime(),
			contact : "u@ca.ca"
	    }, {
	      userId: guid(),
	      accesses: asset (),
	      validity: "indefinite",
			timeAdded : helpers.currentTime(),
			contact : "u@ca.ca"
	    }, {
	      userId: guid(),
	      accesses: asset (),
	      validity: "indefinite",
			timeAdded : helpers.currentTime(),
			contact : "u@ca.ca"
	    }, {
	      userId: guid(),
	      accesses: asset (),
	      validity: "indefinite",
			timeAdded : helpers.currentTime(),
			contact : "u@ca.ca"
	    }, ], function(err, users) {
	    	if (err) throw err;

	    	console.log('Models created: \n', users);
	  });

	});
};

function S4() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
	var num = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase() + "";
	console.log(num);
	return num;
}

function asset() {
	var id = guid();
	var access = {};
	access[id] = [S4()];
	return access;
}
