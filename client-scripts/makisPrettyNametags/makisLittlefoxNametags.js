var nametags = {};

function getUsers(resolve) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var json = req.responseText;
			try { json = JSON.parse(json); } catch(err) { return; }
			if (json.status!="success") return;
			resolve(json.data.users);
		}
	}
	req.open("GET",
		AccountServices.metaverseServerURL+
		"/api/v1/users?per_page=1000&status="+
		location.domainID.slice(1,-1)+
		"&a="+(new Date().getTime()),
	true);
	req.send();
}

function updateNametagEntity(nametag) {
	if (nametag.entity==undefined) return;

	Entities.editEntity(nametag.entity, {
		alpha: 1,
		imageURL: ("https://maki.cat/prettyNametags/"+
			"?username="+(nametag.username||"anonymous")+
			"&avatarURL="+nametag.avatarURL+
			"&connection="+nametag.connection+
			"&admin="+nametag.admin+
			"&theme=littlefox"
		),
	});
}

function addNametag(id, details) {
	/* details = {
		username: String,
		avatarURL: String,
		connection: String,
		admin: Boolean,
	} */

	if (nametags[id]!=undefined) return;
	var nametag = details;

	var scale = 1.5;
	nametag.entity = Entities.addEntity({
		name: "cat.maki.nametags",
		parentID: id,
		localPosition: {y:1},
		dimensions: {x:scale, y:scale/8},

		type: "Image",
		emissive: true,
		keepAspectRatio: false,
		billboardMode: "full",
		imageURL: "",
		alpha: 0,
	}, "local");

	updateNametagEntity(nametag);
	nametags[id] = nametag;
}

function updateNametag(nametag, details) {
	var updated = false;

	function update(key) {
		if (details[key]==undefined) return;
		if (nametag[key]!=details[key]) {
			nametag[key] = details[key];
			updated = true;
		}
	}

	update("username");
	update("avatarURL");
	update("connection");
	update("admin");

	if (updated) updateNametagEntity(nametag);
}

function updateUserLocal(id) {
	var localUser = AvatarList.getAvatar(id);
	var nametag = nametags[id];

	if (localUser.sessionUUID == null) {
		if (nametag==undefined) return; // doesnt exist
		// must have left
		Entities.deleteEntity(nametag.entity);
		delete nametag;
		return;
	}

	if (nametag==undefined) {
		// add nametag
		addNametag(id, {
			username: localUser.displayName,
			avatarURL: "https://metaverse.highfidelity.com/assets/users/hero-default-user-d5a4727d1ad1fb9d9cd26383e26e2697dfd9f4d2f3f81da86c4990771ca8810d.png",
			connection: null,
			admin: false,
		});
	} else {
		// update nametag
		updateNametag(nametag, {
			username: localUser.displayName
		});
	}

	// check if admin
	Users.requestUsernameFromID(id);
}

function updateUsersLocal() {
	//console.log("Updating users locally");

	AvatarList.getAvatarIdentifiers().forEach(function(id) {
		if (id==null) return;
		updateUserLocal(id);
	});
}

function updateUsersAPI() {
	//console.log("Updating users with API");

	getUsers(function(apiUsers) {
		apiUsers.forEach(function(apiUser) {
			var id = "{"+apiUser.location.node_id+"}";
			var nametag = nametags[id];
			if (nametag==undefined) return;

			updateNametag(nametag, {
				avatarURL: apiUser.images.thumbnail,
				connection: apiUser.connection,
			});
		});	
	});
}

var gracefullyUpdateReady = true;
var gracefullyUpdateToBeUpdated = false;

function gracefullyUpdateUsersAPI() {
	if (gracefullyUpdateReady==false) {
		gracefullyUpdateToBeUpdated = true;
	} else {
		updateUsersAPI();
		gracefullyUpdateReady = false;

		Script.setTimeout(function() {
			gracefullyUpdateReady = true;

			if (gracefullyUpdateToBeUpdated) {
				updateUsersAPI();
				gracefullyUpdateToBeUpdated = false;
			}
		}, 1000*5);
	}
}

updateUsersLocal();
gracefullyUpdateUsersAPI();

function avatarAddedEvent(id) {
	updateUserLocal(id);
	gracefullyUpdateUsersAPI();
}

function avatarRemovedEvent(id) {
	updateUserLocal(id);
	gracefullyUpdateUsersAPI();
}

function usernameFromIDReply(id, username, machineFingerprint, isAdmin) {
	var nametag = nametags[id];
	if (nametag==undefined) return;
	updateNametag(nametag, {
		admin: isAdmin
	});
}

// function avatarSessionChangedEvent(id, oldId) {
// 	updateUsersLocal();
// 	gracefullyUpdateUsersAPI();
// }

var updateIntervalLocal = Script.setInterval(function() {
	updateUsersLocal();
}, 1000*10);

var updateIntervalAPI = Script.setInterval(function() {
	gracefullyUpdateUsersAPI();
}, 1000*20);

AvatarList.avatarAddedEvent.connect(avatarAddedEvent);
AvatarList.avatarRemovedEvent.connect(avatarRemovedEvent);
// AvatarList.avatarSessionChangedEvent.connect(avatarSessionChangedEvent);

Users.usernameFromIDReply.connect(usernameFromIDReply);

Script.scriptEnding.connect(function() {
	Script.clearInterval(updateIntervalLocal);
	Script.clearInterval(updateIntervalAPI);

	AvatarList.avatarAddedEvent.disconnect(avatarAddedEvent);
	AvatarList.avatarRemovedEvent.disconnect(avatarRemovedEvent);
	// AvatarList.avatarSessionChangedEvent.disconnect(avatarSessionChangedEvent);

	Users.usernameFromIDReply.disconnect(usernameFromIDReply);

	Object.keys(nametags).forEach(function(id) {
		Entities.deleteEntity(nametags[id].entity);
	});
});
