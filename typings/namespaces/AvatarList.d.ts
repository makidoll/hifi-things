declare namespace AvatarList {
	// methods
	function getAvatar(avatarID: Uuid): ScriptAvatar;
	function getAvatarIdentifiers(): Uuid[];
	function getAvatarsInRange(position: Vec3, range: number): Uuid[];
	function isAvatarInRange(position: Vec3, range: number): boolean;

	// signals
	const avatarAddedEvent: Signal<(sessionUUID: Uuid) => any>;
	const avatarRemovedEvent: Signal<(sessionUUID: Uuid) => any>;
	const avatarSessionChangedEvent: Signal<(
		newSessionUUID: Uuid,
		oldSessionUUID: Uuid,
	) => any>;
}
