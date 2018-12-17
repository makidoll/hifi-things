/// <reference path="ConnectionHandler.ts" />

class Inventory {
	private overlays: {[key: string]: Uuid}; 
	private imageSizes: {[key: string]: {width: number, height: number}} = {
		inventory: { width: 546, height: 66},
		selector: { width:  72, height: 72},
	};
	selectedIndex: number = 0;

	constructor() {
		this.overlays = {
			inventory: Overlays.addOverlay("image", {
				x: Window.innerWidth/2 - this.imageSizes.inventory.width/2,
				y: this.imageSizes.inventory.height/2,
				width: this.imageSizes.inventory.width,
				height: this.imageSizes.inventory.height,
				imageURL: "file:///C:/Users/Maki/Desktop/minecraft-hifi/assets/inventory.png",
			}),
			selector: Overlays.addOverlay("image", {
				x: Window.innerWidth/2 - this.imageSizes.selector.width/2 + (this.selectedIndex-4)*60,
				y: this.imageSizes.selector.height/2 - 6,
				width: this.imageSizes.selector.width,
				height: this.imageSizes.selector.height,
				imageURL: "file:///C:/Users/Maki/Desktop/minecraft-hifi/assets/selector.png",
			})
		}
	}

	changeSelectedIndex(index: number) {
		this.selectedIndex = index;

		Overlays.editOverlay(this.overlays.selector, {
			x: Window.innerWidth/2 - this.imageSizes.selector.width/2 + (this.selectedIndex-4)*60,
		});
	}

	geometryChanged() {
		Overlays.editOverlay(this.overlays.inventory, {
			x: Window.innerWidth/2 - this.imageSizes.inventory.width/2,
		});
		Overlays.editOverlay(this.overlays.selector, {
			x: Window.innerWidth/2 - this.imageSizes.selector.width/2 + (this.selectedIndex-4)*60,
		});
	}

	unload() {
		Object.keys(this.overlays).forEach(key=>{
			Overlays.deleteOverlay(this.overlays[key]);
		});
	}
}

let inventory = new Inventory();
let cons = new ConnectionHandler();

cons.connect(Window.geometryChanged, ()=>{
	inventory.geometryChanged();
})

Script.scriptEnding.connect(()=>{
	cons.disconnectAll();
	inventory.unload();
});