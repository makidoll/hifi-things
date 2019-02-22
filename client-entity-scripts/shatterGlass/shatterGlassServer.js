(function() {
	var entityID = undefined;
	var shattering = false;

	function messageReceived(chan, msg) {
		if (!entityID) return;
		if (shattering) return;
		if (chan != "cat.maki.shatterGlass") return;
		if (msg != entityID) return;

		shattering = true;
		Entities.editEntity(entityID, {
			visible: false
		});


		
		

		Script.setTimeout(function() {
			shattering = false;
			Entities.editEntity(entityID, {
				visible: true
			});
		}, 1000*10);
	}

	this.preload = function(_entityID) {
		entityID = _entityID;
		Messages.subscribe("cat.maki.shatterGlass");
		Messages.messageReceived.connect(messageReceived);
	}

	this.unload = function() {
		Messages.unsubscribe("cat.maki.shatterGlass");
		Messages.messageReceived.disconnect(messageReceived);
	}
});