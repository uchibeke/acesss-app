'use strict';
var app = require('../server');
var config = require('../../.config');
var helpers = require('./helpers.js').helpers;

var accountSid = config.twilio.accountSid;
var authToken = config.twilio.authToken;

const MessagingResponse = require('twilio').twiml.MessagingResponse;
module.exports = function(server) {
	var router = server.loopback.Router();

	var Users = app.models.Users;
	var Assets = app.models.Assets;
	var i = {
		receiver : "54e8d2ca-250f-4750-800a-1478e767f83a"
	};
	// ask(i);

	router.post('/sms', function(req, res) {

		const twiml = new MessagingResponse({
			accountSid : accountSid,
			authToken : authToken
		});

		console.log(req.body);

		var action = {};
		var input;
		var sender;
		var msg;
		console.log(req.body.Body);

		// if text

		if (req.body.Body != undefined) {
			var sender = req.body.From;
			var jsonResp = helpers.jsonFromSMS(req.body);
			action = {
				type : "sms",
				inputs : jsonResp.input
			};
			// input = jsonResp.input;
			msg = jsonResp.msg;
		}

		if (req.body && (Object.prototype.toString.call(req.body) === '[object Array]')) {
			action = {
				type : "web",
				inputs : req.body
			};
			var sender = req.body.owner;
			// Body:
			// {"owner":"9399393993939", "receiver":"28288239399303", "action": "give", assetId: ""}
		}

		console.log(action.inputs);

		doAction(action.inputs);
		msg = msg ? msg : "\n\n-\nREQUEST STATUS:\n" + action.inputs.receiverName + " was given access to " + action.inputs.id;
		res.writeHead(200, {
			'Content-Type' : 'text/xml'
		});
		twiml.message(msg);
		res.end(twiml.toString());

		// twiml.message(input.receiver + " could not be given access to "+ input.assetId);
		// console.log(twiml.toString())
		// res.end(twiml.toString());
	});

	function doAction(input) {
		if (input.action === "give") {
			give(input);
		}
		if (input.action === "take") {
			take(input);
		}
		if (input.action === "ask") {
			ask(input);
		}
	}

	function asset(i) {
		var access = {};
		access[i.owner] = [i.assetId];
		return access;
	}

	// Give userID assetID
	function give(input) {
		Users.findById(input.owner, {
			limit : 1
		}, function(err, user) {
			if (err) {
				throw err;
			}
			if (user === null) {
				Users.create([{
					userId : helpers.guid(),
					createdOn : helpers.currentTime(),
					contact : input.contact,
					lastDevice : input.lastDevice
				}], function(err, user) {
					if (err) {
						throw err;
					}
					console.log("Saved: " + JSON.stringify(user));
					// Assets.create([{
						// id : guid(),
						// owner : user.userId,
						// receiver : guid(),
						// receiverName : input.receiver,
						// receiverName : input.receiverContact
					// }], function(err, user) {
						// if (err) {
							// throw err;
						// }
						// console.log("Saved: " + JSON.stringify(user));
						// return user;
					// });
					return user;
				});
			} else {
				
			}
			console.log("FOUND:\n");
			console.log(user);
		});
	}

	// Does userID have assetID
	function ask(inputs) {
		Users.findById(inputs.receiver, {
			where : {
				userId : inputs.receiver
			},
			limit : 1
		}, function(err, user) {
			if (err) {
				throw err;
			}
			console.log("FOUND:\n");
			console.log(user);
		});
	}

	server.use(router);
};
