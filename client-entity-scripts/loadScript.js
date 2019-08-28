"use strict";
/*
- Enable triggerable
- Enter in userData

{
    "script": "https://example.com/myScript.js"
}
*/
(function () {
    var LoadScript = /** @class */ (function () {
        function LoadScript() {
            this.entityID = "";
        }
        LoadScript.prototype.preload = function (entityID) {
            this.entityID = entityID;
        };
        LoadScript.prototype.loadScript = function () {
            var entity = Entities.getEntityProperties(this.entityID, ["userData"]);
            var userData;
            try {
                userData = JSON.parse(entity.userData);
            }
            catch (err) {
                return;
            }
            if (!userData.script)
                return;
            // let tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
            // tablet.gotoWebScreen(userData.script);
            // setTimeout(()=>{
            // 	tablet.gotoHomeScreen();
            // }, 1000);
            var confirm = Window.confirm("Would you like to load the script:\n\"" + userData.script + "\"");
            if (confirm) {
                var runningScripts = ScriptDiscoveryService.getRunning();
                for (var i in runningScripts) {
                    if (runningScripts[i].url == userData.script) {
                        Window.alert("\"" + runningScripts[i].name + "\" has already been loaded!");
                        return;
                    }
                }
                ScriptDiscoveryService.loadScript(userData.script);
            }
        };
        LoadScript.prototype.startNearTrigger = function () {
            this.loadScript();
        };
        ;
        LoadScript.prototype.startFarTrigger = function () {
            this.loadScript();
        };
        ;
        LoadScript.prototype.clickDownOnEntity = function (entityID, mouseEvent) {
            if (mouseEvent.isLeftButton)
                this.loadScript();
        };
        return LoadScript;
    }());
    return new LoadScript();
});
