(function() {
	var interval = undefined;
	var previousCurve = undefined;
	
	this.disable = function() {
		Script.clearInterval(interval);

		var foxEssentials = Settings.getValue("cat.maki.foxEssentials.enableFilmicToneMapping");
		if (foxEssentials != undefined) {
			Render.getConfig("RenderMainView.ToneMapping")["curve"] = (foxEssentials)? 3: 1;
			return;
		}

		if (previousCurve == undefined) return;
		Render.getConfig("RenderMainView.ToneMapping")["curve"] = previousCurve;
	}

	this.preload = function() {
		previousCurve = Render.getConfig("RenderMainView.ToneMapping")["curve"];

		Render.getConfig("RenderMainView.ToneMapping")["curve"] = 3;
		interval = Script.setInterval(function() {
			if (Render.getConfig("RenderMainView.ToneMapping")["curve"] != 3)
				Render.getConfig("RenderMainView.ToneMapping")["curve"] = 3;
		}, 1000*10);

		Window.domainChanged.connect(this.disable);
	}

	this.unload = this.disable;
})