// ┏┳┓┏━┓╻┏ ╻╻┏━┓
// ┃┃┃┣━┫┣┻┓┃ ┗━┓
// ╹ ╹╹ ╹╹ ╹╹ ┗━┛
// ┏┓╻┏━┓┏┳┓┏━╸┏━┓╻  ┏━┓╺┳╸┏━╸┏━┓
// ┃┗┫┣━┫┃┃┃┣╸ ┣━┛┃  ┣━┫ ┃ ┣╸ ┗━┓
// ╹ ╹╹ ╹╹ ╹┗━╸╹  ┗━╸╹ ╹ ╹ ┗━╸┗━┛
// github.com/makitsune/hifi-stuff

var assetsUrl = "file:///D:/Git/hifi-stuff/makis-nametags/"; 

var config = null;
function loadConfig(newConfig) {
	config = newConfig;
	Settings.setValue("makisNametags", config);

	config.margin_width /= 100;
	config.margin_height /= 100;
	config.text_size /= 10;
}

function getConfig() {
	var currentConfig = JSON.parse(JSON.stringify(config));
	currentConfig.margin_width *= 100; 
	currentConfig.margin_height *= 100; 
	currentConfig.text_size *= 10; 
	return currentConfig;
}

var defaultConfig = {
	enabled: true,
	text_size: 1,

	margin_width: 5,
	margin_height: 3,

	text_color: {red:255, green:255, blue:255},
	text_opacity: 1,
	background_color: {red:29, green:31, blue:33},
	background_opacity: 0.5,

	height_offset: 1,
	facing_avatar: true,
	
	draw_own: true,
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
		x: textSize.width+config.margin_width*2,
		y: textSize.height+config.margin_height*2,
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
			y:config.height_offset*(0.5+avatar.scale/2),
		z:0}),

		isFacingAvatar: config.facing_avatar,
		orientation: avatar.orientation,

		text: displayName,
		textAlpha: (config.enabled)? config.text_opacity-0.001: 0,
		color: config.text_color,

		leftMargin: config.margin_width,
		topMargin: config.margin_height,
		lineHeight: config.text_size,

		backgroundAlpha: (config.enabled)? config.background_opacity: 0,
		backgroundColor: config.background_color,
		
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
	if (config.draw_own) avatars.push(MyAvatar.sessionUUID);

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
	if (config.draw_own) avatars.push(MyAvatar.sessionUUID);

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
	icon: assetsUrl+"makisNametags.svg",
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