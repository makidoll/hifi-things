(function() {
	// exampleUserData = {
	// 	volume: 0.1,
	//	randomize: true,
	// 	sounds: [
	// 		"sound1.wav", "sound2.wav", "sound3.wav"	
	// 	]
	// }

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
			if (!_this.active) return;
			_this.currentInjector = Audio.playSound(soundObject, {
				position: entity.position,
				volume: userData.volume,
				loop: false,
				localOnly: true,
			});

			_this.currentInjector.finished.connect(function() {
				playNextSound();
			});
		}
		
		var currentSoundIndex = 0;
		function playNextSound() {
			if (currentSoundIndex>=sounds.length-1) {
				currentSoundIndex = 0;
			} else {
				currentSoundIndex++;
			}

			var currentSound = sounds[currentSoundIndex];
			if (currentSound.downloaded) {
				playSound(currentSound);
			} else {
				currentSound.ready.connect(function() {
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
})
