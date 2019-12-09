/*

Types **by hand** by @makitsune
Use this however you like

It's not complete yet, but feel free to update

Here's the official html docs:
https://apidocs.highfidelity.com

Namespaces are ordered as:
- Properties
- Methods
- Signals
- Types

*/

// undocumented

declare namespace console {
	function log(message: any): void;
	function err(message: any): void;
}

declare namespace module {
	let exports: any;
}

declare type Timer = object;

declare class Signal {
	connect(callback: Function): void;
	disconnect(callback: Function): void;
}

// global classes

declare class AnimationFrameObject {
	rotation: Quat[];
	getRotations(): Quat[];
}

declare class AnimationObject {
	jointNames: string[];
	frames: AnimationFrameObject[];
	getJointNames(): string[];
	getFrames(): AnimationFrameObject[];
}

declare class AudioEffectOptions {
	bandwidth?: number;
	preDelay?: number;
	lateDelay?: number;
	reverbTime?: number;
	earlyDiffusion?: number;
	lateDiffusion?: number;
	roomSize?: number;
	density?: number;
	bassMult?: number;
	bassFreq?: number;
	highGain?: number;
	modRate?: number;
	modDepth?: number;
	earlyGain?: number;
	lateGain?: number;
	earlyMixLeft?: number;
	earlyMixRight?: number;
	lateMixLeft?: number;
	lateMixRight?: number;
	wetDryMix?: number;

	constructor(reverbOptions?: AudioEffectOptions);
}

declare class AudioInjector {
	playing: boolean;
	loudness: number;
	options: AudioInjectorOptions;

	getLoudness(): number;
	getOptions(): AudioInjectorOptions;
	isPlaying(): boolean;
	restart(): void;
	setOptions(options: AudioInjectorOptions): void;
	stop(): void;

	finished: Signal;
}

declare interface AudioInjectorOptions {
	position?: Vec3;
	orientation?: Quat;
	volume?: number;
	pitch?: number;
	loop?: boolean;
	secondOffset?: number;
	localOnly?: boolean;
}

declare class AudioStreamStats {
	lossRate: number;
	lossCount: number;
	lossRateWindow: number;
	lossCountWindow: number;
	framesDesired: number;
	framesAvailable: number;
	framesAvailableAvg: number;
	unplayedMsMax: number;
	starveCount: number;
	lastStarveDurationCount: number;
	dropCount: number;
	overflowCount: number;
	timegapMsMax: number;
	timegapMsAvg: number;
	timegapMsMaxWindow: number;
	timegapMsAvgWindow: number;

	dropCountChanged: Signal;
	framesAvailableAvgChanged: Signal;
	framesAvailableChanged: Signal;
	framesDesiredChanged: Signal;
	lastStarveDurationCountChanged: Signal;
	lossCountChanged: Signal;
	lossCountWindowChanged: Signal;
	lossRateChanged: Signal;
	lossRateWindowChanged: Signal;
	overflowCountChanged: Signal;
	starveCountChanged: Signal;
	timegapMsAvgChanged: Signal;
	timegapMsAvgWindowChanged: Signal;
	timegapMsMaxChanged: Signal;
	timegapMsMaxWindowChanged: Signal;
	unplayedMsMaxChanged: Signal;
}

declare class InteractiveWindow {
	title: string;
	position: Vec2;
	size: Vec2;
	visible: boolean;
	presentationMode: InteractiveWindowPresentationMode;

	close(): void;
	emitScriptEvent(message: string | object): void;
	emitWebEvent(message: string | object): void;
	raise(): void;
	sendToQml(message: string | object): void;
	show(): void;

	closed: Signal;
	fromQml: Signal;
	positionChanged: Signal;
	presentationModeChanged: Signal;
	sizeChanged: Signal;
	titleChanged: Signal;
	visibleChanged: Signal;
	webEventReceived: Signal;
}

