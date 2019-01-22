/*
{
	"volume": 0.1,
	"randomize": true,
	"sounds": [
		"https://hifi.maki.cat/client-scripts/makisThings/sounds/test/hairbrush01a.wav"
	]
}
*/

(function() {
	function PlaylistSoundEmitter() {
		// https://github.com/Daplie/knuth-shuffle/blob/master/index.js
		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			return array;
		}

		function debug(msg) {
			if (false) console.log(msg);
		}

		this.active = true;
		this.currentInjector = undefined;

		this.preload = function(entityID) {
			var _this = this;

			var sounds = [];
			var entity = Entities.getEntityProperties(entityID, ["position", "userData"]); 
			if (!entity.userData) return;
			var userData = JSON.parse(entity.userData);

			if (userData.sounds)
				if (userData.sounds.length>0)
					userData.sounds.forEach(function(soundURL) {
						sounds.push(SoundCache.getSound(soundURL));
					});

			if (userData.randomize)
				sounds = shuffle(sounds);

			function playSound(soundObject) {
				debug("playing");

				if (!_this.active) return;
				_this.currentInjector = Audio.playSound(soundObject, {
					position: entity.position,
					volume: userData.volume,
					loop: false,
					//localOnly: true,
				});

				_this.currentInjector.finished.connect(function() {
					playNextSound();
				});
			}
			
			var currentSoundIndex = -1;
			function playNextSound() {
				debug("new song")

				if (currentSoundIndex>=sounds.length-1) {
					currentSoundIndex = 0;
				} else {
					currentSoundIndex++;
				}

				var currentSound = sounds[currentSoundIndex];
				if (currentSound.downloaded) {
					debug("downloaded")
					playSound(currentSound);
				} else {
					debug("starting download")
					currentSound.ready.connect(function() {
						debug("finished download")
						playSound(currentSound);
					});
				}
			}

			playNextSound();
		}

		this.unload = function() {
			this.active = false;
			if (this.currentInjector)
				if (this.currentInjector.playing)
					this.currentInjector.stop();
		}
	}

	var entityID = undefined;
	this.preload = function(_entityID) {
		entityID = _entityID;
	}

	var playlistSoundEmitter = undefined;

	this.enterEntity = function() {
		if (!entityID) return;
		playlistSoundEmitter = new PlaylistSoundEmitter();
		playlistSoundEmitter.preload(entityID);
	}

	this.leaveEntity = function() {
		playlistSoundEmitter.unload();
		playlistSoundEmitter = undefined;
	}

	this.unload = function() {
		if (!playlistSoundEmitter) return;
		playlistSoundEmitter.unload;
	}
})
