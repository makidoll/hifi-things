// ╻ ╻╻┏━╸╻
// ┣━┫┃┣╸ ┃
// ╹ ╹╹╹  ╹
// ┏━╸┏━┓┏━┓┏━╸┏┓╻╺┳╸╻┏━┓╻  ┏━┓
// ┣╸ ┗━┓┗━┓┣╸ ┃┗┫ ┃ ┃┣━┫┃  ┗━┓
// ┗━╸┗━┛┗━┛┗━╸╹ ╹ ╹ ╹╹ ╹┗━╸┗━┛
// github.com/makitsune/hifi-stuff

var uuid = Uuid.generate(); 
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: 'data:image/svg;xml,<svg viewBox="0 0 81 76" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M5.419 30.468c1.563-2.832 3.54-5.086 5.933-6.762 2.393-1.677 5.135-2.515 8.228-2.515 9.212 0 13.932 6.136 14.16 18.408V75h-5.371V40.185c-.033-4.72-.863-8.203-2.491-10.449-1.627-2.246-4.183-3.369-7.666-3.369-2.832 0-5.379 1.066-7.641 3.198-2.263 2.132-3.98 5.054-5.152 8.765V75H0V0h5.419v30.468zM62.236 75.976c-7.097 0-12.63-2.116-16.602-6.347-3.971-4.232-5.957-10.287-5.957-18.165v-4.199c0-8.333 1.823-14.762 5.469-19.287 3.646-4.525 8.87-6.787 15.674-6.787 6.64 0 11.637 2.121 14.99 6.363 3.353 4.241 5.062 10.522 5.127 18.843v6.776h-27.49c.195 3.923 1.058 6.792 2.588 8.607 1.53 1.814 3.89 2.722 7.08 2.722 4.622 0 8.48-1.579 11.572-4.737l5.42 8.35c-1.693 2.344-4.15 4.24-7.373 5.688-3.223 1.449-6.722 2.173-10.498 2.173zm-8.692-32.422h13.819v-1.269c-.065-3.158-.586-5.55-1.563-7.178-.976-1.628-2.669-2.441-5.078-2.441-2.409 0-4.158.862-5.249 2.588-1.09 1.725-1.733 4.492-1.929 8.3z"/></svg>',
	text: "essentials"
});

console.log(JSON.stringify(button.getProperties()))

function emitEvent(key, value) {
	tablet.emitScriptEvent(JSON.stringify({
		key: key, value: value,
		uuid: uuid,
	}));
}

function changeSetting(key, value) {
	var somethingChanged = true;

	switch (key) {
		case "disableCollisions":
			var newCollisionsEnabled = (value!=undefined)? value: !MyAvatar.getCollisionsEnabled();
			Settings.setValue("cat.maki.hifiEssentials.collisionsEnabled", newCollisionsEnabled);

			MyAvatar.setCollisionsEnabled(newCollisionsEnabled);
			overrideSomethingChanged = true;
		break;
		case "enableFlying":
			var flyingEnabled = MyAvatar.getFlyingEnabled();
			MyAvatar.setFlyingDesktopPref(!flyingEnabled);
			MyAvatar.setFlyingHMDPref(!flyingEnabled);
		break;
				
		case "sizeSmaller": MyAvatar.scale = MyAvatar.scale*0.8; break;
		case "sizeBigger": MyAvatar.scale = MyAvatar.scale*1.2; break;
		case "sizeNumber": if (!value) break; MyAvatar.scale = value; break;

		case"speedFaster":
			MyAvatar.walkSpeed = MyAvatar.walkSpeed*1.2;
			MyAvatar.walkBackwardSpeed = MyAvatar.walkBackwardSpeed*1.2;
		break;
		case"speedSlower":
			MyAvatar.walkSpeed = MyAvatar.walkSpeed*0.8;
			MyAvatar.walkBackwardSpeed = MyAvatar.walkBackwardSpeed*0.8;
		break;
		case "speedNumber":
			if (!value) break;
			MyAvatar.walkSpeed = value;
			MyAvatar.walkBackwardSpeed = value;
		break;

		case "disableAntiAliasing":
			var newDisableAntiAliasing = (value!=undefined)? value: !Settings.getValue("cat.maki.hifiEssentials.disableAntiAliasing");
			Settings.setValue("cat.maki.hifiEssentials.disableAntiAliasing", newDisableAntiAliasing);

			if (newDisableAntiAliasing) {
				Render.getConfig("RenderMainView.Antialiasing")["constrainColor"] = false;
				Render.getConfig("RenderMainView.Antialiasing")["feedbackColor"] = false;
				Render.getConfig("RenderMainView.Antialiasing")["blend"] = 1;
				Render.getConfig("RenderMainView.Antialiasing")["sharpen"] = 0;
				Render.getConfig("RenderMainView.JitterCam").none();
				
				Render.getConfig("SecondaryCameraJob.Antialiasing")["constrainColor"] = false;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["feedbackColor"] = false;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["blend"] = 1;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["sharpen"] = 0;
				Render.getConfig("SecondaryCameraJob.JitterCam").none();
			} else {
				Render.getConfig("RenderMainView.Antialiasing")["constrainColor"] = true;
				Render.getConfig("RenderMainView.Antialiasing")["feedbackColor"] = true;
				Render.getConfig("RenderMainView.Antialiasing")["blend"] = 0.25;
				Render.getConfig("RenderMainView.Antialiasing")["sharpen"] = 0.05;
				Render.getConfig("RenderMainView.JitterCam").play();

				Render.getConfig("SecondaryCameraJob.Antialiasing")["constrainColor"] = true;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["feedbackColor"] = true;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["blend"] = 0.25;
				Render.getConfig("SecondaryCameraJob.Antialiasing")["sharpen"] = 0.05;
				Render.getConfig("SecondaryCameraJob.JitterCam").play();
			}
		break;

		default: somethingChanged = false; break;
	}

	if (somethingChanged)
		Script.setTimeout(function() {
			updateSettings();
		}, 100);
}

