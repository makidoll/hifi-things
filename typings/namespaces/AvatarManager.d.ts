declare namespace AvatarManager {
	// methods
	function findRayIntersection(
		ray: PickRay,
		avatarsToInclude: Uuid[],
		avatarsToDiscard: Uuid[],
		pickAgainstMesh: boolean,
	): RayToAvatarIntersectionResult;
	function getAvatar(avatarID: Uuid): ScriptAvatar;
	function getAvatarDataRate(
		sessionID: Uuid,
		rateName?: AvatarDataRate,
	): number;
	function getAvatarIdentifiers(): Uuid[];
	function getAvatarSimulationRate(
		sessionID: Uuid,
		rateName?: AvatarSimulationRate,
	): number;
	function getAvatarsInRange(position: Vec3, range: number): Uuid[];
	function getAvatarUpdateRate(
		sessionID: Uuid,
		rateName?: AvatarUpdateRate,
	): number;
	function getPalData(
		avatarIDs?: string[],
	): { data: AvatarManager.PalData[] };
	function isAvatarInRange(position: Vec3, range: number): boolean;
	function setEnableDebugDrawOtherSkeletons(enabled: boolean): void;

	// signals
	const avatarAddedEvent: Signal<(sessionUUID: Uuid) => any>;
	const avatarRemovedEvent: Signal<(sessionUUID: Uuid) => any>;
	const avatarSessionChangedEvent: Signal<(
		newSessionUUID: Uuid,
		oldSessionUUID: Uuid,
	) => any>;

	// types
	interface PalData {
		sessionUUID: Uuid;
		sessionDisplayName: string;
		audioLoudness: number;
		position: Vec3;
		palOrbOffset: number;
	}
}
