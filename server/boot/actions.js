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

		var action = {};
		var input;
		var sender;
		var msg;

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

		doAction(action.inputs);
		msg = msg ? msg : "\n\n-\nREQUEST STATUS:\n" + action.inputs.receiverName + " was given access to " + action.inputs.description;
		res.writeHead(200, {
			'Content-Type' : 'text/xml'
		});
		twiml.message(msg);
		res.end(twiml.toString());
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
	
	// Give userID assetID
	function give(input) {
		Users.find({
			where : {
				"contact" : input.contact
			}
		}, function(err, owner) {
			if (err) {
				throw err;
			}
			if (owner.length < 1) {
				Users.create([{
					userId : helpers.guid(),
					createdOn : helpers.currentTime(),
					contact : input.contact,
					lastDevice : input.lastDevice
				}], function(err, user) {
					if (err) {
						throw err;
					}
					console.log("Saved: " + JSON.stringify(user[0]));
					Assets.create([{
						id : helpers.guid(),
						receiver : helpers.guid(),
						owner : user[0].userId,
						createdOn : helpers.currentTime(),
						receiverName : input.receiverName,
						receiverContact : input.receiverContact,
						description: input.description
					}], function(err, asset) {
						if (err) {
							throw err;
						}
						console.log("Saved: " + JSON.stringify(asset));
						return asset;
					});
					return user;
				});
			} else {
				Assets.create([{
					id : input.id,
					receiver : helpers.guid(),
					owner : owner[0].userId,
					createdOn : helpers.currentTime(),
					receiverName : input.receiverName,
					receiverContact : input.receiverContact,
					description : input.description
				}], function(err, asset) {
					if (err) {
						throw err;
					}
					console.log("Saved: " + JSON.stringify(asset));
					return asset;
				});
			}
			console.log("FOUND:\n");
			console.log(owner);
		});
	}

	// Does userID have assetID
	function ask(input) {
		Users.find({
			where : {
				"contact" : input.contact
			}
		}, function(err, user) {
			if (err) {
				throw err;
			}
			console.log(user)
			Assets.find({
				where : {
					"receiverName" : input.receiverName,
					"description" : input.description,
					"owner" : user[0].owner
				}
			}, function(err, asset) {
				if (err) {
					throw err;
				}
				console.log("FOUND:\n");
				console.log(asset);
			});
			console.log("FOUND:\n");
			console.log(asset);
		});
	}


	server.use(router);
};
