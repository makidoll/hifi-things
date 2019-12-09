declare namespace Audio {
	// properties
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

	// methods
	function addToSoloList(ids: Uuid[]): void;
	function getAvatarGain(): number;
	function getInjectorGain(): number;
	function getLocalEcho(): boolean;
	function getLocalInjectorGain(): number;
	function getPushingToTalkOutputGainDesktop(): number;
	function getRecording(): boolean;
	function getServerEcho(): boolean;
	function getSystemInjectorGain(): number;
	//function isStereoInput(): boolean;
	function playSound(sound: SoundObject, injectorOptions: AudioInjectorOptions): AudioInjector;
	function playSystemSound(sound: SoundObject): AudioInjector;
	function removeFromSoloList(ids: Uuid[]): void;
	function resetSoloList(): void;
	function setAvatarGain(gain: number): void;
	function setLocalEcho(enable: boolean): void;
	function setLocalInjectorGain(gain: number): void;
	function setPusingToTalkOutputGainDesktop(gain: number): void;
	function setReverb(enable: boolean): void;
	function setReverbOptions(options: AudioEffectOptions): void;
	function setServerEcho(serverEcho: boolean): void;
	function setStereoInput(stereo: boolean): void;
	function setSystemInjectorGain(gain: number): void;
	function startRecording(filename: string): boolean;
	function stopRecording(): void;
	function toggleLocalEcho(): void;
	function toggleServerEcho(): void;

	// signals
	
}