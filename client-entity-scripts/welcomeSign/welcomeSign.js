(function() {
	var script = this;
	var imageID;

	script.preload = function(entityID) {
		var entity = Entities.getEntityProperties(entityID, ["position", "rotation", "dimensions"]);

		imageID = Entities.addEntity({
			name: "cat.maki.welcomeSign",
			parentID: entityID,

			position: entity.position,
			rotation: entity.rotation,
			dimensions: entity.dimensions,
			grab: {
				grabbable: false,
				grabFollowsController: false,
				equippable: false,
			},

			type: "Image",
			emissive: true,
			keepAspectRatio: false,
			imageURL: "https://maki.cat/welcomeSign/?username="+AccountServices.username+"&place="+location.placename,
			alpha: 1,
		}, "local");
	}

	script.unload = function(entityID) {
		Entities.deleteEntity(imageID);
	}
})