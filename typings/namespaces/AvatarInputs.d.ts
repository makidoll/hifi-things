declare namespace AvatarInputs {
	// properties
	const ignoreRadiusEnabled: boolean;
	const isHMD: boolean;
	let showAudioTools: boolean;
	let showBubbleTools: boolean;

	// methods
	function loudnessToAudioLevel(loudness: number): number;
	function resetSensors(): void;
	function setShowAudioTools(showAudioTools: boolean): void;
	function setShowBubbleTools(showBubbleTools: boolean): void;

	// signals
	const avatarEnteredIgnoreRadius: Signal<(avatarID: Uuid) => any>;
	const enteredIgnoreRadiusChanged: Signal<() => any>;
	const ignoreRadiusEnabledChanged: Signal<(enabled: boolean) => any>;
	const isHMDChanged: Signal<() => any>;
	const showAudioToolsChanged: Signal<(show: boolean) => any>;
	const showBubbleToolsChanged: Signal<(show: boolean) => any>;
}
