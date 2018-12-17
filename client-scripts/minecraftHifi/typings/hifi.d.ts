//
// TODO: Signals are not correct.
// 
// TODO: There are a number of places that the documentation doesn't provide actual types
// Reasonable guesses were made where possible, 'any' was used for the rest.

type URL = string;

declare enum ContactEventType {
    startCollision = 0,
    continuedCollision = 1,
    endCollsion = 2
}

declare enum KeyboardModifiers {
    Shift = 0x02000000,
    Control = 0x04000000,
    Alt = 0x08000000,
    Meta = 0x010000000,
    Keypad = 0x20000000,
    Group = 0x40000000
}

declare enum PickType {
    Ray,
    Stylus,
    Parabola,
    Collision
}

declare enum ShapeType {
    "none",
    "box",
    "sphere",
    "capsule-x",
    "capsule-y",
    "capsule-z",
    "cylinder-x",
    "cylinder-y",
    "cylinder-z",
    "hull",
    "compound",
    "simple-hull",
    "simple-compound",
    "function-mesh",
    "plane"
}

declare interface AACube {
    x: number;
    y: number;
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

declare type BoxFace = "MIN_X_FACE" | "MAX_X_FACE" | "MIN_Y_FACE" |
    "MAX_Y_FACE" | "MIN_Z_FACE" | "MAX_Z_FACE" | "UNKNOWN_FACE";

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

declare interface CollisionPickResult {
    intersects: boolean;
    intersectingObjects: Array<IntersectingObject>;
    collisionRegion: CollisionRegion;
}

declare type CollisionMask = any;

declare interface CollisionRegion {
    shape: Shape;
    position: Vec3;
    orientation: Quat;
    threshhold: number;
    collisionGroup: CollisionMask;
    parentID: Uuid;
    parentJointIndex: number;
    joint: string;
}
type rgbColor = {
    r?: number;
    g?: number;
    b?: number;
}
type xyzColor = {
    x?: number;
    y?: number;
    z?: number;
}
type redGreenBlueColor = {
    red?: number;
    green?: number;
    blue?: number;
}

declare type Color = rgbColor | xyzColor | redGreenBlueColor;

declare type ColorFloat = Color;

declare interface FBXAnimationFrame {
    rotations: Array<Quat>;
    translations: Array<Vec3>;
}

declare interface IntersectingObject {
    id: Uuid;
    type: number;
    collisionContacts: Array<CollisionContact>;
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

declare interface Material {
    name?: string;
    model?: string;
    emissive?: Color | RGBS;
    opacity?: number;
    unlit?: boolean;
    albedo?: Color | RGBS;
    roughness?: number;
    metallic?: number;
    scattering?: number;
    emissiveMap?: string;
    albedoMap?: string;
    opacityMap?: string;
    roughnessMap?: string;
    glossMap?: string;
    metallicMap?: string;
    specularMap?: string;
    normalMap?: string;
    bumpMap?: string;
    occlusionMap?: string;
    scatteringMap?: string;
    lightMap?: string;
}

declare interface MaterialResource {
    materialVersion?: number;
    materials?: Material | Array<Material>;
}

declare interface MouseEvent {
    isLeftButton?: boolean;
    isMiddleButton?: boolean;
    isRightButton?: boolean;
    isShifted?: boolean;
    isMeta?: boolean;
    isControl?: boolean;
    isAlt?: boolean;
}

declare interface ParabolaPickResult {
    type: number;
    intersects: boolean;
    objectID: Uuid;
    distance: number;
    parabolicDistance: number;
    intersection: Vec3;
    surfaceNormal: Vec3;
    extraInfo: any;
    parabola: PickParabola;
}

declare interface PointerEvent {
    type?: string;
    id?: number;
    pos2d?: Vec2;
    pos3D?: Vec3;
    normal?: Vec3;
    direction?: Vec3;
    button?: string;
    isPrimaryButton?: boolean;
    isLeftButton?: boolean;
    isSecondaryButton?: boolean;
    isRightButton?: boolean;
    isTertiaryButton?: boolean;
    isMiddleButton?: boolean;
    isPrimaryHeld?: boolean;
    isSecondaryHeld?: boolean;
    isTertiaryHeld?: boolean;
    keyboardModifiers?: KeyboardModifiers;
}

declare interface Pose {
    translation: Vec3;
    rotation: Quat;
    velocity: Vec3;
    angularVelocity: Vec3;
    valid: boolean;
}

declare interface RayPickResult {
    type: number;
    intersects: boolean;
    objectID: Uuid;
    distance: number;
    intersection: Vec3;
    surfaceNormal: Vec3;
    extraInfo: any;
    searchRay: PickRay;
}

declare type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare type RGBS = Array<number>;

declare type Shape = {
    shapeType?: ShapeType;
    dimensions?: Vec3;
}

declare interface Size {
    height: number;
    width: number;
}

declare interface StylusPickResult {
    type: number;
    intersects: boolean;
    objectID: Uuid;
    distance: number;
    intersection: Vec3;
    surfaceNormal: Vec3;
    extraInfo: any;
    stylusTip: StylusTip;
}

declare interface StylusTip {
    side: number;
    position: Vec3;
    orientation: Quat;
    velocity: Vec3;
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
    points: Array<Vec2>;
    radius: number;
    isPinching: boolean;
    isPinchOpening: boolean;
    angle: number;
    deltaAngle: number;
    angles: Array<number>;
    isRotating: boolean;
    rotating: string;
}

declare interface Vec2 {
    x?: number;
    y?: number;
}

declare interface Vec4 {
    x?: number;
    y?: number;
    z?: number;
    w?: number;
}

declare interface ViewFrustum {
    position: Vec3;
    orientation: Quat;
    centerRadius: number;
    fieldOfView: number;
    apsectRatio: number;
    projection: Mat4;
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

declare interface Signal<F = Function> {
    connect(callback: F): void;
    disconnect(callback: F): void;
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

declare namespace Agent {
    function setIsAvatar(isAvatar: boolean): void;
    function isAvatar(): boolean;
    function playAvatarSound(avatarSound: object): void;
    let isPlayingAvatarSound: boolean;
    let isListeningToAudioStream: boolean;
    let isNoiseGateEnabled: boolean;
    let lastReceivedAudioLoudness: number;
    let sessionUUID: Uuid;
}

declare class Avatar {
     startAnimation(url: string, fps: number, priority: number, loop: boolean, hold: boolean, firstFrame: number, lastFrame: number, maskedJoints: Array<string>): void;
     stopAnimation(): void;
     getAnimationDetails(): Avatar.AnimationDetails;
     getDomainMinScale(): number;
     getDomainMaxScale(): number;
     getEyeHeight(): number;
     getHeight(): number;
     setHandState(state: string): void;
     getHandState(): string;
     setRawJointData(data: Array<JointData>): void;
     setJointData(index: number, rotation: Quat, translation: Vec3): void;
     setJointData(name: string, rotation: Quat, translation: Vec3): void;
     setJointRotation(index: number, rotation: Quat): void;
     setJointRotation(name: string, rotation: Quat): void;
     setJointTranslation(index: number, translation: Vec3): void;
     setJointTranslation(name: string, translation: Vec3): void;
     clearJointData(index: number): void;
     clearJointData(name: string): void;
     isJointDataValid(index: number): boolean;
     isJointDataValid(name: string): boolean;
     getJointRotation(index: number): Quat;
     getJointRotation(name: string): Quat;
     getJointTranslation(index: number): Vec3;
     getJointTranslation(name: number): Vec3;
     getJointRotations(): Array<Quat>;
     getJointTranslations(): Array<Vec3>;
     setJointRotations(jointRotations: Array<Quat>): void;
     setJointTranslations(translations: Array<Vec3>): void;
     clearJointsData(): void;
     getJointIndex(name: string): number;
     getJointNames(): Array<string>;
     setBlendshape(name: string, value: number): void;
     getAttachmentsVariant(): object;
     setAttachmentsVariant(variant: object): void;
     updateAvatarEntity(entityID: Uuid, entityData: string): void;
     clearAvatarEntity(entityID: Uuid): void;
     setForceFaceTrackerConnected(connected: boolean): void;
     getAttachmentData(): Array<AttachmentData>;
     setAttachmentData(attachmentData: Array<AttachmentData>): void;
     attach(modelURL: string, jointName: string, translation: Vec3, rotation: Quat, scale: number, isSoft: boolean, allowDuplicates: boolean, useSaved: boolean): void;
     detachOne(modelURL: string, jointName: string): void;
     detachAll(modelURL: string, jointName: string): void;
     getAvatarEntityData(): object;
     setAvatarEntityData(avatarEntityData: object): void;
     getSensorToWorldMatrix(): Mat4;
     getSensorToWorldScale(): number;
     getControllerLeftHandMatrix(): Mat4;
     getControllerRightHandMatrix(): Mat4;
     getDataRate(rateName: string): number;
     getUpdateRate(rateName: string): number;
     sendAvatarDataPacket(sendAll: boolean): void;
     sendIdentityPacket(): void;
     setJointMappingsFromNetworkReply(): void;
     setSessionUUID(sessionUUID: Uuid): void;
     getAbsoluteJointRotationInObjectFrame(index: number): Quat;
     getAbsoluteJointTranslationInObjectFrame(index: number): Vec3;
     setAbsoluteJointRotationInObjectFrame(index: number, rotation: Quat): boolean;
     setAbsoluteJointTranslationInObjectFrame(index: number, translation: Vec3): boolean;
     getTargetScale(): number;
     resetLastSent(): void;
     displayNameChanged: Signal;
     sessionDisplayNameChanged: Signal;
     skeletonModelURLChanged: Signal;
     lookAtSnappingChanged: Signal;
     sessionUUIDChanged: Signal;
     position: Vec3;
     scale: number;
     density: number;
     handPosition: Vec3;
     bodyYaw: number;
     bodyPitch: number;
     bodyRoll: number;
     orientation: Quat;
     headOrientation: Quat;
     headPitch: number;
     headYaw: number;
     headRoll: number;
     velocity: Vec3;
     angularVelocity: Vec3;
     audioLoudness: number;
     audioAverageLoudness: number;
     displayName: string;
     sessionDisplayName: string;
     lookAtSnappingEnabled: boolean;
     skeletonModelURL: string;
     attachmentData: Array<AttachmentData>;
     jointNames: Array<string>;
     sessionUUID: Uuid;
     sensorToWorldMatrix: Mat4;
     controllerLeftHandMatrix: Mat4;
     controllerRightHandMatrix: Mat4;
     sensorToWorldScale: number;
}

declare namespace Avatar {
    interface AnimationDetails {
        role: string;
        url: string;
        fps: number;
        priority: number;
        loop: boolean;
        hold: boolean;
        startAutomatically: boolean;
        firstFrame: number;
        lastFrame: number;
        running: boolean;
        currentFrame: number;
        allowTranslation: boolean;
    }
    interface AttachmentData {
        modelUrl: string;
        joinname: string;
        translation: Vec3;
        rotation: Vec3;
        scale: number;
        soft: boolean;
    }
}

declare interface JointData {
}

declare namespace EntityViewer {
    function setPosition(position: Vec3): void;
    function setOrientation(orientation: Quat): void;
    function setCenterRadius(radius: number): void;
    function setKeyholeRadius(radius: number): void;
    function setVoxelSizeScale(sizeScale: number): void;
    function setBoundaryLevelAdjust(boundaryLevelAdjust: number): void;
    function setMaxPacketsPerSecond(maxPacketsPerSecond: number): void;
    function getPosition(): Vec3;
    function getOrientation(): Quat;
    function getVoxelSizeScale(): number;
    function getBoundaryLevelAdjust(): number;
    function getMaxPacketsPerSecond(): number;
    function getOctreeElementsCount(): number;
}

declare namespace HifiAbout {
    function openUrl(url: string): void;
    let buildDate: string;
    let buildVersion: string;
    let qtVersion: string;
}

declare namespace AvatarBookmarks {
    function addBookMark(): void;
    let bookmarkLoaded: Signal<(name: string) => void>;
    let bookmarkDeleted: Signal<(name: string) => void>;
    let bookmarkAdded: Signal<(name: string) => void>;
    function deleteBookmark(): void;
}

declare namespace LocationBookmarks {
    function deleteBookmark(): void;
    function addBookmark(): void;
    function setHomeLocationToAddress(address: string): void;
}

declare namespace LODManager {
    function setAutomaticLODAdjust(value: boolean): void;
    function getAutomaticLODAdjust(): boolean;
    function setDesktopLODTargetFPS(value: number): void;
    function getDesktopLODTargetFPS(): number;
    function setHMDLODTargetFPS(value: number): void;
    function getHMDLODTargetFPS(): number;
    function getLODFeedbackText(): string;
    function setOctreeSizeScale(sizeScale: number): void;
    function getOctreeSizeScale(): number;
    function setBoundaryLevelAdjust(boundaryLevelAdjust: number): void;
    function getBoundaryLevelAdjust(): number;
    function getLODTargetFPS(): number;
    let LODIncreased: Signal;
    let LODDecreased: Signal;
    let presentTime: number;
    let engineRunTime: number;
    let gpuTime: number;
    let avgRenderTime: number;
    let fps: number;
    let lodLevel: number;
    let lodDecreaseFPS: number;
    let lodIncreaseFPS: number;
}

declare namespace SpeechRecognizer {
    function setEnabled(enabled: boolean): void;
    function addCommand(command: string): void;
    function removeCommand(command: string): void;
    let commandRecognized: Signal;
    let enabledUpdated: Signal;
}

declare namespace AudioScope {
    function toggle(): void;
    function setVisible(visible: boolean): void;
    function getVisible(): boolean;
    function togglePause(): void;
    function setPause(paused: boolean): void;
    function getPause(): boolean;
    function toggleTrigger(): void;
    function getAutoTrigger(): boolean;
    function setAutoTrigger(autoTrigger: boolean): void;
    function setTriggerValues(x: number, y: number): void;
    function setTriggered(triggered: boolean): void;
    function getTriggered(): boolean;
    function getFramesPerSecond(): number;
    function getFramesPerScope(): number;
    function selectAudioScopeFiveFrames(): void;
    function selectAudioScopeTwentyFrames(): void;
    function selectAudioScopeFiftyFrames(): void;
    function getScopeInput(): Array<number>;
    function getScopeOutputLeft(): Array<number>;
    function getScopeOutputRight(): Array<number>;
    function getTriggerInput(): Array<number>;
    function getTriggerOutputLeft(): Array<number>;
    function getTriggerOutputRight(): Array<number>;
    function setLocalEcho(): void;
    function setServerEcho(): void;
    let pauseChanged: Signal;
    let triggered: Signal;
    let scopeInput: number;
    let scopeOutputLeft: number;
    let scopeOutputRight: number;
    let triggerInput: number;
    let triggerOutputLeft: number;
    let triggerOutputRight: number;
}

declare interface AvatarData { }
declare type RayToAvatarIntersectionResult = any;

declare namespace AvatarManager {
    function getAvatar(avatarID: Uuid): AvatarData;
    function getAvatarDataRate(sessionID: Uuid, rateName: string): number;
    function getAvatarUpdateRate(sessionID: Uuid, rateName: string): number;
    function getAvatarSimulationRate(sessionID: Uuid, rateName: string): number;
    function findRayIntersection(ray: PickRay, avatarsToInclude: Array<Uuid>, avatarsToDiscard: Array<Uuid>): RayToAvatarIntersectionResult;
    function findRayIntersectionVector(ray: PickRay, avatarsToInclude: Array<Uuid>, avatarsToDiscard: Array<Uuid>): RayToAvatarIntersectionResult;
    function getAvatarSortCoefficient(name: string): number;
    function setAvatarSortCoefficient(name: string, value: number): void;
    function getPalData(specificAvatarIdentifiers: Array<string>): object;
    function updateAvatarRenderStatus(shouldRenderAvatars: boolean): void;
    function getAvatarIdentifiers(): Array<Uuid>;
    function getAvatarsInRange(position: Vec3, range: number): Array<Uuid>;
    let avatarAddedEvent: Signal;
    let avatarRemovedEvent: Signal;
    let avatarSessionChangedEvent: Signal;
    function isAvatarInRange(position: string, range: string): boolean;
    function sessionUUIDChanged(sessionUUID: Uuid, oldSessionUUID: Uuid): void;
    function processAvatarDataPacket(message: string, sendingNode: Uuid): void;
    function processAvatarIdentityPacket(message: string, sendingNode: Uuid): void;
    function processKillAvatar(message: string, sendingNode: Uuid): void;
}

declare type DriveKeys = string;

declare namespace MyAvatar {
    function resetSensorsAndBody(): void;
    function centerBody(): void;
    function clearIKJointLimitHistory(): void;
    function setOrientationVar(newOrientationVar: object): void;
    function getOrientationVar(): object;
    function getDefaultEyePosition(): Vec3;
    function overrideAnimation(url: string, fps: number, loop: boolean, firstFrame: number, lastFrame: number): void;
    function restoreAnimation(): void;
    function getAnimationRoles(): Array<string>;
    function overrideRoleAnimation(role: string, url: string, fps: number, loop: boolean, firstFrame: number, lastFrame: number): void;
    function restoreRoleAnimation(role: string): void;
    function removeAnimationStateHandler(handler: number): void;
    function getSnapTurn(): boolean;
    function setSnapTurn(on: boolean): void;
    function setDominantHand(hand: string): void;
    function getDominantHand(): string;
    function setCenterOfGravityModelEnabled(enabled: boolean): void;
    function getCenterOfGravityModelEnabled(): boolean;
    function setHMDLeanRecenterEnabled(enabled: boolean): void;
    function getHMDLeanRecenterEnabled(): boolean;
    function requestEnableHandTouch(): void;
    function requestDisableHandTouch(): void;
    function disableHandTouchForID(entityID: Uuid): void;
    function enableHandTouchForID(entityID: Uuid): void;
    function getRawDriveKey(key: DriveKeys): number;
    function disableDriveKey(key: DriveKeys): void;
    function enableDriveKey(key: DriveKeys): void;
    function isDriveKeyDisabled(key: DriveKeys): boolean;
    function triggerVerticalRecenter(): void;
    function triggerRotationRecenter(): void;
    function isRecenteringHorizontally(): void;
    function getHeadPosition(): Vec3;
    function getHeadFinalYaw(): number;
    function getHeadFinalRoll(): number;
    function getHeadFinalPitch(): number;
    function getHeadDeltaPitch(): number;
    function getEyePosition(): Vec3;
    function getTargetAvatarPosition(): Vec3;
    function getTargetAvatar(): AvatarData;
    function getLeftHandPosition(): Vec3;
    function getRightHandPosition(): Vec3;
    function getLeftHandTipPosition(): Vec3;
    function getRightHandTipPosition(): Vec3;
    function getLeftHandPose(): Pose;
    function getRightHandPose(): Pose;
    function getLeftHandTipPose(): Pose;
    function getRightHandTipPose(): Pose;
    function worldToJointPoint(position: Vec3, jointIndex: number): Vec3;
    function worldToJointDirection(direction: Vec3, jointIndex: number): Vec3;
    function worldToJointRotation(rotation: Quat, jointIndex: number): Quat;
    function jointToWorldPoint(position: Vec3, jointIndex: number): Vec3;
    function jointToWorldDirection(direction: Vec3, jointIndex: number): Vec3;
    function jointToWorldRotation(rotation: Quat, jointIndex: number): Quat;
    function pinJoint(index: number, position: Vec3, orientation: Quat): boolean;
    function clearPinOnJoint(index: number): boolean;
    function getIKErrorOnLastSolve(): number;
    function useFullAvatarURL(fullAvatarURL: string, modelName: string): void;
    function getFullAvatarURLFromPreferences(): string;
    function getFullAvatarModelName(): string;
    function getAvatarEntitiesVariant(): Array<object>;
    function isFlying(): boolean;
    function isInAir(): boolean;
    function setFlyingEnabled(enabled: boolean): void;
    function getFlyingEnabled(): boolean;
    function setFlyingDesktopPref(enabled: boolean): void;
    function getFlyingDesktopPref(): boolean;
    function setFlyingDesktopPref(enabled: boolean): void;
    function getFlyingDesktopPref(): boolean;
    function getAvatarScale(): number;
    function setAvatarScale(scale: number): void;
    function setCollisionsEnabled(enabled: boolean): void;
    function getCollisionsEnabled(): boolean;
    function getCollisionCapsule(): object;
    function setCharacterControllerEnabled(enabled: boolean): void;
    function getCharacterControllerEnabled(): boolean;
    function isUp(direction: Vec3): boolean;
    function isDown(direction: Vec3): boolean;
    function increaseSize(): void;
    function decreaseSize(): void;
    function resetSize(): void;
    function animGraphLoaded(): void;
    function setGravity(gravity: number): void;
    function getGravity(): number;
    function goToFeetLocation(position: Vec3, hasOrientation: boolean, orientation: Quat, shouldFaceLocation: boolean): void;
    function goToLocation(position: Vec3, hasOrientation: boolean, orientation: Quat, shouldFaceLocation: boolean, withSafeLanding: boolean): void;
    function goToLocation(properties: object): void;
    function goToLocationAndEnableCollisions(position: Vec3): void;
    function safeLanding(position: Vec3): boolean;
    function restrictScaleFromDomainSettings(domainSettingsObject: object): void;
    function clearScaleRestriction(): void;
    function addThrust(thrust: Vec3): void;
    function getThrust(): Vec3;
    function setThrust(thrust: Vec3): void;
    function updateMotionBehaviorFromMenu(): void;
    function setToggleHips(enabled: boolean): void;
    function setEnableDebugDrawBaseOfSupport(enabled: boolean): void;
    function setEnableDebugDrawDefaultPose(enabled: boolean): void;
    function setEnableDebugDrawAnimPose(enabled: boolean): void;
    function setEnableDebugDrawPosition(enabled: boolean): void;
    function setEnableDebugDrawHandControllers(enabled: boolean): void;
    function setEnableDebugDrawSensorToWorldMatrix(enabled: boolean): void;
    function setEnableDebugDrawIKTargets(enabled: boolean): void;
    function setEnableDebugDrawIKConstraints(enabled: boolean): void;
    function setEnableDebugDrawIKChains(enabled: boolean): void;
    function setEnableDebugDrawDetailedCollision(enabled: boolean): void;
    function getEnableMeshVisible(): boolean;
    function setEnableMeshVisible(visible: boolean): void;
    function setEnableInverseKinematics(enabled: boolean): void;
    function getAnimGraphOverrideUrl(): string;
    function setAnimGraphOverrideUrl(url: string): void;
    function getAnimGraphUrl(): string;
    function setAnimGraphUrl(url: string): void;
    function getPositionForAudio(): Vec3;
    function getOrientationForAudio(): Quat;
    function setModelScale(scale: number): void;
    let audioListenerModeChanged: Signal;
    let transformChanged: Signal;
    let newCollisionSoundURL: Signal;
    let collisionWithEntity: Signal;
    let collisionsEnabledChanged: Signal;
    let animGraphUrlChanged: Signal;
    let energyChanged: Signal;
    let positionGoneTo: Signal;
    let onLoadComplete: Signal;
    let wentAway: Signal;
    let wentActive: Signal;
    let skeletonChanged: Signal;
    let dominantHandChanged: Signal;
    let sensorToWorldScaleChanged: Signal;
    let attachmentsChanged: Signal;
    let scaleChanged: Signal;
    let shouldDisableHandTouchChanged: Signal;
    let disableHandTouchForIDChanged: Signal;
    function getDomainMinScale(): number;
    function getDomainMaxScale(): number;
    function getEyeHeight(): number;
    function getHeight(): number;
    function setHandState(state: string): void;
    function getHandState(): string;
    function setRawJointData(data: Array<JointData>): void;
    function setJointData(index: number, rotation: Quat, translation: Vec3): void;
    function setJointRotation(index: number, rotation: Quat): void;
    function setJointTranslation(index: number, translation: Vec3): void;
    function clearJointData(index: number): void;
    function isJointDataValid(index: number): boolean;
    function getJointRotation(index: number): Quat;
    function getJointTranslation(index: number): Vec3;
    function setJointData(name: string, rotation: Quat, translation: Vec3): void;
    function setJointRotation(name: string, rotation: Quat): void;
    function setJointTranslation(name: string, translation: Vec3): void;
    function clearJointData(name: string): void;
    function isJointDataValid(name: string): boolean;
    function getJointRotation(name: string): Quat;
    function getJointTranslation(name: number): Vec3;
    function getJointRotations(): Array<Quat>;
    function getJointTranslations(): Array<Vec3>;
    function setJointRotations(jointRotations: Array<Quat>): void;
    function setJointTranslations(translations: Array<Vec3>): void;
    function clearJointsData(): void;
    function getJointIndex(name: string): number;
    function getJointNames(): Array<string>;
    function setBlendshape(name: string, value: number): void;
    function getAttachmentsVariant(): object;
    function setAttachmentsVariant(variant: object): void;
    function updateAvatarEntity(entityID: Uuid, entityData: string): void;
    function clearAvatarEntity(entityID: Uuid): void;
    function setForceFaceTrackerConnected(connected: boolean): void;
    function getAttachmentData(): Array<AttachmentData>;
    function setAttachmentData(attachmentData: Array<AttachmentData>): void;
    function attach(modelURL: string, jointName: string, translation: Vec3, rotation: Quat, scale: number, isSoft: boolean, allowDuplicates: boolean, useSaved: boolean): void;
    function detachOne(modelURL: string, jointName: string): void;
    function detachAll(modelURL: string, jointName: string): void;
    function getAvatarEntityData(): object;
    function setAvatarEntityData(avatarEntityData: object): void;
    function getSensorToWorldMatrix(): Mat4;
    function getSensorToWorldScale(): number;
    function getControllerLeftHandMatrix(): Mat4;
    function getControllerRightHandMatrix(): Mat4;
    function getDataRate(rateName: string): number;
    function getUpdateRate(rateName: string): number;
    let displayNameChanged: Signal;
    let sessionDisplayNameChanged: Signal;
    let skeletonModelURLChanged: Signal;
    let lookAtSnappingChanged: Signal;
    let sessionUUIDChanged: Signal;
    function sendAvatarDataPacket(sendAll: boolean): void;
    function sendIdentityPacket(): void;
    function setJointMappingsFromNetworkReply(): void;
    function setSessionUUID(sessionUUID: Uuid): void;
    function getAbsoluteJointRotationInObjectFrame(index: number): Quat;
    function getAbsoluteJointTranslationInObjectFrame(index: number): Vec3;
    function setAbsoluteJointRotationInObjectFrame(index: number, rotation: Quat): boolean;
    function setAbsoluteJointTranslationInObjectFrame(index: number, translation: Vec3): boolean;
    function getTargetScale(): number;
    function resetLastSent(): void;
    function getDefaultJointRotation(index: number): Quat;
    function getDefaultJointTranslation(index: number): Vec3;
    function getAbsoluteDefaultJointRotationInObjectFrame(index: number): Quat;
    function getAbsoluteDefaultJointTranslationInObjectFrame(index: number): Vec3;
    function setSkeletonOffset(offset: Vec3): void;
    function getSkeletonOffset(): Vec3;
    function getJointPosition(index: number): Vec3;
    function getJointPosition(name: string): Vec3;
    function getNeckPosition(): Vec3;
    function getAcceleration(): Vec3;
    function getWorldFeetPosition(): Vec3;
    function getParentID(): Uuid;
    function setParentID(parentID: Uuid): void;
    function getParentJointIndex(): number;
    function setParentJointIndex(parentJointIndex: number): void;
    function getSkeleton(): Array<SkeletonJoint>;
    function getSimulationRate(rateName: string): number;
    function getLeftPalmPosition(): Vec3;
    function getLeftPalmRotation(): Quat;
    function getRightPalmPosition(): Vec3;
    function getRightPalmRotation(): Quat;
    let rigReady: Signal;
    let rigReset: Signal;
    let qmlPosition: Vec3;
    let shouldRenderLocally: boolean;
    let motorVelocity: Vec3;
    let motorTimescale: number;
    let motorReferenceFrame: string;
    let motorMode: string;
    let collisionSoundURL: string;
    let audioListenerMode: number;
    let audioListenerModeHead: number;
    let audioListenerModeCamera: number;
    let audioListenerModeCustom: number;
    let hasScriptedBlendshapes: boolean;
    let hasProceduralBlinkFaceMovement: boolean;
    let hasProceduralEyeFaceMovement: boolean;
    let hasAudioEnabledFaceMovement: boolean;
    let customListenPosition: Vec3;
    let customListenOrientation: Quat;
    let leftHandPosition: Vec3;
    let rightHandPosition: Vec3;
    let leftHandTipPosition: Vec3;
    let rightHandTipPosition: Vec3;
    let leftHandPose: Pose;
    let rightHandPose: Pose;
    let leftHandTipPose: Pose;
    let rightHandTipPose: Pose;
    let centerOfGravityModelEnabled: boolean;
    let hmdLeanRecenterEnabled: boolean;
    let collisionsEnabled: boolean;
    let characterControllerEnabled: boolean;
    let useAdvancedMovementControls: boolean;
    let showPlayArea: boolean;
    let yawSpeed: number;
    let pitchSpeed: number;
    let hmdRollControlEnabled: boolean;
    let hmdRollControlDeadZone: number;
    let hmdRollControlRate: number;
    let userHeight: number;
    let userEyeHeight: number;
    let SELF_ID: Uuid;
    let walkSpeed: number;
    let walkBackwardSpeed: number;
    let sprintSpeed: number;
    let skeletonOffset: Vec3;
    let position: Vec3;
    let scale: number;
    let density: number;
    let handPosition: Vec3;
    let bodyYaw: number;
    let bodyPitch: number;
    let bodyRoll: number;
    let orientation: Quat;
    let headOrientation: Quat;
    let headPitch: number;
    let headYaw: number;
    let headRoll: number;
    let velocity: Vec3;
    let angularVelocity: Vec3;
    let audioLoudness: number;
    let audioAverageLoudness: number;
    let displayName: string;
    let sessionDisplayName: string;
    let lookAtSnappingEnabled: boolean;
    let skeletonModelURL: string;
    let attachmentData: Array<AttachmentData>;
    let jointNames: Array<string>;
    let sessionUUID: Uuid;
    let sensorToWorldMatrix: Mat4;
    let controllerLeftHandMatrix: Mat4;
    let controllerRightHandMatrix: Mat4;
    let sensorToWorldScale: number;
}

declare interface SkeletonJoint {
    name: string;
    index: number;
    parentIndex: number;
}

declare namespace FaceTracker {
    function setEnabled(enabled: boolean): void;
    function calibrate(): void;
    let muteToggled: Signal;
    function toggleMute(): void;
    function getMuted(): boolean;
}

declare namespace LaserPointers {
    function createLaserPointer(properties: Pointers.LaserPointerProperties): number;
    function enableLaserPointer(id: number): void;
    function disableLaserPointer(id: number): void;
    function removeLaserPointer(id: number): void;
    function editRenderState(id: number, renderState: string, properties: Pointers.RayPointerRenderState): void;
    function setRenderState(renderState: string, id: number): void;
    function getPrevRayPickResult(id: number): RayPickResult;
    function setPrecisionPicking(id: number, precisionPicking: boolean): void;
    function setLaserLength(id: number, laserLength: number): void;
    function setIgnoreItems(id: number, ignoreItems: Array<Uuid>): void;
    function setIncludeItems(id: number, includeItems: Array<Uuid>): void;
    function setLockEndUUID(id: number, itemID: Uuid, isOverlay: boolean, offsetMat: Mat4): void;
    function isLeftHand(id: number): boolean;
    function isRightHand(id: number): boolean;
    function isMouse(id: number): boolean;
}

declare namespace Picks {
    function createPick(type: PickType, properties: Picks.RayPickProperties): number;
    function enablePick(uid: number): void;
    function disablePick(uid: number): void;
    function removePick(uid: number): void;
    function getPrevPickResult(uid: number): RayPickResult;
    function setPrecisionPicking(uid: number, precisionPicking: boolean): void;
    function setIgnoreItems(uid: number, ignoreItems: Array<Uuid>): void;
    function setIncludeItems(uid: number, includeItems: Array<Uuid>): void;
    function isLeftHand(uid: number): boolean;
    function isRightHand(uid: number): boolean;
    function isMouse(uid: number): boolean;
    let PICK_NOTHING: number;
    let PICK_ENTITIES: number;
    let PICK_OVERLAYS: number;
    let PICK_AVATARS: number;
    let PICK_HUD: number;
    let PICK_COARSE: number;
    let PICK_INCLUDE_INVISIBLE: number;
    let PICK_INCLUDE_NONCOLLIDABLE: number;
    let PICK_ALL_INTERSECTIONS: number;
    let INTERSECTED_NONE: number;
    let INTERSECTED_ENTITY: number;
    let INTERSECTED_OVERLAY: number;
    let INTERSECTED_AVATAR: number;
    let INTERSECTED_HUD: number;
    let perFrameTimeBudget: number;
}

declare namespace Picks {
    interface RayPickProperties {
        enabled: boolean;
        filter: number;
        maxDistance: number;
        parentID: Uuid;
        parentJointIndex: number;
        joint: string;
        posOffset: Vec3;
        dirOffset: Vec3;
        position: Vec3;
        direction: Vec3;
    }
    interface StylusPickProperties {
        hand: number;
        enabled: boolean;
        filter: number;
        maxDistance: number;
    }
    interface ParabolaPickProperties {
        enabled: boolean;
        filter: number;
        maxDistance: number;
        parentID: Uuid;
        parentJointIndex: number;
        joint: string;
        posOffset: Vec3;
        dirOffset: Vec3;
        position: Vec3;
        direction: Vec3;
        speed: number;
        accelerationAxis: Vec3;
        rotateAccelerationWithAvatar: boolean;
        rotateAccelerationWithParent: boolean;
        scaleWithParent: boolean;
    }
    interface CollisionPickProperties {
        enabled: boolean;
        filter: number;
        shape: Shape;
        position: Vec3;
        orientation: Quat;
        threshold: number;
        collisionGroup: CollisionMask;
        parentID: Uuid;
        parentJointIndex: number;
        joint: string;
        scaleWithParent: boolean;
    }
}

declare namespace Pointers {
    function createPointer(type: PickType, properties: Pointers.LaserPointerProperties): number;
    function enablePointer(uid: number): void;
    function disablePointer(uid: number): void;
    function removePointer(uid: number): void;
    function editRenderState(uid: number, renderState: string, properties: Pointers.RayPointerRenderState): void;
    function setRenderState(uid: number, renderState: string): void;
    function getPrevPickResult(uid: number): RayPickResult;
    function setPrecisionPicking(uid: number, precisionPicking: boolean): void;
    function setLength(uid: number, length: number): void;
    function setIgnoreItems(uid: number, ignoreItems: Array<Uuid>): void;
    function setIncludeItems(uid: number, includeItems: Array<Uuid>): void;
    function setLockEndUUID(uid: number, objectID: Uuid, isOverlay: boolean, offsetMat: Mat4): void;
    function isLeftHand(uid: number): boolean;
    function isRightHand(uid: number): boolean;
    function isMouse(uid: number): boolean;
    function getPointerProperties(uid: number): Pointers.LaserPointerProperties;
}

declare namespace Pointers {
    interface StylusPointerProperties {
        hover: boolean;
        enabled: boolean;
    }
    interface DefaultRayPointerRenderState {
        distance: number;
    }
    interface RayPointerRenderState {
        name: string;
        start: Overlays.OverlayProperties;
        path: Overlays.OverlayProperties;
        end: Overlays.OverlayProperties;
    }
    interface LaserPointerProperties {
        faceAvatar: boolean;
        centerEndY: boolean;
        lockEnd: boolean;
        distanceScaleEnd: boolean;
        scaleWithParent: boolean;
        followNormal: boolean;
        followNormalStrength: number;
        enabled: boolean;
        renderStates: Array<Pointers.RayPointerRenderState>;
        defaultRenderStates: Array<Pointers.DefaultRayPointerRenderState>;
        hover: boolean;
        triggers: Array<Pointers.Trigger>;
    }
    interface ParabolaProperties {
        color: Color;
        alpha: number;
        width: number;
        isVisibleInSecondaryCamera: boolean;
        drawInFront: boolean;
    }
    interface DefaultParabolaPointerRenderState {
        distance: number;
    }
    interface ParabolaPointerRenderState {
        name: string;
        start: Overlays.OverlayProperties;
        path: Pointers.ParabolaProperties;
        end: Overlays.OverlayProperties;
    }
    interface ParabolaPointerProperties {
        faceAvatar: boolean;
        centerEndY: boolean;
        lockEnd: boolean;
        distanceScaleEnd: boolean;
        scaleWithParent: boolean;
        followNormal: boolean;
        followNormalStrength: number;
        enabled: boolean;
        renderStates: Array<Pointers.ParabolaPointerRenderState>;
        defaultRenderStates: Array<Pointers.DefaultParabolaPointerRenderState>;
        hover: boolean;
        triggers: Array<Pointers.Trigger>;
    }
    interface Trigger {
        action: Controller.Standard;
        button: string;
    }
}

declare namespace RayPick {
    function createRayPick(undefined: Picks.RayPickProperties): number;
    function enableRayPick(id: number): void;
    function disableRayPick(id: number): void;
    function removeRayPick(id: number): void;
    function getPrevRayPickResult(id: number): RayPickResult;
    function setPrecisionPicking(id: number, precisionPicking: boolean): void;
    function setIgnoreItems(id: number, items: Uuid[]): void;
    function setIncludeItems(id: number, items: Uuid[]): void;
    function isLeftHand(id: number): boolean;
    function isRightHand(id: number): boolean;
    function isMouse(id: number): boolean;
    let PICK_NOTHING: number;
    let PICK_ENTITIES: number;
    let PICK_OVERLAYS: number;
    let PICK_AVATARS: number;
    let PICK_HUD: number;
    let PICK_COARSE: number;
    let PICK_INCLUDE_INVISIBLE: number;
    let PICK_INCLUDE_NONCOLLIDABLE: number;
    let PICK_ALL_INTERSECTIONS: number;
    let INTERSECTED_NONE: number;
    let INTERSECTED_ENTITY: number;
    let INTERSECTED_OVERLAY: number;
    let INTERSECTED_AVATAR: number;
    let INTERSECTED_HUD: number;
}

declare type DownloadInfoResult = any;

declare namespace AccountServices {
    function getDownloadInfo(): DownloadInfoResult;
    function updateDownloadInfo(): void;
    function isLoggedIn(): boolean;
    function checkAndSignalForAccessToken(): boolean;
    function logOut(): void;
    let connected: Signal;
    let disconnected: Signal;
    let myUsernameChanged: Signal;
    let downloadInfoChanged: Signal;
    let findableByChanged: Signal;
    let loggedInChanged: Signal;
    let username: string;
    let loggedIn: boolean;
    let findableBy: string;
    let metaverseServerURL: string;
}

declare namespace Audio {
    function setInputDevice(device: object, isHMD: boolean): void;
    function setOutputDevice(device: object, isHMD: boolean): void;
    function setReverb(enable: boolean): void;
    function setReverbOptions(options: AudioEffectOptions): void;
    function startRecording(filename: string): boolean;
    function stopRecording(): void;
    function getRecording(): boolean;
    let nop: Signal;
    let mutedChanged: Signal;
    let noiseReductionChanged: Signal;
    let inputVolumeChanged: Signal;
    let inputLevelChanged: Signal;
    let contextChanged: Signal;
    function onContextChanged(): void;
    function playSound(sound: SoundObject, injectorOptions: AudioInjector.AudioInjectorOptions): AudioInjector;
    function playSystemSound(sound: SoundObject, position: Vec3): AudioInjector;
    function setStereoInput(stereo: boolean): void;
    function isStereoInput(): boolean;
    let mutedByMixer: Signal;
    let environmentMuted: Signal;
    let receivedFirstPacket: Signal;
    let disconnected: Signal;
    let noiseGateOpened: Signal;
    let noiseGateClosed: Signal;
    let inputReceived: Signal;
    let isStereoInputChanged: Signal;
    let muted: boolean;
    let noiseReduction: boolean;
    let inputLevel: number;
    let inputVolume: number;
    let context: string;
    let devices: object;
}

declare namespace Clipboard {
    function getContentsDimensions(): Vec3;
    function getClipboardContentsLargestDimension(): number;
    function importEntities(filename: string): boolean;
    function exportEntities(filename: string, entityIDs: Array<Uuid>): boolean;
    function exportEntities(filename: string, x: number, y: number, z: number, scale: number): boolean;
    function pasteEntities(position: Vec3): Array<Uuid>;
}

declare type Action = any;

declare type NamedPair = any;

declare namespace Controller {
    function captureKeyEvents(event: KeyEvent): void;
    function releaseKeyEvents(event: KeyEvent): void;
    function captureJoystick(joystickID: number): void;
    function releaseJoystick(joystickID: number): void;
    function captureEntityClickEvents(): void;
    function releaseEntityClickEvents(): void;
    function getViewportDimensions(): Vec2;
    function getRecommendedHUDRect(): Rect;
    function setVPadEnabled(enable: boolean): void;
    function setVPadHidden(hidden: boolean): void;
    function setVPadExtraBottomMargin(margin: number): void;
    let keyPressEvent: Signal;
    let keyReleaseEvent: Signal;
    let mouseMoveEvent: Signal;
    let mousePressEvent: Signal;
    let mouseDoublePressEvent: Signal;
    let mouseReleaseEvent: Signal;
    let touchBeginEvent: Signal;
    let touchEndEvent: Signal;
    let touchUpdateEvent: Signal;
    let wheelEvent: Signal;
    function getAllActions(): Array<Action>;
    function getAvailableInputs(deviceID: number): Array<NamedPair>;
    function getDeviceName(deviceID: number): string;
    function getActionValue(actionID: number): number;
    function findDevice(deviceName: string): number;
    function getDeviceNames(): Array<string>;
    function findAction(actionName: string): number;
    function getActionNames(): Array<string>;
    function getValue(source: number): number;
    function getAxisValue(source: number): number;
    function getPoseValue(source: number): Pose;
    function triggerHapticPulse(strength: number, duration: number, hand: Controller.Hand): void;
    function triggerShortHapticPulse(strength: number, hand: Controller.Hand): void;
    function triggerHapticPulseOnDevice(deviceID: number, strength: number, duration: number, hand: Controller.Hand): void;
    function triggerShortHapticPulseOnDevice(deviceID: number, strength: number, hand: Controller.Hand): void;
    function newMapping(mappingName: string): MappingObject;
    function enableMapping(mappingName: string, enable: boolean): void;
    function disableMapping(mappingName: string): void;
    function parseMapping(jsonString: string): MappingObject;
    function loadMapping(jsonURL: string): MappingObject;
    function getHardware(): Controller.Hardware;
    function getActions(): Controller.Actions;
    function getStandard(): Controller.Standard;
    function startInputRecording(): void;
    function stopInputRecording(): void;
    function startInputPlayback(): void;
    function stopInputPlayback(): void;
    function saveInputRecording(): void;
    function loadInputRecording(file: string): void;
    function getInputRecorderSaveDirectory(): string;
    function getRunningInputDevices(): Array<string>;
    function captureMouseEvents(): void;
    function releaseMouseEvents(): void;
    function captureTouchEvents(): void;
    function releaseTouchEvents(): void;
    function captureWheelEvents(): void;
    function releaseWheelEvents(): void;
    function captureActionEvents(): void;
    function releaseActionEvents(): void;
    let actionEvent: Signal;
    let inputEvent: Signal;
    let hardwareChanged: Signal;
    let deviceRunningChanged: Signal;
}

declare namespace Controller {
    interface Hand {
    }
    interface Actions {
    }
    interface Hardware {
    }
    interface Standard {
    }
    interface MappingJSON {
        name: string;
        channels: Array<Controller.MappingJSONRoute>;
    }
    interface MappingJSONRoute {
        from: string;
        peek: boolean;
        debug: boolean;
        when: string;
        filters: Controller.MappingJSONFilter;
        to: string;
    }
    interface MappingJSONAxis {
        makeAxis: Array<Array<string>>;
    }
    interface MappingJSONFilter {
        type: string;
        optional1?: string;
        optional2?: string;
    }
    interface Application {
    }
    interface HardwareKeyboard {
    }
    interface HardwareOculusTouch {
    }
    interface HardwareVive {
    }
}


declare class Desktop {
    width: number;
    height: number;
}
declare namespace Desktop {
    var ALWAYS_ON_TOP: number;
    var CLOSE_BUTTON_HIDES: number;
}

declare namespace GooglePoly {
    function setAPIKey(key: string): void;
    function getAssetList(keyword: string, category: string, format: string): string;
    function getFBX(keyword: string, category: string): string;
    function getOBJ(keyword: string, category: string): string;
    function getBlocks(keyword: string, category: string): string;
    function getGLTF(keyword: string, category: string): string;
    function getGLTF2(keyword: string, category: string): string;
    function getTilt(keyword: string, category: string): string;
    function getModelInfo(input: string): string;
}

declare namespace HMD {
    function calculateRayUICollisionPoint(position: Vec3, direction: Vec3): Vec3;
    function overlayFromWorldPoint(position: Vec3): Vec2;
    function worldPointFromOverlay(coordinates: Vec2): Vec3;
    function sphericalToOverlay(sphericalPos: Vec2): Vec2;
    function overlayToSpherical(overlayPos: Vec2): Vec2;
    function centerUI(): void;
    function preferredAudioInput(): string;
    function preferredAudioOutput(): string;
    function isHMDAvailable(name: string): boolean;
    function isHeadControllerAvailable(name: string): boolean;
    function isHandControllerAvailable(name: string): boolean;
    function isSubdeviceContainingNameAvailable(name: string): boolean;
    function requestShowHandControllers(): void;
    function requestHideHandControllers(): void;
    function shouldShowHandControllers(): boolean;
    function activateHMDHandMouse(): void;
    function deactivateHMDHandMouse(): void;
    function suppressKeyboard(): boolean;
    function unsuppressKeyboard(): void;
    function isKeyboardVisible(): boolean;
    function closeTablet(): void;
    function openTablet(contextualMode: boolean): void;
    let shouldShowHandControllersChanged: Signal;
    let IPDScaleChanged: Signal;
    let displayModeChanged: Signal;
    let mountedChanged: Signal;
    let position: Vec3;
    let orientation: Quat;
    let active: boolean;
    let mounted: boolean;
    let playerHeight: number;
    let eyeHeight: number;
    let ipd: number;
    let ipdScale: number;
    let showTablet: boolean;
    let tabletContextualMode: boolean;
    let tabletID: Uuid;
    let tabletScreenID: Uuid;
    let homeButtonID: Uuid;
    let homeButtonHighlightID: Uuid;
    let miniTabletID: Uuid;
    let miniTabletScreenID: Uuid;
    let miniTabletHand: number;
    let playArea: Rect;
    let sensorPositions: Array<Vec3>;
}

declare namespace Menu {
    function addMenu(menuName: string, grouping: string): void;
    function removeMenu(menuName: string): void;
    function menuExists(menuName: string): boolean;
    function addSeparator(menuName: string, separatorName: string): void;
    function removeSeparator(menuName: string, separatorName: string): void;
    function addMenuItem(properties: Menu.MenuItemProperties): void;
    function addMenuItem(menuName: string, menuItem: string, shortcutKey: string): void;
    function removeMenuItem(menuName: string, menuItem: string): void;
    function menuItemExists(menuName: string, menuItem: string): boolean;
    function isOptionChecked(menuOption: string): boolean;
    function setIsOptionChecked(menuOption: string, isChecked: boolean): void;
    function triggerOption(menuOption: string): void;
    function isMenuEnabled(menuName: string): boolean;
    function setMenuEnabled(menuName: string, isEnabled: boolean): void;
    let menuItemEvent: Signal<(menuItem: string) => void>;
}

declare namespace Menu {
    interface MenuItemProperties {
        menuName: string;
        menuItemName: string;
        isCheckable?: boolean;
        isChecked?: boolean;
        isSeparator?: boolean;
        shortcutKey?: string;
        shortcutKeyEvent?: KeyEvent;
        position?: number;
        beforeItem?: string;
        afterItem?: string;
        grouping?: string;
    }
}

declare namespace Selection {
    function getListNames(): Array<string>;
    function removeListFromMap(listName: string): boolean;
    function addToSelectedItemsList(listName: string, itemType: Selection.ItemType, id: Uuid): boolean;
    function removeFromSelectedItemsList(listName: string, itemType: Selection.ItemType, id: Uuid): boolean;
    function clearSelectedItemsList(listName: string): boolean;
    function printList(listName: string): void;
    function getSelectedItemsList(listName: string): Selection.SelectedItemsList;
    function getHighlightedListNames(): Array<string>;
    function enableListHighlight(listName: string, highlightStyle: Selection.HighlightStyle): boolean;
    function disableListHighlight(listName: string): boolean;
    function enableListToScene(listName: string): boolean;
    function disableListToScene(listName: string): boolean;
    function getListHighlightStyle(listName: string): Selection.HighlightStyle;
    let selectedItemsListChanged: Signal;

