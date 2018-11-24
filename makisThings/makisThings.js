// ┏┳┓┏━┓╻┏ ╻╻┏━┓
// ┃┃┃┣━┫┣┻┓┃ ┗━┓
// ╹ ╹╹ ╹╹ ╹╹ ┗━┛
// ╺┳╸╻ ╻╻┏┓╻┏━╸┏━┓
//  ┃ ┣━┫┃┃┗┫┃╺┓┗━┓
//  ╹ ╹ ╹╹╹ ╹┗━┛┗━┛
// github.com/makitsune/hifi-stuff

var inDev = false;

var assetsURL = (inDev)? "file:///D:/Git/hifi-stuff/makisThings/": "http://makitsune.github.io/hifi-stuff/makisThings/";
function atob(r){for(var t,a=String(r),c=0,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o="";a.charAt(0|c)||(n="=",c%1);o+=n.charAt(63&t>>8-c%1*8))t=t<<8|a.charCodeAt(c+=.75);return o}

function debug(msg) {
	if (!inDev) return;
	var out = "";
	for (var i=0; i<64; i++) out += "\n";
	console.log(out+msg);
}

var modules = {
	sleep: {
		name: "sleep",
		enabled: false,
		on: function() {
			MyAvatar.overrideAnimation("https://maki.cat/hifi/animations/sleep.fbx?1", 1, true, 0, 1);
			MyAvatar.hasProceduralBlinkFaceMovement = false;
			MyAvatar.hasProceduralEyeFaceMovement = false;
			MyAvatar.hasScriptedBlendshapes = true;
			MyAvatar.setBlendshape("EyeBlink_L", 1);
			MyAvatar.setBlendshape("EyeBlink_R", 1);

			MyAvatar.setCollisionsEnabled(false);
			MyAvatar.position = Vec3.mix(
				MyAvatar.getJointPosition(MyAvatar.getJointIndex("LeftFoot")),
				MyAvatar.getJointPosition(MyAvatar.getJointIndex("RightFoot")),
				0.5
			);
		},
		off: function() {
			MyAvatar.restoreAnimation();
			MyAvatar.setBlendshape("EyeBlink_L", 0);
			MyAvatar.setBlendshape("EyeBlink_R", 0);
			MyAvatar.hasProceduralBlinkFaceMovement = true;
			MyAvatar.hasProceduralEyeFaceMovement = true;
			MyAvatar.hasScriptedBlendshapes = false; 

			MyAvatar.position = {
				x: MyAvatar.position.x,
				y: MyAvatar.position.y+1.5,
				z: MyAvatar.position.z,
			};
			MyAvatar.setCollisionsEnabled(true);
		}
	},
	collisionless: {
		name: "collisionless",
		enabled: !MyAvatar.getCollisionsEnabled(),
		on: function() {
			MyAvatar.setCollisionsEnabled(false);
		},
		off: function() {
			MyAvatar.setCollisionsEnabled(true);
		}
	},
	vulpie: {
		name: "vulpie",
		enabled: false,
		entityID: undefined,
		on: function() {
			modules.vulpie.entityID = Entities.addEntity({
				type: "Model",
				modelURL: "https://maki.cat/hifi/wearables/vulpie.fbx",
				name: "Vulpie",
				position: Vec3.sum(MyAvatar.position, Vec3.multiplyQbyV(Quat.cancelOutRollAndPitch(Camera.orientation), {y: 0.3, z: -0.5})),
				rotation: Quat.cancelOutRollAndPitch(Camera.orientation),
				dimensions: {
					x: 0.1253,
					y: 0.2068,
					z: 0.2325,
				},
				collisionless: true,
			}, !(Entities.canRez()||Entities.canRezTmp()));
		},
		off: function() {
			if (!modules.vulpie.entityID) return;
			Entities.deleteEntity(modules.vulpie.entityID);
		}
	},
	ledgeSit: {
		name: "ledge sit",
		enabled: false,
		on: function() {
			MyAvatar.overrideAnimation("https://maki.cat/hifi/animations/ledgeSit.fbx", 1, true, 0, 1);

			MyAvatar.setCollisionsEnabled(false);
			MyAvatar.position = Vec3.mix(
				MyAvatar.getJointPosition(MyAvatar.getJointIndex("LeftFoot")),
				MyAvatar.getJointPosition(MyAvatar.getJointIndex("RightFoot")),
				0.5
			);
		},
		off: function() {
			MyAvatar.restoreAnimation();

			MyAvatar.position = {
				x: MyAvatar.position.x,
				y: MyAvatar.position.y+1.5,
				z: MyAvatar.position.z,
			};
			MyAvatar.setCollisionsEnabled(true);
		}
	},
	cryingSit: {
		name: "crying sit",
		enabled: false,
		on: function() {
			MyAvatar.overrideAnimation("https://maki.cat/hifi/animations/cryingSit.fbx?7", 1, true, 0, 1);
			MyAvatar.hasProceduralBlinkFaceMovement = false;
			MyAvatar.hasProceduralEyeFaceMovement = false;
			MyAvatar.hasScriptedBlendshapes = true;
			MyAvatar.setBlendshape("EyeBlink_L", 1);
			MyAvatar.setBlendshape("EyeBlink_R", 1);

			MyAvatar.setCollisionsEnabled(false);
			MyAvatar.position = Vec3.mix(
				MyAvatar.getJointPosition(MyAvatar.getJointIndex("LeftFoot")),
				MyAvatar.getJointPosition(MyAvatar.getJointIndex("RightFoot")),
				0.5
			);
		},
		off: function() {
			MyAvatar.restoreAnimation();
			MyAvatar.setBlendshape("EyeBlink_L", 0);
			MyAvatar.setBlendshape("EyeBlink_R", 0);
			MyAvatar.hasProceduralBlinkFaceMovement = true;
			MyAvatar.hasProceduralEyeFaceMovement = true;
			MyAvatar.hasScriptedBlendshapes = false; 

			MyAvatar.position = {
				x: MyAvatar.position.x,
				y: MyAvatar.position.y+1.5,
				z: MyAvatar.position.z,
			};
			MyAvatar.setCollisionsEnabled(true);
		}
	},
	hairbrush: {
		name: "hairbrush",
		enabled: false,
		brushing: false,
		entityID: undefined,
		sounds: [
			[SoundCache.getSound(assetsURL+"/sounds/hairbrush01a.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush01b.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush01c.wav")],
			[SoundCache.getSound(assetsURL+"/sounds/hairbrush02a.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush02b.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush02c.wav")],
			[SoundCache.getSound(assetsURL+"/sounds/hairbrush03a.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush03b.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush03c.wav")],
			[SoundCache.getSound(assetsURL+"/sounds/hairbrush04a.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush04b.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush04c.wav")],
			[SoundCache.getSound(assetsURL+"/sounds/hairbrush05a.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush05b.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush05c.wav")],
			[SoundCache.getSound(assetsURL+"/sounds/hairbrush06a.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush06b.wav"),SoundCache.getSound(assetsURL+"/sounds/hairbrush06c.wav")],
		],
		selectedSound: undefined,
		midAudioInjector: undefined,
		rolesToOverride: [],		
		inputEvent: function(action, value) {
			var scope = modules.hairbrush;

			if (action != Controller.Standard.RTClick) return;
			scope.brushing = !scope.brushing;

			if (scope.brushing) {
				scope.selectedSound = scope.sounds[Math.floor(Math.random()*scope.sounds.length)];

				var start = Audio.playSound(scope.selectedSound[0], {
					position: Entities.getEntityProperties(scope.entityID, ["position"]).position,
					volume: 0.5,
					localOnly: true,
				});

				start.finished.connect(function() {
					if (!scope.brushing) return;
					scope.midAudioInjector = Audio.playSound(scope.selectedSound[1], {
						position: Entities.getEntityProperties(scope.entityID, ["position"]).position,
						volume: 0.5,
						localOnly: true,
						loop: true,
					});
				});
			} else {
				if (modules.hairbrush.midAudioInjector)
					if (modules.hairbrush.midAudioInjector.isPlaying)
						scope.midAudioInjector.stop();

				Audio.playSound(scope.selectedSound[2], {
					position: Entities.getEntityProperties(scope.entityID, ["position"]).position,
					volume: 0.5,
					localOnly: true,
				});
			}
		}, 
		on: function() {
			// roles to override
			modules.hairbrush.rolesToOverride = 
			MyAvatar.getAnimationRoles().filter(function(role) {
                return (role.indexOf("right")>-1)
            });

			for (i in modules.hairbrush.rolesToOverride) {
				MyAvatar.overrideRoleAnimation(
					modules.hairbrush.rolesToOverride[i],
					assetsURL+"/animations/hairbrush.fbx",
					1, true, 0, 1
				);
			}

			// spawn hairbrush
			modules.hairbrush.entityID = Entities.addEntity({
				type: "Model",
				modelURL: assetsURL+"models/hairbrush.fbx",
				name: "Hairbrush",
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				position: Vec3.sum(
					MyAvatar.getJointPosition("RightHandThumb1"),
					{x:-0.04,y:-0.04,z:0.04}
				),
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				rotation: Quat.multiply(
					MyAvatar.getRightPalmRotation(),
					Quat.fromPitchYawRollDegrees(240,-120,35)
				),
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				// fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you fuck you 
				parentID: MyAvatar.sessionUUID,
				parentJointIndex: MyAvatar.getJointIndex("RightHandThumb1"),
				collisionless: true,
				userData: JSON.stringify({grabbableKey: {grabbable: false}}),
			}, !(Entities.canRez()||Entities.canRezTmp()));

			// connect input event
			Controller.inputEvent.connect(modules.hairbrush.inputEvent);
		},
		off: function() {
			// restore roles to override
			for (i in modules.hairbrush.rolesToOverride) {
				MyAvatar.restoreRoleAnimation(modules.hairbrush.rolesToOverride[i]);
			}

			// disable stuff
			if (modules.hairbrush.entityID) Entities.deleteEntity(modules.hairbrush.entityID);
			if (modules.hairbrush.forceJointRotations) Script.clearInterval(modules.hairbrush.forceJointRotations);
			if (modules.hairbrush.inputEvent) Controller.inputEvent.disconnect(modules.hairbrush.inputEvent);
			if (modules.hairbrush.midAudioInjector)
				if (modules.hairbrush.midAudioInjector.isPlaying)
					modules.hairbrush.midAudioInjector.stop();
		}
	},
	// sonic speed
	// cross legged
	// seiza

}

