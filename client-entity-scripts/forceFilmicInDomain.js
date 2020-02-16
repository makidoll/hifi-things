(function () {
    var ForceFilmicInDomain = /** @class */ (function () {
        function ForceFilmicInDomain() {
            var _this = this;
            this.disable = function () {
                Script.clearInterval(_this.interval);
                var foxEssentials = Settings.getValue("cat.maki.foxEssentials.enableFilmicToneMapping");
                if (foxEssentials != null)
                    return _this.setCurve(foxEssentials ? 3 : 1);
                //if (this.previousCurve != null)
                //	return this.setCurve(this.previousCurve);
                _this.setCurve(1);
            };
        }
        //previousCurve: ToneMappingCurve;
        ForceFilmicInDomain.prototype.setCurve = function (c) {
            Render.getConfig("RenderMainView.ToneMapping")["curve"] = c;
        };
        ForceFilmicInDomain.prototype.getCurve = function () {
            return Render.getConfig("RenderMainView.ToneMapping")["curve"];
        };
        ForceFilmicInDomain.prototype.preload = function () {
            //this.previousCurve = this.getCurve();
            var _this = this;
            this.setCurve(3); // filmic
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
