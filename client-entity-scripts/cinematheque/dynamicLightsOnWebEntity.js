(function() {
	var _this = this;
	
	var entityID;

	var dynamicLights = false;
	var dynamicLightsID = [];

	_this.initDynamicLights = function() {
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

	_this.webEventReceived = function(_entityID, msg) {
		if (_entityID != entityID) return;
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

	_this.preload = function(_entityID) {
		entityID = _entityID;

		dynamicLights = true;
		if (dynamicLights) {
			_this.initDynamicLights();
			Entities.webEventReceived.connect(_this.webEventReceived);
		}
	}

	this.unload = function() {
		if (dynamicLights) {
			Entities.webEventReceived.disconnect(_this.webEventReceived);

			dynamicLightsID.forEach(function(dynamicLightID) {
				Entities.deleteEntity(dynamicLightID);
			});
		}
	}
})