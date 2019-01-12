(function() {
	var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
	var scriptURL = Script.resolvePath("../hifiEssentials.js");
	var installURL = Script.resolvePath("install.html");

	function isInstalled() {
		var filename = scriptURL.split("/").pop();
		var runningScripts = ScriptDiscoveryService.getRunning();

		for (var i=0; i<runningScripts.length; i++) {
			if (runningScripts[i].name == filename) return true;
		}

		return false;
	}

	function webEventReceived(string) {
		switch (string.replace("hifiEssentialsInstall-","")) {
			case "install":
				if (!isInstalled() && !isInstalled()) // glitches out sometimes
					ScriptDiscoveryService.loadScript(scriptURL);
			break;
			case "close":
				tablet.gotoHomeScreen();
			break;
		}
	}

	this.preload = function() {
		tablet.webEventReceived.connect(webEventReceived);
	}

	this.unload = function () {
		tablet.webEventReceived.disconnect(webEventReceived);
	}

	this.openInstall = function() {
		tablet.gotoWebScreen(installURL);
	}

	this.startNearTrigger = function() { this.openInstall() };
	this.startFarTrigger = function() { this.openInstall() };
	this.clickDownOnEntity = function(entityID, mouseEvent) {
		if (mouseEvent.isLeftButton) this.openInstall();
	}
})