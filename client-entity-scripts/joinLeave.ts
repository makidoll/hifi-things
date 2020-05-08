/*
userData = {
	"announce": true,
	"joinAudio": "https://maki.cafe/hifi/sounds/elevatorJoin.mp3",
	"leaveAudio": "https://maki.cafe/hifi/sounds/elevatorLeave.mp3"
}
*/

() => {
	class JoinLeave implements ClientEntityScript {
		announce: boolean = true;
		joinAudio: SoundObject = {} as SoundObject;
		leaveAudio: SoundObject = {} as SoundObject;

		avatarDisplayNames: { [s: string]: string } = {};

		avatarAddedEvent(sessionUUID: Uuid) {
			let avatar = AvatarManager.getAvatar(sessionUUID);

			Script.setTimeout(() => {
				this.avatarDisplayNames[sessionUUID] =
					avatar.sessionDisplayName;
				Window.displayAnnouncement(
					avatar.sessionDisplayName + " joined the domain",
				);
			}, 500);

			if (this.joinAudio)
				if (this.joinAudio.downloaded)
					Audio.playSound(this.joinAudio, {
						volume: 0.08,
						localOnly: true,
					});
		}

		avatarRemovedEvent(sessionUUID: Uuid) {
			Window.displayAnnouncement(
				this.avatarDisplayNames[sessionUUID] + " left the domain",
			);

			if (this.leaveAudio)
				if (this.leaveAudio.downloaded)
					Audio.playSound(this.leaveAudio, {
						volume: 0.08,
						localOnly: true,
					});
		}

		preload(entityID: Uuid) {
			let userData;
			let entity = Entities.getEntityProperties(entityID, ["userData"]);
			try {
				userData = JSON.parse(entity.userData);
			} catch (err) {
				userData = {};
			}

			if (userData.announce == false) this.announce = false;

			this.joinAudio = userData.joinAudio
				? SoundCache.getSound(userData.joinAudio)
				: SoundCache.getSound(
						"https://maki.cafe/hifi/sounds/elevatorJoin.mp3",
				  );

			this.leaveAudio = userData.leaveAudio
				? SoundCache.getSound(userData.leaveAudio)
				: SoundCache.getSound(
						"https://maki.cafe/hifi/sounds/elevatorLeave.mp3",
				  );

			if (this.announce) {
				let sessionUUIDs = AvatarManager.getAvatarIdentifiers();
				for (let i in sessionUUIDs) {
					let sessionUUID = sessionUUIDs[i];
					this.avatarDisplayNames[
						sessionUUID
					] = AvatarManager.getAvatar(sessionUUID).sessionDisplayName;
				}
			}

			AvatarManager.avatarAddedEvent.connect(
				this.avatarAddedEvent.bind(this),
			);
			AvatarManager.avatarRemovedEvent.connect(
				this.avatarRemovedEvent.bind(this),
			);
		}

		unload() {
			AvatarManager.avatarAddedEvent.disconnect(
				this.avatarAddedEvent.bind(this),
			);
			AvatarManager.avatarRemovedEvent.disconnect(
				this.avatarRemovedEvent.bind(this),
			);
		}
	}

	return new JoinLeave();
};