    type ItemType = "avatar" | "entity" | "overlay";
    interface SelectedItemsList {
        avatars: Array<Uuid>;
        entities: Array<Uuid>;
        overlays: Array<Uuid>;
    }
    interface HighlightStyle {
        outlineUnoccludedColor: Color;
        outlineOccludedColor: Color;
        fillUnoccludedColor: Color;
        fillOccludedColor: Color;
        outlineUnoccludedAlpha: number;
        outlineOccludedAlpha: number;
        fillUnoccludedAlpha: number;
        fillOccludedAlpha: number;
        outlineWidth: number;
        isOutlineSmooth: boolean;
    }
}

declare namespace Settings {
    function getValue(key: string, defaultValue: string): string;
    function setValue(key: string, value: string): void;
}

declare namespace Wallet {
    function refreshWalletStatus(): void;
    function getWalletStatus(): number;
    function proveAvatarEntityOwnershipVerification(entityID: Uuid): void;
    let walletStatusChanged: Signal;
    let walletNotSetup: Signal;
    let ownershipVerificationSuccess: Signal;
    let ownershipVerificationFailed: Signal;
    let walletStatus: number;
}

declare namespace Window {
    function hasFocus(): boolean;
    function setFocus(): void;
    function raise(): void;
    function alert(message: string): void;
    function confirm(message: string): boolean;
    function prompt(message: string, defaultText: string): string;
    function promptAsync(message: string, defaultText: string): void;
    function browseDir(title: string, directory: string): string;
    function browseDirAsync(title: string, directory: string): void;
    function browse(title: string, directory: string, nameFilter: string): string;
    function browseAsync(title: string, directory: string, nameFilter: string): void;
    function save(title: string, directory: string, nameFilter: string): string;
    function saveAsync(title: string, directory: string, nameFilter: string): void;
    function browseAssets(title: string, directory: string, nameFilter: string): string;
    function browseAssetsAsync(title: string, directory: string, nameFilter: string): void;
    function showAssetServer(uploadFile: string): void;
    function checkVersion(): string;
    function protocolSignature(): string;
    function copyToClipboard(text: string): void;
    function takeSnapshot(notify: boolean, includeAnimated: boolean, aspectRatio: number, filename: string): void;
    function takeSecondaryCameraSnapshot(notify: boolean, filename: string): void;
    function takeSecondaryCamera360Snapshot(cameraPosition: Vec3, cubemapOutputFormat: boolean, notify: boolean, filename: string): void;
    function makeConnection(success: boolean, description: string): void;
    function displayAnnouncement(message: string): void;
    function shareSnapshot(path: string, href: string): void;
    function isPhysicsEnabled(): boolean;
    function setDisplayTexture(texture: Window.DisplayTexture): boolean;
    function isPointOnDesktopWindow(point: Vec2): boolean;
    function getDeviceSize(): Vec2;
    function getLastDomainConnectionError(): Window.ConnectionRefusedReason;
    function openMessageBox(title: string, text: string, buttons: Window.MessageBoxButton, defaultButton: Window.MessageBoxButton): number;
    function openUrl(url: string): void;
    function openAndroidActivity(activityName: string, backToScene: boolean): void;
    function updateMessageBox(id: number, title: string, text: string, buttons: Window.MessageBoxButton, defaultButton: Window.MessageBoxButton): void;
    function closeMessageBox(id: number): void;
    let domainChanged: Signal;
    let svoImportRequested: Signal;
    let domainConnectionRefused: Signal;
    let redirectErrorStateChanged: Signal;
    let stillSnapshotTaken: Signal;
    let snapshot360Taken: Signal;
    let snapshotShared: Signal;
    let processingGifStarted: Signal;
    let processingGifCompleted: Signal;
    let connectionAdded: Signal;
    let connectionError: Signal;
    let announcement: Signal;
    let messageBoxClosed: Signal;
    let browseDirChanged: Signal;
    let assetsDirChanged: Signal;
    let saveFileChanged: Signal;
    let browseChanged: Signal;
    let promptTextChanged: Signal;
    let geometryChanged: Signal;
    let innerWidth: number;
    let innerHeight: number;
    let location: object;
    let x: number;
    let y: number;
}

declare namespace Window {
    type DisplayTexture = string;
    enum ConnectionRefusedReason {
        Unknown = 0,            // Some unknown reason.
        ProtocolMismatch = 1,   // The communications protocols of the domain and your Interface are not the same.
        LoginError = 2,         // You could not be logged into the domain.
        NotAuthorized = 3,      // You are not authorized to connect to the domain.
        TooManyUsers = 4,       // The domain already has its maximum number of users.
        TimedOut = 5,           // Connecting to the domain timed out.
    }
    enum MessageBoxButton {
        NoButton = 0x0,      // An invalid button.
        Ok = 0x400,          // "OK"
        Save = 0x800,        // "Save"
        SaveAll = 0x1000,    // "Save All"
        Open = 0x2000,       // "Open"
        Yes = 0x4000,        // "Yes"
        YesToAll = 0x8000,   // "Yes to All"
        No = 0x10000,        // "No"
        NoToAll = 0x20000,   // "No to All"
        Abort = 0x40000,     // "Abort"
        Retry = 0x80000,     // "Retry"
        Ignore = 0x100000,   // "Ignore"
        Close = 0x200000,    // "Close"
        Cancel = 0x400000,   // "Cancel"
        Discard = 0x800000,  // "Discard" or "Don't Save"
        Help = 0x1000000,    // "Help"
        Apply = 0x2000000,   // "Apply"
        Reset = 0x4000000,   // "Reset"
        RestoreDefaults = 0x8000000,    // "Restore Defaults"
    }
}

declare namespace AvatarInputs {
    function loudnessToAudioLevel(loudness: number): number;
    function setShowAudioTools(showAudioTools: boolean): void;
    let cameraEnabledChanged: Signal;
    let cameraMutedChanged: Signal;
    let isHMDChanged: Signal;
    let showAudioToolsChanged: Signal;
    function resetSensors(): void;
    function toggleCameraMute(): void;
    let cameraEnabled: boolean;
    let cameraMuted: boolean;
    let isHMD: boolean;
    let showAudioTools: boolean;
}

declare namespace Snapshot {
    let snapshotLocationSet: Signal;
    function getSnapshotsLocation(): string;
    function setSnapshotsLocation(location: String): void;
}

declare namespace Stats {
    let longsubmitsChanged: Signal;
    let longrendersChanged: Signal;
    let longframesChanged: Signal;
    let appdroppedChanged: Signal;
    let expandedChanged: Signal;
    let timingExpandedChanged: Signal;
    let serverCountChanged: Signal;
    let renderrateChanged: Signal;
    let presentrateChanged: Signal;
    let presentnewrateChanged: Signal;
    let presentdroprateChanged: Signal;
    let stutterrateChanged: Signal;
    let gameLoopRateChanged: Signal;
    let numPhysicsBodiesChanged: Signal;
    let avatarCountChanged: Signal;
    let updatedAvatarCountChanged: Signal;
    let notUpdatedAvatarCountChanged: Signal;
    let packetInCountChanged: Signal;
    let packetOutCountChanged: Signal;
    let mbpsInChanged: Signal;
    let mbpsOutChanged: Signal;
    let assetMbpsInChanged: Signal;
    let assetMbpsOutChanged: Signal;
    let audioPingChanged: Signal;
    let avatarPingChanged: Signal;
    let entitiesPingChanged: Signal;
    let assetPingChanged: Signal;
    let messagePingChanged: Signal;
    let positionChanged: Signal;
    let speedChanged: Signal;
    let yawChanged: Signal;
    let avatarMixerInKbpsChanged: Signal;
    let avatarMixerInPpsChanged: Signal;
    let avatarMixerOutKbpsChanged: Signal;
    let avatarMixerOutPpsChanged: Signal;
    let myAvatarSendRateChanged: Signal;
    let audioMixerInKbpsChanged: Signal;
    let audioMixerInPpsChanged: Signal;
    let audioMixerOutKbpsChanged: Signal;
    let audioMixerOutPpsChanged: Signal;
    let audioMixerKbpsChanged: Signal;
    let audioMixerPpsChanged: Signal;
    let audioOutboundPPSChanged: Signal;
    let audioSilentOutboundPPSChanged: Signal;
    let audioAudioInboundPPSChanged: Signal;
    let audioSilentInboundPPSChanged: Signal;
    let audioPacketLossChanged: Signal;
    let audioCodecChanged: Signal;
    let audioNoiseGateChanged: Signal;
    let entityPacketsInKbpsChanged: Signal;
    let downloadsChanged: Signal;
    let downloadLimitChanged: Signal;
    let downloadsPendingChanged: Signal;
    let downloadUrlsChanged: Signal;
    let processingChanged: Signal;
    let processingPendingChanged: Signal;
    let trianglesChanged: Signal;
    let drawcallsChanged: Signal;
    let materialSwitchesChanged: Signal;
    let itemConsideredChanged: Signal;
    let itemOutOfViewChanged: Signal;
    let itemTooSmallChanged: Signal;
    let itemRenderedChanged: Signal;
    let shadowConsideredChanged: Signal;
    let shadowOutOfViewChanged: Signal;
    let shadowTooSmallChanged: Signal;
    let shadowRenderedChanged: Signal;
    let sendingModeChanged: Signal;
    let packetStatsChanged: Signal;
    let lodStatusChanged: Signal;
    let serverElementsChanged: Signal;
    let serverInternalChanged: Signal;
    let serverLeavesChanged: Signal;
    let localElementsChanged: Signal;
    let localInternalChanged: Signal;
    let localLeavesChanged: Signal;
    let timingStatsChanged: Signal;
    let gameUpdateStatsChanged: Signal;
    let glContextSwapchainMemoryChanged: Signal;
    let qmlTextureMemoryChanged: Signal;
    let texturePendingTransfersChanged: Signal;
    let gpuBuffersChanged: Signal;
    let gpuBufferMemoryChanged: Signal;
    let gpuTexturesChanged: Signal;
    let gpuTextureMemoryChanged: Signal;
    let gpuTextureResidentMemoryChanged: Signal;
    let gpuTextureFramebufferMemoryChanged: Signal;
    let gpuTextureResourceMemoryChanged: Signal;
    let gpuTextureResourceIdealMemoryChanged: Signal;
    let gpuTextureResourcePopulatedMemoryChanged: Signal;
    let gpuTextureExternalMemoryChanged: Signal;
    let gpuTextureMemoryPressureStateChanged: Signal;
    let gpuFreeMemoryChanged: Signal;
    let gpuFrameTimeChanged: Signal;
    let batchFrameTimeChanged: Signal;
    let engineFrameTimeChanged: Signal;
    let avatarSimulationTimeChanged: Signal;
    let rectifiedTextureCountChanged: Signal;
    let decimatedTextureCountChanged: Signal;
    let parentChanged: Signal;
    let xChanged: Signal;
    let yChanged: Signal;
    let zChanged: Signal;
    let widthChanged: Signal;
    let heightChanged: Signal;
    let opacityChanged: Signal;
    let enabledChanged: Signal;
    let visibleChanged: Signal;
    let visibleChildrenChanged: Signal;
    let stateChanged: Signal;
    let childrenRectChanged: Signal;
    let baselineOffsetChanged: Signal;
    let clipChanged: Signal;
    let focusChanged: Signal;
    let activeFocusChanged: Signal;
    let activeFocusOnTabChanged: Signal;
    let rotationChanged: Signal;
    let scaleChanged: Signal;
    let transformOriginChanged: Signal;
    let smoothChanged: Signal;
    let antialiasingChanged: Signal;
    let implicitWidthChanged: Signal;
    let implicitHeightChanged: Signal;
    let windowChanged: Signal;
    function grabToImage(callback: object, targetSize: Size): boolean;
    function contains(point: Vec2): boolean;
    function mapFromItem(item: object): void;
    function mapToItem(item: object): void;
    function mapFromGlobal(global: object): void;
    function mapToGlobal(global: object): void;
    function forceActiveFocus(reason: number): void;
    function nextItemInFocusChain(forward: boolean): object;
    function childAt(x: number, y: number): object;
    function update(): void;
    let stylusPicksCountChanged: Signal;
    let rayPicksCountChanged: Signal;
    let parabolaPicksCountChanged: Signal;
    let collisionPicksCountChanged: Signal;
    let stylusPicksUpdatedChanged: Signal;
    let rayPicksUpdatedChanged: Signal;
    let parabolaPicksUpdatedChanged: Signal;
    let collisionPicksUpdatedChanged: Signal;
    let expanded: boolean;
    let timingExpanded: boolean;
    let monospaceFont: string;
    let serverCount: number;
    let renderrate: number;
    let presentrate: number;
    let stutterrate: number;
    let appdropped: number;
    let longsubmits: number;
    let longrenders: number;
    let longframes: number;
    let presentnewrate: number;
    let presentdroprate: number;
    let gameLoopRate: number;
    let avatarCount: number;
    let physicsObjectCount: number;
    let updatedAvatarCount: number;
    let notUpdatedAvatarCount: number;
    let packetInCount: number;
    let packetOutCount: number;
    let mbpsIn: number;
    let mbpsOut: number;
    let assetMbpsIn: number;
    let assetMbpsOut: number;
    let audioPing: number;
    let avatarPing: number;
    let entitiesPing: number;
    let assetPing: number;
    let messagePing: number;
    let position: Vec3;
    let speed: number;
    let yaw: number;
    let avatarMixerInKbps: number;
    let avatarMixerInPps: number;
    let avatarMixerOutKbps: number;
    let avatarMixerOutPps: number;
    let myAvatarSendRate: number;
    let audioMixerInKbps: number;
    let audioMixerInPps: number;
    let audioMixerOutKbps: number;
    let audioMixerOutPps: number;
    let audioMixerKbps: number;
    let audioMixerPps: number;
    let audioOutboundPPS: number;
    let audioSilentOutboundPPS: number;
    let audioAudioInboundPPS: number;
    let audioSilentInboundPPS: number;
    let audioPacketLoss: number;
    let audioCodec: string;
    let audioNoiseGate: string;
    let entityPacketsInKbps: number;
    let downloads: number;
    let downloadLimit: number;
    let downloadsPending: number;
    let downloadUrls: Array<string>;
    let processing: number;
    let processingPending: number;
    let triangles: number;
    let materialSwitches: number;
    let itemConsidered: number;
    let itemOutOfView: number;
    let itemTooSmall: number;
    let itemRendered: number;
    let shadowConsidered: number;
    let shadowOutOfView: number;
    let shadowTooSmall: number;
    let shadowRendered: number;
    let sendingMode: string;
    let packetStats: string;
    let lodStatus: string;
    let timingStats: string;
    let gameUpdateStats: string;
    let serverElements: number;
    let serverInternal: number;
    let serverLeaves: number;
    let localElements: number;
    let localInternal: number;
    let localLeaves: number;
    let rectifiedTextureCount: number;
    let decimatedTextureCount: number;
    let gpuBuffers: number;
    let gpuBufferMemory: number;
    let gpuTextures: number;
    let glContextSwapchainMemory: number;
    let qmlTextureMemory: number;
    let texturePendingTransfers: number;
    let gpuTextureMemory: number;
    let gpuTextureResidentMemory: number;
    let gpuTextureFramebufferMemory: number;
    let gpuTextureResourceMemory: number;
    let gpuTextureResourceIdealMemory: number;
    let gpuTextureResourcePopulatedMemory: number;
    let gpuTextureExternalMemory: number;
    let gpuTextureMemoryPressureState: string;
    let gpuFreeMemory: number;
    let gpuFrameTime: number;
    let batchFrameTime: number;
    let engineFrameTime: number;
    let avatarSimulationTime: number;
    let x: number;
    let y: number;
    let z: number;
    let width: number;
    let height: number;
    let opacity: number;
    let enabled: boolean;
    let visible: boolean;
    let state: string;
    let anchors: object;
    let baselineOffset: number;
    let clip: boolean;
    let focus: boolean;
    let activeFocus: boolean;
    let activeFocusOnTab: boolean;
    let rotation: number;
    let scale: number;
    let transformOrigin: number;
    let smooth: boolean;
    let antialiasing: boolean;
    let implicitWidth: number;
    let implicitHeight: number;
    let layer: object;
    let stylusPicksCount: number;
    let rayPicksCount: number;
    let parabolaPicksCount: number;
    let collisionPicksCount: number;
    let stylusPicksUpdated: Vec4;
    let rayPicksUpdated: Vec4;
    let parabolaPicksUpdated: Vec4;
    let collisionPicksUpdated: Vec4;
}

declare namespace Overlays {
    function addOverlay(type: Overlays.OverlayType, properties: Overlays.OverlayProperties): Uuid;
    function cloneOverlay(overlayID: Uuid): Uuid;
    function editOverlay(overlayID: Uuid, properties: Overlays.OverlayProperties): boolean;
    function editOverlays(propertiesById: Map<Overlays.OverlayProperties>): boolean;
    function deleteOverlay(overlayID: Uuid): void;
    function getOverlayType(overlayID: Uuid): Overlays.OverlayType;
    function getOverlayObject(overlayID: Uuid): object;
    function getOverlayAtPoint(point: Vec2): Uuid;
    function getProperty(overlayID: Uuid, property: string): object;
    function getProperties(overlayID: Uuid, properties: Array<string>): Overlays.OverlayProperties;
    function getOverlaysProperties(propertiesById: Map<Array<string>>): Map<Overlays.OverlayProperties>;
    function findRayIntersection(pickRay: PickRay, precisionPicking: boolean, overlayIDsToInclude: Array<Uuid>, overlayIDsToExclude: Array<Uuid>, visibleOnly: boolean, collidableOnly: boolean): Overlays.RayToOverlayIntersectionResult;
    function findOverlays(center: Vec3, radius: number): Array<Uuid>;
    function isLoaded(overlayID: Uuid): boolean;
    function textSize(overlayID: Uuid, text: string): Size;
    function width(): number;
    function height(): number;
    function isAddedOverlay(overlayID: Uuid): boolean;
    function sendMousePressOnOverlay(overlayID: Uuid, event: PointerEvent): void;
    function sendMouseReleaseOnOverlay(overlayID: Uuid, event: PointerEvent): void;
    function sendMouseMoveOnOverlay(overlayID: Uuid, event: PointerEvent): void;
    function sendHoverEnterOverlay(id: Uuid, event: PointerEvent): void;
    function sendHoverOverOverlay(overlayID: Uuid, event: PointerEvent): void;
    function sendHoverLeaveOverlay(overlayID: Uuid, event: PointerEvent): void;
    function getKeyboardFocusOverlay(): Uuid;
    function setKeyboardFocusOverlay(overlayID: Uuid): void;
    let overlayDeleted: Signal;
    let mousePressOnOverlay: Signal;
    let mouseDoublePressOnOverlay: Signal;
    let mouseReleaseOnOverlay: Signal;
    let mouseMoveOnOverlay: Signal;
    let mousePressOffOverlay: Signal;
    let mouseDoublePressOffOverlay: Signal;
    let hoverEnterOverlay: Signal;
    let hoverOverOverlay: Signal;
    let hoverLeaveOverlay: Signal;
    let keyboardFocusOverlay: Uuid;
}

declare namespace Overlays {
    type OverlayType = "circle3d" | "cube" | "grid" | "image" | "image3d" |
        "line3d" | "model" | "rectangle" | "rectangle3d" | "shape" | "sphere" |
        "text" | "text3d" | "web3d";
    type Shape = "Circle" | "Cone" | "Cube" | "Cylinder" | "Dodecahedron" |
        "Hexagon" | "Icosahedron" | "Line" | "Octagon" | "Octahedron" |
        "Quad" | "Sphere" | "Tetrahedron" | "Torus" | "Triangle";
    interface Rectangle3DProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        dimensions?: Vec2;
    }
    interface RectangleProperties {
        bounds?: Rect;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        color?: Color;
        alpha?: number;
        borderWidth?: number;
        radius?: number;
        borderColor?: Color;
        borderAlpha?: number;
        visible?: boolean;
    }
    interface ShapeProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        dimensions?: Vec3;
        shape?: Overlays.Shape;
    }
    interface SphereProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        dimensions?: Vec3;
    }
    interface Text3DProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        dimensions?: Vec2;
        isFacingAvatar?: boolean;
        text?: string;
        textAlpha?: number;
        backgroundColor?: Color;
        backgroundAlpha?: number;
        lineHeight?: number;
        leftMargin?: number;
        topMargin?: number;
        rightMargin?: number;
        bottomMargin?: number;
    }
    interface TextProperties {
        bounds?: Rect;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        margin?: number;
        leftMargin?: number;
        topMargin?: number;
        text?: string;
        lineHeight?: number;
        color?: Color;
        alpha?: number;
        backgroundColor?: Color;
        backgroundAlpha?: number;
        visible?: boolean;
    }
    interface Web3DProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        isFacingAvatar?: boolean;
        url?: string;
        scriptURL?: string;
        dpi?: number;
        dimensions?: Vec2;
        maxFPS?: number;
        showKeyboardFocusHighlight?: boolean;
        inputMode?: string;
    }
    interface Circle3DProperties {
        type?: string;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        dimensions?: Vec2;
        startAt?: number;
        endAt?: number;
        outerRadius?: number;
        innerRadius?: number;
        color?: Color;
        startColor?: Color;
        endColor?: Color;
        innerColor?: Color;
        outerColor?: Color;
        innerStartcolor?: Color;
        innerEndColor?: Color;
        outerStartColor?: Color;
        outerEndColor?: Color;
        alpha?: number;
        startAlpha?: number;
        endAlpha?: number;
        innerAlpha?: number;
        outerAlpha?: number;
        innerStartAlpha?: number;
        innerEndAlpha?: number;
        outerStartAlpha?: number;
        outerEndAlpha?: number;
        hasTickMarks?: boolean;
        majorTickMarksAngle?: number;
        minorTickMarksAngle?: number;
        majorTickMarksLength?: number;
        minorTickMarksLength?: number;
        majorTickMarksColor?: Color;
        minorTickMarksColor?: Color;
    }
    interface CubeProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        dimensions?: Vec3;
    }
    interface GridProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        dimensions?: Vec2;
        followCamera?: boolean;
        majorGridEvery?: number;
        minorGridEvery?: number;
    }
    interface Image3DProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        dimensions?: Vec2;
        isFacingAvatar?: boolean;
        url?: string;
        subImage?: Rect;
        emissive?: boolean;
    }
    interface ImageProperties {
        bounds?: Rect;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        imageURL?: string;
        subImage?: Vec2;
        color?: Color;
        alpha?: number;
        visible?: boolean;
    }
    interface Line3DProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        endParentID?: Uuid;
        endParentJointIndex?: number;
        start?: Vec3;
        end?: Vec3;
        localStart?: Vec3;
        localEnd?: Vec3;
        length?: number;
        glow?: number;
        lineWidth?: number;
    }
    interface ModelProperties {
        type?: string;
        color?: Color;
        alpha?: number;
        pulseMax?: number;
        pulseMin?: number;
        pulsePeriod?: number;
        alphaPulse?: number;
        colorPulse?: number;
        visible?: boolean;
        name?: string;
        position?: Vec3;
        localPosition?: Vec3;
        rotation?: Quat;
        localRotation?: Quat;
        isSolid?: boolean;
        isDashedLine?: boolean;
        ignorePickIntersection?: boolean;
        drawInFront?: boolean;
        isGroupCulled?: boolean;
        grabbable?: boolean;
        parentID?: Uuid;
        parentJointIndex?: number;
        url?: string;
        loadPriority?: number;
        dimensions?: Vec3;
        scale?: Vec3;
        textures?: Map<string>;
        jointNames?: Array<string>;
        jointRotations?: Array<Quat>;
        jointTranslations?: Array<Vec3>;
        jointOrientations?: Array<Quat>;
        jointPositions?: Array<Vec3>;
        animationSettings?: Entities.AnimationProperties;
    }
    interface OverlayProperties {
    }
    interface RayToOverlayIntersectionResult {
        intersects?: boolean;
        overlayID?: Uuid;
        distance?: number;
        surfaceNormal?: Vec3;
        intersection?: Vec3;
        extraInfo?: object;
    }
}