var scriptsInProgress = [];

function toggleScript(link) {
	var filename = link.split("/").pop();
	if (scriptsInProgress[filename]) return; 

	var scriptLoaded = false;
	var runningScripts = ScriptDiscoveryService.getRunning();

	for (var i=0; i<runningScripts.length; i++) {
		if (runningScripts[i].name == filename) {
			scriptLoaded = true;
			break;
		}
	}

	if (scriptLoaded) {
		ScriptDiscoveryService.stopScript(link);
	} else {
		ScriptDiscoveryService.loadScript(link);
	}

	scriptsInProgress[filename] = true;
	Script.setTimeout(function() {
		delete scriptsInProgress[filename];
	}, 200); // so they dont load it twice

	updateScripts();
}

function updateSettings(override) {
	if (!override) override = {}
	emitEvent("updateSettings", {
		disableCollisions: (override.disableCollisions)? override.disableCollisions: !MyAvatar.getCollisionsEnabled(),
		enableFlying: MyAvatar.getFlyingEnabled(),

		sizeNumber: MyAvatar.scale.toFixed(3),
		speedNumber: MyAvatar.walkSpeed.toFixed(3),

		disableAntiAliasing: (Settings.getValue("cat.maki.hifiEssentials.disableAntiAliasing"))? true: false,
	})
}

function updateScripts() {
	emitEvent("updateScripts", ScriptDiscoveryService.getRunning().map(function(script) {
		return script.name;
	}))
}

function webEventReceived(json) {
	try { json = JSON.parse(json);
	} catch(err) {}
	if (json.uuid != uuid) return;

	switch (json.key) {
		case "changeAvatar":
			if (json.value.name==undefined) break;
			if (json.value.url==undefined) break;

			if (Window.confirm("Would you like to load the avatar: "+json.value.name)) {
				MyAvatar.getAttachmentsVariant().forEach(function(attachment) {
					MyAvatar.detachOne(attachment.modelUrl, attachment.jointName);
				});

				MyAvatar.useFullAvatarURL(json.value.url, json.value.name);
			}
		break;
		case "changeSetting":
			if (json.value.key==undefined) break;
			changeSetting(json.value.key, json.value.value);
		break;
		case "toggleScript":
			if (json.value==undefined) break;
			toggleScript(json.value);
		break;
		case "updateSettings": updateSettings(); break;
		case "updateScripts": updateScripts(); break;
	}
}

function buttonClicked() {
	tablet.gotoWebScreen(Script.resolvePath("app/index.html")+"?uuid="+uuid);
}

// init

function getValueChangeSetting(key) {
	var value = Settings.getValue("cat.maki.hifiEssentials."+key);
	if (value == undefined) return;
	changeSetting(key, value);
}

getValueChangeSetting("disableAntiAliasing");
getValueChangeSetting("collisionsEnabled");

function collisionsEnabledChanged(enabled) { updateSettings({disableCollisions: !enabled}); }
function scaleChanged() { updateSettings(); }
function scriptCountChanged() { updateScripts(); }

MyAvatar.collisionsEnabledChanged.connect(collisionsEnabledChanged);
MyAvatar.scaleChanged.connect(scaleChanged);
ScriptDiscoveryService.scriptCountChanged.connect(scriptCountChanged);

tablet.webEventReceived.connect(webEventReceived);
button.clicked.connect(buttonClicked);

Script.scriptEnding.connect(function() {
	MyAvatar.collisionsEnabledChanged.disconnect(collisionsEnabledChanged);
	MyAvatar.scaleChanged.disconnect(scaleChanged);
	ScriptDiscoveryService.scriptCountChanged.disconnect(scriptCountChanged);
	
	tablet.webEventReceived.disconnect(webEventReceived);
	button.clicked.disconnect(buttonClicked);

	tablet.removeButton(button);
});
