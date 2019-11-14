(()=>{
	class ForceFilmicInDomain implements ClientEntityScript {
		interval: Timer = {};
		previousCurve: number = -1;

		setCurve(i: number) {
			(Render.getConfig("RenderMainView.ToneMapping") as any)["curve"] = i;
		}

		getCurve() {
			return (Render.getConfig("RenderMainView.ToneMapping") as any)["curve"];
		}

		disable = ()=>{
			Script.clearInterval(this.interval);

			var foxEssentials = Settings.getValue("cat.maki.foxEssentials.enableFilmicToneMapping");
			if (foxEssentials != undefined) {
				this.setCurve(foxEssentials? 3: 1)
				return;
			}

			if (this.previousCurve == undefined) return;
			this.setCurve(this.previousCurve);
		}

		preload() {
			this.previousCurve = this.getCurve();

			this.setCurve(3);
			this.interval = Script.setInterval(()=>{
				if (this.getCurve() != 3)
					this.setCurve(3);
			}, 1000*10);

			Window.domainChanged.connect(this.disable);
		}

		unload() {
			this.disable();
		}
	}

	return new ForceFilmicInDomain();
});