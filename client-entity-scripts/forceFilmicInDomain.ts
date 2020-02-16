() => {
	type ToneMappingCurve = 3 | 1; // filmic | srgb

	class ForceFilmicInDomain implements ClientEntityScript {
		interval: Timer;
		//previousCurve: ToneMappingCurve;

		setCurve(c: ToneMappingCurve) {
			Render.getConfig("RenderMainView.ToneMapping")["curve"] = c;
		}

		getCurve(): ToneMappingCurve {
			return Render.getConfig("RenderMainView.ToneMapping")["curve"];
		}

		preload() {
			//this.previousCurve = this.getCurve();

			this.setCurve(3); // filmic
			this.interval = Script.setInterval(() => {
				if (this.getCurve() != 3) this.setCurve(3);
			}, 1000 * 10);

			Window.domainChanged.connect(this.disable);
		}

		disable = () => {
			Script.clearInterval(this.interval);

			let foxEssentials = Settings.getValue(
				"cat.maki.foxEssentials.enableFilmicToneMapping",
			);
			if (foxEssentials != null)
				return this.setCurve(foxEssentials ? 3 : 1);

			//if (this.previousCurve != null)
			//	return this.setCurve(this.previousCurve);

			this.setCurve(1);
		};

		unload() {
			this.disable();
		}
	}

	return new ForceFilmicInDomain();
};
