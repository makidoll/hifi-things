// put the script on a model where the url is an fst and has a name

(function() {
	this.loadAvatar = function(entityID) {
		var entity = Entities.getEntityProperties(entityID, ["modelURL", "name"]);

		var confirm = Window.confirm("Would you like to load the avatar: "+entity.name);
		if (confirm) {
			MyAvatar.useFullAvatarURL(entity.modelURL, entity.name);
		} else {
			tablet.gotoHomeScreen();
		}
	}	

	//this.startNearTrigger = this.loadAvatar;
	this.startFarTrigger = this.loadAvatar;
	this.clickDownOnEntity = function(entityID, mouseEvent) {
		if (mouseEvent.isLeftButton) this.loadAvatar(entityID);
	}
})