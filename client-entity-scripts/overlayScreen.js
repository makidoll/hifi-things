// userData = {
// 	url: "url",
// 	dpi: 10
// }

(function() {
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

		overlayID = Overlays.addOverlay("web3d", {
			url: userData.url,
			maxFPS: 90,
			alpha: 1,
			dpi: userData.dpi||10,
			grabbable: false,
			position: entity.position,
			rotation: entity.rotation,
			dimensions: entity.dimensions,
			parentID: entityID,
			showKeyboardFocusHighlight: false,
		});

		interval = Script.setInterval(function() {
			var entity = Entities.getEntityProperties(entityID, ["dimensions"]);

			if (!Vec3.withinEpsilon(entity.dimensions, dimensions, 0.001)) {
				Overlays.editOverlay(overlayID, {
					dimensions: entity.dimensions
				});
			}
		}, 1000);
	}

	this.unload = function() {
		if (overlayID) Overlays.deleteOverlay(overlayID);
		if (interval) Script.clearInterval(interval);
	}
})