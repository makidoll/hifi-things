() => {
	class SwimmingEentje implements ClientEntityScript {
		entityId: Uuid;

		previousPos: Vec3;
		pivotPos: Vec3;

		t = 0;
		update = () => {
			Entities.editEntity(this.entityId, {
				position: {
					x: this.previousPos.x,
					y: Math.sin(this.t * 0.1) * 0.1 + this.previousPos.y,
					z: this.previousPos.z,
				} as any,
				rotation: Quat.fromPitchYawRollDegrees(
					0,
					-(this.t * 0.5) % 360,
					0,
				),
			});

			this.t++;
		};

		preload(entityId: string) {
			this.entityId = entityId;
			this.previousPos = Entities.getEntityProperties(entityId, [
				"position",
			]).position;

			this.pivotPos = Vec3.subtract(this.previousPos, {
				x: -1,
				y: 0,
				z: 0,
			} as Vec3);

			Script.update.connect(this.update);
		}

		unload() {
			Script.update.disconnect(this.update);

			Entities.editEntity(this.entityId, {
				position: this.previousPos,
			});
		}
	}

	return new SwimmingEentje();
};
