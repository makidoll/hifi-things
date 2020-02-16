(function () {
    var Camera = /** @class */ (function () {
        function Camera() {
            this.active = false;
        }
        Camera.prototype.preload = function (entityId) {
            var entity = Entities.getEntityProperties(entityId);
            //const { rotation, dimensions, position } = entity;
            var userData = null;
            try {
                userData = JSON.parse(entity.userData);
            }
            catch (err) {
                return;
            }
            if (typeof userData.resolution != "number")
                return;
            if (typeof userData.fov != "number")
                return;
            //Render.getConfig("SecondaryCameraJob.ToneMapping").curve = 0;
            Render.getConfig("SecondaryCamera").farClipPlaneDistance = 10000;
            Render.getConfig("SecondaryCamera").attachedEntityId = entityId;
            Render.getConfig("SecondaryCamera").vFoV = userData.fov;
            Render.getConfig("SecondaryCamera").resetSizeSpectatorCamera(entity.dimensions.x * userData.resolution * 16, entity.dimensions.y * userData.resolution * 16);
            Render.getConfig("SecondaryCamera").enableSecondaryCameraRenderConfigs(true);
            this.active = true;
        };
        Camera.prototype.unload = function () {
            if (!this.active)
                return;
            Render.getConfig("SecondaryCamera").enableSecondaryCameraRenderConfigs(false);
        };
        return Camera;
    }());
    return new Camera();
});
