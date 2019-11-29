/*
{
    "url": "https://google.com"
}
*/
(function () {
    var OpenURL = /** @class */ (function () {
        function OpenURL() {
            this.entityID = "";
        }
        OpenURL.prototype.preload = function (entityID) {
            this.entityID = entityID;
        };
        OpenURL.prototype.openURL = function () {
            var entity = Entities.getEntityProperties(this.entityID, ["userData"]);
            var userData;
            try {
                userData = JSON.parse(entity.userData);
            }
            catch (err) {
                return;
            }
            if (userData.url != undefined)
                Window.openURL(userData.url);
        };
        OpenURL.prototype.startNearTrigger = function () {
            this.openURL();
        };
        OpenURL.prototype.clickDownOnEntity = function (_, event) {
            if (event.button != "Primary")
                return;
            this.openURL();
        };
        return OpenURL;
    }());
});
