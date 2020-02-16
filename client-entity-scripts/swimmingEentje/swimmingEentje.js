(function () {
    var SwimmingEentje = /** @class */ (function () {
        function SwimmingEentje() {
            var _this = this;
            this.t = 0;
            this.update = function () {
                Entities.editEntity(_this.entityId, {
                    position: {
                        x: _this.previousPos.x,
                        y: Math.sin(_this.t * 0.1) * 0.1 + _this.previousPos.y,
                        z: _this.previousPos.z
                    },
                    rotation: Quat.fromPitchYawRollDegrees(0, -(_this.t * 0.5) % 360, 0)
                });
                _this.t++;
            };
        }
        SwimmingEentje.prototype.preload = function (entityId) {
            this.entityId = entityId;
            this.previousPos = Entities.getEntityProperties(entityId, [
                "position",
            ]).position;
            this.pivotPos = Vec3.subtract(this.previousPos, {
                x: -1,
                y: 0,
                z: 0
            });
            Script.update.connect(this.update);
        };
        SwimmingEentje.prototype.unload = function () {
            Script.update.disconnect(this.update);
            Entities.editEntity(this.entityId, {
                position: this.previousPos
            });
        };
        return SwimmingEentje;
    }());
    return new SwimmingEentje();
});
