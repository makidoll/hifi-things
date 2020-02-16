declare namespace Camera {
	type Mode =
		| "first person"
		| "first person look at"
		| "third person"
		| "look at"
		| "selfie"
		| "mirror"
		| "independent"
		| "entity";

	// properties
	let position: Vec3;
	let orientation: Quat;
	let mode: Mode;
	let frustum: ViewFrustrum;
	let cameraEntity: Uuid;

	// methods
	function computePickRay(x: number, y: number): PickRay;
	function getCameraEntity(): Uuid;
	function getModeString(): Mode;
	function getOrientation(): Quat;
	function getPosition(): Vec3;
	function keepLookingAt(position: Vec3): void;
	function lookAt(position: Vec3): void;
	function setCameraEntity(entityID: Uuid): void;
	function setModeString(mode: Mode): void;
	function setOrientation(orientation: Quat): void;
	function setPosition(position: Vec3): void;
	function stopLookingAt(): void;

	// signals
	const modeUpdated: Signal<(newMode: Mode) => any>;
}
