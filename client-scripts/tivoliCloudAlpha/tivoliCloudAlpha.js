"use strict";
var TivoliCloud = /** @class */ (function () {
    function TivoliCloud() {
        var _this = this;
        this.tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
        this.button = null;
        this.clicked = function () {
            _this.tablet.gotoWebScreen("https://alpha.tivolicloud.com");
        };
        this.load();
        Script.scriptEnding.connect(function () {
            _this.unload();
        });
    }
    TivoliCloud.prototype.load = function () {
        this.button = this.tablet.addButton({
            //icon: 'data:image/svg;xml,<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24"><path d="M14 6v15H3v-2h2V3h9v1h5v15h2v2h-4V6h-3zm-4 5v2h2v-2h-2z"/></svg>',
            text: "Tivoli Cloud",
            sortOrder: 1
        });
        this.button.clicked.connect(this.clicked);
    };
    TivoliCloud.prototype.unload = function () {
        this.button.clicked.disconnect(this.clicked);
        this.tablet.removeButton(this.button);
    };
    return TivoliCloud;
}());
new TivoliCloud();
