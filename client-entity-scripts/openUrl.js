/*
{
	"url": "https://google.com"
}
*/

(function() {
	this.entityID;

	this.preload = function(_entityID) {
		this.entityID = _entityID;
	}

	this.openUrl = function() {
		var entity = Entities.getEntityProperties(this.entityID, ["userData"]);
		try { var userData = JSON.parse(entity.userData);
		} catch(err) { return; }

		if (userData.url!=undefined) Window.openUrl(userData.url);
	}

	this.startNearTrigger = function() { this.openUrl(); }
	this.clickDownOnEntity = function(e) {
		if (e.button != "Primary") return;
		this.openUrl();
	}
})