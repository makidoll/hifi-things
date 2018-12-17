var ConnectionHandler = (function () {
    function ConnectionHandler() {
    }
    ConnectionHandler.prototype.connect = function (con, fun) {
        con.connect(fun);
        this.connections.push({
            con: con, fun: fun
        });
    };
    ConnectionHandler.prototype.disconnectAll = function () {
        this.connections.forEach(function (connection) {
            connection.con.disconnect(connection.fun);
        });
    };
    return ConnectionHandler;
}());
var Inventory = (function () {
    function Inventory() {
        this.imageSizes = {
            inventory: { width: 546, height: 66 },
            selector: { width: 72, height: 72 }
        };
        this.selectedIndex = 0;
        this.overlays = {
            inventory: Overlays.addOverlay("image", {
                x: Window.innerWidth / 2 - this.imageSizes.inventory.width / 2,
                y: this.imageSizes.inventory.height / 2,
                width: this.imageSizes.inventory.width,
                height: this.imageSizes.inventory.height,
                imageURL: "file:///D:/Git/hifi-stuff/client-scripts/minecraftHifi/assets/inventory.png"
            }),
            selector: Overlays.addOverlay("image", {
                x: Window.innerWidth / 2 - this.imageSizes.selector.width / 2 + (this.selectedIndex - 4) * 60,
                y: this.imageSizes.selector.height / 2 - 6,
                width: this.imageSizes.selector.width,
                height: this.imageSizes.selector.height,
                imageURL: "file:///D:/Git/hifi-stuff/client-scripts/minecraftHifi/assets/selector.png"
            })
        };
    }
    Inventory.prototype.changeSelectedIndex = function (index) {
        this.selectedIndex = index;
        Overlays.editOverlay(this.overlays.selector, {
            x: Window.innerWidth / 2 - this.imageSizes.selector.width / 2 + (this.selectedIndex - 4) * 60
        });
    };
    Inventory.prototype.geometryChanged = function () {
        Overlays.editOverlay(this.overlays.inventory, {
            x: Window.innerWidth / 2 - this.imageSizes.inventory.width / 2
        });
        Overlays.editOverlay(this.overlays.selector, {
            x: Window.innerWidth / 2 - this.imageSizes.selector.width / 2 + (this.selectedIndex - 4) * 60
        });
    };
    Inventory.prototype.unload = function () {
        var _this = this;
        Object.keys(this.overlays).forEach(function (key) {
            Overlays.deleteOverlay(_this.overlays[key]);
        });
    };
    return Inventory;
}());
var inventory = new Inventory();
var cons = new ConnectionHandler();
cons.connect(Window.geometryChanged, function () {
    inventory.geometryChanged();
});
Script.scriptEnding.connect(function () {
    cons.disconnectAll();
    inventory.unload();
});
console.log("test");
