/*
box entity
- turn off visable
- add zone as child
- add userdata
{
	"videoID": "PP66CIzjOS8",
	"restartOnEnter": true,
	"controls": false, 
	"dpi": 5
}
- insert script url
*/

(()=>{
	class ZonedYoutubePlayer implements ClientEntityScript {
		entityID: Uuid = "";
		webEntityID: Uuid = "";
		zoneEntityID: Uuid = "";
		
		getZoneFromChildren(parentID: Uuid): Uuid|null {
			let childrenIDs = Entities.getChildrenIDs(parentID);
			for (let i in childrenIDs) {
				let childID = childrenIDs[i];
				let entity = Entities.getEntityProperties(childID, ["type"]);
				if (entity.type == "Zone") return childID; 
			}
			return null;
		}

		isInsideEntity(position: Vec3, entityID: Uuid): boolean {
			let entity = Entities.getEntityProperties(entityID, [
				"position", "rotation", "dimensions"
			]) as Entities.EntityPropertiesZone;

			let localPosition = Vec3.multiplyQbyV(
				Quat.inverse(entity.rotation), 
				Vec3.subtract(position, entity.position)
			);

			let halfDimensions = Vec3.multiply(entity.dimensions, 0.5);
			return (
				-halfDimensions.x <= localPosition.x &&
				 halfDimensions.x >= localPosition.x &&
				-halfDimensions.y <= localPosition.y &&
				 halfDimensions.y >= localPosition.y &&
				-halfDimensions.z <= localPosition.z &&
				 halfDimensions.z >= localPosition.z
			);
		}

		enable() {
			Entities.emitScriptEvent(this.webEntityID, this.entityID+",play");
		}

		disable() {
			Entities.emitScriptEvent(this.webEntityID, this.entityID+",pause");
		}
		
		enterEntity = (entityID: Uuid)=>{
			if (entityID != this.zoneEntityID) return;
			//console.log("enter")
			this.enable();
		}

		leaveEntity = (entityID: Uuid)=>{
			if (entityID != this.zoneEntityID) return;
			//console.log("leave")
			this.disable();
		}

		preload(entityID: Uuid) {
			this.entityID = entityID;
			let entity = Entities.getEntityProperties(entityID, [
				"userData", "position", "rotation", "dimensions"
			]) as Entities.EntityPropertiesBox;

			// check if zone is attached
			let zoneEntityID = this.getZoneFromChildren(entityID);
			if (zoneEntityID == null) return;
			this.zoneEntityID = zoneEntityID;

			// check if userdata is valid
			let userData;
			try { userData = JSON.parse(entity.userData); }
			catch(err) { userData = {}; }
			
			if (!userData.videoID) return;

			// create local web entity
			//let url = Script.resolvePath("player.html")+(
			let url = "http://127.0.0.1:8080/player.html"+(
				"?id="+entityID+
				"&videoID="+userData.videoID+
				((userData.controls)? "&controls=1": "")+
				((userData.restartOnEnter)? "&restartOnEnter=1": "")
			);

			this.webEntityID = Entities.addEntity({
				type: "Web",
				name: "Zoned Youtube Player",
				parentID: entityID,

				sourceUrl: url,
				maxFPS: 90,
				dpi: userData.dpi||5,
				position: entity.position,
				rotation: entity.rotation,
				dimensions: entity.dimensions,
				showKeyboardFocusHighlight: false,

			} as Entities.EntityPropertiesWeb, "local" as Entities.EntityHostType);

			// check if user is inside of zone
			Entities.enterEntity.connect(this.enterEntity);
			Entities.leaveEntity.connect(this.leaveEntity);
			// not useful because the web entity needs to load first
			if (this.isInsideEntity(MyAvatar.position, this.zoneEntityID)) {
				this.enable();
			}

			// if user leaves world
			let domainChanged = ()=>{
				Entities.deleteEntity(this.webEntityID);
			}

			Window.domainChanged.connect(domainChanged);
			Window.domainConnectionRefused.connect(domainChanged);
		}

		unload() {
			Entities.enterEntity.disconnect(this.enterEntity);
			Entities.leaveEntity.disconnect(this.leaveEntity);
			Entities.deleteEntity(this.webEntityID);
		}
	}

	return new ZonedYoutubePlayer();
})