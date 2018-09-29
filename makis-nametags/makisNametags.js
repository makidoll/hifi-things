// ┏┳┓┏━┓╻┏ ╻╻┏━┓
// ┃┃┃┣━┫┣┻┓┃ ┗━┓
// ╹ ╹╹ ╹╹ ╹╹ ┗━┛
// ┏┓╻┏━┓┏┳┓┏━╸┏━┓╻  ┏━┓╺┳╸┏━╸┏━┓
// ┃┗┫┣━┫┃┃┃┣╸ ┣━┛┃  ┣━┫ ┃ ┣╸ ┗━┓
// ╹ ╹╹ ╹╹ ╹┗━╸╹  ┗━╸╹ ╹ ╹ ┗━╸┗━┛
// github.com/makitsune/hifi-stuff

var assetsUrl = "http://mpassets.highfidelity.com/9d7b12be-8fd9-4cb6-b74b-40466d43a0bc-v1/"; 

var config = null;
function loadConfig(newConfig) {
	config = newConfig;
	Settings.setValue("makisNametags", config);

	config.marginWidth /= 100;
	config.marginHeight /= 100;
	config.textSize /= 10;
}

function getConfig() {
	var currentConfig = JSON.parse(JSON.stringify(config));
	currentConfig.marginWidth *= 100; 
	currentConfig.marginHeight *= 100; 
	currentConfig.textSize *= 10; 
	return currentConfig;
}

var defaultConfig = {
	enabled: true,
	textSize: 1,

	marginWidth: 5,
	marginHeight: 3,

	textColor: {red:255, green:255, blue:255},
	textOpacity: 1,
	backgroundColor: {red:29, green:31, blue:33},
	backgroundOpacity: 0.5,

	heightOffset: 1,
	facingAvatar: true,
	
	drawOwn: true,
	debug: false
};

// validating config
var preConfig = Settings.getValue("makisNametags", defaultConfig);
Object.keys(defaultConfig).forEach(function (key){
	if (preConfig[key]==undefined) preConfig[key] = defaultConfig[key];
});
loadConfig(preConfig);

var nametags = {}; // id: {avatar, overlay, displayName}
var reloadNametagsInterval = null;

// script functions
function debug(msg) { print("DEBUG - "+msg); }

function calcNewSize(overlay, displayName) {
	var textSize = Overlays.textSize(overlay, displayName);
	return {
		x: textSize.width+config.marginWidth*2,
		y: textSize.height+config.marginHeight*2,
	}
}

function drawNametag(avatarID) {
	if (!avatarID) return false;

	var avatar = AvatarList.getAvatar(avatarID);
	var displayName = avatar.sessionDisplayName;

	//var headJointIndex = avatar.getJointIndex("Head");
	//var headTranslation = avatar.getJointTranslation("head");

	var overlay = Overlays.addOverlay("text3d", {
		parentID: avatarID,
		//parentJointIndex: headJointIndex,

		//position: Vec3.sum(avatar.position, headTranslation),
		position: Vec3.sum(avatar.position, {x:0, 
			y:config.heightOffset*(0.5+avatar.scale/2),
		z:0}),

		isFacingAvatar: config.facingAvatar,
		orientation: Quat.multiply(avatar.orientation, Quat.fromPitchYawRollDegrees(
			0, 180, 0
		)),

		text: displayName,
		textAlpha: (config.enabled)? config.textOpacity-0.001: 0,
		color: config.textColor,

		leftMargin: config.marginWidth,
		topMargin: config.marginHeight,
		lineHeight: config.textSize,

		backgroundAlpha: (config.enabled)? config.backgroundOpacity: 0,
		backgroundColor: config.backgroundColor,
		
		visable: true, isSolid: false,
	});

	// update overlay size
	Overlays.editOverlay(overlay, {
		size: calcNewSize(overlay, displayName),
	});

	// add to nametags ^^
	var nametag = {
		avatar: avatar,
		overlay: overlay,
		displayName: avatar.sessionDisplayName
	};

	nametags[avatarID+""] = nametag;

	return true;
}

function drawAllNametags() {
	var avatars = AvatarList.getAvatarIdentifiers();
	if (config.drawOwn) avatars.push(MyAvatar.sessionUUID);

	if (config.debug) var avatarCount = 0;
	for (var i=0; i<avatars.length; i++) {
		if (drawNametag(avatars[i])) {
			if (config.debug) avatarCount++;
		}
	}

	if (config.debug) debug("Drawn "+avatarCount+" nametags");
}

function deleteNametag(id) {
	id = id+"";
	if (!nametags[id]) return;
	Overlays.deleteOverlay(
		nametags[id].overlay
	);
	delete nametags[id];
}

function deleteAllNametags() {
	var nametagsKeys = Object.keys(nametags);
	for (var i=0; i<nametagsKeys.length; i++) {
		deleteNametag(nametagsKeys[i]);
	}
	nametags = {};
}

