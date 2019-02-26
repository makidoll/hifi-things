/*
{
	"res": 128,
	"url": "https://www.webrtc-experiment.com/screen/?s=Maki&p=cutecutecute&codecs=vp8",
	"dpi": 20
}
*/

(function() {
	var _this = this;

	_this.entityID = undefined;
	_this.webEntityID = undefined;

	_this.initCamera = function(entity, userData) {
		Render.getConfig("SecondaryCameraJob.ToneMapping").curve = 0;
		Render.getConfig("SecondaryCamera").farClipPlaneDistance = 1;
		Render.getConfig("SecondaryCamera").attachedEntityId = _this.entityID;
		Render.getConfig("SecondaryCamera").vFoV = 177.45;
		Render.getConfig("SecondaryCamera").resetSizeSpectatorCamera(
			entity.dimensions.x*userData.res,
			entity.dimensions.y*userData.res
		);
		Render.getConfig("SecondaryCamera").enableSecondaryCameraRenderConfigs(true);
	}

	_this.initOverlay = function(entity, userData) {
		_this.webEntityID = Entities.addEntity({
			type: "Web",
			name: "cat.maki.3dScreen",
			parentID: _this.entityID,

			sourceUrl: userData.url,
			dpi: userData.dpi,
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

	_this.preload = function(entityID) {
		_this.entityID = entityID;
		var entity = Entities.getEntityProperties(_this.entityID, ["userData", "rotation", "dimensions", "position"]);

		try { var userData = JSON.parse(entity.userData);
		} catch(err) { return; }

		if (typeof userData.res != "number") return;
		if (typeof userData.url != "string") return;
		if (typeof userData.dpi != "number") return;

		_this.initCamera(entity, userData);
		_this.initOverlay(entity, userData);
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
	};
})