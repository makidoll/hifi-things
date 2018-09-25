// settings
var s = {
	text_size: 1,
	text_opacity: 1,
	background: {red:29, green:31, blue:33, alpha:0.5},
	height_offset: 1,
	margin_width: 4,
	margin_height: 3,
	draw_own: true,
	debug: false
};

// things
s.margin_width /= 100;
s.margin_height /= 100;
s.text_size /= 10;

var nameplates = {}; // id: {avatar, overlay}
var reloadNameplatesInterval = null;

// functions
function debug(msg) { print("DEBUG - "+msg); }

function calcNewSize(overlay, displayName) {
	var textSize = Overlays.textSize(overlay, displayName);
	return {
		x: textSize.width+s.margin_width*2,
		y: textSize.height+s.margin_height*2,
	}
}

function drawNameplate(avatarID) {
	if (!avatarID) return false;

	var avatar = AvatarList.getAvatar(avatarID);
	var displayName = avatar.sessionDisplayName;

	var overlay = Overlays.addOverlay("text3d", {
		parentID: avatarID,

		isFacingAvatar: true,
		position: Vec3.sum(avatar.position, {x:0, 
			y:s.height_offset*(0.5+avatar.scale/2),
		z:0}),

		text: displayName, textAlpha: s.text_opacity,
		color: {red: 255, blue: 255, green: 255},

		leftMargin: s.margin_width,
		topMargin: s.margin_height,
		lineHeight: s.text_size,

		backgroundAlpha: s.background.alpha-0.001,
		backgroundColor: s.background,
		
		visable: false, isSolid: false,
	});

	// update overlay size
	Overlays.editOverlay(overlay, {
		size: calcNewSize(overlay, displayName),
		visable: true,
	});

	// add to nameplates ^^
	var nameplate = {
		avatar: avatar,
		overlay: overlay,
		displayName: avatar.sessionDisplayName
	};

	nameplates[avatarID+""] = nameplate;

	return true;
}

function drawAllNameplates() {
	var avatars = AvatarList.getAvatarIdentifiers();
	if (s.draw_own) avatars.push(MyAvatar.sessionUUID);

	if (s.debug) var avatarCount = 0;
	for (var i=0; i<avatars.length; i++) {
		if (drawNameplate(avatars[i])) {
			if (s.debug) avatarCount++;
		}
	}

	if (s.debug) debug("Drawn "+avatarCount+" nameplates");
}

function deleteNameplate(id) {
	id = id+"";
	if (!nameplates[id]) return;
	Overlays.deleteOverlay(
		nameplates[id].overlay
	);
	delete nameplates[id];
}

function deleteAllNameplates() {
	var nameplatesKeys = Object.keys(nameplates);
	for (var i=0; i<nameplatesKeys.length; i++) {
		deleteNameplate(nameplatesKeys[i]);
	}
	nameplates = {};
}

function hardReloadNameplates() {
	if (s.debug) debug("Hard reloading nameplates");
	deleteAllNameplates();
	drawAllNameplates();
}

function reloadNameplates() {
	if (s.debug) debug("Reloading "+Object.keys(nameplates).length+" nameplates");

	var nameplatesKeys = Object.keys(nameplates);
	var newNameplates = {};

	var avatars = AvatarList.getAvatarIdentifiers();
	if (s.draw_own) avatars.push(MyAvatar.sessionUUID);

	// for each current avatar
	avatars.forEach(function(avatarID) {
		if (!avatarID) return;

		var avatar = AvatarList.getAvatar(avatarID);

		// add nameplate if its not found
		if (nameplatesKeys.indexOf(avatarID)==-1) {
			if (s.debug) debug("\tAvatar joined");
			drawNameplate(avatarID);
		}

		var nameplate = nameplates[avatarID];
		if (!nameplate) {
			if (s.debug) debug("\tAvatar doesnt exist");
			deleteNameplate(avatarID);
			return;
		}

		// update display name
		if (avatar.sessionDisplayName!=nameplate.displayName) {
			if (s.debug) debug("\tAvatar updated");
			nameplate.displayName = avatar.sessionDisplayName;

			Overlays.editOverlay(nameplate.overlay, {
				text: nameplate.displayName,
				size: calcNewSize(nameplate.overlay, nameplate.displayName),
				visable: true,
			});
		}
	});

	// for each nameplate
	Object.keys(nameplates).forEach(function(id) {
		var exists = false; 
		for (var i=0; i<avatars.length; i++) {
			if (avatars[i]+"" == id+"") {
				exists = true;
			}
		}

		if (!exists) {
			if (s.debug) debug("\tAvatar left");
			deleteNameplate(id);
		}
	});

	if (s.debug) debug("\tReloaded, now "+Object.keys(nameplates).length+" in total");
}

function reloadNameplatesDelay() {
	Script.setTimeout(function() {
		reloadNameplates();
	}, 2000);
}

// events
AvatarList.avatarRemovedEvent.connect(function(id) {
	reloadNameplatesDelay();
	//drawNameplate(id);
});

AvatarList.avatarAddedEvent.connect(function(id) {
	reloadNameplatesDelay();
	//deleteNameplate(id);
});

Script.scriptEnding.connect(function() {
	deleteAllNameplates();
	Script.clearInterval(reloadNameplatesInterval);
});

// init
reloadNameplatesInterval = Script.setInterval(reloadNameplates, 1000*5);

Script.setTimeout(function() {
	drawAllNameplates();
}, 2000);
