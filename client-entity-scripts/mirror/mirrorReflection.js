/*

userdata
{
    "resolution": 1024,
    "farClip": 16
}

originally from
https://content.highfidelity.com/Experiences/Releases/usefulUtilities/mirror/2019-07-24_09-18-00/mirrorClient.js

*/
(function () {
    var MirrorReflection = /** @class */ (function () {
        function MirrorReflection() {
            this.entityID = null;
            this.mirrorEntityID = null;
            this.running = false;
            this.resolution = 1024;
            this.farClip = 16;
        }
        MirrorReflection.prototype.isInsideOfZone = function (position, zoneProperties) {
            var localPosition = Vec3.multiplyQbyV(Quat.inverse(zoneProperties.rotation), Vec3.subtract(position, zoneProperties.position));
            var halfDimensions = Vec3.multiply(zoneProperties.dimensions, 0.5);
            return (-halfDimensions.x <= localPosition.x &&
                halfDimensions.x >= localPosition.x &&
                -halfDimensions.y <= localPosition.y &&
                halfDimensions.y >= localPosition.y &&
                -halfDimensions.z <= localPosition.z &&
                halfDimensions.z >= localPosition.z);
        };
        MirrorReflection.prototype.calculateMirrorResolution = function (dimensions) {
            var mirrorResolutionX = 0;
            var mirrorResolutionY = 0;
            if (dimensions.x > dimensions.y) {
                mirrorResolutionX = this.resolution;
                mirrorResolutionY = Math.round((mirrorResolutionX * dimensions.y) / dimensions.x);
            }
            else {
                mirrorResolutionY = this.resolution;
                mirrorResolutionX = Math.round((mirrorResolutionY * dimensions.x) / dimensions.y);
            }
            var resolution = {
                x: mirrorResolutionX,
                y: mirrorResolutionY
            };
            return resolution;
        };
        MirrorReflection.prototype.createMirrorEntity = function (dimensions) {
            if (this.mirrorEntityID) {
                Entities.deleteEntity(this.mirrorEntityID);
                this.mirrorEntityID = null;
            }
            this.mirrorEntityID = Entities.addEntity({
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
                    z: 0.01
                },
                dimensions: dimensions,
                localRotation: Quat.fromPitchYawRollDegrees(0, 0, 180),
                isVisibleInSecondaryCamera: false
            }, "local");
            return this.mirrorEntityID;
        };
        MirrorReflection.prototype.turnOn = function () {
            if (this.running)
                return;
            var camera = Render.getConfig("SecondaryCamera");
            //if (camera.attachedEntityId) return;
            this.running = true;
            camera.mirrorProjection = true;
            camera.attachedEntityId = this.entityID;
            camera.farClipPlaneDistance = this.farClip;
            var properties = Entities.getEntityProperties(this.entityID, [
                "dimensions",
            ]);
            var resolution = this.calculateMirrorResolution(properties.dimensions);
            camera.resetSizeSpectatorCamera(resolution.x, resolution.y);
            camera.enableSecondaryCameraRenderConfigs(true);
            this.createMirrorEntity(properties.dimensions);
        };
        MirrorReflection.prototype.turnOff = function () {
            if (!this.running)
                return;
            var camera = Render.getConfig("SecondaryCamera");
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
        };
        MirrorReflection.prototype.preload = function (entityID) {
            this.entityID = entityID;
            try {
                var properties = Entities.getEntityProperties(entityID, [
                    "userData",
                ]);
                var userData = JSON.parse(properties.userData);
                if (typeof userData.resolution == "number")
                    this.resolution = userData.resolution;
                if (typeof userData.farClip == "number")
                    this.farClip = userData.farClip;
            }
            catch (err) { }
            var children = Entities.getChildrenIDs(this.entityID);
            if (children.length >= 1) {
                var child = Entities.getEntityProperties(children[0], [
                    "position",
                    "rotation",
                    "dimensions",
                ]);
                if (this.isInsideOfZone(MyAvatar.position, child)) {
                    this.turnOn();
                }
            }
        };
        MirrorReflection.prototype.unload = function () {
            this.turnOff();
        };
        return MirrorReflection;
    }());
    return new MirrorReflection();
});
