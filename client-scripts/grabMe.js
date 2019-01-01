function GrabMe() {
	var entityID = undefined;
	var active = false;
	var interval = undefined;
	var previousScale = 1;
	var previousPosition = undefined;

	this.enable = function() {
		if (active) return;

		entityID = Entities.addEntity({
			name: "Grab Me - "+MyAvatar.sessionDisplayName,
			type: "Box",
			grab: { grab: true },
			collisionless: true,
			//parentID: MyAvatar.sessionUUID,
			canCastShadow: false,
			position: MyAvatar.position,
			dimensions: { x: 0.15, y: 0.4, z: 0.15 },
			userData: JSON.stringify({
				ProceduralEntity: {
					shaderUrl: Script.resolvePath("../shaders/invisible.fs"),
					version: 2,
				}
			}),
			lifetime: 60*60*24, // 24 hours
			rotation: MyAvatar.orientation,
		}, !(Entities.canRez()||Entities.canRezTmp()));
		if (!entityID) return;

		MyAvatar.setParentID(entityID);

		interval = Script.setInterval(function() {
			if (!entityID) return;
			var entity = Entities.getEntityProperties(entityID, ["position"]);
			previousPosition = entity.position; // used for tping back incase user self grabs

			Entities.editEntity(entityID, {
				dimensions: { x: 0.15, y: 0.4, z: 0.15 }
			});
			
			if (!Vec3.withinEpsilon(MyAvatar.position, entity.position, 0.075))
				MyAvatar.position = entity.position;

			//MyAvatar.orientation = entity.rotation; 
		}, 1000);

		previousScale = MyAvatar.scale;
		MyAvatar.scale = 0.274;
		MyAvatar.setCollisionsEnabled(false);

		Controller.disableMapping("com.highfidelity.controllerDispatcher")
		active = true;
	}

	this.disable = function() {
		if (!active) return;

		Entities.deleteEntity(entityID);
		//MyAvatar.setParentID("");

		if (interval) Script.clearInterval(interval);

		MyAvatar.scale = previousScale;
		MyAvatar.orientation = Quat.cancelOutRollAndPitch(MyAvatar.orientation);
		MyAvatar.setCollisionsEnabled(true);

		Controller.enableMapping("com.highfidelity.controllerDispatcher")
		active = false;
	}
}

var grabMe = new GrabMe();

var icons = {
	white: 'data:image/svg;xml,<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>',
	black: 'data:image/svg;xml,<svg fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>',
}

var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: icons.white,
	text: "Grab Me"
});

function clicked() {
	grabMe.active = !grabMe.active;
	button.editProperties({
		isActive: grabMe.active,
		icon: (grabMe.active)? icons.black: icons.white
	});

	if (grabMe.active) {
		grabMe.enable();
	} else {
		grabMe.disable();
	}
}

button.clicked.connect(clicked);
Script.scriptEnding.connect(function() {
	grabMe.disable();
	tablet.removeButton(button);
	button.clicked.disconnect(clicked);
});