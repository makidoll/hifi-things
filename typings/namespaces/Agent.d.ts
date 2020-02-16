declare namespace Agent {
	let isAvatar: boolean;
	const isPlayingAvatarSound: boolean;
	let isListeningToAudioStream: boolean;
	let isNoiseGateEnabled: boolean;
	const lasteReceivedAudioLoudness: number;
	const sessionUUID: Uuid;

	//function isAvatar(): boolean;
	function playAvatarSound(avatarSound: SoundObject): void;
	function setIsAvatar(isAvatar: boolean): void;
}
