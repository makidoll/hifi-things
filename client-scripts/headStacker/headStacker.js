// ╻ ╻┏━╸┏━┓╺┳┓
// ┣━┫┣╸ ┣━┫ ┃┃
// ╹ ╹┗━╸╹ ╹╺┻┛
// ┏━┓╺┳╸┏━┓┏━╸╻┏ ┏━╸┏━┓
// ┗━┓ ┃ ┣━┫┃  ┣┻┓┣╸ ┣┳┛
// ┗━┛ ╹ ╹ ╹┗━╸╹ ╹┗━╸╹┗╸
// github.com/makitsune/hifi-stuff

function HeadStacker() {
	this.mountedAvatarID = undefined;
	this.mounted = false;

	this.interval = undefined;

	this.mount = function(avatarID) {
		if (this.interval) Script.clearInterval(this.interval);

		var avatar = AvatarList.getAvatar(avatarID);
		if (!avatar) return refreshInfo();

		//MyAvatar.setParentID(avatarID);
		//MyAvatar.setParentJointIndex(MyAvatar.getJointIndex("Head"));
		MyAvatar.overrideRoleAnimation(
			"fly",
			Script.resolvePath("idle.fbx"),
			30, true, 0, 1000000
		);
		MyAvatar.setCollisionsEnabled(false);
		MyAvatar.setOtherAvatarsCollisionsEnabled(false);

		var _this = this;
		this.interval = Script.setInterval(function() {
			var avatar = AvatarList.getAvatar(avatarID);
			if (!avatar) _this.unmount;

			MyAvatar.orientation = avatar.headOrientation;
			
			// step foot position to avatar position with head orientation
			// var footPosition = Vec3.mix(
			// 	MyAvatar.getJointPosition("LeftFoot"),
			// 	MyAvatar.getJointPosition("RightFoot"),
			// 	0.5
			// );

			MyAvatar.position = Vec3.sum( 
				avatar.getJointPosition("Head"),
				Vec3.multiply( // offset slightly
					Vec3.subtract( // difference between pos and feet
						MyAvatar.position,
						MyAvatar.getWorldFeetPosition()
					),
					1.5
				)
			);
		}, 1000/60);

		this.mountedAvatarID = avatarID;
		this.mounted = true;
	}

	this.unmount = function() {
		if (this.interval) Script.clearInterval(this.interval);
		if (!this.mounted) return;
		if (!this.mountedAvatarID) return;

		//MyAvatar.setParentID("");
		MyAvatar.restoreRoleAnimation("fly");
		MyAvatar.setCollisionsEnabled(true);
		MyAvatar.setOtherAvatarsCollisionsEnabled(true);
		Script.setTimeout(function() {
			MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
		}, 100);

		this.mountedAvatarID = undefined;
		this.mounted = false;
	}
}

var uuid = Uuid.generate(); 
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: 'data:image/svg;xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/></svg>',
	text: "Head Stacker"
});

function refreshInfo() {
	var avatars = [];
	AvatarList.getAvatarIdentifiers().forEach(function(avatarID) {
		if (!avatarID) return;
		var avatar = AvatarList.getAvatar(avatarID);
		avatars.push({
			name: avatar.sessionDisplayName,
			id: avatarID,
		});
	});

	tablet.emitScriptEvent(JSON.stringify({
		uuid: uuid,
		key: "refreshInfo",
		value: JSON.stringify({
			avatars: avatars,
			mounted: headStacker.mounted,
			mountedID: headStacker.mountedAvatarID,
		})
	}));
}

var headStacker = new HeadStacker();

function buttonClicked() {
	tablet.gotoWebScreen(Script.resolvePath("headStacker.html")+"?uuid="+uuid);
}; button.clicked.connect(buttonClicked);

function webEventReceived(json) {
	try { json = JSON.parse(json);
	} catch(err) {}
	if (json.uuid != uuid) return;
	
	switch (json.key) {
		case "refreshInfo":
			refreshInfo();
		break;
		case "mount":
			headStacker.mount(json.value);
			refreshInfo();
		break;
		case "unmount":
			headStacker.unmount();
			refreshInfo();
		break;
		case "resetCollisions":
			if (!headStacker.mounted)
				MyAvatar.setCollisionsEnabled(true);
				MyAvatar.setOtherAvatarsCollisionsEnabled(true);
		break;
		case "resetOrientation":
			if (!headStacker.mounted)
				MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
		break;
	}
}; tablet.webEventReceived.connect(webEventReceived);

Script.scriptEnding.connect(function() {
	headStacker.unmount();
	tablet.removeButton(button);
	button.clicked.disconnect(buttonClicked);
	tablet.webEventReceived.disconnect(webEventReceived);
});