/*
- Enable triggerable
- Enter url in modelURL or description
*/

() => {
	class LoadAvatar implements ClientEntityScript {
		loadAvatar(entityID: Uuid) {
			let entity = Entities.getEntityProperties(entityID, [
				"modelURL",
				"description",
				"name",
			]) as Entities.EntityPropertiesModel;

			if (entity.description) {
				MyAvatar.useFullAvatarURL(entity.description, entity.name);
			} else {
				MyAvatar.useFullAvatarURL(entity.modelURL, entity.name);
			}
		}

		startFarTrigger(entityID: Uuid) {
			this.loadAvatar(entityID);
		}

		clickDownOnEntity(entityID: Uuid, event: PointerEvent) {
			if (event.isLeftButton) this.loadAvatar(entityID);
		}
	}

	return new LoadAvatar();
};
