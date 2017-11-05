var helpers = require('./helpers.js').helpers;

module.exports = function(app) {
	app.dataSources["access-mongo-db"].automigrate('Users', function(err) {
	  if (err) throw err;
	  
	  app.models.Users.create([{
	      userId: guid(),
			lastDevice : "Iphone",
			contact : "u@ca.ca",
			createdOn : helpers.currentTime()
	    }, {
	      userId: guid(),
			lastDevice : "Iphone",
			contact : "u@ca.ca",
			createdOn : helpers.currentTime()
	    }, {
	      userId: guid(),
			lastDevice : "Iphone",
			contact : "u@ca.ca",
			createdOn : helpers.currentTime()
	    }, {
	      userId: guid(),
			lastDevice : "Iphone",
			contact : "u@ca.ca",
			createdOn : helpers.currentTime()
	    }, {
	      userId: guid(),
			lastDevice : "Iphone",
			contact : "u@ca.ca",
			createdOn : helpers.currentTime()
	    }, {
	      userId: guid(),
			lastDevice : "Iphone",
			contact : "u@ca.ca",
			createdOn : helpers.currentTime()
	    }, {
	      userId: guid(),
			lastDevice : "Iphone",
			contact : "u@ca.ca",
			createdOn : helpers.currentTime()
	    }, ], function(err, users) {
	    	if (err) throw err;

	    	console.log('Models created: \n', users);
	  });

	});
	app.dataSources["access-mongo-db"].automigrate('Assets', function(err) {
	  if (err) throw err;
	  
	  app.models.Assets.create([{
		  	id: guid(),
		  	receiver : guid(),
		  	owner : "u@ca.ca",
			createdOn : helpers.currentTime(),
			receiverName: "Uchi",
			receiverContact: "3068399303"
	    },{
		  	id: guid(),
		  	receiver : guid(),
		  	owner : "u@ca.ca",
			createdOn : helpers.currentTime(),
			receiverName: "Uchi",
			receiverContact: "3068399303"
	    },{
		  	id: guid(),
		  	receiver : guid(),
		  	owner : "u@ca.ca",
			createdOn : helpers.currentTime(),
			receiverName: "Uchi",
			receiverContact: "3068399303"
	    },], function(err, assets) {
	    	if (err) throw err;

	    	console.log('Models created: \n', assets);
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
