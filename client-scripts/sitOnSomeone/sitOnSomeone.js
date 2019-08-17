var animationURL = Script.resolvePath("sitting.fbx");
//var animationURL = "https://hifi-content.s3.amazonaws.com/Experiences/Releases/marketPlaceItems/sitPoint/2019-01-17_10-05-51/appResources/appData/resources/animations/sittingIdle.fbx";
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

function rolesToOverride() {
	return MyAvatar.getAnimationRoles().filter(function(role) {
        return !(role.indexOf("right")===0 || role.indexOf("left")===0);
    });
}

var attachedAvatarID = undefined;
var attachedAvatarDisplayName = undefined;

function update() {
	var avatar = AvatarList.getAvatar(attachedAvatarID);
	if (avatar.displayName == "") {
		unmount();
		return Script.update.disconnect(update);
	}

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
	var avatar = AvatarList.getAvatar(avatarID);
	if (avatar.displayName == MyAvatar.displayName) return;

	// previousCollisions = {
	// 	world: MyAvatar.getCollisionsEnabled(),
	// 	avatars: MyAvatar.getOtherAvatarsCollisionsEnabled(),
	// }
	MyAvatar.setCollisionsEnabled(false);
	MyAvatar.setOtherAvatarsCollisionsEnabled(false);

	var roles = rolesToOverride();
    for (i in roles) {
        MyAvatar.restoreRoleAnimation(roles[i]);
        MyAvatar.overrideRoleAnimation(roles[i], animationURL, 1, true, 0, 1);
    }

	attachedAvatarID = avatarID;
	attachedAvatarDisplayName = avatar.displayName;
	Script.update.connect(update);

	button.editProperties({isActive: true});
	emitEvent("sitting", avatar.displayName);
}

function unmount() {
	if (!attachedAvatarID) return;

	var roles = rolesToOverride();
    for (i in roles) {
        MyAvatar.restoreRoleAnimation(roles[i]);
    }

	Script.update.disconnect(update);
	Script.setTimeout(function() {
		MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
		//MyAvatar.setCollisionsEnabled(previousCollisions.world);
		//MyAvatar.setOtherAvatarsCollisionsEnabled(previousCollisions.avatars);
		MyAvatar.setCollisionsEnabled(true);
		MyAvatar.setOtherAvatarsCollisionsEnabled(false);
	}, 100);

	attachedAvatarID = undefined;
	attachedAvatarDisplayName = undefined;

	button.editProperties({isActive: false});
	emitEvent("eject");
}

function safeMount(avatarID) {
	if (attachedAvatarID) {
		unmount();
		Script.setTimeout(function() {
			mount(avatarID);
		}, 200);
	} else {
		mount(avatarID);
	}
}

function toggleMount(avatarID) {
	if (attachedAvatarID) {
		unmount();
	} else {
		mount(avatarID);
	}
}

// tablet stuff

