/*
{
	"url": "url",
	"dpi": 10
}
*/

(function() {
	var _this = this;

	var overlayID = undefined;
	var interval = undefined;
	var dimensions = undefined;

	_this.webEventReceived = function(entityID, message) {
		if (entityID!=overlayID) return;

		var params = message.split(" ");
		if (params[0]!="cat.maki.shaderScreen") return;

		switch (params[1]) {
			case "volume":
				Messages.sendLocalMessage("cat.maki.shaderScreen", "volume "+params[2]);
				break;
		}
	}

	_this.preload = function(entityID) {
		//if (MyAvatar.displayName == "Camera") return;

		var entity = Entities.getEntityProperties(entityID, [
			"position", "rotation", "dimensions", "userData"
		]);

		dimensions = entity.dimensions;
		var userData = JSON.parse(entity.userData);

		overlayID = Entities.addEntity({
			type: "Web",
			sourceUrl: userData.url,
			maxFPS: 90,
			alpha: 1,
			dpi: userData.dpi||10,
			grab: {grabbable: false},
			position: entity.position,
			rotation: entity.rotation,
			dimensions: entity.dimensions,
			parentID: entityID,
			inputMode: "mouse",
			showKeyboardFocusHighlight: false,
		}, "local");

		interval = Script.setInterval(function() {
			var entity = Entities.getEntityProperties(entityID, ["dimensions"]);

			if (!Vec3.withinEpsilon(entity.dimensions, dimensions, 0.001)) {
				Entities.editEntity(overlayID, {
					dimensions: entity.dimensions
				});
			}
		}, 1000);

		Entities.webEventReceived.connect(_this.webEventReceived);
	}

	this.unload = function() {
		if (overlayID) Entities.deleteEntity(overlayID);
		if (interval) Script.clearInterval(interval);

		Entities.webEventReceived.disconnect(_this.webEventReceived);
	}
})