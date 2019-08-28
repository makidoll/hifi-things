/*
- Enable triggerable
- Enter in userData

{
	"script": "https://example.com/myScript.js"
}
*/

(()=>{
	class LoadScript implements ClientEntityScript {
		entityID: Uuid = "";

		preload(entityID: Uuid) {
			this.entityID = entityID;
		}

		loadScript() {
			let entity = Entities.getEntityProperties(this.entityID, ["userData"]);
			let userData: {script: string};

			try { userData = JSON.parse(entity.userData);
			} catch(err) { return; }
			if (!userData.script) return;

			// let tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
			// tablet.gotoWebScreen(userData.script);
			// setTimeout(()=>{
			// 	tablet.gotoHomeScreen();
			// }, 1000);

			let confirm = Window.confirm("Would you like to load the script:\n\""+userData.script+"\"");
			if (confirm) {
				let runningScripts = ScriptDiscoveryService.getRunning();
				for (let i in runningScripts) {
					if (runningScripts[i].url == userData.script) {
						Window.alert("\""+runningScripts[i].name+"\" has already been loaded!");
						return;
					}
				}

				ScriptDiscoveryService.loadScript(userData.script);
			}
		}

		startNearTrigger() { 
			this.loadScript();
		};

		startFarTrigger() {
			this.loadScript();
		};

		clickDownOnEntity(entityID: Uuid, mouseEvent: MouseEvent) {
			if (mouseEvent.isLeftButton) this.loadScript();
		}
	}

	return new LoadScript();
});