declare enum InteractiveWindowPresentationMode {
	VIRTUAL,
	NATIVE,
}

declare class MappingObject {
	disable(): MappingObject;
	enable(enable?: boolean): MappingObject;
	from(
		source: Controller.Standard | Controller.Hardware | Function,
	): RouteObject;
	fromQml(
		source: Controller.Standard | Controller.Hardware | Function,
	): RouteObject;
	makeAxis(
		source1: Controller.Hardware,
		source2: Controller.Hardware,
	): RouteObject;
	makeAxisQml(
		source1: Controller.Hardware,
		source2: Controller.Hardware,
	): RouteObject;
}

declare class RouteObject {
	clamp(min: number, max: number): RouteObject;
	contrainToInteger(): RouteObject;
	constrainToPositiveInteger(): RouteObject;
	deadZone(min: number): RouteObject;
	debug(enable?: boolean): RouteObject;
	exponentialSmoothing(
		rotationConstant: number,
		translationConstant: number,
	): RouteObject;
	hysteresis(min: number, max: number): RouteObject;
	invert(): RouteObject;
	logicalNot(): RouteObject;
	lowVelocity(
		rotationConstant: number,
		translationConstant: number,
	): RouteObject;
	peek(enabled?: boolean): RouteObject;
	postTransform(transform: Mat4): RouteObject;
	pulse(interval: number): RouteObject;
	rotate(rotation: Quat): RouteObject;
	scale(multiplyer: number): RouteObject;
	to(destination: Controller.Standard | Controller.Actions | Function): void;
	toQml(
		destination: Controller.Standard | Controller.Actions | Function,
	): void;
	transform(transform: Mat4): RouteObject;
	translate(translate: Vec3): RouteObject;
	when(expression: any | any[]): RouteObject;
	whenQml(expression: any | any[]): RouteObject;
}

declare class SoundObject {
	downloaded: boolean;
	duration: number;
	ready: Signal;
}

declare class ResourceObject {}

declare class TabletProxy {
	name: string;
	toolbarMode: boolean;
	landscape: boolean;
	tabletShown: boolean;
	buttons: any;

	addButton(properties: TabletButtonProxyButtonProperties): TabletButtonProxy;
	closeDialog(): void;
	emitScriptEvent(message: string): void;
	emitWebEvent(message: string): void;
	getLandscape(): boolean;
	gotoHomeScreen(): void;
	gotoMenuScreen(submenu?: string): void;
	gotoWebScreen(
		url: string,
		injectedJavaScriptUrl?: string,
		loadOtherBase?: boolean,
	): void;
	isMessageDialogOpen(): boolean;
	isPathLoaded(path: string): boolean;
	loadQMLOnTop(path: string): void;
	loadQMLSource(path: string, resizable?: boolean): void;
	loadWebScreenOnTop(path: string, injectedJavaScriptURL?: string): void;
	onHomeScreen(): boolean;
	popFromStack(): void;
	pushOntoStack(path: string): boolean;
	removeButton(button: TabletButtonProxy): void;
	returnToPreviousApp(): void;
	sendToQml(message: string): void;
	setLandscape(landscape: boolean): void;

	fromQml: Signal;
	screenChanged: Signal;
	tabletShownChanged: Signal;
	toolbarModeChanged: Signal;
	webEventReceived: Signal;
}

declare class TabletButtonProxy {
	uuid: Uuid;
	properties: TabletButtonProxyButtonProperties;

	editProperties(properties: TabletButtonProxyButtonProperties): void;
	getProperties(): TabletButtonProxyButtonProperties;

	clicked: Signal;
	propertiesChanged: Signal;
}

