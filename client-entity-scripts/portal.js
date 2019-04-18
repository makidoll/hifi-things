/*
{
	"address": "" // you can find this in "Navigage > Copy Address to Clipboard"
}
*/

(function() {
	var entityID = undefined;
	var soundTeleport = undefined;
	//var soundLoop = undefined;
	//var soundLoopInjector = undefined;
	//var soundLoopInterval = undefined;

	this.preload = function(_entityID) {
		entityID = _entityID;
		//var entity = Entities.getEntityProperties(entityID, ["position"]);

		soundTeleport = SoundCache.getSound(Script.resolvePath("sounds/sl_teleport.mp3"));

		// var soundOpen = SoundCache.getSound(Script.resolvePath("sounds/portal_open1.wav"));
		// soundOpen.ready.connect(function() {
		// 	 Audio.playSound(soundOpen, {
		// 		position: entity.position,
		// 		volume: 0.1,
		// 		localOnly: true
		// 	});
		// });

		// soundLoop = SoundCache.getSound(Script.resolvePath("sounds/portal_ambient_loop1.wav"));
		// soundLoop.ready.connect(function() {
		// 	soundLoopInjector = Audio.playSound(soundLoop, {
		// 		position: entity.position,
		// 		volume: 0.1,
		// 		loop: true,
		// 		localOnly: true
		// 	});
		// });

		// soundLoopInterval = Script.setInterval(function() {
		// 	if (!soundLoopInjector) return;
		// 	// move audio to new position
		// 	entity = Entities.getEntityProperties(entityID, ["position"]);
		// 	soundLoopInjector.setOptions({
		// 		position: entity.position
		// 	});
		// }, 500);
	}

	this.unload = function() {
		// Script.clearInterval(soundLoopInterval);
		// if (soundLoopInjector)
		// 	if (soundLoopInjector.playing)
		// 		soundLoopInjector.stop();
	}

	this.enterEntity = function (entityID) {
		//if (entityID!=MyAvatar.sessionUUID) return;

		var entity = Entities.getEntityProperties(entityID, ["userData", "position", "rotation"]);
		try { var userData = JSON.parse(entity.userData);
		} catch(err) { return; }

		if (!userData.address) return;

		// move user back slightly so that there is no loop
		// MyAvatar.position = Vec3.sum(
		// 	MyAvatar.position,
		// 	Vec3.multiplyQbyV(MyAvatar.orientation, {x:0,y:0,z:1.5})
		// );

		// MyAvatar.orientation = Quat.multiply(
		// 	MyAvatar.orientation,
		// 	Quat.fromPitchYawRollDegrees(0,180,0)
		// );

		MyAvatar.position = Vec3.sum(
			entity.position,
			Vec3.multiplyQbyV(entity.rotation, {x:0,y:0,z:1})
		);

		MyAvatar.orientation = Quat.multiply(
			entity.rotation,
			Quat.fromPitchYawRollDegrees(0,180,0)
		);

		Window.location = userData.address;

		if (soundTeleport)
			if (soundTeleport.downloaded)
				Audio.playSound(soundTeleport, {
					//position: MyAvatar.position,
					volume: 0.1,
					localOnly: true
				});
	};
})