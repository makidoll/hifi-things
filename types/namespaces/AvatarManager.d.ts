declare namespace AvatarManager {
	// methods
	function findRayIntersection(ray: PickRay, avatarsToInclude: Uuid[],
		avatarsToDiscard: Uuid[], pickAgainstMesh: boolean): RayToAvatarIntersectionResult;
	function getAvatar(avatarID: Uuid): AvatarData;
	function getAvatarDataRate(sessionID: Uuid, rateName?: AvatarDataRate): number;
	function getAvatarIdentifiers(): Uuid[];
	function getAvatarSimulationRate(sessionID: Uuid, rateName?: AvatarSimulationRate): number;
	function getAvatarsInRange(position: Vec3, range: number): Uuid[];
	function getAvatarUpdateRate(sessionID: Uuid, rateName?: AvatarUpdateRate): number;
	function getPalData(avatarIDs?: string[]): AvatarManager.PalData[];
	function isAvatarInRange(position: Vec3, range: number): boolean;
	function setEnableDebugDrawOtherSkeletons(enabled: boolean): void;

	// signals
	const avatarAddedEvent: Signal;
	const avatarRemovedEvent: Signal;
	const avatarSessionChangedEvent: Signal;

	// types
	interface PalData {
		sessionUUID: Uuid;
		sessionDisplayName: string;
		audioLoudness: number;
		position: Vec3;
		palOrbOffset: number;
	}
}