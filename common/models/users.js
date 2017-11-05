'use strict';
// var sms = require('../../server/sms.js');

module.exports = function(Users) {
	Users.add = function(req, cb) {

		cb(null, "");
	};
	Users.remoteMethod('add', {
		http : {
			path : '/add',
			verb : 'post',
			source : 'body'
		},
		accepts : {
			arg : 'req',
			type : 'object',
			required : true,
			root : true,
			http : {
				source : 'body'
			}
		},
		returns : [{
			arg : 'message',
			type : 'string'
		}]
	});
};

// {
// "Body": "Give Uchi 1010101001",
// "From": "303994949449"
// }

