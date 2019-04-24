// put the script on a model where the url is an fst and has a name
// also works if the fst is in the description

(function() {
	this.loadAvatar = function(entityID) {
		var entity = Entities.getEntityProperties(entityID, ["modelURL", "description", "name"]);

		var confirmMessage = (entity.name)?
			"Would you like to load the avatar: "+entity.name:
			"Would you like to load this avatar?";
		var confirm = Window.confirm(confirmMessage);
		
		if (confirm) {
			if (entity.description) {
				MyAvatar.useFullAvatarURL(entity.description, entity.name);
			} else {
				MyAvatar.useFullAvatarURL(entity.modelURL, entity.name);
			}
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