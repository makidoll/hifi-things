// function WS(url) {
// 	this.ws = new WebSocket(url);
// 	var interval = undefined;

// 	function reconnect() {
// 		console.log("Reconnecting...");
// 		this.ws = new WebSocket(url);
// 		Script.clearInterval(ws);
// 	}

// 	this.ws.onclose = reconnect;
// 	this.ws.onerror = reconnect;

// 	return this.ws;
// }

var ws = new WebSocket("ws://127.0.0.1:9876");
var interval = undefined;

function updatePresence() {
	ws.send(JSON.stringify({
		place: location.placename,
		people: AvatarManager.getAvatarIdentifiers().length
	}));
}

ws.onopen = function() {
	//console.log("Joined!");
	interval = Script.setInterval(function() {
		updatePresence();
	}, 1000*60);
	updatePresence();
}

function hostChanged(hostname) {
	Script.setTimeout(function() {
		updatePresence();
	}, 1000*5);
}

location.hostChanged.connect(hostChanged);

Script.scriptEnding.connect(function() {
	Script.clearInterval(interval);
	location.hostChanged.disconnect(hostChanged);
});