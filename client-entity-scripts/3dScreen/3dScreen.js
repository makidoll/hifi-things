/*
{
	"res": 64,
	"url": "https://www.webrtc-experiment.com/screen/?s=Maki&p=cutecutecute&codecs=vp8",
	"dpi": 20,
	"fov": 177.45
}
*/

(function() {
	var _this = this;

	_this.userData = undefined;
	_this.entityID = undefined;
	_this.webEntityID = undefined;

	_this.initCamera = function(entity) {
		Render.getConfig("SecondaryCameraJob.ToneMapping").curve = 0;
		Render.getConfig("SecondaryCamera").farClipPlaneDistance = 1;
		Render.getConfig("SecondaryCamera").attachedEntityId = _this.entityID;
		Render.getConfig("SecondaryCamera").vFoV = _this.userData.fov;
		Render.getConfig("SecondaryCamera").resetSizeSpectatorCamera(
			entity.dimensions.x*_this.userData.res,
			entity.dimensions.y*_this.userData.res
		);
		Render.getConfig("SecondaryCamera").enableSecondaryCameraRenderConfigs(true);
	}

	_this.initOverlay = function(entity) {
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

	_this.geometryChanged = function() {
		var entity = Entities.getEntityProperties(_this.entityID, ["dimensions"]);
		Render.getConfig("SecondaryCamera").resetSizeSpectatorCamera(
			entity.dimensions.x*_this.userData.res,
			entity.dimensions.y*_this.userData.res
		);
	}

	_this.preload = function(entityID) {
		_this.entityID = entityID;
		var entity = Entities.getEntityProperties(_this.entityID, ["userData", "rotation", "dimensions", "position"]);

		try { _this.userData = JSON.parse(entity.userData);
		} catch(err) { return; }

		if (typeof _this.userData.res != "number") return;
		if (typeof _this.userData.url != "string") return;
		if (typeof _this.userData.dpi != "number") return;
		if (typeof _this.userData.fov != "number") return;

		_this.initCamera(entity);
		_this.initOverlay(entity);

		Window.geometryChanged.connect(_this.geometryChanged);
	};
	
	_this.unload = function() {
		Render.getConfig("SecondaryCamera").enableSecondaryCameraRenderConfigs(false);

		Entities.deleteEntity(_this.webEntityID);
		Entities.findEntitiesByName(
			"cat.maki.3dScreen", MyAvatar.position,
			100000, false
		).forEach(function(webEntityID) {
			Entities.deleteEntity(_this.webEntityID);
		});

		Window.geometryChanged.disconnect(_this.geometryChanged);
	};
})