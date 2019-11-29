/*
box entity
- dimensions 16,9,0 and resize
- turn off visible
- add zone as child
- add userdata
{
    "videoID": "PP66CIzjOS8",
    "restartOnEnter": true,
    "controls": false,
    "dpi": 5
}
- insert script url
*/
(function () {
    var ZonedYoutubePlayer = /** @class */ (function () {
        function ZonedYoutubePlayer() {
            var _this = this;
            this.entityID = "";
            this.webEntityID = "";
            this.zoneEntityID = "";
            this.enterEntity = function (entityID) {
                if (entityID != _this.zoneEntityID)
                    return;
                //console.log("enter")
                _this.enable();
            };
            this.leaveEntity = function (entityID) {
                if (entityID != _this.zoneEntityID)
                    return;
                //console.log("leave")
                _this.disable();
            };
        }
        ZonedYoutubePlayer.prototype.getZoneFromChildren = function (parentID) {
            var childrenIDs = Entities.getChildrenIDs(parentID);
            for (var i in childrenIDs) {
                var childID = childrenIDs[i];
                var entity = Entities.getEntityProperties(childID, ["type"]);
                if (entity.type == "Zone")
                    return childID;
            }
            return null;
        };
        ZonedYoutubePlayer.prototype.isInsideEntity = function (position, entityID) {
            var entity = Entities.getEntityProperties(entityID, [
                "position", "rotation", "dimensions"
            ]);
            var localPosition = Vec3.multiplyQbyV(Quat.inverse(entity.rotation), Vec3.subtract(position, entity.position));
            var halfDimensions = Vec3.multiply(entity.dimensions, 0.5);
            return (-halfDimensions.x <= localPosition.x &&
                halfDimensions.x >= localPosition.x &&
                -halfDimensions.y <= localPosition.y &&
                halfDimensions.y >= localPosition.y &&
                -halfDimensions.z <= localPosition.z &&
                halfDimensions.z >= localPosition.z);
        };
        ZonedYoutubePlayer.prototype.enable = function () {
            Entities.emitScriptEvent(this.webEntityID, this.entityID + ",play");
        };
        ZonedYoutubePlayer.prototype.disable = function () {
            Entities.emitScriptEvent(this.webEntityID, this.entityID + ",pause");
        };
        ZonedYoutubePlayer.prototype.preload = function (entityID) {
            var _this = this;
            this.entityID = entityID;
            var entity = Entities.getEntityProperties(entityID, [
                "userData", "position", "rotation", "dimensions"
            ]);
            // check if zone is attached
            var zoneEntityID = this.getZoneFromChildren(entityID);
            if (zoneEntityID == null)
                return;
            this.zoneEntityID = zoneEntityID;
            // check if userdata is valid
            var userData;
            try {
                userData = JSON.parse(entity.userData);
            }
            catch (err) {
                userData = {};
            }
            if (!userData.videoID)
                return;
            // create local web entity
            var url = Script.resolvePath("player.html") + (
            //let url = "http://127.0.0.1:8080/player.html"+(
            "?id=" + entityID +
                "&videoID=" + userData.videoID +
                ((userData.controls) ? "&controls=1" : "") +
                ((userData.restartOnEnter) ? "&restartOnEnter=1" : ""));
            this.webEntityID = Entities.addEntity({
                type: "Web",
                name: "Zoned Youtube Player",
                parentID: entityID,
                sourceUrl: url,
                maxFPS: 90,
                dpi: userData.dpi || 5,
                position: entity.position,
                rotation: entity.rotation,
                dimensions: entity.dimensions,
                showKeyboardFocusHighlight: false
            }, "local");
            // check if user is inside of zone
            Entities.enterEntity.connect(this.enterEntity);
            Entities.leaveEntity.connect(this.leaveEntity);
            // not useful because the web entity needs to load first
            if (this.isInsideEntity(MyAvatar.position, this.zoneEntityID)) {
                this.enable();
            }
            // if user leaves world
            var domainChanged = function () {
                Entities.deleteEntity(_this.webEntityID);
            };
            Window.domainChanged.connect(domainChanged);
            Window.domainConnectionRefused.connect(domainChanged);
        };
        ZonedYoutubePlayer.prototype.unload = function () {
            Entities.enterEntity.disconnect(this.enterEntity);
            Entities.leaveEntity.disconnect(this.leaveEntity);
            Entities.deleteEntity(this.webEntityID);
        };
        return ZonedYoutubePlayer;
    }());
    return new ZonedYoutubePlayer();
});
