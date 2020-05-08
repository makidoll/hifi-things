/*
{
	"url": "https://maki.cafe/hifi/audio-control/index.html?volume=0.1&random=true&stream=https://maki.cafe/hifi/audio/relaxing-animal-crossing.ogg"
}
*/

(function () {
	function InvisibleWebPlayer() {
		var overlayID = undefined;

		this.preload = function (entityID) {
			var entity = Entities.getEntityProperties(entityID, ["userData"]);
			try {
				var userData = JSON.parse(entity.userData);
			} catch (err) {}

			if (typeof userData.url != "string") return;

			overlayID = Overlays.addOverlay("web3d", {
				position: MyAvatar.position,
				dimensions: { x: 0, y: 0, z: 0 },
				url: userData.url,
			});
		};

		this.unload = function () {
			Overlays.deleteOverlay(overlayID);
		};
	}

	var entityID = undefined;
	this.preload = function (_entityID) {
		entityID = _entityID;
	};

	var invisibleWebPlayer = undefined;

	this.enterEntity = function () {
		invisibleWebPlayer = new InvisibleWebPlayer();
		invisibleWebPlayer.preload(entityID);
	};

	this.leaveEntity = function () {
		if (!invisibleWebPlayer) return;
		invisibleWebPlayer.unload();
		invisibleWebPlayer = undefined;
	};

	this.unload = function () {
		if (!invisibleWebPlayer) return;
		invisibleWebPlayer.unload();
	};
});
