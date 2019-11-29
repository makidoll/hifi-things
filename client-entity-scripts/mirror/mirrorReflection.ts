/*

userdata
{
	"resolution": 1024,
	"farClip": 16
}

originally from
https://content.highfidelity.com/Experiences/Releases/usefulUtilities/mirror/2019-07-24_09-18-00/mirrorClient.js

*/

() => {
	class MirrorReflection implements ClientEntityScript {
		entityID: Uuid = null;
		mirrorEntityID: Uuid = null;

		running = false;

		resolution = 1024;
		farClip = 16;

		private isInsideOfZone(
			position: Vec3,
			zoneProperties: Entities.EntityPropertiesZone,
		) {
			const localPosition = Vec3.multiplyQbyV(
				Quat.inverse(zoneProperties.rotation),
				Vec3.subtract(position, zoneProperties.position),
			);
			const halfDimensions = Vec3.multiply(
				zoneProperties.dimensions,
				0.5,
			);
			return (
				-halfDimensions.x <= localPosition.x &&
				halfDimensions.x >= localPosition.x &&
				-halfDimensions.y <= localPosition.y &&
				halfDimensions.y >= localPosition.y &&
				-halfDimensions.z <= localPosition.z &&
				halfDimensions.z >= localPosition.z
			);
		}

		private calculateMirrorResolution(dimensions: Vec3) {
			let mirrorResolutionX = 0;
			let mirrorResolutionY = 0;

			if (dimensions.x > dimensions.y) {
				mirrorResolutionX = this.resolution;
				mirrorResolutionY = Math.round(
					(mirrorResolutionX * dimensions.y) / dimensions.x,
				);
			} else {
				mirrorResolutionY = this.resolution;
				mirrorResolutionX = Math.round(
					(mirrorResolutionY * dimensions.x) / dimensions.y,
				);
			}

			var resolution = {
				x: mirrorResolutionX,
				y: mirrorResolutionY,
			};

			return resolution;
		}

		createMirrorEntity(dimensions: Vec3) {
			if (this.mirrorEntityID) {
				Entities.deleteEntity(this.mirrorEntityID);
				this.mirrorEntityID = null;
			}

			this.mirrorEntityID = Entities.addEntity(
				{
					type: "Image",
					name: "Mirror Reflection",
					imageURL: "resource://spectatorCameraFrame",
					emissive: true,
					parentID: this.entityID,
					alpha: 1,
					keepAspectRatio: false,
					localPosition: {
						x: 0,
						y: 0,
						z: 0.01, // offset to be infront
					},
					dimensions,
					localRotation: Quat.fromPitchYawRollDegrees(0, 0, 180),
					isVisibleInSecondaryCamera: false,
				} as Entities.EntityPropertiesImage,
				"local" as Entities.EntityHostType,
			);

			return this.mirrorEntityID;
		}

		turnOn() {
			if (this.running) return;

			const camera = Render.getConfig("SecondaryCamera") as any;
			//if (camera.attachedEntityId) return;

			this.running = true;
			camera.mirrorProjection = true;
			camera.attachedEntityId = this.entityID;
			camera.farClipPlaneDistance = this.farClip;

			const properties = Entities.getEntityProperties(this.entityID, [
				"dimensions",
			]) as Entities.EntityPropertiesModel;
			const resolution = this.calculateMirrorResolution(
				properties.dimensions,
			);
			camera.resetSizeSpectatorCamera(resolution.x, resolution.y);

			camera.enableSecondaryCameraRenderConfigs(true);
			this.createMirrorEntity(properties.dimensions);
		}

		turnOff() {
			if (!this.running) return;

			const camera = Render.getConfig("SecondaryCamera") as any;
			camera.enableSecondaryCameraRenderConfigs(false);
			camera.mirrorProjection = false;
			camera.attachedEntityId = null;
			//camera.farClipPlaneDistance = null;

			if (this.mirrorEntityID != null) {
				Entities.deleteEntity(this.mirrorEntityID);
				Entities.deleteEntity(this.mirrorEntityID);
				//this.mirrorEntityID = null;
			}

			this.running = false;
		}

		preload(entityID: Uuid) {
			this.entityID = entityID;

			try {
				const properties = Entities.getEntityProperties(entityID, [
					"userData",
				]);
				const userData = JSON.parse(properties.userData);

				if (typeof userData.resolution == "number")
					this.resolution = userData.resolution;

				if (typeof userData.farClip == "number")
					this.farClip = userData.farClip;
			} catch (err) {}

			const children = Entities.getChildrenIDs(this.entityID);
			if (children.length >= 1) {
				const child = Entities.getEntityProperties(children[0], [
					"position",
					"rotation",
					"dimensions",
				]) as Entities.EntityPropertiesZone;

				if (this.isInsideOfZone(MyAvatar.position, child)) {
					this.turnOn();
				}
			}
		}

		unload() {
			this.turnOff();
		}
	}

	return new MirrorReflection();
};
