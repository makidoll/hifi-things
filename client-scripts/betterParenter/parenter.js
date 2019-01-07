var uuid = Uuid.generate();
var overlayWebWindow = new OverlayWebWindow({
	title: "Parenter",
	source: "",
	width: 500,
	height: 700,
	visible: false,
});

function closed() {
	button.editProperties({
		isActive: false,
		icon: icons.white
	});
}

function emitEvent(key, value) {
	if (!overlayWebWindow) return;
	if (overlayWebWindow.isVisible())
	overlayWebWindow.emitScriptEvent(JSON.stringify({
		key: key, value: value,
		uuid: uuid,
	}));
}

function updateEntities() {
	var entities = [];

	Entities.findEntities(MyAvatar.position, 1000).forEach(function(entityID) {
		entity = Entities.getEntityProperties(entityID, [
			"locked", "id", "parentID", "type", "name", "modelURL"
		]);

		if (entity.locked) return;

		entities.push({
			id: entity.id,
			parentID: entity.parentID,
			type: entity.type,
			name: entity.name,
			modelURL: entity.modelURL,
		});
	});

	emitEvent("updateEntities", entities);
}

function webEventReceived(json) {
	try { json = JSON.parse(json);
	} catch(err) {}
	if (json.uuid != uuid) return;

	switch (json.key) {
		case "updateEntities":
			updateEntities();
		break;
		case "setParent":
			if (!json.value) return;
			if (json.value.entityID == undefined) return;
			if (json.value.parentID == undefined) return;

			Entities.editEntity(json.value.entityID, {
				parentID: json.value.parentID
			});
		break;
	}
}

var icons = {
	white: 'data:image/svg;xml,<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"/></svg>',
	black: 'data:image/svg;xml,<svg fill="#000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"/></svg>',
}

var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
var button = tablet.addButton({
	icon: icons.white,
	text: "Parenter"
});

function clicked() {
	var newVisible = !overlayWebWindow.isVisible();
	var newURL = (newVisible)?
		Script.resolvePath("index.html")+"?uuid="+uuid:
		"";

	overlayWebWindow.setURL(newURL);
	overlayWebWindow.setVisible(newVisible);

	button.editProperties({
		isActive: newVisible,
		icon: (newVisible)? icons.black: icons.white
	});
}

button.clicked.connect(clicked);
overlayWebWindow.closed.connect(closed);
overlayWebWindow.webEventReceived.connect(webEventReceived);
//Entities.addingEntity.connect(updateEntities);
//Entities.deletingEntity.connect(updateEntities);

Script.scriptEnding.connect(function() {
	overlayWebWindow.close();
	tablet.removeButton(button);
	
	button.clicked.disconnect(clicked);
	overlayWebWindow.closed.disconnect(closed);
	overlayWebWindow.webEventReceived.disconnect(webEventReceived);
	//Entities.addingEntity.disconnect(updateEntities);
	//Entities.deletingEntity.disconnect(updateEntities);
});