declare interface AnimationObject {
    getJointNames(): Array<string>;
    getFrames(): Array<FBXAnimationFrame>;
}

declare namespace AnimationCache {
    function getAnimation(url: string): AnimationObject;
    function getResourceList(): Array<string>;
    function updateTotalSize(deltaSize: number): void;
    function prefetch(url: string, extra: object): ResourceObject;
    let dirty: Signal;
    let numTotal: number;
    let numCached: number;
    let sizeTotal: number;
    let sizeCached: number;
}

declare namespace AudioStats {
    let pingMsChanged: Signal;
    let inputReadMsMaxChanged: Signal;
    let inputUnplayedMsMaxChanged: Signal;
    let outputUnplayedMsMaxChanged: Signal;
    let sentTimegapMsMaxChanged: Signal;
    let sentTimegapMsAvgChanged: Signal;
    let sentTimegapMsMaxWindowChanged: Signal;
    let sentTimegapMsAvgWindowChanged: Signal;
    let mixerStreamChanged: Signal;
    let clientStreamChanged: Signal;
    let injectorStreamsChanged: Signal;
    let pingMs: number;
    let inputReadMsMax: number;
    let inputUnplayedMsMax: number;
    let outputUnplayedMsMax: number;
    let sentTimegapMsMax: number;
    let sentTimegapMsAvg: number;
    let sentTimegapMsMaxWindow: number;
    let sentTimegapMsAvgWindow: number;
    let clientStream: AudioStats.AudioStreamStats;
    let mixerStream: AudioStats.AudioStreamStats;
}

