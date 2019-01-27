/*
{
	"address": "" // you can find this in "Navigage > Copy Address to Clipboard"
}
*/

(function() {
	var entityID = undefined;

	this.preload = function(_entityID) {
		entityID = _entityID;
	}

	this.enterEntity = function (entityID) {
		//if (entityID!=MyAvatar.sessionUUID) return;

		var entity = Entities.getEntityProperties(entityID, ["userData"]);
		try { var userData = JSON.parse(entity.userData);
		} catch(err) { return; }

		// if (!userData.position) return;
		// var position = userData.position;
		// var rotation = (userData.rotation!=undefined)? userData.rotation: 0;
		
		// MyAvatar.orientation = Quat.fromPitchYawRollDegrees(0, rotation, 0);
		// MyAvatar.position = Vec3.sum(
		// 	Vec3.subtract(MyAvatar.position, MyAvatar.getWorldFeetPosition()),
		// 	position
		// );

		if (!userData.address) return;
		Window.location = userData.address;
	};
})