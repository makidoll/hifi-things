/*
{
	"volume": 0.5,
	"pitch": 1,
	"randomize": false,
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

	var active = true;
	var currentInjector = null;

	var debug = false;
	var volume = 0.5;
	var pitch = 1;
	var sounds = [];

	function log(msg) {
		if (debug) console.log(msg);
	}

	this.preload = function (entityID) {
		var entity = Entities.getEntityProperties(entityID, [
			"position",
			"userData",
		]);

		var userData = {};
		try {
			userData = JSON.parse(entity.userData);
		} catch (err) {}

		if (
			Array.isArray(userData.sounds) == false &&
			userData.sounds.length == 0
		) {
			return;
		}

		if (typeof userData.debug == "boolean") debug = userData.debug;
		if (typeof userData.volume == "number") volume = userData.volume;
		if (typeof userData.pitch == "number") pitch = userData.pitch;

		userData.sounds.forEach(function (soundURL) {
			sounds.push(SoundCache.getSound(soundURL));
		});

		if (userData.randomize == true) sounds = shuffle(sounds);

		function playSound(soundObject) {
			if (active == false) return;
			log("playing");

			currentInjector = Audio.playSound(soundObject, {
				position: entity.position,
				volume: volume,
				pitch: pitch,
				loop: sounds.length == 1,
				localOnly: Script.context != "entity_server",
			});

			currentInjector.finished.connect(function () {
				playNextSound();
			});
		}

		var currentSoundIndex = -1;
		function playNextSound() {
			log("new song");

			if (currentSoundIndex >= sounds.length - 1) {
				currentSoundIndex = 0;
			} else {
				currentSoundIndex++;
			}

			var currentSound = sounds[currentSoundIndex];
			if (currentSound.downloaded) {
				log("downloaded");
				playSound(currentSound);
			} else {
				log("starting download");
				var interval = Script.setInterval(function () {
					if (currentSound.downloaded == false) return;

					log("finished download");
					playSound(currentSound);

					Script.clearInterval(interval);
				}, 500);

				// currentSound.ready.connect(function () {
				// 	log("finished download");
				// 	playSound(currentSound);
				// });
			}
		}

		playNextSound();
	};

	this.unload = function () {
		active = false;
		if (currentInjector != null) {
			if (currentInjector.playing) currentInjector.stop();
		}
	};
});