declare namespace AudioStats {
    interface AudioStreamStats {
    }
}

declare interface AudioEffectOptions {
    bandwidth: number;
    preDelay: number;
    lateDelay: number;
    reverbTime: number;
    earlyDiffusion: number;
    lateDiffusion: number;
    roomSize: number;
    density: number;
    bassMult: number;
    bassFreq: number;
    highGain: number;
    highFreq: number;
    modRate: number;
    modDepth: number;
    earlyGain: number;
    lateGain: number;
    earlyMixLeft: number;
    earlyMixRight: number;
    lateMixLeft: number;
    lateMixRight: number;
    wetDryMix: number;
}

declare interface SoundObject {
    ready: Signal;
}

declare namespace SoundCache {
    function getSound(url: string): SoundObject;
    function getResourceList(): Array<string>;
    function updateTotalSize(deltaSize: number): void;
    function prefetch(url: string, extra: object): ResourceObject;
    let dirty: Signal;
    let numTotal: number;
    let numCached: number;
    let sizeTotal: number;
    let sizeCached: number;
}

declare namespace AvatarList {
    function getAvatarIdentifiers(): Array<Uuid>;
    function getAvatarsInRange(position: Vec3, range: number): Array<Uuid>;
    function getAvatar(avatarID: Uuid): Avatar;
    let avatarAddedEvent: Signal;
    let avatarRemovedEvent: Signal;
    let avatarSessionChangedEvent: Signal;
    function isAvatarInRange(position: string, range: string): boolean;
    function sessionUUIDChanged(sessionUUID: Uuid, oldSessionUUID: Uuid): void;
    function processAvatarDataPacket(message: string, sendingNode: Uuid): void;
    function processAvatarIdentityPacket(message: string, sendingNode: Uuid): void;
    function processKillAvatar(message: string, sendingNode: Uuid): void;
}