function collisionsEnabledChanged(enabled) {
	modules.collisionless.enabled = !enabled;
	emitModules();
}

function loadModules() {
	MyAvatar.collisionsEnabledChanged.connect(collisionsEnabledChanged);
}

function unloadModules() {
	MyAvatar.collisionsEnabledChanged.disconnect(collisionsEnabledChanged);

	Object.keys(modules).forEach(function(key) {
		if (modules[key].enabled) modules[key].off();
	});
}

// tablet
var uuid = Uuid.generate(); 
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: 'data:image/svg;xml,<svg viewBox="0 0 43 43" xmlns="http://www.w3.org/2000/svg"><path transform="translate(0 6.5)" fill="#fff" d="M1.49 5.38c2.24-5.22 9.8-6.44 13.99-2.91 3.66 2.96 5.24 7.61 6.33 12.02 1.07-4.28 2.57-8.75 6.01-11.73C31.83-1.09 39.54.03 41.97 5.14c1.81 3.8.09 8.33-2.59 11.25-3.47 3.75-9.08 3.87-12.99 6.93-1.62 2.02-2.28 4.63-3.88 6.68h-.89c-1.66-1.94-2.42-4.46-4-6.45-3.37-2.78-7.98-3.2-11.58-5.58-3.89-2.69-6.23-8-4.55-12.59m3.64 1.7c-.82 3.37 1.52 6.76 4.43 8.26 3.17 1.22 6.44 2.24 9.42 3.94-1.47-4.62-2.12-9.93-5.82-13.41-2.24-2.32-6.58-1.63-8.03 1.21m25.63-1.45c-4.01 3.4-4.71 8.91-6.05 13.67 3.99-2.75 9.75-2.7 12.64-6.94 1.21-1.73 2.08-4.34.51-6.14-1.75-1.89-5.14-2.51-7.1-.59z"/></svg>',
	text: "Things"
});

