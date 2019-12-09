/*
{
	"url": "https://tivolicloud.com/stream",
	"blacklistedUsers": ["Camera"]
}
*/

(function() {
	var _this = this;

	_this.hidden = false;

	_this.url = "";
	_this.dpi = 30;
	_this.maxFPS = 255;

	_this.entityID = null;
	_this.webEntityID = null;

	_this.initWebEntity = function() {
		if (_this.entityID == null) return;

		var properties = Entities.getEntityProperties(_this.entityID, [
			"position",
			"rotation",
			"dimensions"
		]);

		console.log(_this.url);

		_this.webEntityID = Entities.addEntity(
			{
				type: "Web",
				name: "Reality Portal Web Entity",
				parentID: _this.entityID,

				sourceUrl: _this.url,
				dpi: _this.dpi,
				maxFPS: _this.maxFPS,

				position: properties.position,
				rotation: properties.rotation,
				dimensions: properties.dimensions
			},
			"local"
		);

		console.log(
			JSON.stringify(
				Entities.getEntityProperties(_this.webEntityID).position
			)
		);
	};

	_this.preload = function(entityID) {
		_this.entityID = entityID;
		var properties = Entities.getEntityProperties(_this.entityID, [
			"userData"
		]);

		try {
			var userData = JSON.parse(properties.userData);
			if (userData.url != null) _this.url = userData.url;
			if (userData.blacklistedUsers != null) {
				userData.blacklistedUsers.forEach(function(username) {
					if (AccountServices.username == username) {
						_this.hidden = true;
					}
				});
			}
		} catch (err) {}

		if (!_this.hidden) _this.initWebEntity();
	};

	_this.unload = function() {
		Entities.deleteEntity(_this.webEntityID);
	};
});
