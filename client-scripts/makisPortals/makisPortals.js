var uuid = Uuid.generate();
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	text: "Portals",
});

var buttonAnimation = [Script.resolvePath("icon/icon01.svg"),Script.resolvePath("icon/icon02.svg"),Script.resolvePath("icon/icon03.svg"),Script.resolvePath("icon/icon04.svg"),Script.resolvePath("icon/icon05.svg"),Script.resolvePath("icon/icon06.svg"),Script.resolvePath("icon/icon07.svg"),Script.resolvePath("icon/icon08.svg"),Script.resolvePath("icon/icon09.svg"),Script.resolvePath("icon/icon10.svg"),Script.resolvePath("icon/icon11.svg"),Script.resolvePath("icon/icon12.svg"),Script.resolvePath("icon/icon13.svg"),Script.resolvePath("icon/icon14.svg"),Script.resolvePath("icon/icon15.svg"),Script.resolvePath("icon/icon16.svg"),Script.resolvePath("icon/icon17.svg"),Script.resolvePath("icon/icon18.svg"),Script.resolvePath("icon/icon19.svg"),Script.resolvePath("icon/icon20.svg"),Script.resolvePath("icon/icon21.svg"),Script.resolvePath("icon/icon22.svg"),Script.resolvePath("icon/icon23.svg"),Script.resolvePath("icon/icon24.svg"),Script.resolvePath("icon/icon25.svg"),Script.resolvePath("icon/icon26.svg"),Script.resolvePath("icon/icon27.svg"),Script.resolvePath("icon/icon28.svg"),Script.resolvePath("icon/icon29.svg"),Script.resolvePath("icon/icon30.svg"),Script.resolvePath("icon/icon31.svg"),Script.resolvePath("icon/icon32.svg"),Script.resolvePath("icon/icon33.svg"),Script.resolvePath("icon/icon34.svg"),Script.resolvePath("icon/icon35.svg"),Script.resolvePath("icon/icon36.svg"),Script.resolvePath("icon/icon37.svg"),Script.resolvePath("icon/icon38.svg"),Script.resolvePath("icon/icon39.svg"),Script.resolvePath("icon/icon40.svg"),Script.resolvePath("icon/icon41.svg"),Script.resolvePath("icon/icon42.svg"),Script.resolvePath("icon/icon43.svg"),Script.resolvePath("icon/icon44.svg"),Script.resolvePath("icon/icon45.svg"),Script.resolvePath("icon/icon46.svg"),Script.resolvePath("icon/icon47.svg"),Script.resolvePath("icon/icon48.svg"),Script.resolvePath("icon/icon49.svg"),Script.resolvePath("icon/icon50.svg"),Script.resolvePath("icon/icon51.svg"),Script.resolvePath("icon/icon52.svg"),Script.resolvePath("icon/icon53.svg"),Script.resolvePath("icon/icon54.svg"),Script.resolvePath("icon/icon55.svg"),Script.resolvePath("icon/icon56.svg"),Script.resolvePath("icon/icon57.svg"),Script.resolvePath("icon/icon58.svg"),Script.resolvePath("icon/icon59.svg"),Script.resolvePath("icon/icon60.svg")];

var buttonAnimationFrame = 0;
var buttonAnimationFrameIncrement = 1;
var buttonAnimationInterval = Script.setInterval(function() {
	buttonAnimationFrame += buttonAnimationFrameIncrement;

	if (buttonAnimationFrame>60) {
		buttonAnimationFrameIncrement = -1;
		buttonAnimationFrame = 59;
	} else if (buttonAnimationFrame<0) {
		buttonAnimationFrameIncrement = 1;
		buttonAnimationFrame = 1;
	}

	var frame = buttonAnimation[buttonAnimationFrame];
	if (frame != undefined) button.editProperties({icon:frame});
}, 1000/60);

var soundOpening = SoundCache.getSound(Script.resolvePath("portal_open1.wav"));

function atob(r){for(var t,a=String(r),c=0,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o="";a.charAt(0|c)||(n="=",c%1);o+=n.charAt(63&t>>8-c%1*8))t=t<<8|a.charCodeAt(c+=.75);return o}

function emitEvent(key, value) {
	tablet.emitScriptEvent(JSON.stringify({
		uuid: uuid,
		key: key, value: value,
	}));
}

function request(url, callback, blob) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status!=200) return;
			callback(req.responseText);
		}
	}
	req.open("GET", url, true);
	req.send();
}

function getPlaceInfo(placename, callback) {
	request("https://highfidelity.com/places/"+placename, callback);
}