declare interface TabletButtonProxyButtonProperties {
	readonly uuid?: Uuid;
	readonly objectName?: Uuid;
	stableOrder?: number;
	icon?: string;
	hoverIcon?: string;
	activeIcon?: string;
	activeHoverIcon?: string;
	text?: string;
	hoverText?: string;
	activeText?: string;
	activeHoverText?: string;
	captionColor?: string;
	isActive?: boolean;
	isEntered?: boolean;
	buttonEnabled?: boolean;
	sortOrder?: number;
	inDebugMode?: boolean;
	flickable?: object;
	gridView?: object;
	buttonIndex?: number;
}

// global types

declare interface AACube {
	x: number;
	y: number;
	z: number;
	scale: number;
}

declare interface AttachmentData {
	modelUrl: string;
	jointName: string;
	translation: Vec3;
	rotation: Vec3;
	scale: number;
	soft: boolean;
}

declare interface AvatarData {
	position: Vec3;
	scale: number;
	handPosition: Vec3;
	bodyPitch: number;
	bodyYaw: number;
	bodyRoll: number;
	orientation: Quat;
	headOrientation: Quat;
	headPitch: number;
	headYaw: number;
	headRoll: number;
	velocity: Vec3;
	angularVelocity: Vec3;
	sessionUUID: Uuid;
	displayName: string;
	sessionDisplayName: string;
	lookAtSnappingEnabled: boolean;
	skeletonModelURL: string;
	attachmentData: AttachmentData[];
	jointNames: string[];
	audioLoudness: number;
	audioAverageLoudness: number;
	sensorToWorldMatrix: Mat4;
	controllerLeftHandMatrix: Mat4;
	controllerRightHandMatrix: Mat4;
	hasPriority: boolean;
}

declare enum AvatarDataRate {
	globalPosition = "globalPosition",
	localPosition = "localPosition",
	handControllers = "handControllers",
	avatarBoundingBox = "avatarBoundingBox",
	avatarOrientation = "avatarOrientation",
	avatarScale = "avatarScale",
	lookAtPosition = "lookAtPosition",
	audioLoudness = "audioLoudness",
	sensorToWorkMatrix = "sensorToWorkMatrix",
	additionalFlags = "additionalFlags",
	parentInfo = "parentInfo",
	faceTracker = "faceTracker",
	jointData = "jointData",
	jointDefaultPoseFlagsRate = "jointDefaultPoseFlagsRate",
	farGrabJointRate = "farGrabJointRate",
	globalPositionOutbound = "globalPositionOutbound",
	localPositionOutbound = "localPositionOutbound",
	avatarBoundingBoxOutbound = "avatarBoundingBoxOutbound",
	avatarOrientationOutbound = "avatarOrientationOutbound",
	avatarScaleOutbound = "avatarScaleOutbound",
	lookAtPositionOutbound = "lookAtPositionOutbound",
	audioLoudnessOutbound = "audioLoudnessOutbound",
	sensorToWorkMatrixOutbound = "sensorToWorkMatrixOutbound",
	additionalFlagsOutbound = "additionalFlagsOutbound",
	parentInfoOutbound = "parentInfoOutbound",
	faceTrackerOutbound = "faceTrackerOutbound",
	jointDataOutbound = "jointDataOutbound",
	jointDefaultPoseFlagsOutbound = "jointDefaultPoseFlagsOutbound",
	"" = "",
}

declare type AvatarEntityMap = { Uuid: Entities.EntityProperties };

declare enum AvatarSimulationRate {
	avatar = "avatar",
	avatarInView = "avatarInView",
	skeletonModel = "skeletonModel",
	jointData = "jointData",
	"" = "",
}

declare enum AvatarUpdateRate {
	globalPosition = "globalPosition",
	localPosition = "localPosition",
	handControllers = "handControllers",
	avatarBoundingBox = "avatarBoundingBox",
	avatarOrientation = "avatarOrientation",
	avatarScale = "avatarScale",
	lookAtPosition = "lookAtPosition",
	audioLoudness = "audioLoudness",
	sensorToWorkMatrix = "sensorToWorkMatrix",
	additionalFlags = "additionalFlags",
	parentInfo = "parentInfo",
	faceTracker = "faceTracker",
	jointData = "jointData",
	farGrabJointData = "farGrabJointData",
	"" = "",
}

