"use strict";
/*
{
    "address": "" // you can find this in "Navigage > Copy Address to Clipboard"
}
*/
(function () {
    var Portal = /** @class */ (function () {
        function Portal() {
            this.entityID = "";
            this.soundTeleport = {};
        }
        //soundLoop: SoundObject = ({} as SoundObject);
        //soundLoopInjector: AudioInjector = ({} as AudioInjector);
        //soundLoopInterval: Timer = {};
        Portal.prototype.preload = function (entityID) {
            this.entityID = entityID;
            //let entity = Entities.getEntityProperties(entityID, ["position"]);
            this.soundTeleport = SoundCache.getSound(Script.resolvePath("sounds/sl_teleport.mp3"));
            // let soundOpen = SoundCache.getSound(Script.resolvePath("sounds/portal_open1.wav"));
            // soundOpen.ready.connect(function() {
            // 	 Audio.playSound(soundOpen, {
            // 		position: entity.position,
            // 		volume: 0.1,
            // 		localOnly: true
            // 	});
            // });
            // this.soundLoop = SoundCache.getSound(Script.resolvePath("sounds/portal_ambient_loop1.wav"));
            // this.soundLoop.ready.connect(()=>{
            // this.soundLoopInjector = Audio.playSound(this.soundLoop, {
            // 	position: entity.position,
            // 	volume: 0.1,
            // 	loop: true,
            // 	localOnly: true
            // });
            // this.soundLoopInterval = Script.setInterval(()=>{
            // 	if (!this.soundLoopInjector) return;
            // 	// move audio to new position
            // 	entity = Entities.getEntityProperties(entityID, ["position"]);
            // 	soundLoopInjector.setOptions({
            // 		position: entity.position
            // 	});
            // }, 500);
        };
        Portal.prototype.unload = function () {
            // Script.clearInterval(this.soundLoopInterval);
            // if (this.soundLoopInjector)
            // 	if (this.soundLoopInjector.playing)
            // 		this.soundLoopInjector.stop();
        };
        Portal.prototype.enterEntity = function (entityID) {
            //if (entityID!=MyAvatar.sessionUUID) return;
            var entity = Entities.getEntityProperties(entityID, ["userData", "position", "rotation"]);
            var userData;
            try {
                userData = JSON.parse(entity.userData);
            }
            catch (err) {
                return;
            }
            if (!userData.address)
                return;
            // move user back slightly so that there is no loop
            // MyAvatar.position = Vec3.sum(
            // 	MyAvatar.position,
            // 	Vec3.multiplyQbyV(MyAvatar.orientation, {x:0,y:0,z:1.5})
            // );
            // MyAvatar.orientation = Quat.multiply(
            // 	MyAvatar.orientation,
            // 	Quat.fromPitchYawRollDegrees(0,180,0)
            // );
            MyAvatar.position = Vec3.sum(entity.position, Vec3.multiplyQbyV(entity.rotation, { x: 0, y: 0, z: 1 }));
            MyAvatar.orientation = Quat.multiply(entity.rotation, Quat.fromPitchYawRollDegrees(0, 180, 0));
            Window.location = userData.address;
            if (this.soundTeleport)
                if (this.soundTeleport.downloaded)
                    Audio.playSound(this.soundTeleport, {
                        //position: MyAvatar.position,
                        volume: 0.1,
                        localOnly: true
                    });
        };
        return Portal;
    }());
    return new Portal();
});
