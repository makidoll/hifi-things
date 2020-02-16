declare function print(...message: any): void;

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

declare type AvatarDataRate =
	| "globalPosition"
	| "localPosition"
	| "handControllers"
	| "avatarBoundingBox"
	| "avatarOrientation"
	| "avatarScale"
	| "lookAtPosition"
	| "audioLoudness"
	| "sensorToWorkMatrix"
	| "additionalFlags"
	| "parentInfo"
	| "faceTracker"
	| "jointData"
	| "jointDefaultPoseFlagsRate"
	| "farGrabJointRate"
	| "globalPositionOutbound"
	| "localPositionOutbound"
	| "avatarBoundingBoxOutbound"
	| "avatarOrientationOutbound"
	| "avatarScaleOutbound"
	| "lookAtPositionOutbound"
	| "audioLoudnessOutbound"
	| "sensorToWorkMatrixOutbound"
	| "additionalFlagsOutbound"
	| "parentInfoOutbound"
	| "faceTrackerOutbound"
	| "jointDataOutbound"
	| "jointDefaultPoseFlagsOutbound"
	| "";

declare type AvatarEntityMap = { Uuid: Entities.EntityProperties };

declare type AvatarSimulationRate =
	| "avatar"
	| "avatarInView"
	| "skeletonModel"
	| "jointData"
	| "";

declare type AvatarUpdateRate =
	| "globalPosition"
	| "localPosition"
	| "handControllers"
	| "avatarBoundingBox"
	| "avatarOrientation"
	| "avatarScale"
	| "lookAtPosition"
	| "audioLoudness"
	| "sensorToWorkMatrix"
	| "additionalFlags"
	| "parentInfo"
	| "faceTracker"
	| "jointData"
	| "farGrabJointData"
	| "";

declare type BillboardMode = "none" | "yaw" | "full";

declare type BoxFace =
	| "MIN_X_FACE"
	| "MAX_X_FACE"
	| "MIN_Y_FACE"
	| "MAX_Y_FACE"
	| "MIN_Z_FACE"
	| "MAX_Z_FACE"
	| "UNKNOWN_FACE";

declare interface Collision {
	type: ContactEventType;
	idA: Uuid;
	idB: Uuid;
	penetration: Vec3;
	contactPoint: Vec3;
	velocityChange: Vec3;
}

declare interface CollisionContact {
	pointOnPick: Vec3;
	pointOnObject: Vec3;
	normalOnPick: Vec3;
}

declare enum CollisionMask {
	static = 1,
	dynamic = 2,
	kinematic = 4,
	myAvatar = 8,
	otherAvatars = 16,
}

declare interface CollisionPickResult {
	intersects: boolean;
	intersectingObjects: IntersectingObject[];
	collisionRegion: CollisionRegion;
}

declare interface CollisionRegion {
	shape: Shape;
	loaded: boolean;
	position: Vec3;
	orientation: Quat;
	threshhold: number;
	collisionGroup?: CollisionMask;
}

declare interface Color extends Vec3 {}

declare interface ColorFloat extends Vec3 {}

declare type ContactEventType = 0 | 1 | 2;

declare type DriveKey =
	| typeof DriveKeys.TRANSLATE_X
	| typeof DriveKeys.TRANSLATE_Y
	| typeof DriveKeys.TRANSLATE_Z
	| typeof DriveKeys.YAW
	| typeof DriveKeys.STEP_TRANSLATE_X
	| typeof DriveKeys.STEP_TRANSLATE_Y
	| typeof DriveKeys.STEP_TRANSLATE_Z
	| typeof DriveKeys.STEP_YAW
	| typeof DriveKeys.PITCH
	| typeof DriveKeys.ZOOM
	| typeof DriveKeys.DELTA_YAW
	| typeof DriveKeys.DELTA_PITCH;

declare enum FilterFlags {
	PICK_DOMAIN_ENTITIES = 1,
	PICK_AVATAR_ENTITIES = 2,
	PICK_LOCAL_ENTITIES = 4,
	PICK_AVATARS = 8,
	PICK_HUD = 16,
	PICK_INCLUDE_VISIBLE = 32,
	PICK_INCLUDE_INVISIBLE = 64,
	PICK_INCLUDE_COLLIDABLE = 128,
	PICK_INCLUDE_NONCOLLIDABLE = 256,
	PICK_PRECISE = 512,
	PICK_COARSE = 1024,
	PICK_ALL_INTERSECTIONS = 2048,
}

declare type HandState = 0 | 1 | 2 | 4;

declare interface IntersectingObject {
	id: Uuid;
	type: IntersectionType;
	collisionContacts: CollisionContact[];
}

declare enum IntersectionType {
	INTERSECTED_NONE,
	INTERSECTED_ENTITY,
	INTERSECTED_LOCAL_ENTITY,
	INTERSECTED_AVATAR,
	INTERSECTED_HUD,
}

declare enum KeyboardModifiers {
	Shift = 0x02000000,
	Control = 0x04000000,
	Alt = 0x08000000,
	Meta = 0x10000000,
	Keypad = 0x20000000,
	Group = 0x40000000,
}

