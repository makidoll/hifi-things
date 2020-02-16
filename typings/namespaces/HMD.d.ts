declare namespace HMD {
	// properties
	const position: Vec3;
	const orientation: Quat;
	const active: boolean;
	const mounted: boolean;
	const playerHeight: number;
	const eyeHeight: number;
	const ipd: number;
	const ipdScale: number;
	const showTablet: boolean;
	const tabletContextualMode: boolean;
	const tabletID: Uuid;
	const tabletScreenID: Uuid;
	const homeButtonID: Uuid;
	const homeButtonHighlightID: Uuid;
	const miniTabletID: Uuid;
	const miniTabletScreenID: Uuid;
	let miniTabletHand: number;
	let miniTabletEnabled: boolean;
	const playArea: Rect;
	const sensorPositions: Vec3[];
	let visionSqueezeRatioX: number;
	let visionSqueezeRatioY: number;
	let visionSqueezeTurningXFactor: number;
	let visionSqueezeTurningYFactor: number;
	let visionSqueezeUnSqueezeDelay: number;
	let visionSqueezeUnSqueezeSpeed: number;
	let visionSqueezeTransition: number;
	let visionSqueezePerEye: number;
	let visionSqueezeGroundPlaneY: number;
	let visionSqueezeSpotlightSize: number;

	// methods
	function activateHMDHandMouse(): void;
	function calculateRayUICollisionPoint(
		position: Vec3,
		direction: Vec3,
	): Vec3;
	function centerUI(): void;
	function closeTablet(): void;
	function deactivateHMDHandMouse(): void;
	function getHUDLookAtPosition2D(): Vec2;
	function getHUDLookAtPosition3D(): Vec3;
	function isHandControllerAvailable(name?: string): boolean;
	function isHeadControllerAvailable(name?: string): boolean;
	function isHMDAvailable(name?: string): boolean;
	function isKeyboardVisible(): boolean;
	function isSubdeviceContainingNameAvailable(name: string): boolean;
	function openTablet(contextualMode?: boolean): void;
	function overlayFromWorldPoint(position: Vec3): Vec2;
	function overlayToSpherical(overlayPos: Vec2): Vec2;
	function preferredAudioInput(): string;
	function preferredAudioOutput(): string;
	function requestHideHandControllers(): void;
	function requestShowHandControllers(): void;
	function shouldShowHandControllers(): boolean;
	function sphericalToOverlay(sphericalPos: Vec2): Vec2;
	function suppressKeyboard(): boolean;
	function unsuppressKeyboard(): void;
	function worldPointFromOverlay(coordinates: Vec2): Vec3;

	// signals
	const awayStateWhenFocusLostInVRChanged: Signal<(enabled: boolean) => any>;
	const displayModeChanged: Signal<(isHMDMode: boolean) => any>;
	const IPDScaleChanged: Signal<() => any>;
	const miniTabletEnabledChanged: Signal<(enabled: boolean) => any>;
	const mountedChanged: Signal<() => any>;
	const shouldShowHandControllersChanged: Signal<() => any>;
	const showTabletChanged: Signal<(showTablet: boolean) => any>;
}