declare enum BillboardMode {
	none = "none",
	yaw = "yaw",
	full = "full",
}

declare enum BoxFace {
	MIN_X_FACE = "MIN_X_FACE",
	MAX_X_FACE = "MAX_X_FACE",
	MIN_Y_FACE = "MIN_Y_FACE",
	MAX_Y_FACE = "MAX_Y_FACE",
	MIN_Z_FACE = "MIN_Z_FACE",
	MAX_Z_FACE = "MAX_Z_FACE",
	UNKNOWN_FACE = "UNKNOWN_FACE",
}

declare enum CollisionMask {
	static = 1,
	dynamic = 2,
	kinematic = 4,
	myAvatar = 8,
	otherAvatars = 16,
}

declare interface Color extends Vec3 {}

declare interface ColorFloat extends Vec3 {}

declare enum KeyboardModifiers {
	Shift = 0x02000000,
	Control = 0x04000000,
	Alt = 0x08000000,
	Meta = 0x10000000,
	Keypad = 0x20000000,
	Group = 0x40000000,
}

declare interface KeyEvent {
	key: number;
	text: string;
	isShifted: boolean;
	isMeta: boolean;
	isControl: boolean;
	isAlt: boolean;
	isKeypad: boolean;
	isAutoRepeat: boolean;
}

declare interface Mat4 {
	r0c0: number;
	r1c0: number;
	r2c0: number;
	r3c0: number;
	r0c1: number;
	r1c1: number;
	r2c1: number;
	r3c1: number;
	r0c2: number;
	r1c2: number;
	r2c2: number;
	r3c2: number;
	r0c3: number;
	r1c3: number;
	r2c3: number;
	r3c3: number;
}

declare interface MouseEvent {
	x: number;
	y: number;
	button: string;
	isLeftButton: boolean;
	isMiddleButton: boolean;
	isRightButton: boolean;
	isShift: boolean;
	isMeta: boolean;
	isControl: boolean;
	isAlt: boolean;
}

declare class OverlayWebWindow {
	readonly url: string;
	position: Vec2;
	size: Vec2;
	visible: boolean;

	constructor(properties?: OverlayWindowProperties);

	clearDebugWwndow(): void;
	close(): void;
	emitScriptEvent(message: Object): void;
	emitWebEvent(message: Object): void;
	getEventBridge(message: any): Object;
	getPosition(): Vec2;
	getSize(): Vec2;
	getURL(): string;
	initQml(properties: OverlayWindowProperties);
	isVisible(): boolean;
	raise(): void;
	sendToQml(message: Object): void;
	setPosition(position: Vec2): void;
	setPosition(x: number, y: number): void;
	setScriptURL(script: string): void;
	setSize(size: Vec2): void;
	setSize(width: number, height: number): void;
	setTitle(title: string): void;
	setURL(url: string): void;
	setVisible(visible: boolean): void;

	closed: Signal;
	fromQml: Signal;
	hasClosed: Signal;
	hasMoved: Signal;
	moved: Signal;
	positionChanged: Signal;
	qmlToScript: Signal;
	resized: Signal;
	scriptEventReceived: Signal;
	sizeChanged: Signal;
	urlChanged: Signal;
	visibleChanged: Signal;
	webEventReceived: Signal;
}

declare interface OverlayWindowProperties {
	title?: string;
	source?: string;
	width?: number;
	height?: number;
	visible?: boolean;
}

declare interface PickRay {
	origin: Vec3;
	direction: Vec3;
}

declare interface PointerEvent {
	type: string;
	id: number; // 0 = hardware, 1 = left controller, 2 = right controller

	pos2D: Vec2;
	pos3D: Vec3;

