// userData = {
// 	script: "myScript.js"
// }

(function() {
	var entityID = undefined;
	this.preload = function(_entityID) {
		entityID = _entityID;
	}

	this.loadScript = function() {
		var entity = Entities.getEntityProperties(entityID, ["userData"]);
		try { var userData = JSON.parse(entity.userData);
		} catch(err) { return; }
		if (!userData.script) return;


		// var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
		// tablet.gotoWebScreen(userData.script);
		// setTimeout(function() {
		// 	tablet.gotoHomeScreen();
		// }, 1000);

		var confirm = Window.confirm("Would you like to load the script:\n\""+userData.script+"\"");
		if (confirm) {
			var runningScripts = ScriptDiscoveryService.getRunning();
			for (var i=0; i<runningScripts.length; i++) {
				if (runningScripts[i].url == userData.script) {
					Window.alert("\""+runningScripts[i].name+"\" has already been loaded!")
					return;
				}
			}

			ScriptDiscoveryService.loadScript(userData.script);
		}
	}

	this.startNearTrigger = function() { this.loadScript() };
	this.startFarTrigger = function() { this.loadScript() };
	this.clickDownOnEntity = function(entityID, mouseEvent) {
		if (mouseEvent.isLeftButton) this.loadScript();
	}
})