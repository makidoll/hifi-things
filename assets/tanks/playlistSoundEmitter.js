/*
{
	"volume": 0.1,
	"randomize": true,
	"sounds": [
		"https://hifi.maki.cafe/client-scripts/makisThings/sounds/test/hairbrush01a.wav"
	]
}
*/

(function () {
	// https://github.com/Daplie/knuth-shuffle/blob/master/index.js
	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	var enableDebugging = false;

	function debug(msg) {
		if (enableDebugging) console.log(msg);
	}

	this.active = true;
	this.currentInjector = undefined;

	this.preload = function (entityID) {
		var _this = this;
		_this.active = true;

		var sounds = [];
		var entity = Entities.getEntityProperties(entityID, [
			"position",
			"userData",
		]);
		if (!entity.userData) return;
		var userData = JSON.parse(entity.userData);

		var prefix = userData.prefix || "";

		if (userData.sounds)
			if (userData.sounds.length > 0)
				userData.sounds.forEach(function (soundURL) {
					sounds.push(SoundCache.getSound(prefix + soundURL));
				});

		if (userData.randomize) sounds = shuffle(sounds);

		enableDebugging = userData.debug;

		function playSound(soundObject) {
			if (_this.active == false) return;
			debug("playing");

			_this.currentInjector = Audio.playSound(soundObject, {
				position: entity.position,
				volume: userData.volume,
				loop: false,
				//localOnly: true,
			});

			_this.currentInjector.finished.connect(function () {
				playNextSound();
			});
		}

		var currentSoundIndex = -1;
		function playNextSound() {
			debug("new song");

			if (currentSoundIndex >= sounds.length - 1) {
				currentSoundIndex = 0;
			} else {
				currentSoundIndex++;
			}

			var currentSound = sounds[currentSoundIndex];
			if (currentSound.downloaded) {
				debug("downloaded");
				playSound(currentSound);
			} else {
				debug("starting download");
				var interval = Script.setInterval(function () {
					if (currentSound.downloaded == false) return;

					debug("finished download");
					playSound(currentSound);

					Script.clearInterval(interval);
				}, 500);

				// currentSound.ready.connect(function() {
				// 	debug("finished download")
				// 	playSound(currentSound);
				// });
			}
		}

		playNextSound();
	};

	this.unload = function () {
		this.active = false;
		if (this.currentInjector != undefined)
			if (this.currentInjector.playing) this.currentInjector.stop();
	};
});
