(function() {
	// not my code. maybe menithal or samual?
	var ScrollingMaterial = (function() {
		var DEFAULT_HORIZONTAL_SPEED = 0.05;
		var DEFAULT_VERTICAL_SPEED = 0.04;
		var UPDATE_INTERVAL = 20;

		this.t = 0;
		var self = this;
		this.preload = function(entityID) {
			self.intervalID = Script.setInterval(function() {
				var verticalSpeed = DEFAULT_VERTICAL_SPEED;
				var horizontalSpeed = DEFAULT_HORIZONTAL_SPEED;
				var userData = JSON.parse(Entities.getEntityProperties(entityID, ["userData"]).userData);
				if (userData !== undefined) {
					if (userData.horizontalScrollSpeed !== undefined) {
						horizontalSpeed = userData.horizontalScrollSpeed;
					}
					if (userData.verticalScrollSpeed !== undefined) {
						verticalSpeed = userData.verticalScrollSpeed;
					}
				}
				Entities.editEntity(entityID, { materialMappingPos: { x: horizontalSpeed * self.t, y: verticalSpeed * self.t }});
				self.t = self.t + UPDATE_INTERVAL / 1000;
			}, UPDATE_INTERVAL);
		};
		this.unload = function() {
			Script.clearInterval(self.intervalID);
		}
	});

	var MaterialSwitcher = (function() {
		var entityID = undefined;
		var interval = undefined;
		var currentImage = -1;
		var images = [];

		function nextImage() {
			if (!entityID) return;

			var entity = Entities.getEntityProperties(entityID, ["materialData"]);
			try { var materialData = JSON.parse(entity.materialData);
			} catch(err) { return; }

			currentImage++;
			if (currentImage>=images.length) currentImage = 0;
			console.log(currentImage);

			materialData.materials.emissiveMap = images[currentImage];
			materialData.materials.albedoMap = images[currentImage];

			Entities.editEntity(entityID, {
				materialData: JSON.stringify(materialData)
			});
		}

		this.preload = function(_entityID) {
			entityID = _entityID;
			var entity = Entities.getEntityProperties(entityID, ["userData"]);
			try { var userData = JSON.parse(entity.userData);
			} catch(err) { return; }

			if (!userData.switchImages) return;
			if (userData.switchImages.length<0) return;
			images = userData.switchImages;

			nextImage();
			interval = Script.setInterval(function() {
				nextImage();
			}, userData.switchSpeed*1000||1000);
		}

		this.unload = function() {
			if (interval) Script.clearInterval(interval);
		}
	});

	var scrollingMaterial = new ScrollingMaterial();
	var materialSwitcher = new MaterialSwitcher();
	this.preload = function(entityID) {
		scrollingMaterial.preload(entityID);
		materialSwitcher.preload(entityID);
	}
	this.unload = function() {
		scrollingMaterial.unload();
		materialSwitcher.unload();
	}
});