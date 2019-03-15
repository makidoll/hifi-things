/*
{
	"script": "https://scripts.cutelab.space/foxEssentials/foxEssentials.js",
	"names": [
		"Maki",
		"Caitlyn"
	]
}
*/

(function() {
	function loadScript(scriptUrl) {
		var found = false;
		var running = ScriptDiscoveryService.getRunning();
		for (var i=0; i<running.length; i++) {
			var script = running[i];
			if (script.url == scriptUrl) {
				found = true;
				break;
			}
		}

		if (found) return;
		ScriptDiscoveryService.loadScript(scriptUrl);
	}

	var interval;

	this.preload = function(entityID) {
		var entity = Entities.getEntityProperties(entityID, ["userData"]);
		try { var userData = JSON.parse(entity.userData); }
		catch(err) { return; }

		if (typeof userData.script != "string") return;
		if (typeof userData.names != "object") return;

		var names = userData.names.map(function(x){return x.toLowerCase()});
		if (names.indexOf(AccountServices.username.toLowerCase())>-1) {
			interval = Script.setInterval(function() {
				loadScript(userData.script);
			}, 500);
		}
	}

	this.unload = function() {
		Script.clearInterval(interval);
	}
});