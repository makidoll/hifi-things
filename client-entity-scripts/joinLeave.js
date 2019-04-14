// userData = {
// 	announce: true,
// 	joinAudio: "https://maki.cat/hifi/sounds/elevatorJoin.mp3",
// 	leaveAudio: "https://maki.cat/hifi/sounds/elevatorLeave.mp3"
// }

(function() {
	var announce = true;
	var joinAudio = undefined;
	var leaveAudio = undefined;

	var avatarDisplayNames = {}

	function avatarAddedEvent(sessionUUID) {
		var avatar = AvatarList.getAvatar(sessionUUID);

		Script.setTimeout(function() {	
			avatarDisplayNames[sessionUUID] = avatar.sessionDisplayName;
			Window.displayAnnouncement(avatar.sessionDisplayName+" joined the domain");
		}, 500);

		if (joinAudio) if (joinAudio.downloaded)
			Audio.playSound(joinAudio, {
				volume: 0.08,
				localOnly: true,
			});
	}

	function avatarRemovedEvent(sessionUUID) {
		Window.displayAnnouncement(avatarDisplayNames[sessionUUID]+" left the domain");

		if (leaveAudio) if (leaveAudio.downloaded)
			Audio.playSound(leaveAudio, {
				volume: 0.08,
				localOnly: true,
			});
	}

	this.preload = function(entityID) {
		var userData = Entities.getEntityProperties(entityID, ["userData"]).userData;
		try { userData = JSON.parse(userData);
		} catch(err) { userData = {}; }

		if (userData.announce == false) announce = false;

		joinAudio = (userData.joinAudio)?
			SoundCache.getSound(userData.joinAudio):
			SoundCache.getSound("https://maki.cat/hifi/sounds/elevatorJoin.mp3");

		leaveAudio = (userData.leaveAudio)?
			SoundCache.getSound(userData.leaveAudio):
			SoundCache.getSound("https://maki.cat/hifi/sounds/elevatorLeave.mp3");

		if (announce) AvatarList.getAvatarIdentifiers().forEach(function(sessionUUID) {
			avatarDisplayNames[sessionUUID] =
				AvatarList.getAvatar(sessionUUID).sessionDisplayName;
		});

		AvatarManager.avatarAddedEvent.connect(avatarAddedEvent);
		AvatarManager.avatarRemovedEvent.connect(avatarRemovedEvent);
	}

	this.unload = function() {
		AvatarManager.avatarAddedEvent.disconnect(avatarAddedEvent);
		AvatarManager.avatarRemovedEvent.disconnect(avatarRemovedEvent);
	}

});