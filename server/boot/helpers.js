exports.helpers = {
	getValues : function(myJson) {
		for (var keyIn in myJson) {
			if (myJson.hasOwnProperty(keyIn + "")) {
				// Check if its an an array then just assign value
				if (Object.prototype.toString.call(myJson[keyIn + ""]) === undefined) {
					// return JSON.stringify({"END": "IS IS FINISHED"});
				} else {
					// Call the function recursively
					if (
					// (keyIn + "").toLowerCase().includes("body")  ||
					(keyIn + "").toLowerCase().includes("route") || (keyIn + "").toLowerCase().includes("twilio") || (keyIn + "").toLowerCase().includes("data") || (keyIn + "").toLowerCase().includes("payload")) {
						return "\n\n" + keyIn + ":\n" + JSON.stringify(myJson[keyIn + ""]) + "\n\n" + getValues(myJson[keyIn + ""]);
					}
				}
			}
		}
	},
	x : [727272, 2202002, 2022020],
	jsonFromSMS : function(sms, sender) {
		var textParts = sms.split(/\s+/);
		var input = {};
		var msg;

		// TEXT FORMAT
		// TO GIVE ACCESS: give asset to userName  with contact <Number/Email>
		// TO CANCEL ACCESS: take asset from userName and alert with contact <Number/Email>
		// TO CHECK IF HAVE ACCESS: does userName have asset and alert <Number>
		switch(textParts[0].toLowerCase()) {
		case "give":
			input = {
				action : "give",
				owner : sender,
				receiver : textParts[1],
				assetId : textParts[2],
				validity : (function() {
					if (textParts.length > 3) {
						if (textParts[textParts.length - 1].toLowerCase().includes("day")) {
							var today = new Date();
							if (!isNaN(textParts[textParts.length - 2] + 0)) {
								console.log("is valid");
								return today.setDate(today.getDate() + textParts[textParts.length - 2] + 0);
							} else {
								console.log("is NOT valid");
								msg = "\n\n-\nREQUEST STATUS:\n" + "ERROR: Send message in format below\n\n" + "give <userName> <assetID>\n" + "OR\n" + "give <userName> <assetID> for <numberOfDays> days";
							}
						} else {
							console.log("long but does not include day");
							msg = "\n\n-\nREQUEST STATUS:\n" + "ERROR: Send message in format below\n\n" + "give <userName> <assetID>\n" + "OR\n" + "give <userName> <assetID> for <numberOfDays> days";
						}
					} else {
						return "indefinite";
					}
				})()
			};
			break;
		case "take":
			input = {
				action : "take",
				owner : sender,
				receiver : textParts[3],
				assetId : textParts[1]
			};
			break;
		case "does":
			input = {
				action : "ask",
				owner : sender,
				receiver : textParts[1],
				assetId : textParts[3]
			};
			break;
		default:
			input = {
			};
			return input;
		}
		return {
			input : input,
			msg : msg
		};
	},
	currentTime : function() {
		var today = new Date();
		return today.setDate(today.getDate() + 0);
	}
};

