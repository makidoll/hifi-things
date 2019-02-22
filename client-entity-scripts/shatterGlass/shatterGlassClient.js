(function() {
	this.enterEntity = function (entityID) {
		console.log("shattered")
		Messages.sendMessage("cat.maki.shatterGlass", entityID);
	}
})