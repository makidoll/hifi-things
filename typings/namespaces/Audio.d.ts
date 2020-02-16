declare namespace Audio {
	// properties
	let muted: boolean;
	let mutedDesktop: boolean;
	let mutedHMD: boolean;
	let warnWhenMuted: boolean;
	let noiseReduction: boolean;
	let inputVolume: number;
	const inputLevel: number;
	let clipping: boolean;
	const context: string;
	let pushToTalk: boolean;
	let pushToTalkDesktop: boolean;
	let pushToTalkHMD: boolean;
	let pushingToTalk: boolean;
	let avatarGain: number;
	let localInjectorGain: number;
	let serverInjectorGain: number;
	let systemInjectorGain: number;
	let pusingToTalkOutputGainDesktop: number;
	let acousticEchoCancellation: boolean;
	const isStereoInput: boolean;
	const isSoloing: boolean;
	const soloList: Uuid[];

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
	function playSound(
		sound: SoundObject,
		injectorOptions: Partial<AudioInjectorOptions>,
	): AudioInjector;
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
	const acousticEchoCancellationChanged: Signal<(isEnabled: boolean) => any>;
	const avatarGainChanged: Signal<(gain: number) => any>;
	const clippingChanged: Signal<(isClipping: boolean) => any>;
	const contextChanged: Signal<(context: "Desktop" | "HMD") => any>;
	const disconnected: Signal<() => any>;
	const environmentMuted: Signal<() => any>;
	const inputLevelChanged: Signal<(level: number) => any>;
	const inputReceived: Signal<(inputSamples: Int16Array) => any>;
	const inputVolumeChanged: Signal<(volume: number) => any>;
	const isStereoInputChanged: Signal<(isStereo: boolean) => any>;
	const localInjectorGainChanged: Signal<(gain: number) => any>;
	const mutedByMixer: Signal<() => any>;
	const mutedChanged: Signal<(isMuted: boolean) => any>;
	const mutedDesektopChanged: Signal<(isMuted: boolean) => any>;
	const mutedHMDChanged: Signal<(isMuted: boolean) => any>;
	const noiseGateClosed: Signal<() => any>;
	const noiseGateOpened: Signal<() => any>;
	const noiseReductionChanged: Signal<(isEnabled: boolean) => any>;
	const pushingToTalkChanged: Signal<(talking: boolean) => any>;
	const pushingToTalkOutputGainDesktopChanged: Signal<(gain: number) => any>;
	const pushToTalkChanged: Signal<(enabled: boolean) => any>;
	const pushToTalkDesktopChanged: Signal<(enabled: boolean) => any>;
	const pushToTalkHMDChanged: Signal<(enabled: boolean) => any>;
	const receivedFirstPacket: Signal<() => any>;
	const serverInjectorGainChanged: Signal<(gain: number) => any>;
	const systemInjectorGainChanged: Signal<(gain: number) => any>;
	const warnWhenMutedChanged: Signal<(isEnabled: boolean) => any>;
}