declare interface MappingObject {
    fromQml(source: Controller.Standard): RouteObject;
    makeAxisQml(source1: Controller.Hardware, source2: Controller.Hardware): RouteObject;
    from(source: Controller.Standard): RouteObject;
    makeAxis(source1: Controller.Hardware, source2: Controller.Hardware): RouteObject;
    enable(enable: boolean): MappingObject;
    disable(): MappingObject;
}

declare interface RouteObject {
    toQml(destination: Controller.Standard): void;
    whenQml(expression: string): RouteObject;
    to(destination: Controller.Standard): void;
    debug(enable: boolean): RouteObject;
    peek(enable: boolean): RouteObject;
    when(expression: string): RouteObject;
    clamp(min: number, max: number): RouteObject;
    hysteresis(min: number, max: number): RouteObject;
    pulse(interval: number): RouteObject;
    scale(multiplier: number): RouteObject;
    invert(): RouteObject;
    deadZone(min: number): RouteObject;
    constrainToInteger(): RouteObject;
    constrainToPositiveInteger(): RouteObject;
    translate(translate: Vec3): RouteObject;
    transform(transform: Mat4): RouteObject;
    postTransform(transform: Mat4): RouteObject;
    rotate(rotation: Quat): RouteObject;
    lowVelocity(rotationConstant: number, translationConstant: number): RouteObject;
    exponentialSmoothing(rotationConstant: number, translationConstant: number): RouteObject;
    logicalNot(): RouteObject;
}

declare namespace Reticle {
    function isMouseCaptured(): boolean;
    function getAllowMouseCapture(): boolean;
    function setAllowMouseCapture(allowMouseCaptured: boolean): void;
    function isPointingAtSystemOverlay(): boolean;
    function getVisible(): boolean;
    function setVisible(visible: boolean): void;
    function getDepth(): number;
    function setDepth(depth: number): void;
    function getScale(): number;
    function setScale(scale: number): void;
    function getPosition(): Vec2;
    function setPosition(position: Vec2): void;
    function getMaximumPosition(): Vec2;
    let allowMouseCapture: boolean;
    let depth: number;
    let maximumPosition: Vec2;
    let mouseCaptured: boolean;
    let pointingAtSystemOverlay: boolean;
    let position: Vec2;
    let scale: number;
    let visible: boolean;
}

