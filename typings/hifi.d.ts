/*

Types **by hand** by @makitsune
Use this however you like

It's not complete yet, but feel free to update

Here's the html docs:
https://apidocs.highfidelity.com

Namespaces are ordered as:
- Properties
- Methods
- Signals
- Types

*/

// undocumented
//

declare namespace console {
	function log(message: string): void;
	function err(message: string): void;
}

declare type Timer = object;

// global classes
// 

declare interface AudioInjectorOptions {
	position?: Vec3;
	orientation?: Quat;
	volume?: number;
	pitch?: number;
	loop?: boolean;
	secondOffset?: number;
	localOnly?: boolean;
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

declare class Signal {
	connect(callback: ()=>void): void;
	disconnect(callback: ()=>void): void;
}

declare class SoundObject {
	downloaded: boolean;
	duration: number;
	ready: Signal;
}

declare class ResourceObject {

}

declare class TabletProxy {
	gotoHomeScreen(): void;
}

// global types
//

declare interface AACube {
	x?: number;
	y?: number;
	z?: number;
	scale?: number;
}

declare interface AttachmentData {
	modelUrl?: string;
	jointName?: string;
	translation?: Vec3;
	rotation?: Vec3;
	scale?: number;
	soft?: boolean;
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

declare interface Mat4 {
	r0c0?: number;
	r1c0?: number;
	r2c0?: number;
	r3c0?: number;

	r0c1?: number;
	r1c1?: number;
	r2c1?: number;
	r3c1?: number;

	r0c2?: number;
	r1c2?: number;
	r2c2?: number;
	r3c2?: number;

	r0c3?: number;
	r1c3?: number;
	r2c3?: number;
	r3c3?: number;
}

declare interface MouseEvent {
	x?: number;
	y?: number;
	button?: string;
	isLeftButton?: boolean;
	isMiddleButton?: boolean;
	isRightButton?: boolean;
	isShift?: boolean;
	isMeta?: boolean;
	isControl?: boolean;
	isAlt?: boolean;
}

declare interface Pose {
	translation?: Vec3;
	rotation?: Quat;
	velocity?: Vec3;
	angularVelocity?: Vec3;
	valid?: boolean;
}

declare interface Quat {
	x?: number;
	y?: number;
	z?: number;
	w?: number;
}

declare interface Rect {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
}

declare type RGBS = [number, number, number, number?];

declare interface Shape {
	shapeType?: ShapeType;
	modelUrl?: string;
	dimensions?: Vec3;
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
	height?: number;
	width?: number;
}

declare type Uuid = string;

declare interface Vec2 {
	x?: number; u?: number;
	y?: number; v?: number;
}

declare interface Vec3 {
	x?: number; r?: number; red?: number;
	y?: number; g?: number; green?: number;
	z?: number; b?: number; blue?: number;
}

declare interface Vec4 {
	x?: number;
	y?: number;
	z?: number;
	w?: number;
}

declare interface ViewFrustrum {
	position?: Vec3;
	orientation?: Quat;
	centerRadius?: number;
	fieldOfView?: number;
	aspectRatio?: number;
	projection?: Mat4;
}

declare enum WebInputMode {
	touch = "touch",
	mouse = "mouse",
}

declare interface WheelEvent {
	x?: number;
	y?: number;
	delta?: number;
	orientation?: string;
	isLeftButton?: boolean
	isMiddleButton?: boolean
	isRightButton?: boolean
	isShifted?: boolean
	isMeta?: boolean
	isControl?: boolean
	isAlt?: boolean
}

declare function print(message: string): void;

// undocumented for implements
// `class myClass implements *`
//

declare class ClientEntityScript {
	preload?(entityID: Uuid): void;
	unload?(entityID: Uuid): void;

	startNearTrigger?(entityID: Uuid): void;
	startFarTrigger?(entityID: Uuid): void;

	//clickDownOnEntity?(mouseEvent: MouseEvent): void; 
	clickDownOnEntity?(entityID: Uuid, mouseEvent: MouseEvent): void;

	enterEntity?(entityID: Uuid): void;
}