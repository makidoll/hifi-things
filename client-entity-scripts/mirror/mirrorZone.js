(function () {
    var MirrorZone = /** @class */ (function () {
        function MirrorZone() {
            this.entityID = null;
            this.mirrorEntityID = null;
        }
        MirrorZone.prototype.preload = function (entityID) {
            this.entityID = entityID;
            this.mirrorEntityID = Entities.getEntityProperties(this.entityID, [
                "parentID",
            ]).parentID;
        };
        MirrorZone.prototype.enterEntity = function () {
            Entities.callEntityMethod(this.mirrorEntityID, "turnOn");
        };
        MirrorZone.prototype.leaveEntity = function () {
            Entities.callEntityMethod(this.mirrorEntityID, "turnOff");
        };
        return MirrorZone;
    }());
    return new MirrorZone();
});
