(function() {
	this.enterEntity = function (entityID) {
		var entity = Entities.getEntityProperties(entityID, ["parentID"]);
		var parentID = entity.parentID;
		if (parentID == undefined) return;

		Messages.sendMessage("cat.maki.shatterGlass", JSON.stringify({
			entityID: parentID,
			velocity: MyAvatar.velocity
		}));
	}
})