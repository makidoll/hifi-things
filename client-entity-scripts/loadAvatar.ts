/*
- Enable triggerable
- Enter url in modelURL or description
*/

(()=>{
	class LoadAvatar implements ClientEntityScript {
		loadAvatar(entityID: Uuid) {
			let entity = Entities.getEntityProperties(entityID,
				["modelURL", "description", "name"]
			) as Entities.EntityPropertiesModel;

			let confirm = Window.confirm((entity.name)?
				"Would you like to load the avatar: "+entity.name:
				"Would you like to load this avatar?"
			);
			
			if (confirm) {
				if (entity.description) {
					MyAvatar.useFullAvatarURL(entity.description, entity.name);
				} else {
					MyAvatar.useFullAvatarURL(entity.modelURL, entity.name);
				}
			} else {
				Tablet.getTablet("com.highfidelity.interface.tablet.system")
					.gotoHomeScreen();
			}
		}

		startFarTrigger(entityID: Uuid) {
			this.loadAvatar(entityID);
		}

		clickDownOnEntity(entityID: Uuid, mouseEvent: MouseEvent) {
			if (mouseEvent.isLeftButton) this.loadAvatar(entityID);
		}
	}

	return new LoadAvatar();
});