declare namespace Entities {
    function getMultipleEntityProperties(entityIDs: Array<Uuid>, desiredProperties: Array<string>): Array<Entities.EntityProperties>;
    function canAdjustLocks(): boolean;
    function canRez(): boolean;
    function canRezTmp(): boolean;
    function canRezCertified(): boolean;
    function canRezTmpCertified(): boolean;
    function canWriteAssets(): boolean;
    function canReplaceContent(): boolean;
    function addEntity(properties: Entities.EntityProperties, clientOnly: boolean): Uuid;
    function cloneEntity(entityID: Uuid): Uuid;
    function getEntityProperties(entityID: Uuid, desiredProperties?: Array<string>): Entities.EntityProperties;
    function editEntity(entityID: Uuid, properties: Entities.EntityProperties): Uuid;
    function deleteEntity(entityID: Uuid): void;
    function callEntityMethod(entityID: Uuid, method: string, parameters: Array<string>): void;
    function callEntityServerMethod(entityID: Uuid, method: string, parameters: Array<string>): void;
    function callEntityClientMethod(clientSessionID: Uuid, entityID: Uuid, method: string, parameters: Array<string>): void;
    function findClosestEntity(center: Vec3, radius: number): Uuid;
    function findEntities(center: Vec3, radius: number): Array<Uuid>;
    function findEntitiesInBox(corner: Vec3, dimensions: Vec3): Array<Uuid>;
    function findEntitiesInFrustum(frustum: ViewFrustum): Array<Uuid>;
    function findEntitiesByType(entityType: Entities.EntityType, center: Vec3, radius: number): Array<Uuid>;
    function findEntitiesByName(entityName: string, center: Vec3, radius: number, caseSensitive: boolean): Array<Uuid>;
    function findRayIntersection(pickRay: PickRay, precisionPicking: boolean, entitiesToInclude: Array<Uuid>, entitiesToDiscard: Array<Uuid>, visibleOnly: boolean, collideableOnly: boolean): Entities.RayToEntityIntersectionResult;
    function findRayIntersectionBlocking(pickRay: PickRay, precisionPicking: boolean, entitiesToInclude: Array<Uuid>, entitiesToDiscard: Array<Uuid>): void;
    function reloadServerScripts(entityID: Uuid): boolean;
    function getServerScriptStatus(entityID: Uuid, callback: any): boolean;
    function queryPropertyMetadata(entityID: Uuid, property: string, callback: any): boolean;
    function queryPropertyMetadata(entityID: Uuid, property: string, scope: object, callback: any): boolean;
    function setLightsArePickable(value: boolean): void;
    function getLightsArePickable(): boolean;
    function setZonesArePickable(value: boolean): void;
    function getZonesArePickable(): boolean;
    function setDrawZoneBoundaries(value: boolean): void;
    function getDrawZoneBoundaries(): boolean;
    function setVoxelSphere(entityID: Uuid, center: Vec3, radius: number, value: number): void;
    function setVoxelCapsule(entityID: Uuid, start: Vec3, end: Vec3, radius: number, value: number): void;
    function setVoxel(entityID: Uuid, position: Vec3, value: number): void;
    function setAllVoxels(entityID: Uuid, value: number): void;
    function setVoxelsInCuboid(entityID: Uuid, lowPosition: Vec3, cuboidSize: Vec3, value: number): void;
    function voxelCoordsToWorldCoords(entityID: Uuid, voxelCoords: Vec3): Vec3;
    function worldCoordsToVoxelCoords(entityID: Uuid, worldCoords: Vec3): Vec3;
    function voxelCoordsToLocalCoords(entityID: Uuid, voxelCoords: Vec3): Vec3;
    function localCoordsToVoxelCoords(entityID: Uuid, localCoords: Vec3): Vec3;
    function setAllPoints(entityID: Uuid, points: Array<Vec3>): boolean;
    function appendPoint(entityID: Uuid, point: Vec3): boolean;
    function dumpTree(): void;
    function addAction(actionType: Entities.ActionType, entityID: Uuid, arguments: Entities.ActionArguments): Uuid;
    function updateAction(entityID: Uuid, actionID: Uuid, arguments: Entities.ActionArguments): boolean;
    function deleteAction(entityID: Uuid, actionID: Uuid): boolean;
    function getActionIDs(entityID: Uuid): Array<Uuid>;
    function getActionArguments(entityID: Uuid, actionID: Uuid): Entities.ActionArguments;
    function getAbsoluteJointTranslationInObjectFrame(entityID: Uuid, jointIndex: number): Vec3;
    function getAbsoluteJointRotationInObjectFrame(entityID: Uuid, jointIndex: number): Quat;
    function setAbsoluteJointTranslationInObjectFrame(entityID: Uuid, jointIndex: number, translation: Vec3): boolean;
    function setAbsoluteJointRotationInObjectFrame(entityID: Uuid, jointIndex: number, rotation: Quat): boolean;
    function getLocalJointTranslation(entityID: Uuid, jointIndex: number): Vec3;
    function getLocalJointRotation(entityID: Uuid, jointIndex: number): Quat;
    function setLocalJointTranslation(entityID: Uuid, jointIndex: number, translation: Vec3): boolean;
    function setLocalJointRotation(entityID: Uuid, jointIndex: number, rotation: Quat): boolean;
    function setLocalJointTranslations(entityID: Uuid, translations: Array<Vec3>): boolean;
    function setLocalJointRotations(entityID: Uuid, rotations: Array<Quat>): boolean;
    function setLocalJointsData(entityID: Uuid, rotations: Array<Quat>, translations: Array<Vec3>): boolean;
    function getJointIndex(entityID: Uuid, name: string): number;
    function getJointNames(entityID: Uuid): Array<string>;
    function getChildrenIDs(parentID: Uuid): Array<Uuid>;
    function getChildrenIDsOfJoint(parentID: Uuid, jointIndex: number): Array<Uuid>;
    function isChildOfParent(childID: Uuid, parentID: Uuid): boolean;
    function getNestableType(entityID: Uuid): string;
    function getKeyboardFocusEntity(): Uuid;
    function setKeyboardFocusEntity(entityID: Uuid): void;
    function sendMousePressOnEntity(entityID: Uuid, event: PointerEvent): void;
    function sendMouseMoveOnEntity(entityID: Uuid, event: PointerEvent): void;
    function sendMouseReleaseOnEntity(entityID: Uuid, event: PointerEvent): void;
    function sendClickDownOnEntity(entityID: Uuid, event: PointerEvent): void;
    function sendHoldingClickOnEntity(entityID: Uuid, event: PointerEvent): void;
    function sendClickReleaseOnEntity(entityID: Uuid, event: PointerEvent): void;
    function sendHoverEnterEntity(entityID: Uuid, event: PointerEvent): void;
    function sendHoverOverEntity(entityID: Uuid, event: PointerEvent): void;
    function sendHoverLeaveEntity(entityID: Uuid, event: PointerEvent): void;
    function wantsHandControllerPointerEvents(entityID: Uuid): boolean;
    function emitScriptEvent(entityID: Uuid, message: string): void;
    function AABoxIntersectsCapsule(brn: Vec3, dimensions: Vec3, start: Vec3, end: Vec3, radius: number): boolean;
    function getMeshes(entityID: Uuid, callback: Function): void;
    function getEntityTransform(entityID: Uuid): Mat4;
    function getEntityLocalTransform(entityID: Uuid): Mat4;
    function getfunctionCertificateJSON(entityID: Uuid): string;
    function verifyfunctionCertificateProperties(entityID: Uuid): boolean;
    let collisionWithEntity: Signal;
    let canAdjustLocksChanged: Signal;
    let canRezChanged: Signal;
    let canRezTmpChanged: Signal;
    let canRezCertifiedChanged: Signal;
    let canRezTmpCertifiedChanged: Signal;
    let canWriteAssetsChanged: Signal;
    let mousePressOnEntity: Signal;
    let mouseDoublePressOnEntity: Signal;
    let mouseMoveOnEntity: Signal;
    let mouseReleaseOnEntity: Signal;
    let mousePressOffEntity: Signal;
    let mouseDoublePressOffEntity: Signal;
    let clickDownOnEntity: Signal;
    let holdingClickOnEntity: Signal;
    let clickReleaseOnEntity: Signal;
    let hoverEnterEntity: Signal;
    let hoverOverEntity: Signal;
    let hoverLeaveEntity: Signal;
    let enterEntity: Signal;
    let leaveEntity: Signal;
    let deletingEntity: Signal;
    let addingEntity: Signal;
    let clearingEntities: Signal;
    let webEventReceived: Signal;
    function setPacketsPerSecond(packetsPerSecond: number): void;
    function getPacketsPerSecond(): number;
    function serversExist(): boolean;
    function hasPacketsToSend(): boolean;
    function packetsToSendCount(): number;
    function getLifetimePPS(): number;
    function getLifetimeBPS(): number;
    function getLifetimePPSQueued(): number;
    function getLifetimeBPSQueued(): number;
    function getLifetimeInUsecs(): number;
    function getLifetimeInSeconds(): number;
    function getLifetimePacketsSent(): number;
    function getLifetimeBytesSent(): number;
    function getLifetimePacketsQueued(): number;
    function getLifetimeBytesQueued(): number;
    let preload: Signal;
    let unload: Signal;
    let keyboardFocusEntity: Uuid;
}

declare namespace Entities {
    type ActionType = "far-grab" | "hold" | "offset" | "tractor" | "travel-oriented" | "hinge" | "slider" | "cone-twist" | "ball-socket" | "spring";
    type EntityType = "Box" | "Light" | "Line" | "Material" | "Model" | "ParticleEffect" | "PolyLine" | "PolyVox" | "Shape" | "Sphere" | "Text" | "Web" | "Zone"
    type PhysicsMotionType = "function" | "kinematic" | "dynamic";
    type Shape = "Circle" | "Cube" | "Cone" | "Cylinder" | "Dodecahedron" | "Hexagon" | "Icosahedron" | "Octagon" | "Octahedron" | "Quad" | "Sphere" | "Tetrahedron" | "Torus" | "Triangle";
    type PolyVoxSurfaceStyle = 0 | 1 | 2 | 3;
    interface Haze {
        hazeRange: number;
        hazeColor: Color;
        hazeEnableGlare: boolean;
        hazeGlareColor: Color;
        hazeGlareAngle: number;
        hazeAltitudeEffect: boolean;
        hazeBaseRef: number;
        hazeCeiling: number;
        hazeBackgroundBlend: number;
        hazeAttenuateKeyLight: boolean;
        hazeKeyLightRange: number;
        hazeKeyLightAltitude: number;
    }
    interface KeyLight {
        color: Color;
        intensity: number;
        direction: Vec3;
        castShadows: boolean;
    }
    interface Skybox {
        color: Color;
        url: string;
    }
    interface OffsetArguments extends ActionArguments {
        pointToOffsetFrom: Vec3;
        linearDistance: number;
        linearTimeScale: number;
    }
    interface TractorArguments extends ActionArguments {
        targetPosition: Vec3;
        targetRotation: Quat;
        otherID: Uuid;
        linearTimeScale: number;
        angularTimeScale: number;
    }
    interface TravelOrientedArguments extends ActionArguments {
        forward: Vec3;
        angularTimeScale: number;
    }
    interface BallSocketArguments extends ActionArguments {
        pivot: Vec3;
        otherEntityID: Uuid;
        otherPivot: Vec3;
    }
    interface ConeTwistArguments extends ActionArguments {
        pivot: Vec3;
        axis: Vec3;
        otherEntityID: Uuid;
        otherPivot: Vec3;
        otherAxis: Vec3;
        swingSpan1: number;
        swingSpan2: number;
        twistSpan: number;
    }
    interface HingeArguments extends ActionArguments {
        pivot: Vec3;
        axis: Vec3;
        otherEntityID: Uuid;
        otherPivot: Vec3;
        otherAxis: Vec3;
        low: number;
        high: number;
        angle: number;
    }
    interface SliderArguments extends ActionArguments {
        point: Vec3;
        axis: Vec3;
        otherEntityID: Uuid;
        otherPoint: Vec3;
        linearLow: number;
        linearHigh: number;
        angularLow: number;
        angularHigh: number;
        linearPosition: number;
        angularPosition: number;
    }
    interface ActionArguments {
        type: Entities.ActionType;
        tag: string;
        ttl: number;
        isMine: boolean;
        noMotionState: boolean;
        active: boolean;
        motionType: Entities.PhysicsMotionType;
    }
    interface FarGrabArguments extends ActionArguments {
        targetPosition?: Vec3;
        targetRotation?: Quat;
        otherID?: Uuid;
        linearTimeScale?: number;
        angularTimeScale?: number;
    }
    interface HoldArguments extends ActionArguments {
        holderID?: Uuid;
        relativePosition?: Vec3;
        relativeRotation?: Vec3;
        timeScale?: number;
        hand?: string;
        kinematic?: boolean;
        kinematicSetVelocity?: boolean;
        ignoreIK?: boolean;
    }
    interface AmbientLight {
        ambientIntensity?: number;
        ambientURL?: string;
    }
    interface AnimationProperties {
        url?: string;
        fps?: number;
        firstFrame?: number;
        lastFrame?: number;
        currentFrame?: number;
        running?: boolean;
        loop?: boolean;
        hold?: boolean;
        allowTranslation?: boolean;
    }
    interface Bloom {
        bloomIntensity?: number;
        bloomThreshold?: number;
        bloomSize?: number;
    }
    interface EntityProperties {
        id?: Uuid;
        name?: string;
        type?: Entities.EntityType;
        clientOnly?: boolean;
        owningAvatarID?: Uuid;
        created?: string;
        age?: number;
        ageAsText?: string;
        lifetime?: number;
        lastEdited?: number;
        lastEditedBy?: Uuid;
        locked?: boolean;
        visible?: boolean;
        canCastShadow?: boolean;
        isVisibleInSecondaryCamera?: boolean;
        position?: Vec3;
        rotation?: Quat;
        registrationPoint?: Vec3;
        naturalPosition?: Vec3;
        naturalDimensions?: Vec3;
        velocity?: Vec3;
        damping?: number;
        angularVelocity?: Vec3;
        angularDamping?: number;
        gravity?: Vec3;
        acceleration?: Vec3;
        restitution?: number;
        friction?: number;
        density?: number;
        collisionless?: boolean;
        ignoreForCollisions?: boolean;
        collisionMask?: CollisionMask;
        collidesWith?: string;
        collisionSoundURL?: string;
        dynamic?: boolean;
        collisionsWillMove?: boolean;
        href?: string;
        description?: string;
        userData?: string;
        script?: string;
        scriptTimestamp?: number;
        serverScripts?: string;
        parentID?: Uuid;
        parentJointIndex?: number;
        localPosition?: Vec3;
        localRotation?: Quat;
        localVelocity?: Vec3;
        localAngularVelocity?: Vec3;
        localDimensions?: Vec3;
        boundingBox?: Entities.BoundingBox;
        queryAACube?: AACube;
        actionData?: string;
        renderInfo?: Entities.RenderInfo;
        cloneable?: boolean;
        cloneLifetime?: number;
        cloneLimit?: number;
        cloneDynamic?: boolean;
        cloneAvatarEntity?: boolean;
        cloneOriginID?: Uuid;
        itemName?: string;
        itemDescription?: string;
        itemCategories?: string;
        itemArtist?: string;
        itemLicense?: string;
        limitedRun?: number;
        editionNumber?: number;
        entityInstanceNumber?: number;
        marketplaceID?: string;
        certificateID?: string;
        functionCertificateVersion?: number;
    }
    interface BoxProperties extends EntityProperties {
    }
    interface LightProperties extends EntityProperties {
        dimensions?: Vec3;
        color?: Color;
        intensity?: number;
        falloffRadius?: number;
        isSpotlight?: boolean;
        exponent?: number;
        cutoff?: number;
    }
    interface LineProperties extends EntityProperties {
        dimensions?: Vec3;
        linePoints?: Array<Vec3>;
        lineWidth?: number;
        color?: Color;
    }
    interface MaterialProperties extends EntityProperties {
        materialURL?: string;
        priority?: number;
        parentMaterialName?: string;
        materialMappingMode?: string;
        materialMappingPos?: Vec2;
        materialMappingScale?: Vec2;
        materialMappingRot?: number;
        materialData?: string;
    }
    interface ModelProperties extends EntityProperties {
        dimensions?: Vec3;
        color?: Color;
        modelURL?: string;
        textures?: string;
        originalTextures?: string;
        shapeType?: ShapeType;
        compoundShapeURL?: string;
        animation?: Entities.AnimationProperties;
        jointRotations?: Array<Quat>;
        jointRotationsSet?: Array<boolean>;
        jointTranslations?: Array<Vec3>;
        jointTranslationsSet?: Array<boolean>;
        relayParentJoints?: boolean;
    }
    interface ParticleEffectProperties extends EntityProperties {
        isEmitting?: boolean;
        maxParticles?: number;
        lifespan?: number;
        emitRate?: number;
        emitSpeed?: number;
        speedSpread?: number;
        emitAcceleration?: Vec3;
        accelerationSpread?: Vec3;
        dimensions?: Vec3;
        emitterShouldTrail?: boolean;
        emitOrientation?: Quat;
        emitDimensions?: Vec3;
        emitRadiusStart?: number;
        polarStart?: number;
        polarFinish?: number;
        azimuthStart?: number;
        azimuthFinish?: number;
        textures?: string;
        particleRadius?: number;
        radiusStart?: number;
        radiusFinish?: number;
        radiusSpread?: number;
        color?: Color;
        colorStart?: Color;
        colorFinish?: Color;
        colorSpread?: Color;
        alpha?: number;
        alphaStart?: number;
        alphaFinish?: number;
        alphaSpread?: number;
        particleSpin?: number;
        spinStart?: number;
        spinFinish?: number;
        spinSpread?: number;
        rotateWithEntity?: boolean;
        shapeType?: ShapeType;
    }
    interface PolyLineProperties extends EntityProperties {
        dimensions?: Vec3;
        linePoints?: Array<Vec3>;
        normals?: Array<Vec3>;
        strokeWidths?: Array<number>;
        lineWidth?: number;
        strokeColors?: Array<Vec3>;
        color?: Color;
        textures?: string;
        isUVModeStretch?: boolean;
    }
    interface PolyVoxProperties extends EntityProperties {
        dimensions?: Vec3;
        voxelVolumeSize?: Vec3;
        voxelData?: string;
        voxelSurfaceStyle?: Entities.PolyVoxSurfaceStyle;
        xTextureURL?: string;
        yTextureURL?: string;
        zTextureURL?: string;
        xNNeighborID?: Uuid;
        yNNeighborID?: Uuid;
        zNNeighborID?: Uuid;
        xPNeighborID?: Uuid;
        yPNeighborID?: Uuid;
        zPNeighborID?: Uuid;
    }
    interface ShapeProperties extends EntityProperties {
        shape?: Entities.Shape;
        dimensions?: Vec3;
        color?: Color;
    }
    interface SphereProperties extends EntityProperties {
    }
    interface TextProperties extends EntityProperties {
        dimensions?: Vec3;
        text?: string;
        lineHeight?: number;
        textColor?: Color;
        backgroundColor?: Color;
        faceCamera?: boolean;
    }
    interface WebProperties extends EntityProperties {
        dimensions?: Vec3;
        sourceUrl?: string;
        dpi?: number;
    }
    interface ZoneProperties extends EntityProperties {
        dimensions?: Vec3;
        shapeType?: ShapeType;
        compoundShapeURL?: string;
        keyLightMode?: string;
        keyLight?: Entities.KeyLight;
        ambientLightMode?: string;
        ambientLight?: Entities.AmbientLight;
        skyboxMode?: string;
        skybox?: Entities.Skybox;
        hazeMode?: string;
        haze?: Entities.Haze;
        bloomMode?: string;
        bloom?: Entities.Bloom;
        flyingAllowed?: boolean;
        ghostingAllowed?: boolean;
        filterURL?: string;
    }
    interface BoundingBox {
        brn?: Vec3;
        tfl?: Vec3;
        center?: Vec3;
        dimensions?: Vec3;
    }
    interface RenderInfo {
        verticesCount?: number;
        texturesCount?: number;
        textureSize?: number;
        hasTransparent?: boolean;
        drawCalls?: number;
    }
    interface RayToEntityIntersectionResult {
        intersects?: boolean;
        accurate?: boolean;
        entityID?: Uuid;
        distance?: number;
        intersection?: Vec3;
        surfaceNormal?: Vec3;
        face?: BoxFace;
        extraInfo?: object;
    }
}