	normal: Vec3;
	direction: Vec3;
	button: string;

	isPrimaryButton: boolean;
	isLeftButton: boolean;
	isSecondaryButton: boolean;
	isRightButton: boolean;
	isTertiaryButton: boolean;
	isMiddleButton: boolean;

	isPrimaryHeld: boolean;
	isSecondaryHeld: boolean;
	isTertiaryHeld: boolean;

	keyboardModifiers: KeyboardModifiers;
}

declare enum PickType {
	Ray,
	Parabola,
	Stylus,
	Collision,
}

declare interface Pose {
	translation: Vec3;
	rotation: Quat;
	velocity: Vec3;
	angularVelocity: Vec3;
	valid: boolean;
}

declare interface Quat {
	x: number;
	y: number;
	z: number;
	w: number;
}

declare interface RayToAvatarIntersectionResult {
	intersects: boolean;
	avatarID: Uuid;
	distance: number;
	face: string;
	intersection: Vec3;
	surfaceNormal: Vec3;
	jointIndex: number;
	extraInfo: SubmeshIntersection;
}

declare interface Rect {
	x: number;
	y: number;
	width: number;
	height: number;
}

declare type RGBS = [number, number, number, number?];

declare interface Shape {
	shapeType: ShapeType;
	modelUrl: string;
	dimensions: Vec3;
}

declare enum ShapeType {
	none = "none",
	box = "box",
	sphere = "sphere",
	capsuleX = "capsule-x",
	capsuleY = "capsule-y",
	capsuleZ = "capsule-z",
	cylinderX = "capsule-x",
	cylinderY = "capsule-y",
	cylinderZ = "capsule-z",
	hull = "hull",
	compound = "compound",
	simpleHull = "simple-hull",
	simpleCompound = "simple-compound",
	staticMesh = "static-mesh",
	plane = "plane",
	ellipsoid = "ellipsoid",
	circle = "circle",
	multisphere = "multisphere",
}

declare interface Size {
	height: number;
	width: number;
}

declare interface SubmeshIntersection {
	worldIntersectionPoint: Vec3;
	meshIntersectionPoint: Vec3;
	partIndex: number;
	shapeID: number;
	subMeshIndex: number;
	subMeshName: string;
	subMeshTriangleWorld: Triangle;
	subMeshNormal: Vec3;
	subMeshTriangle: Triangle;
}

declare interface Triangle {
	v0: Vec3;
	v1: Vec3;
	v2: Vec3;
}

declare type Uuid = string;

declare interface Vec2 {
	x: number;
	u: number;
	y: number;
	v: number;
}

declare interface Vec3 {
	x: number;
	r: number;
	red: number;
	y: number;
	g: number;
	green: number;
	z: number;
	b: number;
	blue: number;
}

declare interface Vec4 {
	x: number;
	y: number;
	z: number;
	w: number;
}

declare interface ViewFrustrum {
	position: Vec3;
	orientation: Quat;
	centerRadius: number;
	fieldOfView: number;
	aspectRatio: number;
	projection: Mat4;
}

declare enum WebInputMode {
	touch = "touch",
	mouse = "mouse",
}

declare interface WheelEvent {
	x: number;
	y: number;
	delta: number;
	orientation: string;
	isLeftButton: boolean;
	isMiddleButton: boolean;
	isRightButton: boolean;
	isShifted: boolean;
	isMeta: boolean;
	isControl: boolean;
	isAlt: boolean;
}

declare function print(message: string): void;

// undocumented for implements
// `class MyClass implements *`

declare class ClientEntityScript {
	preload?(entityID: Uuid): void;
	unload?(entityID: Uuid): void;

	startNearTrigger?(entityID: Uuid): void;
	startFarTrigger?(entityID: Uuid): void;

	clickDownOnEntity?(entityID: Uuid, event: PointerEvent): void;

	enterEntity?(entityID: Uuid): void;
}