var uuid = "cat.maki.sitOnSomeone";
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon:       'data:image/svg+xml;utf8,<svg viewBox="0 0 48 49" xmlns="http://www.w3.org/2000/svg" fill="#fff"><path d="M37.092 35.489a3.804 3.804 0 0 1 3.042.6c1.04.71 1.656 1.978 1.622 3.23-.048 1.492-1.043 2.901-2.445 3.423a6205.328 6205.328 0 0 1-12.926 5.008c-1.178.473-2.58.264-3.595-.487-1.01-.723-1.62-1.98-1.55-3.222.03-1.268.775-2.484 1.868-3.12.409-.244.866-.388 1.308-.563 3.849-1.493 7.699-2.983 11.549-4.475.368-.15.741-.292 1.127-.394zM7.07 36.834a3.826 3.826 0 0 1 3.454-1.412c.612.07 1.176.34 1.748.552 3.521 1.367 7.045 2.728 10.566 4.097-1.372.81-2.4 2.275-2.436 3.9-.103 1.483.602 2.987 1.79 3.876a1.5 1.5 0 0 1-.633-.115c-4.278-1.66-8.559-3.314-12.836-4.975-1.12-.418-2.02-1.384-2.33-2.541-.36-1.149-.054-2.444.677-3.382zm7.115-19.137c1.04-.95 2.45-1.38 3.841-1.389 3.983.006 7.965.002 11.946.002 1.46-.002 2.93.493 3.99 1.517 1.606 1.56 2.394 3.737 2.975 5.85.902 3.56 1.226 7.237 1.358 10.894-1.57-.163-2.932.753-4.38 1.175.002-1.613-.121-3.22-.25-4.827-.206-2.216-.497-4.44-1.103-6.59-.055-.128-.046-.302-.18-.379-.021 4.136-.004 8.273-.01 12.41-2.78 1.108-5.584 2.165-8.373 3.257-2.788-1.092-5.59-2.15-8.372-3.26-.005-4.135.013-8.272-.01-12.408-.167.139-.159.388-.237.58-.847 3.17-1.087 6.458-1.275 9.72-.034.499.048 1.013-.07 1.503-1.417-.472-2.781-1.329-4.33-1.181.032-1.612.165-3.215.318-4.82.288-2.646.695-5.305 1.579-7.826.566-1.557 1.326-3.11 2.583-4.228zM23.064.064c2.964-.409 6.068 1.168 7.5 3.795.745 1.354 1.104 2.948.904 4.486-.284 3-2.579 5.674-5.497 6.42-2.08.59-4.402.19-6.185-1.026-2.182-1.454-3.5-4.12-3.281-6.736.127-2.111 1.215-4.133 2.892-5.417C20.452.757 21.738.243 23.064.064z"/></svg>',
	activeIcon: 'data:image/svg+xml;utf8,<svg viewBox="0 0 48 49" xmlns="http://www.w3.org/2000/svg" fill="#000"><path d="M37.092 35.489a3.804 3.804 0 0 1 3.042.6c1.04.71 1.656 1.978 1.622 3.23-.048 1.492-1.043 2.901-2.445 3.423a6205.328 6205.328 0 0 1-12.926 5.008c-1.178.473-2.58.264-3.595-.487-1.01-.723-1.62-1.98-1.55-3.222.03-1.268.775-2.484 1.868-3.12.409-.244.866-.388 1.308-.563 3.849-1.493 7.699-2.983 11.549-4.475.368-.15.741-.292 1.127-.394zM7.07 36.834a3.826 3.826 0 0 1 3.454-1.412c.612.07 1.176.34 1.748.552 3.521 1.367 7.045 2.728 10.566 4.097-1.372.81-2.4 2.275-2.436 3.9-.103 1.483.602 2.987 1.79 3.876a1.5 1.5 0 0 1-.633-.115c-4.278-1.66-8.559-3.314-12.836-4.975-1.12-.418-2.02-1.384-2.33-2.541-.36-1.149-.054-2.444.677-3.382zm7.115-19.137c1.04-.95 2.45-1.38 3.841-1.389 3.983.006 7.965.002 11.946.002 1.46-.002 2.93.493 3.99 1.517 1.606 1.56 2.394 3.737 2.975 5.85.902 3.56 1.226 7.237 1.358 10.894-1.57-.163-2.932.753-4.38 1.175.002-1.613-.121-3.22-.25-4.827-.206-2.216-.497-4.44-1.103-6.59-.055-.128-.046-.302-.18-.379-.021 4.136-.004 8.273-.01 12.41-2.78 1.108-5.584 2.165-8.373 3.257-2.788-1.092-5.59-2.15-8.372-3.26-.005-4.135.013-8.272-.01-12.408-.167.139-.159.388-.237.58-.847 3.17-1.087 6.458-1.275 9.72-.034.499.048 1.013-.07 1.503-1.417-.472-2.781-1.329-4.33-1.181.032-1.612.165-3.215.318-4.82.288-2.646.695-5.305 1.579-7.826.566-1.557 1.326-3.11 2.583-4.228zM23.064.064c2.964-.409 6.068 1.168 7.5 3.795.745 1.354 1.104 2.948.904 4.486-.284 3-2.579 5.674-5.497 6.42-2.08.59-4.402.19-6.185-1.026-2.182-1.454-3.5-4.12-3.281-6.736.127-2.111 1.215-4.133 2.892-5.417C20.452.757 21.738.243 23.064.064z"/></svg>',
	text: "sit on so..."
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
			safeMount(json.value);
		break;
		case "eject":
			unmount();
		break;
	}
}

function messageReceived(chan, msg, uuid, localOnly) {
	if (!localOnly) return;
	if (chan != "cat.maki.sitOnSomeone") return;
	msg = msg.split(",");

	switch (msg[0]) {
		case "sit": 
			if (msg.length<2) break;
			safeMount(msg[1]);
		break;

		case "toggle":
			if (msg.length<2) break;
			toggleMount(msg[1]);
		break;

		case "eject":
			unmount();
		break;
	}
}

Messages.subscribe("cat.maki.sitOnSomeone");
Messages.messageReceived.connect(messageReceived);

tablet.webEventReceived.connect(webEventReceived);
button.clicked.connect(buttonClicked);
location.hostChanged.connect(unmount);

Script.scriptEnding.connect(function() {
	unmount();

	Messages.unsubscribe("cat.maki.sitOnSomeone");
	Messages.messageReceived.disconnect(messageReceived);

	tablet.webEventReceived.disconnect(webEventReceived);
	button.clicked.disconnect(buttonClicked);
	location.hostChanged.disconnect(unmount);

	tablet.removeButton(button);
});