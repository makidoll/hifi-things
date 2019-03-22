// userData = {
// 	url: "url",
// 	dpi: 10
// }

(function() {
	var emptyHTML = "data:text/html;base64,PHN0eWxlPip7YmFja2dyb3VuZDojMDAwfTwvc3R5bGU+";

	var overlayID = undefined;
	var interval = undefined;
	var dimensions = undefined;

	this.preload = function(entityID) {
		//if (MyAvatar.displayName == "Camera") return;

		var entity = Entities.getEntityProperties(entityID, [
			"position", "rotation", "dimensions", "userData"
		]);

		dimensions = entity.dimensions;
		var userData = JSON.parse(entity.userData);

		var exclude = false;
		if (userData.exclude) {
			userData.exclude.forEach(function(username) {
				if (exclude) return;
				if (username.toLowerCase()==AccountServices.username.toLowerCase())
					exclude = true;
			});
		}

		overlayID = Entities.addEntity({
			type: "Web",
			sourceUrl: (exclude)? emptyHTML: userData.url,
			maxFPS: 90,
			alpha: 1,
			dpi: userData.dpi||10,
			grab: {grabbable: false},
			position: entity.position,
			rotation: entity.rotation,
			dimensions: entity.dimensions,
			parentID: entityID,
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
	}

	this.unload = function() {
		if (overlayID) Entities.deleteEntity(overlayID);
		if (interval) Script.clearInterval(interval);
	}
})