declare namespace Audio {
	var muted: boolean;
	var mutedDesktop: boolean;
	var mutedHMD: boolean;
	var warnWhenMuted: boolean;
	var noiseReduction: boolean;
	var inputVolume: number;
	var inputLevel: number;
	var clipping: boolean;
	var context: string;
	var pushToTalk: boolean;
	var pushToTalkDesktop: boolean;
	var pushToTalkHMD: boolean;
	var pushingToTalk: boolean;
	var avatarGain: number;
	var localInjectorGain: number;
	var serverInjectorGain: number;
	var systemInjectorGain: number;
	var pusingToTalkOutputGainDesktop: number;
	var isStereoInput: boolean;
	var isSoloing: boolean;
	var soloList: Uuid[];

	function playSound(
		sound: SoundObject,
		injectorOptions: AudioInjectorOptions
	): AudioInjector;
}