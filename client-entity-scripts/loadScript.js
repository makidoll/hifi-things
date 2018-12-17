// userData = {
// 	script: "myScript.js"
// }

(function() {
	this.loadScript = function(entityID) {
		var entity = Entities.getEntityProperties(entityID, ["userData"]);
		var userData = JSON.parse(entity.userData)||{};

		var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
		tablet.gotoWebScreen(userData.script);
		setTimeout(function() {
			tablet.gotoHomeScreen();
		}, 1000);

		// var confirm = Window.confirm("Would you like to load the script:\n"+userData.script);
		// if (confirm) {
		// 	Script.load(userData.script)
		// }
	}

	this.startNearTrigger = this.loadScript;
	this.startFarTrigger = this.loadScript;
	this.clickDownOnEntity = function(entityID, mouseEvent) {
		if (mouseEvent.isLeftButton) this.loadScript(entityID);
	}
})