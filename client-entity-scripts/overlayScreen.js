// userData = {
// 	url: "url",
// 	dpi: 10
// }

(function() {
	var _this = this;

	var emptyHTML = "data:text/html;base64,PHN0eWxlPip7YmFja2dyb3VuZDojMDAwfTwvc3R5bGU+";

	var overlayID = undefined;
	var interval = undefined;
	var dimensions = undefined;

	var dynamicLights = false;
	var dynamicLightsID = [];

	_this.initDynamicLights = function(entityID) {
		var entity = Entities.getEntityProperties(entityID, ["dimensions"]);

		dynamicLightsID = [
			[-1, 1], [ 0, 1], [ 1, 1],
			[-1, 0],          [ 1, 0],
			[-1,-1], [ 0,-1], [ 1,-1],
		].map(function(light) {
			return Entities.addEntity({
				type: "Light",
				name: "cat.maki.screen",
				parentID: entityID,

				intensity: 16,
				falloffRadius: entity.dimensions.x/3,
				color: {r: 0, g: 0, b: 0},
				dimensions: {
					x: entity.dimensions.x*8,
					y: entity.dimensions.x*8,
					z: entity.dimensions.x*8,
				},
				localPosition: {
					x: light[0] * entity.dimensions.x/2,
					y: light[1] * entity.dimensions.y/2,
					z: 0
				},
			}, "local");
		});
	}

	_this.webEventReceived = function(entityID, msg) {
		//console.log(entityID+" - "+msg);
		if (entityID != overlayID) return;
		msg = msg.split(",");

		Entities.editEntity(dynamicLightsID[0], {color:{r:msg[ 0],g:msg[ 1],b:msg[ 2]}});
		Entities.editEntity(dynamicLightsID[1], {color:{r:msg[ 3],g:msg[ 4],b:msg[ 5]}});
		Entities.editEntity(dynamicLightsID[2], {color:{r:msg[ 6],g:msg[ 7],b:msg[ 8]}});

		Entities.editEntity(dynamicLightsID[3], {color:{r:msg[ 9],g:msg[10],b:msg[11]}});
		Entities.editEntity(dynamicLightsID[4], {color:{r:msg[12],g:msg[13],b:msg[14]}});

		Entities.editEntity(dynamicLightsID[5], {color:{r:msg[15],g:msg[16],b:msg[17]}});
		Entities.editEntity(dynamicLightsID[6], {color:{r:msg[18],g:msg[19],b:msg[20]}});
		Entities.editEntity(dynamicLightsID[7], {color:{r:msg[21],g:msg[22],b:msg[23]}});
	}

	_this.preload = function(entityID) {
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

		if (userData.dynamicLights) {
			dynamicLights = true;
			_this.initDynamicLights(entityID);
			Entities.webEventReceived.connect(_this.webEventReceived);
		}
	}

	this.unload = function() {
		if (overlayID) Entities.deleteEntity(overlayID);
		if (interval) Script.clearInterval(interval);

		if (dynamicLights) {
			dynamicLightsID.forEach(function(dynamicLightID) {
				Entities.deleteEntity(dynamicLightID);
			});

			// doesnt even work ergh...
			Entities.findEntitiesByName(
				"cat.maki.screen", MyAvatar.position,
				100000, false
			).forEach(function(webEntityID) {
				Entities.deleteEntity(webEntityID);
			});

			Entities.webEventReceived.disconnect(_this.webEventReceived);
		}
	}
})