function getModulesInfo() {
	var modulesInfo = [];
	var modulesKeys = Object.keys(modules);
	modulesKeys.forEach(function(key) {
		var moduleInfo = {
			key: key,
			name: modules[key].name,
			enabled: modules[key].enabled,
		}

		modulesInfo.push(moduleInfo);
	});

	return modulesInfo;
}

function emitEvent(key, value) {
	tablet.emitScriptEvent(JSON.stringify({
		key: key, value: value,
		uuid: uuid,
	}));
}

function emitModules() {
	emitEvent("updateModules", getModulesInfo(false));
}

function webEventReceived(json) {
	try {
		json = JSON.parse(json);
	} catch(err) {}
	if (json.uuid != uuid) return;

	switch (json.key) {
		case "toggleModule":
			if (json.value.key==undefined) break;
			if (json.value.enabled==undefined) break;

			modules[json.value.key].enabled = json.value.enabled;
			modules[json.value.key][(json.value.enabled)?"on":"off"]();

			debug(json.value.key+" set to "+json.value.enabled);
			emitModules();
			break;
	}
}

function buttonClicked() {
	tablet.gotoWebScreen(assetsURL+"makisThings.html"+
		"?uuid="+uuid+
		"&modules="+atob(JSON.stringify(getModulesInfo(true)))
	);
}

// init
loadModules();
tablet.webEventReceived.connect(webEventReceived);
button.clicked.connect(buttonClicked);

Script.scriptEnding.connect(function() {
	unloadModules();
	tablet.webEventReceived.disconnect(webEventReceived);
	button.clicked.disconnect(buttonClicked);

	tablet.removeButton(button);
});
