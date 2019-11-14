/*
{
	"url": "https://google.com"
}
*/

(()=>{
	class OpenURL implements ClientEntityScript {
		entityID: Uuid = "";

		preload(entityID: Uuid) {
			this.entityID = entityID;
		}

		openURL() {
			let entity = Entities.getEntityProperties(this.entityID, ["userData"]);
			let userData: {url: string};

			try { userData = JSON.parse(entity.userData);
			} catch(err) { return; }

			if (userData.url!=undefined) Window.openURL(userData.url);
		}

		startNearTrigger() {
			this.openURL();
		}

		clickDownOnEntity(_: Uuid, event: PointerEvent) {
			if (event.button != "Primary") return;
			this.openURL();
		}
	}
});