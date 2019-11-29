(function () {
    var ForceGoodGraphics = /** @class */ (function () {
        function ForceGoodGraphics() {
        }
        ForceGoodGraphics.prototype.setHighRefreshRate = function () {
            Performance.setRefreshRateProfile(
            // ECO,INTERACTIVE,REALTIME
            Performance.getRefreshRateProfileNames().indexOf("REALTIME"));
        };
        ForceGoodGraphics.prototype.setHighPerformance = function () {
            Performance.setPerformancePreset(
            // UNKNOWN,LOW,MID,HIGH
            Performance.getPerformancePresetNames().indexOf("HIGH"));
        };
        ForceGoodGraphics.prototype.setProperLOD = function () {
            //LODManager.setAutomaticLODAdjust(false);
            //LODManager.setOctreeSizeScale(65536000);
            //LODManager.setAutomaticLODAdjust(true);
        };
        ForceGoodGraphics.prototype.preload = function () {
            this.setHighRefreshRate();
            this.setHighPerformance();
        };
        return ForceGoodGraphics;
    }());
    return new ForceGoodGraphics();
});
