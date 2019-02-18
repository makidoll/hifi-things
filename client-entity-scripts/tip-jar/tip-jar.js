/*
{
	"username": "",
	"images": {
		"logo": "tip-jar.svg",
		"background": "the-spot.jpg"
	},
	"text": {
		"intro": "How much would you like to donate?",
		"custom": "Custom amount",
		"message": "Thank you so much!",
		"send": "Send the tip!"
	},
	"font": {
		"family": "Roboto Condensed",
		"weight": 700,
		"size": {
			"small": 24,
			"big": 32,
		}
	},
	"amounts": [
		50, 100, 200, 500
	],
	"colors": {
		"text": "#ffffff",
		"unactive": {
			"text": "#1d1f21",
			"border": "#ffffff",
			"background": "#ffffff"
		},
		"active": {
			"text": "#ffffff",
			"border": "#00b4ef",
			"background": "#00b4ef"
		}
	}
}
*/

(function() {
	var entityID = undefined;
	var uuid = Uuid.generate();
	var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

	function getUserData() {
		var entity = Entities.getEntityProperties(entityID, ["userData"]);
		try { var userData = JSON.parse(entity.userData);
		} catch(err) { return undefined; }
		return userData;
	}

	function webEventReceived(json) {
		try { json = JSON.parse(json);
		} catch(err) { return; }
		if (json.uuid != uuid) return;
		
		var userData = getUserData();
		if (userData == undefined) return;

		switch(json.key) {
			case "getData":
				tablet.emitScriptEvent(JSON.stringify({
					uuid: uuid,
					key: "getData",
					value: userData
				}));
			break;
			case "send":
				if (json.value == undefined) return;
				if (typeof json.value.amount != "number") return;
				if (typeof json.value.message != "string") return;

				tablet.loadQMLSource("hifi/commerce/common/sendAsset/SendAsset.qml");
			    tablet.sendToQml({method: 'updateSendAssetQML',
			        amount: json.value.amount,
			        message: json.value.message,
			        username: userData.username,
			    });
			break;
		}	
	}

	function openTablet() {
		tablet.gotoWebScreen(Script.resolvePath("tip-jar.html")+"?uuid="+uuid);
	}

	this.preload = function(_entityID) {
		entityID = _entityID;
		tablet.webEventReceived.connect(webEventReceived);
	}

	this.unload = function() {
		tablet.webEventReceived.disconnect(webEventReceived);
	}

	this.startFarTrigger = openTablet;
	this.startNearTrigger = openTablet;
	this.clickDownOnEntity = function(entityID, mouseEvent) {
        if (mouseEvent.isLeftButton) openTablet();
    }
})
