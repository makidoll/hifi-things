var uuid = Uuid.generate();
var overlayWebWindow = new OverlayWebWindow({
	title: "Better Parenter",
	source: "",
	width: 500,
	height: 800,
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

var radius = 10000;
function updateEntities() {
	var entities = [];

	Entities.findEntities(MyAvatar.position, radius).forEach(function(entityID) {
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

var selectedEntities = [];

function clearSelection() {
	selectedEntities = [];

	Messages.sendLocalMessage("entityToolUpdates", JSON.stringify({
		method: "clearSelection", hand: -1
	}));
}

function selectEntity(entityID) {
	if (selectedEntities.indexOf(entityID)>-1) return;
	selectedEntities.push(entityID);

	Messages.sendLocalMessage("entityToolUpdates", JSON.stringify({
		method: "selectEntities", entityIDs: selectedEntities, hand: -1
	}));
} 

function deselectEntity(entityID) {
	var i = selectedEntities.indexOf(entityID);
	if (i<0) return;
	selectedEntities.splice(i,1);

	Messages.sendLocalMessage("entityToolUpdates", JSON.stringify({
		method: "selectEntities", entityIDs: selectedEntities, hand: -1
	}));
}

// function messageReceived(channel, message) {
// 	if (channel != "entityToolUpdates") return
// 	try { var json = JSON.parse(message);
// 	} catch(err) { return; }

// 	console.log(json.method);
// }

function webEventReceived(json) {
	try { json = JSON.parse(json);
	} catch(err) {}
	if (json.uuid != uuid) return;

	//console.log(JSON.stringify(json));

	switch (json.key) {
		case "updateEntities":
			updateEntities();
			clearSelection();
		break;
		case "setParent":
			if (!json.value) return;
			if (json.value.entityID == undefined) return;
			if (json.value.parentID == undefined) return;

			Entities.editEntity(json.value.entityID, {
				parentID: json.value.parentID
			});
		break;
		case "clearSelection":
			clearSelection();
		break;
		case "selectEntity":
			if (!json.value) return;
			selectEntity(json.value);
		break;
		case "deselectEntity":
			if (!json.value) return;
			deselectEntity(json.value);
		break;
		// case "updateRadius":
		// 	radius = json.value||10000;

		// 	selectedEntities = [];

		// 	Messages.sendLocalMessage("entityToolUpdates", JSON.stringify({
		// 		method: "clearSelection", hand: -1
		// 	}));

		// 	updateEntities();
		// break;
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
//Messages.subscribe("entityToolUpdates");
//Messages.messageReceived.connect(messageReceived)

Script.scriptEnding.connect(function() {
	overlayWebWindow.close();
	tablet.removeButton(button);
	
	button.clicked.disconnect(clicked);
	overlayWebWindow.closed.disconnect(closed);
	overlayWebWindow.webEventReceived.disconnect(webEventReceived);
	//Entities.addingEntity.disconnect(updateEntities);
	//Entities.deletingEntity.disconnect(updateEntities);
	//Messages.unsubscribe("entityToolUpdates");
	//Messages.messageReceived.disconnect(messageReceived)
});