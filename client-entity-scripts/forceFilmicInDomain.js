"use strict";
(function () {
    var ForceFilmicInDomain = /** @class */ (function () {
        function ForceFilmicInDomain() {
            var _this = this;
            this.interval = {};
            this.previousCurve = -1;
            this.disable = function () {
                Script.clearInterval(_this.interval);
                var foxEssentials = Settings.getValue("cat.maki.foxEssentials.enableFilmicToneMapping");
                if (foxEssentials != undefined) {
                    _this.setCurve(foxEssentials ? 3 : 1);
                    return;
                }
                if (_this.previousCurve == undefined)
                    return;
                _this.setCurve(_this.previousCurve);
            };
        }
        ForceFilmicInDomain.prototype.setCurve = function (i) {
            Render.getConfig("RenderMainView.ToneMapping")["curve"] = i;
        };
        ForceFilmicInDomain.prototype.getCurve = function () {
            return Render.getConfig("RenderMainView.ToneMapping")["curve"];
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
