/*
userData = {
    "announce": true,
    "joinAudio": "https://maki.cat/hifi/sounds/elevatorJoin.mp3",
    "leaveAudio": "https://maki.cat/hifi/sounds/elevatorLeave.mp3"
}
*/
(function () {
    var JoinLeave = /** @class */ (function () {
        function JoinLeave() {
            this.announce = true;
            this.joinAudio = {};
            this.leaveAudio = {};
            this.avatarDisplayNames = {};
        }
        JoinLeave.prototype.avatarAddedEvent = function (sessionUUID) {
            var _this = this;
            var avatar = AvatarManager.getAvatar(sessionUUID);
            Script.setTimeout(function () {
                _this.avatarDisplayNames[sessionUUID] = avatar.sessionDisplayName;
                Window.displayAnnouncement(avatar.sessionDisplayName + " joined the domain");
            }, 500);
            if (this.joinAudio)
                if (this.joinAudio.downloaded)
                    Audio.playSound(this.joinAudio, {
                        volume: 0.08,
                        localOnly: true
                    });
        };
        JoinLeave.prototype.avatarRemovedEvent = function (sessionUUID) {
            Window.displayAnnouncement(this.avatarDisplayNames[sessionUUID] + " left the domain");
            if (this.leaveAudio)
                if (this.leaveAudio.downloaded)
                    Audio.playSound(this.leaveAudio, {
                        volume: 0.08,
                        localOnly: true
                    });
        };
        JoinLeave.prototype.preload = function (entityID) {
            var userData;
            var entity = Entities.getEntityProperties(entityID, ["userData"]);
            try {
                userData = JSON.parse(entity.userData);
            }
            catch (err) {
                userData = {};
            }
            if (userData.announce == false)
                this.announce = false;
            this.joinAudio = (userData.joinAudio) ?
                SoundCache.getSound(userData.joinAudio) :
                SoundCache.getSound("https://maki.cat/hifi/sounds/elevatorJoin.mp3");
            this.leaveAudio = (userData.leaveAudio) ?
                SoundCache.getSound(userData.leaveAudio) :
                SoundCache.getSound("https://maki.cat/hifi/sounds/elevatorLeave.mp3");
            if (this.announce) {
                var sessionUUIDs = AvatarManager.getAvatarIdentifiers();
                for (var i in sessionUUIDs) {
                    var sessionUUID = sessionUUIDs[i];
                    this.avatarDisplayNames[sessionUUID] =
                        AvatarManager.getAvatar(sessionUUID).sessionDisplayName;
                }
            }
            AvatarManager.avatarAddedEvent.connect(this.avatarAddedEvent.bind(this));
            AvatarManager.avatarRemovedEvent.connect(this.avatarRemovedEvent.bind(this));
        };
        JoinLeave.prototype.unload = function () {
            AvatarManager.avatarAddedEvent.disconnect(this.avatarAddedEvent.bind(this));
            AvatarManager.avatarRemovedEvent.disconnect(this.avatarRemovedEvent.bind(this));
        };
        return JoinLeave;
    }());
    return new JoinLeave();
});