function hardReloadNametags() {
	if (config.debug) debug("Hard reloading nametags");
	deleteAllNametags();
	drawAllNametags();
	// "ferret scientist", you found the hidden ferret, now go tell Nik he's cute on hifi >w<
}

function reloadNametags() {
	if (config.debug) debug("Reloading "+Object.keys(nametags).length+" nametags");

	var nametagsKeys = Object.keys(nametags);
	var newNametags = {};

	var avatars = AvatarList.getAvatarIdentifiers();
	if (config.drawOwn) avatars.push(MyAvatar.sessionUUID);

	// for each current avatar
	avatars.forEach(function(avatarID) {
		if (!avatarID) return;

		var avatar = AvatarList.getAvatar(avatarID);

		// add nametag if its not found
		if (nametagsKeys.indexOf(avatarID)==-1) {
			if (config.debug) debug("\tAvatar joined");
			drawNametag(avatarID);
		}

		var nametag = nametags[avatarID];
		if (!nametag) {
			if (config.debug) debug("\tAvatar doesnt exist");
			deleteNametag(avatarID);
			return;
		}

		// update display name
		if (avatar.sessionDisplayName!=nametag.displayName) {
			if (config.debug) debug("\tAvatar updated");
			nametag.displayName = avatar.sessionDisplayName;

			Overlays.editOverlay(nametag.overlay, {
				text: nametag.displayName,
				size: calcNewSize(nametag.overlay, nametag.displayName),
			});
		}
	});

	// for each nametag
	Object.keys(nametags).forEach(function(id) {
		var exists = false; 
		for (var i=0; i<avatars.length; i++) {
			if (avatars[i]+"" == id+"") {
				exists = true;
			}
		}

		if (!exists) {
			if (config.debug) debug("\tAvatar left");
			deleteNametag(id);
		}
	});

	if (config.debug) debug("\tReloaded, now "+Object.keys(nametags).length+" in total");
}

function reloadNametagsDelay() {
	Script.setTimeout(function() {
		reloadNametags();
	}, 2000);
}

// tablet
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: 'data:image/svg;xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/></svg>',
    text: "NAMETAGS"
});

var uuid = Uuid.generate(); 

// i was using base64 for things but i just.. nvm...
//var html = "";;
//function atob(r){for(var t,a=String(r),c=0,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o="";a.charAt(0|c)||(n="=",c%1);o+=n.charAt(63&t>>8-c%1*8))t=t<<8|a.charCodeAt(c+=.75);return o}
//function btoa(r){for(var n,t,a=String(r).replace(/[=]+$/,""),e=0,o=0,f="";t=a.charAt(o++);~t&&(n=e%4?64*n+t:t,e++%4)?f+=String.fromCharCode(255&n>>(-2*e&6)):0)t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(t);return f}

function buttonClicked() {
	// var dataurl = ("<script>"+
	// 	"var uuid='"+uuid+"'; "+
	// 	"var config="+JSON.stringify(getConfig())+";"+
	// "</script>");

	// // appending base64 means it has to be divisible by 3
	// console.log(dataurl.length%3)
	// if (dataurl.length%3!=0) {
	// 	var amount = 3-dataurl.length%3;
	// 	for (var i=0; i<amount; i++) {
	// 		dataurl += " ";
	// 	}
	// }

	// dataurl = "data:text/html;base64,"+atob(dataurl)+html;
	// tablet.gotoWebScreen(dataurl, {});

	tablet.gotoWebScreen(assetsUrl+"makisNametags.html"+
		"?uuid="+uuid+
		"&config="+JSON.stringify(getConfig())
	, {});
};
button.clicked.connect(buttonClicked);

function webEventReceived(event) {
	event = JSON.parse(event);
	if (event.uuid != uuid) return;
	if (config.debug) debug("Event: "+JSON.stringify(event,null,4));
	
	switch (event.key) {
		case "config":
			loadConfig(event.value);
			hardReloadNametags();
		break;
	}
};
tablet.webEventReceived.connect(webEventReceived);

// events
function avatarRemovedEvent(id) {
	//reloadNametagsDelay();
	deleteNametag(id);
};
AvatarList.avatarRemovedEvent.connect(avatarRemovedEvent);

function avatarAddedEvent(id) {
	//reloadNametagsDelay();
	Script.setTimeout(function() {
		drawNametag(id);
	}, 2000);
};
AvatarList.avatarAddedEvent.connect(avatarAddedEvent);

Script.scriptEnding.connect(function() {
	deleteAllNametags();
	Script.clearInterval(reloadNametagsInterval);
	tablet.removeButton(button);

	// events
	button.clicked.disconnect(buttonClicked);
	tablet.webEventReceived.disconnect(webEventReceived);

	AvatarList.avatarRemovedEvent.disconnect(avatarRemovedEvent);
	AvatarList.avatarAddedEvent.disconnect(avatarAddedEvent);
});

// init
reloadNametagsInterval = Script.setInterval(reloadNametags, 1000*10);

Script.setTimeout(function() {
	drawAllNametags();
}, 2000);