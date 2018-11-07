// ┏┳┓┏━┓╻┏ ╻╻┏━┓
// ┃┃┃┣━┫┣┻┓┃ ┗━┓
// ╹ ╹╹ ╹╹ ╹╹ ┗━┛
// ╺┳╸╻ ╻╻┏┓╻┏━╸┏━┓
//  ┃ ┣━┫┃┃┗┫┃╺┓┗━┓
//  ╹ ╹ ╹╹╹ ╹┗━┛┗━┛
// github.com/makitsune/hifi-stuff

var inDev = false;

var assetsUrl = (inDev)? "file:///D:/Git/hifi-stuff/makisThings/": "http://makitsune.github.io/hifi-stuff/makisThings/";
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
		icon: '<svg viewBox="0 0 128 128"><path d="M41.27 100.79c-.66-.41-1.36-.74-2.06-1.07-.83-.41-1.67-.82-2.52-1.18-1.3-.55-2.63-1.07-3.93-1.63-1.58-.68-3.16-1.38-4.74-2.08-3.03-1.33-6.73-4.12-9.17.12-.51.88-1.1 2.11-1.15 3.1-.07 1.64.98 2.47 2.34 3.19 1.4.73 2.83 1.39 4.28 2.02.48.21.96.41 1.45.61.28.12.76.25.7.6-.05.27-.4.47-.62.6-.4.24-.8.45-1.21.68l-.57.3c-1.18.62-2.36 1.24-3.53 1.84-.93.48-1.86.98-2.77 1.51-.38.2-.76.4-1.14.59-1.25.64-2.35 1.38-3.52 2.13l-.46.32c-1.09.8-2.24 1.73-2.49 3.1-.32 1.76.98 2.74 2.48 3.64.53.32 1.08.59 1.66.82l.05.03c1.84 1.01 3.95 1.78 5.97 2.65 1.58.69 3.16 1.38 4.74 2.08 3.03 1.33 6.73 4.12 9.17-.12.51-.88 1.11-2.11 1.15-3.1.07-1.64-.98-2.47-2.34-3.19-1.39-.74-2.83-1.39-4.28-2.02-.32-.13-.64-.27-.96-.4-.22-.09-.63-.18-.77-.36-.35-.42.42-.69.68-.82.85-.41 1.68-.83 2.52-1.27.87-.46 1.76-.89 2.59-1.43.44-.22.88-.43 1.32-.67.94-.5 1.91-.96 2.8-1.57 2.26-1.55 7.38-3.14 6.08-6.73-.25-.74-1.02-1.83-1.75-2.29zM81.23 69.94c-.82-.63-1.7-1.16-2.58-1.7-1.05-.65-2.1-1.31-3.2-1.9-1.65-.9-3.34-1.77-4.98-2.68-2.01-1.12-4.01-2.27-6.02-3.4-3.85-2.17-8.37-6.38-12.18-1.06-.8 1.1-1.75 2.65-1.94 3.96-.32 2.17.96 3.41 2.68 4.55 1.75 1.16 3.57 2.22 5.4 3.25.61.35 1.23.68 1.84 1.01.36.2.98.42.84.9-.09.35-.59.57-.9.71-.55.26-1.12.5-1.69.74-.26.11-.53.22-.79.33-1.65.67-3.3 1.33-4.93 1.96-1.31.51-2.61 1.05-3.89 1.63-.53.21-1.06.43-1.59.63-1.76.69-3.3 1.52-4.97 2.36-.23.11-.43.23-.64.36-1.56.91-3.21 1.99-3.72 3.78-.66 2.3.93 3.77 2.8 5.16.67.5 1.36.93 2.1 1.32l.06.05c2.31 1.59 5.01 2.89 7.58 4.32 2 1.12 4 2.26 6.01 3.39 3.85 2.17 8.37 6.38 12.18 1.07.8-1.1 1.75-2.65 1.95-3.96.31-2.17-.97-3.41-2.67-4.55-1.76-1.17-3.58-2.23-5.41-3.26-.4-.22-.81-.44-1.22-.66-.27-.15-.81-.33-.98-.58-.4-.61.65-.87 1.02-1 1.18-.42 2.35-.88 3.52-1.35 1.21-.49 2.45-.95 3.62-1.55.61-.23 1.23-.46 1.85-.71 1.32-.54 2.67-1.02 3.93-1.71 3.21-1.74 10.22-3.17 8.98-8.11-.27-1.05-1.15-2.59-2.06-3.3zM117.6 21.38c-.41-1.35-1.68-3.35-2.93-4.22-1.13-.79-2.34-1.44-3.55-2.1-1.43-.79-2.89-1.6-4.37-2.32-2.26-1.09-4.55-2.13-6.8-3.24-2.74-1.35-5.48-2.74-8.22-4.1-5.26-2.63-11.55-7.92-16.26-.61-.98 1.51-2.15 3.63-2.31 5.39-.27 2.9 1.5 4.47 3.85 5.88 2.4 1.43 4.89 2.71 7.4 3.96.84.41 1.68.82 2.51 1.22.49.24 1.33.5 1.18 1.14-.1.47-.75.79-1.15 1.01-.72.39-1.47.73-2.2 1.09-.34.17-.69.33-1.03.5-2.14 1-4.29 1.99-6.41 2.93-1.71.77-3.4 1.58-5.06 2.43-.68.31-1.38.64-2.07.95-2.29 1.02-4.29 2.23-6.44 3.46-.29.16-.57.34-.83.52-2.01 1.32-4.13 2.86-4.69 5.26-.73 3.1 1.48 4.94 4.05 6.68.92.62 1.88 1.14 2.88 1.61l.09.06c3.17 1.96 6.84 3.51 10.34 5.23 2.74 1.36 5.48 2.74 8.21 4.11 5.27 2.63 11.55 7.92 16.26.61.98-1.51 2.16-3.63 2.32-5.4.28-2.9-1.5-4.47-3.85-5.87-2.41-1.43-4.89-2.72-7.4-3.97-.55-.27-1.1-.53-1.66-.8-.38-.18-1.1-.38-1.35-.71-.57-.78.82-1.19 1.29-1.39 1.54-.64 3.07-1.32 4.58-2.03 1.58-.74 3.19-1.42 4.72-2.3.8-.35 1.61-.69 2.4-1.06 1.72-.81 3.48-1.54 5.12-2.53 4.15-2.55 13.36-4.91 11.38-11.39z"/></svg>',
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
			MyAvatar.hasProceduralBlinkFaceMovement = true;
			MyAvatar.hasProceduralEyeFaceMovement = true;
			MyAvatar.hasScriptedBlendshapes = false; 
			MyAvatar.setBlendshape("EyeBlink_L", 0);
			MyAvatar.setBlendshape("EyeBlink_R", 0);

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
		icon: '<svg viewBox="0 0 24 24"><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>',
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
		icon: '<svg viewBox="-10 -10 140.973 136.33"><path d="M31.703 22.6c2.77 8.96-4.25 17.73-4.25 17.73s-11.06-2.38-15.35-10.72c-3.96-7.71-.46-20.91-.46-20.91s17.29 4.94 20.06 13.9zM89.283 22.6c-2.77 8.96 4.25 17.73 4.25 17.73s11.06-2.38 15.35-10.72c3.96-7.71.46-20.91.46-20.91s-17.29 4.94-20.06 13.9zM40.023 76.5s-.05-.06-.14-.18c-.04-.06-.1-.13-.16-.22-.06-.06-.1-.08-.15-.14-.13-.12-.29-.27-.47-.45-.19-.18-.43-.38-.69-.6a15.542 15.542 0 0 0-1.99-1.34c-.39-.23-.81-.43-1.24-.64s-.89-.39-1.34-.56c-.13-.04-.6-.23-.74-.26-.19-.06-.4-.13-.64-.2-.46-.12-.91-.25-1.35-.33a16.787 16.787 0 0 0-2.38-.3 14.79 14.79 0 0 0-1.59.03c-.37.03-.58.05-.58.05l-.47.07a2.714 2.714 0 0 1-1.76-5.02s.09-.05.26-.15a7.568 7.568 0 0 1 .75-.4 10.802 10.802 0 0 1 2.77-.87 13.931 13.931 0 0 1 3.92-.15 16.163 16.163 0 0 1 2.14.35c.35.08.72.18 1.12.3.45.13.55.18 1.01.33a20.473 20.473 0 0 1 2.02.92 15.384 15.384 0 0 1 1.84 1.14 14.01 14.01 0 0 1 2.86 2.69 10.173 10.173 0 0 1 .93 1.34 11.057 11.057 0 0 1 .61 1.17c.08.18.16.37.2.49.03.1.05.19.07.26.04.14.06.22.06.22a2.756 2.756 0 0 1-1.91 3.41 2.706 2.706 0 0 1-2.96-.96zM94.633 71.46s-.08-.02-.22-.05c-.07-.02-.16-.03-.27-.06a1.472 1.472 0 0 0-.21 0c-.18-.01-.4-.02-.65-.03-.27-.01-.57-.01-.92 0a15.194 15.194 0 0 0-2.38.28c-.44.08-.89.2-1.36.32a12.476 12.476 0 0 0-1.39.45c-.12.05-.61.22-.73.28-.19.08-.39.16-.62.27-.43.21-.86.4-1.25.63a15.765 15.765 0 0 0-2 1.32 13.799 13.799 0 0 0-1.19 1.06 5.304 5.304 0 0 0-.4.42l-.32.36a2.722 2.722 0 0 1-4.62-2.67s.03-.1.1-.29a5.606 5.606 0 0 1 .31-.79 10.842 10.842 0 0 1 1.54-2.47 13.89 13.89 0 0 1 2.89-2.67 15.59 15.59 0 0 1 1.86-1.13c.32-.17.67-.33 1.05-.5.43-.19.54-.22.98-.41a20.1 20.1 0 0 1 2.14-.62 14.73 14.73 0 0 1 2.15-.33 13.946 13.946 0 0 1 3.93.18 10.36 10.36 0 0 1 1.58.41 10.146 10.146 0 0 1 1.23.5c.18.09.36.17.47.24.09.06.16.11.23.15.12.08.19.12.19.12a2.78 2.78 0 0 1-2.12 5.03zM69.684 105.72a8.194 8.194 0 0 1-8.19-8.18v-7.5a1.5 1.5 0 0 0-3 0v7.5a8.194 8.194 0 0 1-8.19 8.18 1.5 1.5 0 1 0 0 3 11.19 11.19 0 0 0 9.69-5.613 11.19 11.19 0 0 0 9.69 5.613 1.5 1.5 0 0 0 0-3z"/><path d="M60.483 29.8c19.35 0 36.31 19.12 47.38 33.51a66.665 66.665 0 0 0 9.24 9.6c-2.13 3.44-7.65 11.31-19.68 23.34a60.583 60.583 0 0 1-36.84 17.07c-2.26-.28-22.62-3.21-37.34-17.93-11.56-11.56-17.19-19.4-19.39-22.81 1.9-1.79 5.09-4.92 8.77-9.01 1.07-1.18 2.18-2.44 3.33-3.74 11.22-12.67 26.6-30.03 44.53-30.03m0-3c-21.18 0-38.23 21.61-50.09 34.77A140.73 140.73 0 0 1 .023 72.03s4.65 9.03 21.1 25.48c16.46 16.46 39.36 18.82 39.36 18.82a62.943 62.943 0 0 0 39.07-17.96c17.34-17.34 21.42-26.19 21.42-26.19a64.032 64.032 0 0 1-10.73-10.7c-10.85-14.09-28.68-34.68-49.76-34.68z"/><path d="M54.483 88.04a2.768 2.768 0 0 0-2.63 3.78c1.49 3.97 4.17 6.87 8.46 6.87.06 0 .12-.03.19-.03h.19c4.29 0 6.96-2.86 8.46-6.83a2.798 2.798 0 0 0-2.65-3.79zM110.503 62.46s10.44-.83 9.93-1.5l-5.52-7.22c-2.33-3.04-4.46-6.16-6.5-9.32a19.991 19.991 0 0 0 5.43-7.25c6.35-15.02-.4-37.17-.4-37.17s-25.88 7.4-33.84 20.57a71.189 71.189 0 0 0-19.12-2.62h-.76a68.094 68.094 0 0 0-18.76 2.46C32.883 7.34 7.233 0 7.233 0s-6.75 22.15-.42 37.19a20.043 20.043 0 0 0 5.42 7.24c-2.19 3.48-4.51 6.91-7.06 10.25l-5.01 6.54c-.42.55 9.7 1.25 9.7 1.25.06.69-7.36 5.75-9.85 9.48v.01c.27 0 19.77-14.91 34.88-14.91a15.99 15.99 0 0 1 9.33 2.65c5.836 4.068 9.822 14.568 12.387 24.34h3.092c-3.56-13.904-8.195-22.926-13.779-26.82a18.937 18.937 0 0 0-11.04-3.19c-7.13 0-15.13 2.96-22.5 6.8a3.015 3.015 0 0 0-2.32-1.38c-1.47-.1-3.07-.23-4.51-.37l1.99-2.61c2.34-3.06 4.7-6.48 7.21-10.47a3 3 0 0 0-.56-3.86 17.053 17.053 0 0 1-4.63-6.15c-4.51-10.72-1.73-25.85-.23-32.17 6.74 2.3 23.24 8.71 29.08 18.16a3 3 0 0 0 2.55 1.42 2.906 2.906 0 0 0 .82-.12 65.438 65.438 0 0 1 17.93-2.34h.73a68.6 68.6 0 0 1 18.31 2.5 2.988 2.988 0 0 0 3.4-1.33c5.75-9.52 22.4-15.99 29.18-18.3 1.5 6.31 4.29 21.42-.25 32.21a16.974 16.974 0 0 1-4.64 6.15 3.005 3.005 0 0 0-.55 3.89c2.37 3.68 4.48 6.7 6.63 9.51l2.62 3.43c-1.54.17-3.3.34-4.89.47a2.995 2.995 0 0 0-2.33 1.44c-9.05-4.52-16.9-6.87-23.12-6.87A17.237 17.237 0 0 0 74.543 57c-5.473 3.93-10.005 13.036-13.468 27.04h3.113c2.49-9.852 6.381-20.47 12.115-24.59a14.297 14.297 0 0 1 8.51-2.4c14.87 0 35.9 14.9 36.14 14.9v-.01c-2.35-3.41-10.5-8.9-10.45-9.48z"/><path d="M110.493 62.22c.03 0 10.46-.83 9.95-1.5l-5.52-7.22a167.29 167.29 0 0 1-10.15-15.14c-7.68-12.67-23.08-20.47-44.3-20.66-21.98-.2-37.19 8.03-45.02 21.23a155.869 155.869 0 0 1-10.29 15.5l-5.01 6.54c-.42.55 9.7 1.25 9.7 1.25.06.69-7.36 5.75-9.85 9.48-.37.55 29.43-22.55 44.21-12.25 5.886 4.102 9.89 14.748 12.452 24.59h7.45c2.487-9.921 6.396-20.685 12.178-24.84 13.42-9.64 44.94 12.92 44.65 12.5-2.35-3.41-10.5-8.9-10.45-9.48z"/></svg>',
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

function getModulesInfo(enableIcons) {
	var modulesInfo = [];
	var modulesKeys = Object.keys(modules);
	modulesKeys.forEach(function(key) {
		var moduleInfo = {
			key: key,
			name: modules[key].name,
			enabled: modules[key].enabled,
		}
		if (enableIcons) moduleInfo.icon = modules[key].icon;

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
	tablet.gotoWebScreen(assetsUrl+"makisThings.html"+
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
