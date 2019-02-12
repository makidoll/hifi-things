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
		var entity = Entities.getEntityProperties(entityID, ["position"]);

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
		if (soundTeleport)
			if (soundTeleport.downloaded)
				Audio.playSound(soundTeleport, {
					//position: MyAvatar.position,
					volume: 0.1,
					localOnly: true
				});
	};
})