(function() {
	var _this = this;
	
	var webEntityID;
	
	var dynamicLightsIntensity = 16;
	var dynamicLightsID = [];

	_this.initDynamicLights = function() {
		var entity = Entities.getEntityProperties(webEntityID, ["dimensions"]);

		dynamicLightsID = [
			[-1, 1], [ 0, 1], [ 1, 1],
			[-1, 0],          [ 1, 0],
			[-1,-1], [ 0,-1], [ 1,-1],
		].map(function(light) {
			return Entities.addEntity({
				type: "Light",
				name: "cat.maki.screen",
				parentID: webEntityID,

				intensity: dynamicLightsIntensity,
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

	_this.webEventReceived = function(_webEntityID, msg) {
		if (_webEntityID != webEntityID) return;
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

	_this.messageReceived = function(chan, message, senderID, localOnly) {
		if (!localOnly) return;
		if (chan!="cat.maki.shaderScreen") return;
		Overlays.getOverlayObject(webEntityID).emitScriptEvent(message);
	}

	_this.preload = function(_webEntityID) {
		webEntityID = _webEntityID;

		try {
			const userData = JSON.parse(
				Entities.getEntityProperties(
					webEntityID, ["userData"]
				).userData
			);
			if (typeof userData.intensity == "number") {
				dynamicLightsIntensity = userData.intensity;
			}
		} catch(err) {}

		// dynamic lights
		_this.initDynamicLights();
		Entities.webEventReceived.connect(_this.webEventReceived);

		// volume slider
		Messages.subscribe("cat.maki.shaderScreen");
		Messages.messageReceived.connect(_this.messageReceived);
	}

	this.unload = function() {
		// dynamic lights
		Entities.webEventReceived.disconnect(_this.webEventReceived);

		dynamicLightsID.forEach(function(dynamicLightID) {
			Entities.deleteEntity(dynamicLightID);
		});

		// volume slider
		Messages.unsubscribe("cat.maki.shaderScreen");
		Messages.messageReceived.disconnect(_this.messageReceived);
	}
})