declare namespace Graphics {
    function getModel(entityID: Uuid): Graphics.Model;
    function updateModel(id: Uuid, model: Graphics.Model): boolean;
    function canUpdateModel(id: Uuid, meshIndex: number, partNumber: number): boolean;
    function newModel(meshes: Array<Graphics.Mesh>): Graphics.Model;
    function newMesh(ifsMeshData: Graphics.IFSData): Graphics.Mesh;
    function exportModelToOBJ(model: Graphics.Model): string;
}

declare namespace Graphics {
    interface Material {
        name: string;
        model: string;
        opacity: number;
        roughness: number;
        metallic: number;
        scattering: number;
        unlit: boolean;
        emissiveMap: string;
        albedoMap: string;
        opacityMap: string;
        metallicMap: string;
        specularMap: string;
        roughnessMap: string;
        glossMap: string;
        normalMap: string;
        bumpMap: string;
        occlusionMap: string;
        lightmapMap: string;
        scatteringMap: string;
    }
    interface MaterialLayer {
        material: Graphics.Material;
        priority: number;
    }
    interface IFSData {
        name: string;
        topology: string;
        indices: Array<number>;
        vertices: Array<Vec3>;
        normals: Array<Vec3>;
        colors: Array<Vec3>;
        texCoords0: Array<Vec2>;
    }
    interface Mesh {
        parts: Array<Graphics.MeshPart>;
        attributeNames: Array<string>;
        numParts: number;
        numIndices: number;
        numVertices: number;
        numAttributes: number;
        valid: boolean;
        strong: boolean;
        extents: object;
        bufferFormats: object;
    }
    interface MeshPart {
        valid: boolean;
        partIndex: number;
        firstVertexIndex: number;
        baseVertexIndex: number;
        lastVertexIndex: number;
        topology: Graphics.Topology;
        attributeNames: Array<string>;
        numIndices: number;
        numVerticesPerFace: number;
        numFaces: number;
        numVertices: number;
        numAttributes: number;
        extents: object;
        bufferFormats: object;
    }
    interface Model {
        objectID: Uuid;
        numMeshes: number;
        meshes: Array<Graphics.Mesh>;
        materialLayers: Map<Array<Graphics.MaterialLayer>>;
        materialNames: Array<string>;
    }
    type Topology = number
}

declare namespace Midi {
    function sendRawDword(device: number, raw: number): void;
    function sendMidiMessage(device: number, channel: number, type: number, note: number, velocity: number): void;
    function playMidiNote(status: number, note: number, velocity: number): void;
    function allNotesOff(): void;
    function resetDevices(): void;
    function listMidiDevices(output: boolean): Array<string>;
    function blockMidiDevice(name: string, output: boolean): void;
    function unblockMidiDevice(name: string, output: boolean): void;
    function thruModeEnable(enable: boolean): void;
    function broadcastEnable(enable: boolean): void;
    function typeNoteOffEnable(enable: boolean): void;
    function typeNoteOnEnable(enable: boolean): void;
    function typePolyKeyPressureEnable(enable: boolean): void;
    function typeControlChangeEnable(enable: boolean): void;
    function typeProgramChangeEnable(enable: boolean): void;
    function typeChanPressureEnable(enable: boolean): void;
    function typePitchBendEnable(enable: boolean): void;
    function typeSystemMessageEnable(enable: boolean): void;
}

declare namespace ModelCache {
    function getResourceList(): Array<string>;
    function updateTotalSize(deltaSize: number): void;
    function prefetch(url: string, extra: object): ResourceObject;
    let dirty: Signal;
    let numTotal: number;
    let numCached: number;
    let sizeTotal: number;
    let sizeCached: number;
}

declare namespace TextureCache {
    function prefetch(url: string, type: number, maxNumPixels: number): ResourceObject;
    let spectatorCameraFramebufferReset: Signal;
    function getResourceList(): Array<string>;
    function updateTotalSize(deltaSize: number): void;
    function prefetch(url: string, extra: object): ResourceObject;
    let dirty: Signal;
    let numTotal: number;
    let numCached: number;
    let sizeTotal: number;
    let sizeCached: number;
}

declare namespace Messages {
    function sendMessage(channel: string, message: string, localOnly: boolean): void;
    function sendLocalMessage(channel: string, message: string): void;
    function sendData(channel: string, data: object, localOnly: boolean): void;
    function subscribe(channel: string): void;
    function unsubscribe(channel: string): void;
    let messageReceived: Signal;
    let dataReceived: Signal;
}

declare interface ResourceObject {
    release(): void;
    progressChanged: Signal;
    stateChanged: Signal;
}

declare namespace Resources {
    function overrideUrlPrefix(prefix: string, replacement: string): void;
    function restoreUrlPrefix(prefix: string): void;
}

declare namespace Steam {
    function isRunning(): boolean;
    function openInviteOverlay(): void;
    let running: boolean;
}
declare namespace Assets {
    function isValidPath(input: string): boolean;
    function isValidFilePath(input: string): boolean;
    function getATPUrl(input: string): string;
    function extractAssetHash(input: string): string;
    function isValidHash(input: string): boolean;
    function hashData(data: any): object;
    function hashDataHex(data: any): string;
    function uploadData(data: string, callback: Assets.uploadDataCallback): void;
    function downloadData(url: string, callback: Assets.downloadDataCallback): void;
    function setMapping(path: string, hash: string, callback: Assets.setMappingCallback): void;
    function getMapping(path: string, callback: Assets.getMappingCallback): void;
    function setBakingEnabled(path: string, enabled: boolean, callback: Assets.setBakingEnabledCallback): void;
    function getAsset(options: URL | Assets.GetOptions, scope: Assets.getAssetCallback, callback: Function): void;
    function putAsset(options: Assets.PutOptions, scopeCallback: Assets.putAssetResult, callback: Function): void;
    function deleteAsset(options: any, scope: any, callback: Function): void;
    function resolveAsset(options: any, scope: any, callback: Function): void;
    function decompressData(options: any, scope: any, callback: Function): void;
    function compressData(options: any, scope: any, callback: Function): void;
    function initializeCache(): boolean;
    function canWriteCacheValue(url: string): boolean;
    function getCacheStatus(scope: any, callback: Function): void;
    function queryCacheMeta(options: any, scope: any, callback: Function): void;
    function loadFromCache(options: any, scope: any, callback: Function): void;
    function saveToCache(options: any, scope: any, callback: Function): void;
    function saveToCache(url: any, data: any, metadata: any, scope: any, callback: Function): void;
}

declare namespace Assets {
    interface GetOptions {
        url: string;
        responseType: string;
        decompress: boolean;
    }
    interface PutOptions {
        data: ArrayBuffer;
        path: string;
        compress: boolean;
    }
    interface getAssetResult {
        url: string;
        hash: string;
        response: string;
        responseType: string;
        contentType: string;
        byteLength: number;
        decompressed: number;
    }
    interface putAssetResult {
        url: string;
        path: string;
        hash: string;
        compressed: boolean;
        byteLength: number;
    }
    type downloadDataCallback = (data: string) => void;
    type getAssetCallback = (error: string, result: getAssetResult) => void;
    type getMappingCallback = (assetID: string, error: string) => void;
    type puttAssetCallback = (error: string, result: putAssetResult) => void;
    type setBakingEnabledCallback = () => void;
    type setMappingCallback = (error: string) => void;
    type uploadDataCallback = (url: string, hash: string) => void;
}

declare namespace File {
    function convertUrlToPath(url: string): string;
    function runUnzip(path: string, url: string, autoAdd: boolean, isZip: boolean, isBlocks: boolean): void;
    function getTempDir(): string;
    let unzipResult: Signal;
}

declare interface Mat4 {
    multiply(m1: Mat4, m2: Mat4): Mat4;
    createFromRotAndTrans(rot: Quat, trans: Vec3): Mat4;
    createFromScaleRotAndTrans(scale: Vec3, rot: Quat, trans: Vec3): Mat4;
    createFromColumns(col0: Vec4, col1: Vec4, col2: Vec4, col: Vec4): Mat4;
    createFromArray(numbers: Array<number>): Mat4;
    extractTranslation(m: Mat4): Vec3;
    extractRotation(m: Mat4): Vec3;
    extractScale(m: Mat4): Vec3;
    transformPoint(m: Mat4, point: Vec3): Vec3;
    transformVector(m: Mat4, vector: Vec3): Vec3;
    inverse(m: Mat4): Mat4;
    getFront(m: Mat4): Vec3;
    getForward(m: Mat4): Vec3;
    getRight(m: Mat4): Vec3;
    getUp(m: Mat4): Vec3;
    print(label: string, m: Mat4, transpose: boolean): void;
}

declare interface Quat {
    x: number;
    y: number;
    z: number;
    w: number;
    multiply(q1: Quat, q2: Quat): Quat;
    normalize(q: Quat): Quat;
    conjugate(q: Quat): Quat;
    lookAt(eye: Vec3, target: Vec3, up: Vec3): Quat;
    lookAtSimple(eye: Vec3, target: Vec3): Quat;
    rotationBetween(v1: Vec3, v2: Vec3): Quat;
    fromVec3Degrees(vector: Vec3): Quat;
    fromVec3Radians(vector: Vec3): Quat;
    fromPitchYawRollDegrees(pitch: number, yaw: number, roll: number): Quat;
    fromPitchYawRollRadians(pitch: number, yaw: number, roll: number): Quat;
    inverse(q: Quat): Quat;
    getFront(orientation: Quat): Vec3;
    getForward(orientation: Quat): Vec3;
    getRight(orientation: Quat): Vec3;
    getUp(orientation: Quat): Vec3;
    safeEulerAngles(orientation: Quat): Vec3;
    angleAxis(angle: number, axis: Vec3): Quat;
    axis(q: Quat): Vec3;
    angle(q: Quat): number;
    mix(q1: Quat, q2: Quat, alpha: number): Quat;
    slerp(q1: Quat, q2: Quat, alpha: number): Quat;
    squad(q1: Quat, q2: Quat, s1: Quat, s2: Quat, alpha: number): Quat;
    dot(q1: Quat, q2: Quat): number;
    print(label: string, q: Quat, asDegrees: boolean): void;
    equal(q1: Quat, q2: Quat): boolean;
    cancelOutRollAndPitch(orientation: Quat): Quat;
    cancelOutRoll(orientation: Quat): Quat;
}
declare namespace Quat {
    const IDENTITY: Quat;
}

declare namespace Recording {
    function loadRecording(url: string, callback: (success: boolean, url: string) => void): void;
    function startPlaying(): void;
    function pausePlayer(): void;
    function stopPlaying(): void;
    function isPlaying(): boolean;
    function isPaused(): boolean;
    function playerElapsed(): number;
    function playerLength(): number;
    function setPlayerVolume(volume: number): void;
    function setPlayerAudioOffset(audioOffset: number): void;
    function setPlayerTime(time: number): void;
    function setPlayerLoop(loop: boolean): void;
    function setPlayerUseDisplayName(useDisplayName: boolean): void;
    function setPlayerUseAttachments(useAttachments: boolean): void;
    function setPlayerUseHeadModel(useHeadModel: boolean): void;
    function setPlayerUseSkeletonModel(useSkeletonModel: boolean): void;
    function setPlayFromCurrentLocation(playFromCurrentLocation: boolean): void;
    function getPlayerUseDisplayName(): boolean;
    function getPlayerUseAttachments(): boolean;
    function getPlayerUseHeadModel(): boolean;
    function getPlayerUseSkeletonModel(): boolean;
    function getPlayFromCurrentLocation(): boolean;
    function startRecording(): void;
    function stopRecording(): void;
    function isRecording(): boolean;
    function recorderElapsed(): number;
    function getDefaultRecordingSaveDirectory(): string;
    function saveRecording(filename: string): void;
    function saveRecordingToAsset(getClipAtpUrl: Function): void;
    function loadLastRecording(): void;
}

declare namespace Scene {
    let shouldRenderAvatarsChanged: Signal;
    let shouldRenderEntitiesChanged: Signal;
    let shouldRenderAvatars: boolean;
    let shouldRenderEntities: boolean;
    let stage: Scene.Stage;
}

declare namespace Scene {
    interface Stage {
        setLocation(lon: number, lat: number, alt: number): void
        setOrientation(orientation: Quat): void
    }
    interface KeyLight {
        color: Vec3
        intensity: number
        ambientIntensity: number
        direction: Vec3
    }
    interface Location {
        longitude: number
        latitude: number
        altitude: number
    }
    interface Time {
        hour: number
        day: number
    }
}

declare interface AudioInjector {
    restart(): void;
    stop(): void;
    getOptions(): AudioInjector.AudioInjectorOptions;
    setOptions(options: AudioInjector.AudioInjectorOptions): void;
    getLoudness(): number;
    isPlaying(): boolean;
    finished: Signal;
    stopInjectorImmediately(): void;
}

declare namespace AudioInjector {
    interface AudioInjectorOptions {
        position: Vec3;
        orientation: Quat;
        volume: number;
        pitch: number;
        loop: boolean;
        secondOffset: number;
        localOnly: boolean;
        ignorePenumbra: boolean;
    }
}

declare interface Resource {
    State: Resource.State;
}

declare namespace Resource {
    interface State {
        QUEUED: number;
        LOADING: number;
        LOADED: number;
        FINISHED: number;
        FAILED: number;
    }
}