declare interface KeyEvent {
	key?: number;
	text?: string;
	isShifted?: boolean;
	isMeta?: boolean;
	isControl?: boolean;
	isAlt?: boolean;
	isKeypad?: boolean;
	isAutoRepeat?: boolean;
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

declare interface MeshFace {
	vertices: number[];
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

declare interface ParabolaPickResult {
	type: number;
	intersects: boolean;
	objectID: Uuid;
	distance: number;
	parabolicDistance: number;
	intersection: Vec3;
	surfaceNormal: Vec3;
	extraInfo: SubmeshIntersection;
	parabola: PickParabola;
}

declare interface PickParabola {
	origin: Vec3;
	velocity: Vec3;
	acceleration: Vec3;
}

declare interface PickRay {
	origin: Vec3;
	direction: Vec3;
}

// declare type PickType =
// 	| typeof PickType.Ray
// 	| typeof PickType.Parabola
// 	| typeof PickType.Stylus
// 	| typeof PickType.Collision;

declare interface PointerEvent {
	type: "Press" | "DoublePress" | "Release" | "Move";
	id: 0 | 1 | 2;
	pos2D: Vec2;
	pos3D: Vec3;
	normal: Vec3;
	direction: Vec3;
	button: "None" | "Primary" | "Secondary" | "Tertiary";
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

declare interface Pose {
	translation: Vec3;
	rotation: Quat;
	velocity: Vec3;
	angularVelocity: Vec3;
	valid: boolean;
}

declare interface ProceduralData {
	version: number;
	vertexShaderURL: string;
	fragmentShaderURL: string;
	channels: string[];
	uniforms: ProceduralUniforms;
}

declare type ProceduralUniforms = Object;

declare interface Quat {
	x: number;
	y: number;
	z: number;
	w: number;
}

declare interface RayPickResult {
	type: IntersectionType;
	intersects: boolean;
	objectID: Uuid;
	distance: number;
	intersection: Vec3;
	surfaceNormal: Vec3;
	extraInfo: SubmeshIntersection;
	searchRay: PickRay;
}

declare interface RayToAvatarIntersectionResult {
	intersects: boolean;
	avatarID: Uuid;
	distance: number;
	face: string | "UNKNOWN_FACE";
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

declare type RefreshRateProfileName = "Eco" | "Interactive" | "Realtime";

declare enum RefreshRateRegime {
	FOCUS_ACTIVE,
	FOCUS_INACTIVE,
	UNFOCUS,
	MINIMIZED,
	STARTUP,
	SHUTDOWN,
}

declare type RefreshRateRegimeName =
	| "FocusActive"
	| "FocusInactive"
	| "Unfocus"
	| "Minimized"
	| "StartUp"
	| "ShutDown";

declare type RGBS = [number, number, number, boolean?];

declare interface Shape {
	shapeType: ShapeType;
	modelUrl: "compound" | "simple-hull" | "simple-compound" | "static-mesh";
	dimensions: Vec3;
}

declare type ShapeType =
	| "none"
	| "box"
	| "sphere"
	| "capsule-x"
	| "capsule-y"
	| "capsule-z"
	| "capsule-x"
	| "capsule-y"
	| "capsule-z"
	| "hull"
	| "compound"
	| "simple-hull"
	| "simple-compound"
	| "static-mesh"
	| "plane"
	| "ellipsoid"
	| "circle"
	| "multisphere";

declare interface Size {
	height: number;
	width: number;
}

declare interface SkeletonJoint {
	name: string;
	index: number;
	parentIndex: number;
}

declare interface StylusPickResult {
	type: number;
	intersects: boolean;
	objectID: Uuid;
	distance: number;
	intersection: Vec3;
	surfaceNormal: Vec3;
	stylusTip: StylusTip;
}

declare interface StylusTip {
	side: number;
	tipOffset: Vec3;
	position: Vec3;
	orientation: Quat;
	velocity: Vec3;
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

declare interface TouchEvent {
	x: number;
	y: number;
	isPressed: boolean;
	isMoved: boolean;
	isStationary: boolean;
	isReleased: boolean;
	isShifted: boolean;
	isMeta: boolean;
	isControl: boolean;
	isAlt: boolean;
	touchPoints: number;
	points: Vec2[];
	radius: number;
	isPinching: boolean;
	isPinchOpening: boolean;
	angle: number;
	deltaAngle: number;
	angles: number[];
	isRotating: boolean;
	rotating: "clockwise" | "counterClockwise" | "none";
}

declare interface Triangle {
	v0?: Vec3;
	v1?: Vec3;
	v2?: Vec3;
}

declare type Uuid = string;

declare enum UXMode {
	DESKTOP,
	VR,
}

declare type UXModeName = "Desktop" | "VR";

declare interface Vec2 {
	x?: number;
	u?: number;
	y?: number;
	v?: number;
}

declare interface Vec3 {
	x?: number;
	r?: number;
	red?: number;
	y?: number;
	g?: number;
	green?: number;
	z?: number;
	b?: number;
	blue?: number;
}

declare interface Vec4 {
	x?: number;
	y?: number;
	z?: number;
	w?: number;
}

declare interface ViewFrustrum {
	position: Vec3;
	orientation: Quat;
	centerRadius: number;
	fieldOfView: number;
	aspectRatio: number;
	projection: Mat4;
}

declare type WebInputMode = "touch" | "mouse";

declare interface WheelEvent {
	x: number;
	y: number;
	delta: number;
	orientation: "VERTICAL" | "HORIZONTAL";
	isLeftButton: boolean;
	isMiddleButton: boolean;
	isRightButton: boolean;
	isShifted: boolean;
	isMeta: boolean;
	isControl: boolean;
	isAlt: boolean;
}
