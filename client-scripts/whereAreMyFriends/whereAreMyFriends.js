function getConnections(callback) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var json = req.responseText;
			try { json = JSON.parse(json); } catch(err) { return; }
			callback(json);
		}
	}
	req.open("GET", AccountServices.metaverseServerURL+"/api/v1/users?filter=connections", true);
	req.send();
};

var uuid = "cat.maki.whereAreMyFriends"; 

var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="48" height="48" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
    text: "friends"
});

function buttonClicked() {
	tablet.gotoWebScreen(Script.resolvePath("whereAreMyFriends.html"));
};
button.clicked.connect(buttonClicked);

function emitEvent(key, value) {
	tablet.emitScriptEvent(JSON.stringify({
		key: key, value: value,
		uuid: uuid,
	}));
}

function webEventReceived(json) {
	try { json = JSON.parse(json); } catch(err) { return; }
	if (json.uuid!=uuid) return;

	switch (json.key) {
		case "getConnections":
			getConnections(function(connections) {
				emitEvent("getConnections", connections);
			});
			break;
		case "gotoUser":
			Window.location = "hifi://@"+json.value;
			break;
	}
};
tablet.webEventReceived.connect(webEventReceived);

Script.scriptEnding.connect(function() {
	tablet.removeButton(button);

	button.clicked.disconnect(buttonClicked);
	tablet.webEventReceived.disconnect(webEventReceived);
});