declare namespace Script {
    function stop(marshal: boolean): void;
    function registerGlobalObject(name: string, object: object): void;
    function registerGetterSetter(name: string, getter: object, setter: object, parent: string): void;
    function registerFunction(name: string, regFunction: object, numArguments: number): void;
    function registerFunction(parent: string, name: string, regFunction: object, numArguments: number): void;
    function registerValue(name: string, value: object): void;
    function evaluate(program: string, filename: string, lineNumber: number): object;
    function evaluateInClosure(locals: object, program: object): object;
    function getContext(): string;
    function isClientScript(): boolean;
    function isDebugMode(): boolean;
    function isEntityClientScript(): boolean;
    function isEntityServerScript(): boolean;
    function isAgentScript(): boolean;
    function addEventHandler(entityID: Uuid, eventName: string, handler: Function): void;
    function removeEventHandler(entityID: Uuid, eventName: string, handler: Function): void;
    function load(filename: string): void;
    function include(filenames: Array<string>, callback: Function): void;
    function include(filename: string, callback: Function): void;
    function require(module: string): void;
    function resetModuleCache(deleteScriptCache: boolean): void;
    function setInterval(intervalFunction: Function, interval: number): object;
    function setTimeout(timeoutFunction: Function, timeout: number): object;
    function clearInterval(timer: object): void;
    function clearTimeout(timer: object): void;
    function print(message: string): void;
    function resolvePath(path: string): string;
    function resourcesPath(): string;
    function beginProfileRange(label: string): void;
    function endProfileRange(label: string): void;
    function isEntityScriptRunning(entityID: Uuid): boolean;
    function loadEntityScript(entityID: Uuid, script: string, forceRedownload: boolean): void;
    function unloadEntityScript(entityID: Uuid, shouldRemoveFromMap: boolean): void;
    function unloadAllEntityScripts(): void;
    function callEntityScriptMethod(entityID: Uuid, methodName: string, parameters: Array<string>, remoteCallerID: Uuid): void;
    function callEntityScriptMethod(entityID: Uuid, methodName: string, event: PointerEvent): void;
    function callEntityScriptMethod(entityID: Uuid, methodName: string, otherID: Uuid, collision: Collision): void;
    function requestGarbageCollection(): void;
    function generateUUID(): Uuid;
    function callAnimationStateHandler(callback: Function, parameters: object, names: Array<string>, useNames: boolean, resultHandler: object): void;
    function updateMemoryCost(deltaSize: number): void;
    let scriptLoaded: Signal;
    let errorLoadingScript: Signal;
    let update: Signal;
    let scriptEnding: Signal;
    let finished: Signal;
    let cleanupMenuItem: Signal;
    let printedMessage: Signal;
    let errorMessage: Signal;
    let warningMessage: Signal;
    let infoMessage: Signal;
    let runningStateChanged: Signal;
    let clearDebugWindow: Signal;
    let loadScript: Signal;
    let reloadScript: Signal;
    let doneRunning: Signal;
    let entityScriptDetailsUpdated: Signal;
    let entityScriptPreloadFinished: Signal;
    function executeOnScriptThread(executeFunction: object, type: number): void;
    function _requireResolve(module: string, relativeTo: string): string;
    function entityScriptContentAvailable(entityID: Uuid, scriptOrURL: string, contents: string, isURL: boolean, success: boolean, status: string): void;
    let context: string;
}

declare namespace ScriptDiscoveryService {
    function loadOneScript(filename: string): void;
    function loadScript(filename: string, isUserLoaded: boolean, loadScriptFromEditor: boolean, activateMainWindow: boolean, reload: boolean, quitWhenFinished: boolean): boolean;
    function stopScript(scriptHash: string, restart: boolean): boolean;
    function reloadAllScripts(): void;
    function stopAllScripts(restart: boolean): void;
    function getRunning(): Array<object>;
    function getPublic(): Array<object>;
    function getLocal(): Array<object>;
    let scriptCountChanged: Signal;
    let scriptsReloading: Signal;
    let scriptLoadError: Signal;
    let printedMessage: Signal;
    let errorMessage: Signal;
    let warningMessage: Signal;
    let infoMessage: Signal;
    let errorLoadingScript: Signal;
    let clearDebugWindow: Signal;
    function onPrintedMessage(message: string, scriptName: string): void;
    function onErrorMessage(message: string, scriptName: string): void;
    function onWarningMessage(message: string, scriptName: string): void;
    function onInfoMessage(message: string, scriptName: string): void;
    function onErrorLoadingScript(url: string): void;
    function onClearDebugWindow(): void;
    function onScriptFinished(filename: string, engine: object): void;
    let debugScriptUrl: string;
    let defaultScriptsPath: string;
    let scriptsModel: ScriptsModel;
    let scriptsModelFilter: ScriptsModelFilter;
}

declare type QModelIndex = number;

declare type TreeNodeBase = any;

declare type TreeNodeFolder = any;

declare interface ScriptsModel {
    index(row: number, column: number, parent: QModelIndex): QModelIndex;
    parent(child: QModelIndex): QModelIndex;
    data(index: QModelIndex, role: number): void;
    rowCount(parent: QModelIndex): number;
    columnCount(parent: QModelIndex): number;
    getTreeNodeFromIndex(index: QModelIndex): TreeNodeBase;
    getFolderNodes(parent: TreeNodeFolder): Array<TreeNodeBase>;
}

declare interface ScriptsModelFilter {
}

declare interface Uuid {
    fromString(string: string): Uuid;
    toString(id: Uuid): string;
    generate(): Uuid;
    isEqual(idA: Uuid, idB: Uuid): boolean;
    isNull(id: Uuid): boolean;
    print(label: string, id: Uuid): void;
}
declare namespace Uuid {
    const NULL: Uuid;
}

declare namespace Users {
    function ignore(nodeID: Uuid, enable: boolean): void;
    function getIgnoreStatus(nodeID: Uuid): boolean;
    function personalMute(nodeID: Uuid, muteEnabled: boolean): void;
    function requestPersonalMuteStatus(nodeID: Uuid): boolean;
    function setAvatarGain(nodeID: Uuid, gain: number): void;
    function getAvatarGain(nodeID: Uuid): number;
    function kick(nodeID: Uuid): void;
    function mute(nodeID: Uuid): void;
    function requestUsernameFromID(nodeID: Uuid): void;
    function getCanKick(): boolean;
    function toggleIgnoreRadius(): void;
    function enableIgnoreRadius(): void;
    function disableIgnoreRadius(): void;
    function getIgnoreRadiusEnabled(): boolean;
    let canKickChanged: Signal;
    let ignoreRadiusEnabledChanged: Signal;
    let enteredIgnoreRadius: Signal;
    let usernameFromIDReply: Signal;
    let avatarDisconnected: Signal;
    let canKick: boolean;
    let requestsDomainListData: boolean;
}

declare interface Vec3 {
    x?: number;
    y?: number;
    z?: number;
    reflect(v: Vec3, normal: Vec3): Vec3;
    cross(v1: Vec3, v2: Vec3): Vec3;
    dot(v1: Vec3, v2: Vec3): number;
    multiply(v: Vec3, scale: number): Vec3;
    multiply(scale: number, v: Vec3): Vec3;
    multiplyVbyV(v1: Vec3, v2: Vec3): Vec3;
    multiplyQbyV(q: Quat, v: Vec3): Vec3;
    sum(v1: Vec3, v2: Vec3): Vec3;
    subtract(v1: Vec3, v2: Vec3): Vec3;
    length(v: Vec3): number;
    distance(p1: Vec3, p2: Vec3): number;
    orientedAngle(v1: Vec3, v2: Vec3, ref: Vec3): number;
    normalize(v: Vec3): Vec3;
    mix(v1: Vec3, v2: Vec3, factor: number): Vec3;
    print(label: string, v: Vec3): void;
    equal(v1: Vec3, v2: Vec3): boolean;
    withinEpsilon(v1: Vec3, v2: Vec3, epsilon: number): boolean;
    toPolar(p: Vec3): Vec3;
    fromPolar(polar: Vec3): Vec3;
    fromPolar(elevation: number, azimuth: number): Vec3;
    getAngle(v1: Vec3, v2: Vec3): number;
}
declare namespace Vec3 {
    const UNIT_X: Vec3;
    const UNIT_Y: Vec3;
    const UNIT_Z: Vec3;
    const UNIT_NEG_X: Vec3;
    const UNIT_NEG_Y: Vec3;
    const UNIT_NEG_Z: Vec3;
    const UNIT_XY: Vec3;
    const UNIT_XZ: Vec3;
    const UNIT_YZ: Vec3;
    const UNIT_XYZ: Vec3;
    const FLOAT_MAX: Vec3;
    const FLOAT_MIN: Vec3;
    const ZERO: Vec3;
    const ONE: Vec3;
    const TWO: Vec3;
    const HALF: Vec3;
    const RIGHT: Vec3;
    const UP: Vec3;
    const FRONT: Vec3;
}

declare namespace DebugDraw {
    function drawRay(start: Vec3, end: Vec3, color: Vec4): void;
    function addMarker(key: string, rotation: Quat, position: Vec3, color: Vec4): void;
    function removeMarker(key: string): void;
    function addMyAvatarMarker(key: string, rotation: Quat, position: Vec3, color: Vec4): void;
    function removeMyAvatarMarker(key: string): void;
}

declare interface Paths {
    defaultScripts: string;
    resources: string;
}

declare interface MeshProxy {
    getNumVertices(): number;
    getPos(index: number): Vec3;
}

declare namespace Camera {
    function getCameraEntity(): Uuid;
    function setCameraEntity(entityID: Uuid): void;
    function getModeString(): Camera.Mode;
    function setModeString(mode: Camera.Mode): void;
    function getPosition(): Vec3;
    function setPosition(position: Vec3): void;
    function getOrientation(): Quat;
    function setOrientation(orientation: Quat): void;
    function computePickRay(x: number, y: number): PickRay;
    function lookAt(position: Vec3): void;
    function keepLookingAt(position: Vec3): void;
    function stopLookingAt(): void;
    let modeUpdated: Signal;
    let position: Vec3;
    let orientation: Quat;
    let mode: Camera.Mode;
    let frustum: ViewFrustum;
    let cameraEntity: Uuid;
}

declare namespace Camera {
    type Mode = "first person" | "third person" | "mirror" | "independent" | "entity";
}

declare namespace Render {
    function toJSON(): string;
    function load(map: object): void;
    function isTask(): boolean;
    function getSubConfigs(): Array<object>;
    function getNumSubs(): number;
    function getSubConfig(index: number): object;
    function load(map: object): void;
    let loaded: Signal;
    let newStats: Signal;
    let dirtyEnabled: Signal;
    function getConfig(name: string): object;
    function refresh(): void;
    let cpuRunTime: number;
    let enabled: boolean;
}

declare interface InteractiveWindow {
    sendToQml(message: object): void;
    emitScriptEvent(message: object): void;
    emitWebEvent(message: object): void;
    close(): void;
    show(): void;
    raise(): void;
    visibleChanged: Signal;
    positionChanged: Signal;
    sizeChanged: Signal;
    presentationModeChanged: Signal;
    titleChanged: Signal;
    closed: Signal;
    fromQml: Signal;
    scriptEventReceived: Signal;
    webEventReceived: Signal;
    qmlToScript: Signal;
}

declare namespace OffscreenFlags {
    let navigationFocusedChanged: Signal;
    let navigationFocusDisabledChanged: Signal;
    let navigationFocused: boolean;
    let navigationFocusDisabled: boolean;
}

declare interface OverlayWebWindow {
    getURL(): string;
    setURL(url: string): void;
    setScriptURL(script: string): void;
    urlChanged: Signal;
    initQml(properties: OverlayWindow.Properties): void;
    isVisible(): boolean;
    setVisible(visible: boolean): void;
    getPosition(): Vec2;
    setPosition(position: Vec2): void;
    setPosition(x: number, y: number): void;
    getSize(): Vec2;
    setSize(size: Vec2): void;
    setSize(width: number, height: number): void;
    setTitle(title: string): void;
    raise(): void;
    close(): void;
    getEventBridge(): object;
    sendToQml(message: object): void;
    clearDebugWindow(): void;
    emitScriptEvent(message: object): void;
    emitWebEvent(message: object): void;
    visibleChanged: Signal;
    positionChanged: Signal;
    sizeChanged: Signal;
    moved: Signal;
    resized: Signal;
    closed: Signal;
    fromQml: Signal;
    scriptEventReceived: Signal;
    webEventReceived: Signal;
    hasMoved: Signal;
    hasClosed: Signal;
    qmlToScript: Signal;
}

declare interface OverlayWindow {
    initQml(properties: OverlayWindow.Properties): void;
    isVisible(): boolean;
    setVisible(visible: boolean): void;
    getPosition(): Vec2;
    setPosition(position: Vec2): void;
    setPosition(x: number, y: number): void;
    getSize(): Vec2;
    setSize(size: Vec2): void;
    setSize(width: number, height: number): void;
    setTitle(title: string): void;
    raise(): void;
    close(): void;
    getEventBridge(): object;
    sendToQml(message: object): void;
    clearDebugWindow(): void;
    emitScriptEvent(message: object): void;
    emitWebEvent(message: object): void;
    visibleChanged: Signal;
    positionChanged: Signal;
    sizeChanged: Signal;
    moved: Signal;
    resized: Signal;
    closed: Signal;
    fromQml: Signal;
    scriptEventReceived: Signal;
    webEventReceived: Signal;
    hasMoved: Signal;
    hasClosed: Signal;
    qmlToScript: Signal;
}

declare namespace OverlayWindow {
    interface Properties {
        title: string;
        source: string;
        width: number;
        height: number;
        visible: boolean;
    }
}

declare namespace Tablet {
    function getTablet(name: string): TabletProxy;
    function playSound(sound: Tablet.AudioEvents): void;
    let tabletNotification: Signal;
}

declare namespace tabletInterface {
    function getTablet(name: string): TabletProxy;
    function playSound(sound: Tablet.AudioEvents): void;
    let tabletNotification: Signal;
}

declare namespace Tablet {
    type AudioEvents = 0 | 1 | 2 | 3 | 4 | 5;
}

declare interface TabletProxy {
    ButtonList: {
    };
    gotoMenuScreen(submenu: string): void;
    initialScreen(url: string): void;
    gotoHomeScreen(): void;
    gotoWebScreen(url: string, injectedJavaScriptUrl?: string, loadOtherBase?: boolean): void;
    loadQMLSource(path: string, resizable?: boolean): void;
    pushOntoStack(path: string): boolean;
    popFromStack(): void;
    loadQMLOnTop(path: string): void;
    loadWebScreenOnTop(path: string, injectedJavaScriptURL: string): void;
    returnToPreviousApp(): void;
    isMessageDialogOpen(): boolean;
    closeDialog(): void;
    addButton(properties: object): TabletButtonProxy;
    removeButton(button: TabletButtonProxy): void;
    emitScriptEvent(message: object|string): void;
    sendToQml(message: object): void;
    onHomeScreen(): boolean;
    setLandscape(landscape: boolean): void;
    getLandscape(): boolean;
    isPathLoaded(path: string): boolean;
    webEventReceived: Signal;
    fromQml: Signal;
    screenChanged(type: string, url: string): void;
    isTabletShownChanged: Signal;
    toolbarModeChanged(): void;
}

declare interface TabletButtonProxy {
    getProperties(): TabletButtonProxy.ButtonProperties;
    editProperties(properties: TabletButtonProxy.ButtonProperties): void;
    clicked: Signal;
    propertiesChanged: Signal;
}

declare namespace TabletButtonProxy {
    interface ButtonProperties {
        icon?: string;
        hoverIcon?: string;
        activeHoverIcon?: string;
        activeIcon?: string;
        text?: string;
        hoverText?: string;
        activeText?: string;
        activeHoverText?: string;
        isActive?: boolean;
        sortOrder?: number;
    }
}

declare interface ToolbarButtonProxy {
    editProperties(properties: object): void;
    writeProperty(propertyValue: object): void;
    writeProperties(properties: object): void;
    readProperty(propertyName: string): object;
    readProperties(propertyList: Array<string>): object;
    clicked: Signal;
}

declare interface ToolbarProxy {
    addButton(properties: object): ToolbarButtonProxy;
    removeButton(name: string): void;
    writeProperty(propertyValue: object): void;
    writeProperties(properties: object): void;
    readProperty(propertyName: string): object;
    readProperties(propertyList: Array<string>): object;
}

declare namespace Toolbars {
    function getToolbar(toolbarID: string): ToolbarProxy;
}
