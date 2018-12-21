/// <reference path="EventHandler.ts" />

class Inventory {
	private events: EventHandler;
	private overlayIDs: {[key: string]: Uuid}; 
	private imageSizes: {[key: string]: {width: number, height: number}};
	selectedIndex: number = 0;

	constructor() {
		this.imageSizes = {
			inventory: { width: 546, height: 66},
			selector: { width:  72, height: 72},
		};

		this.overlayIDs = {
			inventory: Overlays.addOverlay("image", {
				x: Window.innerWidth/2 - this.imageSizes.inventory.width/2,
				y: this.imageSizes.inventory.height/2,
				width: this.imageSizes.inventory.width,
				height: this.imageSizes.inventory.height,
				imageURL: Script.resolvePath("assets/inventory.png"),
			}),
			selector: Overlays.addOverlay("image", {
				x: Window.innerWidth/2 - this.imageSizes.selector.width/2 + (this.selectedIndex-4)*60,
				y: this.imageSizes.selector.height/2 - 6,
				width: this.imageSizes.selector.width,
				height: this.imageSizes.selector.height,
				imageURL: Script.resolvePath("assets/selector.png"),
			})
		};

		this.events = new EventHandler();
		this.events.connect(Window.geometryChanged, this.geometryChanged.bind(this));
		this.events.connect(Overlays.mousePressOnOverlay, this.mousePressOnOverlay.bind(this));
	}

	private geometryChanged() {
		console.log(JSON.stringify(this));

		Overlays.editOverlay(this.overlayIDs.inventory, {
			x: Window.innerWidth/2 - this.imageSizes.inventory.width/2,
		});
		Overlays.editOverlay(this.overlayIDs.selector, {
			x: Window.innerWidth/2 - this.imageSizes.selector.width/2 + (this.selectedIndex-4)*60,
		});
	}

	private mousePressOnOverlay(overlayID, event) {
		switch (overlayID) {
			case this.overlayIDs.inventory:
				console.log(JSON.stringify(event.pos2D));

			break;
		}
	}

	changeSelectedIndex(index: number) {
		this.selectedIndex = index;

		Overlays.editOverlay(this.overlayIDs.selector, {
			x: Window.innerWidth/2 - this.imageSizes.selector.width/2 + (this.selectedIndex-4)*60,
		});
	}

	unload() {
		this.events.disconnectAll();

		Object.keys(this.overlayIDs).forEach(key=>{
			Overlays.deleteOverlay(this.overlayIDs[key]);
		});
	}
}

let inventory = new Inventory();
Script.scriptEnding.connect(()=>{
	inventory.unload();
});