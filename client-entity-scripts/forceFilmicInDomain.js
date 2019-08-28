"use strict";
(function () {
    var ForceFilmicInDomain = /** @class */ (function () {
        function ForceFilmicInDomain() {
            this.interval = {};
            this.previousCurve = -1;
        }
        ForceFilmicInDomain.prototype.setCurve = function (i) {
            Render.getConfig("RenderMainView.ToneMapping")["curve"] = i;
        };
        ForceFilmicInDomain.prototype.getCurve = function () {
            return Render.getConfig("RenderMainView.ToneMapping")["curve"];
        };
        ForceFilmicInDomain.prototype.disable = function () {
            Script.clearInterval(this.interval);
            var foxEssentials = Settings.getValue("cat.maki.foxEssentials.enableFilmicToneMapping");
            if (foxEssentials != undefined) {
                this.setCurve(foxEssentials ? 3 : 1);
                return;
            }
            if (this.previousCurve == undefined)
                return;
            this.setCurve(this.previousCurve);
        };
        ForceFilmicInDomain.prototype.preload = function () {
            var _this = this;
            this.previousCurve = this.getCurve();
            this.setCurve(3);
            this.interval = Script.setInterval(function () {
                if (_this.getCurve() != 3)
                    _this.setCurve(3);
            }, 1000 * 10);
            Window.domainChanged.connect(this.disable);
        };
        ForceFilmicInDomain.prototype.unload = function () {
            this.disable();
        };
        return ForceFilmicInDomain;
    }());
    return new ForceFilmicInDomain();
});
