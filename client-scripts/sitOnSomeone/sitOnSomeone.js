var animationURL = Script.resolvePath("sitting.fbx");
var animationURL = "https://hifi-content.s3.amazonaws.com/Experiences/Releases/marketPlaceItems/sitPoint/2019-01-17_10-05-51/appResources/appData/resources/animations/sittingIdle.fbx";
AnimationCache.prefetch(animationURL);

// function getAvatar(displayName) {
// 	displayName = displayName.toLowerCase();
// 	var avatarIDs = AvatarList.getAvatarIdentifiers();
// 	for (var i=0; i<avatarIDs.length; i++) {
// 		var avatar = AvatarList.getAvatar(avatarIDs[i]);
// 		if (avatar.displayName.toLowerCase().indexOf(displayName)>-1) return avatar;
// 	}
// 	return undefined;
// }

var rolesToOverride = MyAvatar.getAnimationRoles().filter(function(role) {
	return !(role.indexOf("right")===0 || role.indexOf("left")===0);
});

var attachedAvatarID = undefined;
var attachedAvatarDisplayName = undefined;

function update() {
	var avatar = AvatarList.getAvatar(attachedAvatarID);
	if (avatar.displayName == "") return unmount();

	MyAvatar.setCollisionsEnabled(false);
	MyAvatar.setOtherAvatarsCollisionsEnabled(false);

	var orientation = Quat.cancelOutRollAndPitch(avatar.headOrientation);

	MyAvatar.orientation = orientation;
	MyAvatar.position = Vec3.sum( 
		avatar.getJointPosition("Head"),
		Vec3.multiplyQbyV(orientation, {y:-0.1, z:0.15})
	);
}

// var previousCollisions = {
// 	world: true,
// 	avatars: true,
// }

function mount(avatarID) {
	if (button.getProperties().isActive) return;

	var avatar = AvatarList.getAvatar(avatarID);
	if (avatar.displayName == MyAvatar.displayName) return;

	// previousCollisions = {
	// 	world: MyAvatar.getCollisionsEnabled(),
	// 	avatars: MyAvatar.getOtherAvatarsCollisionsEnabled(),
	// }
	MyAvatar.setCollisionsEnabled(false);
	MyAvatar.setOtherAvatarsCollisionsEnabled(false);

	rolesToOverride.forEach(function(role) {
		MyAvatar.overrideRoleAnimation(role, animationURL, 1, true, 1, 1);
	});

	attachedAvatarID = avatarID;
	attachedAvatarDisplayName = avatar.displayName;
	Script.update.connect(update);

	button.editProperties({isActive: true});
	emitEvent("sitting", avatar.displayName);
}

function unmount() {
	if (!button.getProperties().isActive) return;

	rolesToOverride.forEach(function(role) {
		MyAvatar.restoreRoleAnimation(role);
	});

	Script.update.disconnect(update);
	Script.setTimeout(function() {
		MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
		//MyAvatar.setCollisionsEnabled(previousCollisions.world);
		//MyAvatar.setOtherAvatarsCollisionsEnabled(previousCollisions.avatars);
		MyAvatar.setCollisionsEnabled(true);
		MyAvatar.setOtherAvatarsCollisionsEnabled(true);
	}, 100);

	attachedAvatarID = undefined;
	attachedAvatarDisplayName = undefined;

	button.editProperties({isActive: false});
	emitEvent("eject");
}

// tablet stuff

var uuid = "cat.maki.sitOnSomeone";
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon:       'data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff"><path d="M19 7H5V5h14v2zm-7 12l6.67-10H5.33L12 19z"/></svg>',
	activeIcon: 'data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000"><path d="M19 7H5V5h14v2zm-7 12l6.67-10H5.33L12 19z"/></svg>',
	text: "sit on"
});

function buttonClicked() {
	tablet.gotoWebScreen(Script.resolvePath("app.html"));
}

function emitEvent(key, value) {
	tablet.emitScriptEvent(JSON.stringify({
		key: key, value: value||"",
		uuid: uuid,
	}));
}

function webEventReceived(json) {
	try { json = JSON.parse(json);
	} catch(err) { return; }
	if (json.uuid != uuid) return;

	switch(json.key) {
		case "refresh":
			var avatars = [];
			AvatarList.getAvatarIdentifiers().forEach(function(avatarID) {
				if (!avatarID) return;
				var avatar = AvatarList.getAvatar(avatarID);
				avatars.push([
					avatarID,
					avatar.sessionDisplayName,
				]);
			});
			emitEvent("refresh", avatars);

			if (attachedAvatarDisplayName) {
				emitEvent("sitting", attachedAvatarDisplayName);
			}
		break;
		case "sit":
			if (!json.value) return;

			if (attachedAvatarID) {
				unmount();
				Script.setTimeout(function() {
					mount(json.value);
				}, 200);
			} else {
				mount(json.value);
			}
		break;
		case "eject":
			unmount();
		break;
	}
}

tablet.webEventReceived.connect(webEventReceived);
button.clicked.connect(buttonClicked);
location.hostChanged.connect(unmount);

Script.scriptEnding.connect(function() {
	unmount();

	tablet.webEventReceived.disconnect(webEventReceived);
	button.clicked.disconnect(buttonClicked);
	location.hostChanged.disconnect(unmount);

	tablet.removeButton(button);
});