var lifetime = 60;
function spawnPortal(place) {
	var position = Vec3.sum(MyAvatar.getWorldFeetPosition(), Vec3.multiplyQbyV(Quat.cancelOutRollAndPitch(Camera.orientation), {y: 1.5, z: -2}));
	var rotation = Quat.cancelOutRollAndPitch(Camera.orientation);

	if (soundOpening.downloaded)
		Audio.playSound(soundOpening, {
			position: position,
			volume: 0.1,
		});

	var parentID = Entities.addEntity({
		name: "Portal to "+place.name,
		type: "Box",
		shape: "Cube",
		dimensions: {
			x: 2,
			y: 3,
			z: 0.5,
		},
		color: {red:0,green:0,blue:0},
		position: position,
		rotation: rotation,
		script: "https://hifi.maki.cat/client-entity-scripts/portal.js",
		collisionless: true,
		ignoreForCollisions: true,
		grab: {grabbable: false, grabFollowsController: false},
		userData: JSON.stringify({
			"address": "hifi://"+place.name,
			"ProceduralEntity": {
				"shaderUrl": "https://hifi.maki.cat/shaders/portal.fs",
				"channels": [place.thumbURL.replace("/lobby/", "/original/")],
				"uniforms": {
					"aspectRatio": 2.57971014486
				},
				"version": 2
			}
		}),
		lifetime: lifetime,
	});

	var textEntity = {
		parentID: parentID,
		name: "Portal text to "+place.name,
		type: "Model",
		rotation: rotation,
		collisionless: true,
		ignoreForCollisions: true,
		grab: {grabbable: false, grabFollowsController: false},
		lifetime: lifetime,
	};

	textEntity.position = Vec3.sum(position, {y: 1.8});
	textEntity.modelURL = ("https://maki.cat/3d-text.obj"+
		"?font=apple_kid"+
		"&scale=0.02"+
		"&depth=0.2"+
		"&spaceOffset=2"+
		"&lineOffset=-2"+
		"&frontEmission=ffffff"+
		"&sideEmission="+place.averageColor+
		"&frontDiffuse=010101"+
		"&sideDiffuse=010101"+
		"&text="+place.people+" people here"
	);
	Entities.addEntity(textEntity);

	textEntity.position = Vec3.sum(position, {y: 2.3});
	textEntity.modelURL = ("https://maki.cat/3d-text.obj"+
		"?font=apple_kid"+
		"&scale=0.05"+
		"&depth=0.2"+
		"&spaceOffset=2"+
		"&lineOffset=-2"+
		"&frontEmission=ffffff"+
		"&sideEmission="+place.averageColor+
		"&frontDiffuse=010101"+
		"&sideDiffuse=010101"+
		"&text="+place.name
	);
	Entities.addEntity(textEntity);
}

function webEventReceived(json) {
	try { json = JSON.parse(json);
	} catch(err) { return; }
	if (json.uuid != uuid) return;

	switch(json.key) {
		case "getPermissions":
			emitEvent("getPermissions", Entities.canRez()||Entities.canRezTmp());
		break;
		case "getPlaceInfo":
			if (typeof json.value != "string") return;
			getPlaceInfo(json.value, function(body) {
				var place = {
					name: (/<title>(.*?) -/i.exec(body)),
					desc: (/<p class=['"]places-regular-text places-left-justify['"]>(.*?)<\/p>/i.exec(body)),
					thumbURL: (/<img class=['"]places-img['"] src="(.*?)[?'"]/i.exec(body)),
					people: (/([0-9]{1,10}) (?:people|person) here<\/span>/i.exec(body)),
				};

				if (place.name == null) return;
				place = {
					name: place.name[1],
					desc: place.desc[1],
					thumbURL: place.thumbURL[1],
					people: parseInt(place.people[1]),
				};

				request("https://maki.cat/average-color?url="+place.thumbURL, function(body) {
					place.averageColor = body;
  					emitEvent("getPlaceInfo", place);
				}, true);
			});
		break;
		case "spawnPortal":
			if (typeof json.value != "object") return;

			console.log(JSON.stringify(json.value))

			tablet.gotoHomeScreen();
			spawnPortal(json.value);
		break;
	}
}

function buttonClicked() {
	tablet.gotoWebScreen(Script.resolvePath("app.html")+"?uuid="+uuid);
}

tablet.webEventReceived.connect(webEventReceived);
button.clicked.connect(buttonClicked);

Script.scriptEnding.connect(function() {
	tablet.webEventReceived.disconnect(webEventReceived);
	button.clicked.disconnect(buttonClicked);

	tablet.removeButton(button);
	Script.clearInterval(buttonAnimationInterval);
});