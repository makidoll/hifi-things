() => {
	class MirrorZone implements ClientEntityScript {
		entityID: Uuid = null;
		mirrorEntityID: Uuid = null;

		preload(entityID: Uuid) {
			this.entityID = entityID;
			this.mirrorEntityID = Entities.getEntityProperties(this.entityID, [
				"parentID",
			]).parentID;
		}

		enterEntity() {
			Entities.callEntityMethod(this.mirrorEntityID, "turnOn");
		}

		leaveEntity() {
			Entities.callEntityMethod(this.mirrorEntityID, "turnOff");
		}
	}

	return new MirrorZone();
};
