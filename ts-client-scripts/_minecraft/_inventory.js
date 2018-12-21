var EventHandler = (function () {
    function EventHandler() {
        this.connections = [];
    }
    EventHandler.prototype.connect = function (event, callback) {
        event.connect(callback);
        this.connections.push({
            event: event,
            callback: callback
        });
    };
    EventHandler.prototype.disconnectAll = function () {
        this.connections.forEach(function (con) {
            con.event.disconnect(con.callback);
        });
    };
    return EventHandler;
}());
var Inventory = (function () {
    function Inventory() {
        this.selectedIndex = 0;
        this.imageSizes = {
            inventory: { width: 546, height: 66 },
            selector: { width: 72, height: 72 }
        };
        this.overlayIDs = {
            inventory: Overlays.addOverlay("image", {
                x: Window.innerWidth / 2 - this.imageSizes.inventory.width / 2,
                y: this.imageSizes.inventory.height / 2,
                width: this.imageSizes.inventory.width,
                height: this.imageSizes.inventory.height,
                imageURL: Script.resolvePath("assets/inventory.png")
            }),
            selector: Overlays.addOverlay("image", {
                x: Window.innerWidth / 2 - this.imageSizes.selector.width / 2 + (this.selectedIndex - 4) * 60,
                y: this.imageSizes.selector.height / 2 - 6,
                width: this.imageSizes.selector.width,
                height: this.imageSizes.selector.height,
                imageURL: Script.resolvePath("assets/selector.png")
            })
        };
        this.events = new EventHandler();
        this.events.connect(Window.geometryChanged, this.geometryChanged.bind(this));
        this.events.connect(Overlays.mousePressOnOverlay, this.mousePressOnOverlay.bind(this));
    }
    Inventory.prototype.geometryChanged = function () {
        console.log(JSON.stringify(this));
        Overlays.editOverlay(this.overlayIDs.inventory, {
            x: Window.innerWidth / 2 - this.imageSizes.inventory.width / 2
        });
        Overlays.editOverlay(this.overlayIDs.selector, {
            x: Window.innerWidth / 2 - this.imageSizes.selector.width / 2 + (this.selectedIndex - 4) * 60
        });
    };
    Inventory.prototype.mousePressOnOverlay = function (overlayID, event) {
        switch (overlayID) {
            case this.overlayIDs.inventory:
                console.log(JSON.stringify(event.pos2D));
                break;
        }
    };
    Inventory.prototype.changeSelectedIndex = function (index) {
        this.selectedIndex = index;
        Overlays.editOverlay(this.overlayIDs.selector, {
            x: Window.innerWidth / 2 - this.imageSizes.selector.width / 2 + (this.selectedIndex - 4) * 60
        });
    };
    Inventory.prototype.unload = function () {
        var _this = this;
        this.events.disconnectAll();
        Object.keys(this.overlayIDs).forEach(function (key) {
            Overlays.deleteOverlay(_this.overlayIDs[key]);
        });
    };
    return Inventory;
}());
var inventory = new Inventory();
Script.scriptEnding.connect(function () {
    inventory.unload();
});
