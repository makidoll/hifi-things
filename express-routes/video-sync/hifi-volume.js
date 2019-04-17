(function() {
	var entityID;

	function webEventReceived(_entityID, message) {
		if (entityID!=_entityID) return;

		var params = message.split(" ");
		if (params[0]!="cat.maki.shaderScreen") return;

		switch (params[1]) {
			case "volume":
				Messages.sendLocalMessage("cat.maki.shaderScreen", "volume "+params[2]);
				break;
		}
	}

	this.preload = function(_entityID) {
		entityID = _entityID;
		Entities.webEventReceived.connect(webEventReceived);
	}

	this.unload = function() {
		Entities.webEventReceived.disconnect(webEventReceived);
	}
})