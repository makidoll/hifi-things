function GrabMe() {
	var entityID = undefined;
	this.active = false;
	var interval = undefined;
	var previousScale = 1;
// 	var isTabletDisplayed = false;
// 	var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

// 	function onTabletScreenChanged(type, url) {
//         isTabletDisplayed = type !== "Closed";
//         updateHandFunctions();
//     }

// 	function updateHandFunctions() {
//         Messages.sendMessage("Hifi-Grab-Disable", JSON.stringify({
//             holdEnabled: !active,
//             nearGrabEnabled: !active,
//             farGrabEnabled: !active
//         }), true);
// 1
//         Messages.sendMessage("Hifi-Pointer-Disable", JSON.stringify({
//             pointerEnabled: isTabletDisplayed
//         }), true);
//     }

	this.enable = function() {
		if (this.active) return;
		if (!(Entities.canRez() || Entities.canRezTmp())) return;

		entityID = Entities.addEntity({
			name: "Grab Me - "+MyAvatar.sessionDisplayName,
			type: "Box",
			grab: {grabbable: true},
			collisionless: true,
			//parentID: MyAvatar.sessionUUID,
			canCastShadow: false,
			position: MyAvatar.position,
			dimensions: { x: 0.15, y: 0.4, z: 0.15 },
			userData: JSON.stringify({
				ProceduralEntity: {
					//shaderUrl: Script.resolvePath("../shaders/invisible.fs"),
					version: 2,
				}
			}),
			lifetime: 60*60*24, // 24 hours
			rotation: MyAvatar.orientation,
		});
		if (!entityID) return;
		this.active = true;

		//tablet.screenChanged.connect(onTabletScreenChanged);
		//updateHandFunctions();
		Messages.sendMessage("Hifi-Hand-Drop", "both");
		Messages.sendMessage("Hifi-Hand-Drop", "both");
		Messages.sendMessage("Hifi-Hand-Drop", "both");
		Messages.sendMessage("Hifi-Hand-Drop", "both");
		Messages.sendMessage("Hifi-Hand-Drop", "both");

		previousScale = MyAvatar.scale;
		MyAvatar.scale = 0.274;

		Controller.disableMapping("com.highfidelity.controllerDispatcher");
		MyAvatar.setCollisionsEnabled(false);
		MyAvatar.setOtherAvatarsCollisionsEnabled(false);

		interval = Script.setInterval(function() {
			if (!entityID) return;
			var entity = Entities.getEntityProperties(entityID, ["position"]);

			Entities.editEntity(entityID, {
				dimensions: { x: 0.15, y: 0.4, z: 0.15 }
			});
			
			if (!Vec3.withinEpsilon(MyAvatar.position, entity.position, 0.075))
				MyAvatar.position = entity.position;
			//MyAvatar.orientation = entity.rotation; 
		}, 1000);

		// this is now broken for some reason when near grabbing???
		MyAvatar.setParentID(entityID);
	}

	this.disable = function() {
		if (!this.active) return;
		this.active = false;

		Entities.deleteEntity(entityID);

		//tablet.screenChanged.disconnect(onTabletScreenChanged);
		//updateHandFunctions();

		MyAvatar.scale = previousScale;
		MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
		
		Controller.enableMapping("com.highfidelity.controllerDispatcher");
		MyAvatar.setCollisionsEnabled(true);
		MyAvatar.setOtherAvatarsCollisionsEnabled(true);

		if (interval) Script.clearInterval(interval);

		MyAvatar.setParentID("");
	}
}

var icons = {
	white: 'data:image/svg;xml,<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>',
	black: 'data:image/svg;xml,<svg fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>',
}

var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: icons.white,
	text: "Grab Me"
});

var grabMe = new GrabMe();

function clicked(forceActive) {
	if (!(Entities.canRez() || Entities.canRezTmp())) return;
	var newActive = !grabMe.active;
	if (forceActive) newActive = forceActive;

	if (newActive) {
		grabMe.enable();
	} else {
		grabMe.disable();
	}

	button.editProperties({
		isActive: newActive,
		icon: (newActive)? icons.black: icons.white
	});
}

function messageReceived(chan, msg, uuid, localOnly) {
	if (!localOnly) return;
	if (chan != "cat.maki.grabMe") return;

	switch(msg) {
		case "enable": clicked(true); break;
		case "disable": clicked(false); break;
		case "toggle": clicked(); break;
	}
}

button.clicked.connect(clicked);

Messages.subscribe("cat.maki.grabMe");
Messages.messageReceived.connect(messageReceived);

Script.scriptEnding.connect(function() {
	grabMe.disable();

	button.clicked.disconnect(clicked);

	Messages.unsubscribe("cat.maki.grabMe");
	Messages.messageReceived.disconnect(messageReceived);

	tablet.removeButton(button);
});