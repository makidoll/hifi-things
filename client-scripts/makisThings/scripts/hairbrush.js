(function() {

	var entityID = undefined;
	var assetsURL = "https://raw.githubusercontent.com/makitsune/hifi-stuff/master/client-scripts/makisThings/";

	this.preload = function(theEntityID) { entityID = theEntityID; }

	var sounds = [
		[SoundCache.getSound(assetsURL+"sounds/hairbrush01a.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush01b.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush01c.wav")],
		[SoundCache.getSound(assetsURL+"sounds/hairbrush02a.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush02b.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush02c.wav")],
		[SoundCache.getSound(assetsURL+"sounds/hairbrush03a.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush03b.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush03c.wav")],
		[SoundCache.getSound(assetsURL+"sounds/hairbrush04a.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush04b.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush04c.wav")],
		[SoundCache.getSound(assetsURL+"sounds/hairbrush05a.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush05b.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush05c.wav")],
		[SoundCache.getSound(assetsURL+"sounds/hairbrush06a.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush06b.wav"),SoundCache.getSound(assetsURL+"sounds/hairbrush06c.wav")],
	];

	var brushing = false;
	var selectedSound = undefined;
	var midAudioInjector = undefined;

	function startBrushing() {
		selectedSound = sounds[Math.floor(Math.random()*sounds.length)];

		var start = Audio.playSound(selectedSound[0], {
			position: Entities.getEntityProperties(entityID, ["position"]).position,
			volume: 1,
			localOnly: false,
		});

		start.finished.connect(function() {
			if (!brushing) return;
			midAudioInjector = Audio.playSound(selectedSound[1], {
				position: Entities.getEntityProperties(entityID, ["position"]).position,
				volume: 1,
				localOnly: false,
				loop: true,
			});
		});
	}

	function stopBrushing() {
		if (midAudioInjector)
			if (midAudioInjector.isPlaying)
				midAudioInjector.stop();

		Audio.playSound(selectedSound[2], {
			position: Entities.getEntityProperties(entityID, ["position"]).position,
			volume: 1,
			localOnly: false,
		});
	}

	this.inputEvent = function(action, value) {
		if (action != Controller.Standard.RTClick) return;

		brushing = !brushing;
		if (brushing) {
			startBrushing();
		} else {
			stopBrushing();
		}
	}

	this.startNearGrab = function() {
		Controller.inputEvent.connect(this.inputEvent);
	}

	this.releaseGrab = function() {
		Controller.inputEvent.disconnect(this.inputEvent);

		brushing = false;
		if (midAudioInjector)
			if (midAudioInjector.isPlaying)
				midAudioInjector.stop();
	}
})