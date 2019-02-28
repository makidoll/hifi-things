/*
{
	"res": 64,
	"url": "https://www.webrtc-experiment.com/screen/?s=Maki&p=cutecutecute&codecs=vp8",
	"dpi": 20
	//"fov": 177.45
}
*/

(function() {
	var _this = this;

	_this.userData = undefined;

	_this.entityID = undefined;
	_this.webEntityID = undefined;
	_this.dynamicLightsID = [];

	_this.initCamera = function(entity) {
		Render.getConfig("SecondaryCameraJob.ToneMapping").curve = 0;
		Render.getConfig("SecondaryCamera").farClipPlaneDistance = 1;
		Render.getConfig("SecondaryCamera").attachedEntityId = _this.entityID;
		//Render.getConfig("SecondaryCamera").vFoV = _this.userData.fov;
		Render.getConfig("SecondaryCamera").vFoV = 177.45;
		Render.getConfig("SecondaryCamera").resetSizeSpectatorCamera(
			entity.dimensions.x*_this.userData.res,
			entity.dimensions.y*_this.userData.res
		);
		Render.getConfig("SecondaryCamera").enableSecondaryCameraRenderConfigs(true);
	}

	_this.initWebEntity = function(entity) {
		_this.webEntityID = Entities.addEntity({
			type: "Web",
			name: "cat.maki.3dScreen",
			parentID: _this.entityID,

			sourceUrl: _this.userData.url,
			dpi: _this.userData.dpi,
			maxFPS: 90,

			position: Vec3.sum(
				entity.position,
				{z: -0.1}
			),
			// position: Vec3.multiplyQbyV(
			// 	entity.rotation,
			// 	Vec3.sum(
			// 		entity.position,
			// 		{z: -0.1}
			// 	)
			// ),
			rotation: entity.rotation,
			dimensions: entity.dimensions,
		}, "local");
	}

	_this.initDynamicLights = function(entityID) {
		var entity = Entities.getEntityProperties(entityID, ["dimensions"]);

		_this.dynamicLightsID = [
			[-1, 1], [ 0, 1], [ 1, 1],
			[-1, 0],          [ 1, 0],
			[-1,-1], [ 0,-1], [ 1,-1],
		].map(function(light) {
			return Entities.addEntity({
				type: "Light",
				name: "cat.maki.3dScreen",
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

	_this.geometryChanged = function() {
		var entity = Entities.getEntityProperties(_this.entityID, ["dimensions"]);
		Script.setTimeout(function() {
			Render.getConfig("SecondaryCamera").resetSizeSpectatorCamera(
				entity.dimensions.x*_this.userData.res,
				entity.dimensions.y*_this.userData.res
			);
		}, 100);
	}

	_this.webEventReceived = function(entityID, msg) {
		if (entityID != _this.webEntityID) return;
		msg = msg.split(",");

		Entities.editEntity(_this.dynamicLightsID[0], {color:{r:msg[ 0],g:msg[ 1],b:msg[ 2]}});
		Entities.editEntity(_this.dynamicLightsID[1], {color:{r:msg[ 3],g:msg[ 4],b:msg[ 5]}});
		Entities.editEntity(_this.dynamicLightsID[2], {color:{r:msg[ 6],g:msg[ 7],b:msg[ 8]}});

		Entities.editEntity(_this.dynamicLightsID[3], {color:{r:msg[ 9],g:msg[10],b:msg[11]}});
		Entities.editEntity(_this.dynamicLightsID[4], {color:{r:msg[12],g:msg[13],b:msg[14]}});

		Entities.editEntity(_this.dynamicLightsID[5], {color:{r:msg[15],g:msg[16],b:msg[17]}});
		Entities.editEntity(_this.dynamicLightsID[6], {color:{r:msg[18],g:msg[19],b:msg[20]}});
		Entities.editEntity(_this.dynamicLightsID[7], {color:{r:msg[21],g:msg[22],b:msg[23]}});
	}

	_this.preload = function(entityID) {
		_this.entityID = entityID;
		var entity = Entities.getEntityProperties(_this.entityID, ["userData", "rotation", "dimensions", "position", "parentID"]);

		try { _this.userData = JSON.parse(entity.userData);
		} catch(err) { return; }

		if (typeof _this.userData.res != "number") return;
		if (typeof _this.userData.url != "string") return;
		if (typeof _this.userData.dpi != "number") return;
		//if (typeof _this.userData.fov != "number") return;

		_this.initCamera(entity);
		_this.initWebEntity(entity);
		if (entity.parentID) _this.initDynamicLights(entity.parentID);

		Window.geometryChanged.connect(_this.geometryChanged);
		Entities.webEventReceived.connect(_this.webEventReceived);
	};
	
	_this.unload = function() {
		Render.getConfig("SecondaryCamera").enableSecondaryCameraRenderConfigs(false);

		Entities.deleteEntity(_this.webEntityID);
		_this.dynamicLightsID.forEach(function(dynamicLightID) {
			Entities.deleteEntity(dynamicLightID);
		});

		// doesnt even work ergh...
		Entities.findEntitiesByName(
			"cat.maki.3dScreen", MyAvatar.position,
			100000, false
		).forEach(function(webEntityID) {
			Entities.deleteEntity(webEntityID);
		});

		Window.geometryChanged.disconnect(_this.geometryChanged);
		Entities.webEventReceived.disconnect(_this.webEventReceived);
	};
})