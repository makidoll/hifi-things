var uuid = Uuid.generate();
var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: "",
	text: "portal",
});

function emitEvent(key, value) {
	tablet.emitScriptEvent(JSON.stringify({
		uuid: uuid,
		key: key, value: value,
	}));
}

function getPlaceInfo(placename, callback) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4) callback(req.responseText);
	}
	req.open("GET", "https://highfidelity.com/places/"+placename);
	req.send();
}

function spawnPortal(placename, thumbnail) {
	var position = Vec3.sum(MyAvatar.getWorldFeetPosition(), Vec3.multiplyQbyV(Quat.cancelOutRollAndPitch(Camera.orientation), {y: 1.5, z: -2}));
	var rotation = Quat.cancelOutRollAndPitch(Camera.orientation);

	var parentID = Entities.addEntity({
		name: "Portal to "+placename,
		type: "Box",
		shape: "Cube",
		dimensions: {
			x: 2,
			y: 3,
			z: 0.5,
		},
		position: position,
		rotation: rotation,
		script: "https://hifi.maki.cat/client-entity-scripts/portal.js",
		collisionless: true,
		ignoreForCollisions: true,
		grab: {grabbable: true, grabFollowsController: false},
		userData: JSON.stringify({
			"address": "hifi://"+placename,
			"ProceduralEntity": {
				"shaderUrl": "https://hifi.maki.cat/shaders/portal.fs",
				"channels": [thumbnail],
				"version": 2
			}
		}),
		lifetime: 60,
	});

	Entities.addEntity({
		name: "Portal text to "+placename,
		type: "Model",
		modelURL: ("https://maki.cat/3d-text.obj"+
			"?font=apple_kid"+
			"&scale=0.05"+
			"&depth=0.2"+
			"&spaceOffset=2"+
			"&lineOffset=-2"+
			"&frontEmission=ffffff"+
			"&sideEmission=E91E63"+
			"&sideDiffuse=010101"+
			"&text="+placename
		),
		position: Vec3.sum(position, {y: 2}),
		rotation: rotation,
		collisionless: true,
		ignoreForCollisions: true,
		grab: {grabbable: true, grabFollowsController: false},
		lifetime: 60,
	});
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
					thumb: (/<img class=['"]places-img['"] src="(.*?)[?'"]/i.exec(body)),
				};

				if (place.name == null) return;
				place = {
					name: place.name[1],
					desc: place.desc[1],
					thumb: place.thumb[1],
				};

  				emitEvent("getPlaceInfo", place);
			});
		break;
		case "spawnPortal":
			if (typeof json.value != "object") return;
			if (typeof json.value.name != "string") return;
			if (typeof json.value.thumb != "string") return;

			tablet.gotoHomeScreen();
			spawnPortal(json.value.name, json.value.thumb);
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
});