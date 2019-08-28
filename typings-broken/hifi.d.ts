declare namespace Agent {
    function setIsAvatar(isAvatar: boolean): void;
    function isAvatar(): boolean;
    function playAvatarSound(avatarSound: SoundObject): void;
}
declare namespace Avatar {
    function startAnimation(url: string, fps?: number, priority?: number, loop?: boolean, hold?: boolean, firstFrame?: number, lastFrame?: number, maskedJoints?: string[]): void;
    function stopAnimation(): void;
    function getAnimationDetails(): Avatar.AnimationDetails;
    function getAvatarEntityData(): AvatarEntityMap;
    function setAvatarEntityData(avatarEntityData: AvatarEntityMap): void;
    function update(deltaTime: number): void;
    function setJointMappingsFromNetworkReply(): void;
    function getDomainMinScale(): number;
    function getDomainMaxScale(): number;
    function getEyeHeight(): number;
    function getHeight(): number;
    function setHandState(state: HandState): void;
    function getHandState(): HandState;
    function setRawJointData(data: JointData[]): void;
    function setJointData(index: number, rotation: Quat, translation: Vec3): void;
    function setJointRotation(index: number, rotation: Quat): void;
    function setJointTranslation(index: number, translation: Vec3): void;
    function clearJointData(index: number): void;
    function isJointDataValid(index: number): boolean;
    function getJointRotation(index: number): Quat;
    function getJointTranslation(index: number): Vec3;
    function setJointData(index: number, rotation: Quat, translation: Vec3): void;
    function setJointRotation(index: number, rotation: Quat): void;
    function setJointTranslation(index: number, translation: Vec3): void;
    function clearJointData(index: number): void;
    function isJointDataValid(index: number): boolean;
    function getJointRotation(index: number): Quat;
    function getJointTranslation(index: number): Vec3;
    function getJointRotations(): Quat[];
    function getJointTranslations(): Vec3[];
    function setJointRotations(jointRotations: Quat[]): void;
    function setJointTranslations(translations: Vec3[]): void;
    function clearJointsData(): void;
    function getJointIndex(name: string): number;
    function getJointNames(): string[];
    function setBlendshape(name: string, value: number): void;
    function getAttachmentsVariant(): AttachmentData[];
    function setAttachmentsVariant(variant: AttachmentData[]): void;
    function updateAvatarEntity(entityID: Uuid, entityData: any[]): void;
    function clearAvatarEntity(entityID: Uuid, requiresRemovalFromTree?: boolean): void;
    function setForceFaceTrackerConnected(connected: boolean): void;
    function setSkeletonModelURL(url: string): void;
    function getAttachmentData(): AttachmentData[];
    function setAttachmentData(attachmentData: AttachmentData[]): void;
    function attach(modelURL: string, jointName?: string, translation?: Vec3, rotation?: Quat, scale?: number, isSoft?: boolean, allowDuplicates?: boolean, useSaved?: boolean): void;
    function detachOne(modelURL: string, jointName?: string): void;
    function detachAll(modelURL: string, jointName?: string): void;
    function getSensorToWorldMatrix(): Mat4;
    function getSensorToWorldScale(): number;
    function getControllerLeftHandMatrix(): Mat4;
    function getControllerRightHandMatrix(): Mat4;
    function getDataRate(rateName?: AvatarDataRate): number;
    function getUpdateRate(rateName?: AvatarUpdateRate): number;
    function sendAvatarDataPacket(sendAll?: boolean): number;
    function sendIdentityPacket(): number;
    function setSessionUUID(sessionUUID: Uuid): void;
    function getAbsoluteJointRotationInObjectFrame(index: number): Quat;
    function getAbsoluteJointTranslationInObjectFrame(index: number): Vec3;
    function setAbsoluteJointRotationInObjectFrame(index: number, rotation: Quat): boolean;
    function setAbsoluteJointTranslationInObjectFrame(index: number, translation: Vec3): boolean;
    function getTargetScale(): number;
    function resetLastSent(): void;
    type AnimationDetails = {
        role: string;
        url: string;
        fps: number;
        priority: number;
        loop: boolean;
        hold: boolean;
        firstFrame: number;
        lastFrame: number;
        running: boolean;
        currentFrame: number;
        startAutomatically: boolean;
        allowTranslation: boolean;
    };
}
declare namespace EntityViewer {
    function queryOctree(): void;
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
}
declare namespace AvatarBookmarks {
    type BookmarkData = {
        version: number;
        avatarUrl: string;
        avatarScale: number;
        avatarEntites?: {
            [key: string]: Entities.EntityProperties;
        }[];
        attachments?: AttachmentData[];
    };
    function getBookmark(bookmarkName: string): AvatarBookmarks.BookmarkData | any;
    function addBookmark(bookmarkName: string): void;
    function saveBookmark(bookmarkName: string): void;
    function loadBookmark(bookmarkName: string): void;
    function removeBookmark(bookmarkName: string): void;
    function updateAvatarEntities(avatarEntities: MyAvatar.AvatarEntityData[]): void;
    function getBookmarks(): {
        [key: string]: AvatarBookmarks.BookmarkData;
    };
    function deleteBookmark(): void;
}
declare namespace Camera {
    function getCameraEntity(): Uuid;
    function setCameraEntity(entityID: Uuid): void;
    type Mode = string;
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
}
declare namespace LocationBookmarks {
    function deleteBookmark(): void;
    function getAddress(bookmarkName: string): string;
    function addBookmark(): void;
    function setHomeLocationToAddress(address: string): void;
    function getHomeLocationAddress(): string;
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
}
declare namespace SpeechRecognizer {
    function setEnabled(enabled: boolean): void;
    function addCommand(command: string): void;
    function removeCommand(command: string): void;
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
    function getScopeInput(): number[];
    function getScopeOutputLeft(): number[];
    function getScopeOutputRight(): number[];
    function getTriggerInput(): number[];
    function getTriggerOutputLeft(): number[];
    function getTriggerOutputRight(): number[];
    function setLocalEcho(): void;
    function setServerEcho(): void;
}
declare namespace AvatarManager {
    type PalData = {
        sessionUUID: Uuid;
        sessionDisplayName: string;
        audioLoudness: number;
        isReplicated: boolean;
        position: Vec3;
        palOrbOffset: number;
    };
    function getAvatarIdentifiers(): Uuid[];
    function getAvatarsInRange(position: Vec3, range: number): Uuid[];
    function getAvatarDataRate(sessionID: Uuid, rateName?: AvatarDataRate): number;
    function getAvatarUpdateRate(sessionID: Uuid, rateName?: AvatarUpdateRate): number;
    function getAvatarSimulationRate(sessionID: Uuid, rateName?: AvatarSimulationRate): number;
    function findRayIntersection(ray: PickRay, avatarsToInclude?: Uuid[], avatarsToDiscard?: Uuid[], pickAgainstMesh?: boolean): RayToAvatarIntersectionResult;
    function findRayIntersectionVector(ray: PickRay, avatarsToInclude: Uuid[], avatarsToDiscard: Uuid[], pickAgainstMesh: boolean): RayToAvatarIntersectionResult;
    function findParabolaIntersectionVector(pick: PickParabola, avatarsToInclude: Uuid[], avatarsToDiscard: Uuid[]): ParabolaToAvatarIntersectionResult;
    function getAvatarSortCoefficient(name: string): number;
    function setAvatarSortCoefficient(name: string, value: number): void;
    function getPalData(avatarIDs?: string[]): {
        [key: string]: AvatarManager.PalData[];
    };
    function updateAvatarRenderStatus(shouldRenderAvatars: boolean): void;
    function setEnableDebugDrawOtherSkeletons(enabled: boolean): void;
    function getAvatar(avatarID: Uuid): AvatarData;
    function isAvatarInRange(position: string, range: string): boolean;
    function sessionUUIDChanged(sessionUUID: Uuid, oldSessionUUID: Uuid): void;
    function processAvatarDataPacket(message: any, sendingNode: any): void;
    function processAvatarIdentityPacket(message: any, sendingNode: any): void;
    function processBulkAvatarTraits(message: any, sendingNode: any): void;
    function processKillAvatar(message: any, sendingNode: any): void;
}
declare namespace MyAvatar {
    type AvatarEntityData = any;
    type GoToProperties = {
        position: Vec3;
        orientation?: Quat;
    };
    type CollisionCapsule = {
        start: Vec3;
        end: Vec3;
        radius: number;
    };
    type FlowPhysicsOptions = {
        active?: boolean;
        radius?: number;
        gravity?: number;
        inertia?: number;
        damping?: number;
        stiffness?: number;
        delta?: number;
    };
    type FlowCollisionsOptions = {
        type?: string;
        radius?: number;
        offset?: number;
    };
    type FlowData = {
        initialized: boolean;
        active: boolean;
        colliding: boolean;
        physicsData: {
            [key: string]: MyAvatar.FlowPhysicsData;
        };
        collisions: {
            [key: string]: MyAvatar.FlowCollisionsData;
        };
        threads: {
            [key: string]: number[];
        };
    };
    type FlowPhysicsData = {
        active: boolean;
        radius: number;
        gravity: number;
        inertia: number;
        damping: number;
        stiffness: number;
        delta: number;
        jointIndices: number[];
    };
    type FlowCollisionsData = {
        radius: number;
        offset: number;
        jointIndex: number;
    };
    type LocomotionControlsMode = number;
    type DriveKeys = number;
    type SitStandModelType = number;
    function resetSensorsAndBody(): void;
    function centerBody(): void;
    function clearIKJointLimitHistory(): void;
    function setOrientationVar(newOrientationVar: any): void;
    function getOrientationVar(): any;
    function getDefaultEyePosition(): Vec3;
    function overrideAnimation(url: string, fps: number, loop: boolean, firstFrame: number, lastFrame: number): void;
    function overrideHandAnimation(isLeft: boolean, url: string, fps: number, loop: boolean, firstFrame: number, lastFrame: number): void;
    function restoreAnimation(): void;
    function restoreHandAnimation(isLeft: boolean): void;
    function getAnimationRoles(): string[];
    function overrideRoleAnimation(role: string, url: string, fps: number, loop: boolean, firstFrame: number, lastFrame: number): void;
    function restoreRoleAnimation(role: string): void;
    function addAnimationStateHandler(handler: (...params: any[]) => any, propertiesList: string[] | null): number;
    function removeAnimationStateHandler(handler: number): void;
    function getSnapTurn(): boolean;
    function setSnapTurn(on: boolean): void;
    function getControlScheme(): MyAvatar.LocomotionControlsMode;
    function setControlScheme(controlScheme: MyAvatar.LocomotionControlsMode): void;
    function hoverWhenUnsupported(): boolean;
    function setHoverWhenUnsupported(hover: boolean): void;
    function setDominantHand(hand: string): void;
    function getDominantHand(): string;
    function setStrafeEnabled(enabled: boolean): void;
    function getStrafeEnabled(): boolean;
    function setHmdAvatarAlignmentType(type: string): void;
    function getHmdAvatarAlignmentType(): string;
    function setCenterOfGravityModelEnabled(enabled: boolean): void;
    function getCenterOfGravityModelEnabled(): boolean;
    function setHMDLeanRecenterEnabled(enabled: boolean): void;
    function getHMDLeanRecenterEnabled(): boolean;
    function requestEnableHandTouch(): void;
    function requestDisableHandTouch(): void;
    function disableHandTouchForID(entityID: Uuid): void;
    function enableHandTouchForID(entityID: Uuid): void;
    function getRawDriveKey(key: MyAvatar.DriveKeys): number;
    function disableDriveKey(key: MyAvatar.DriveKeys): void;
    function enableDriveKey(key: MyAvatar.DriveKeys): void;
    function isDriveKeyDisabled(key: DriveKeys): boolean;
    function triggerVerticalRecenter(): void;
    function triggerHorizontalRecenter(): void;
    function triggerRotationRecenter(): void;
    function isRecenteringHorizontally(): boolean;
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
    function pinJoint(index: number, position: Vec3, orientation: Quat): boolean;
    function clearPinOnJoint(index: number): boolean;
    function getIKErrorOnLastSolve(): number;
    function useFullAvatarURL(fullAvatarURL: string, modelName?: string): void;
    function getFullAvatarURLFromPreferences(): string;
    function getFullAvatarModelName(): string;
    function getAvatarEntitiesVariant(): MyAvatar.AvatarEntityData[];
    function isFlying(): boolean;
    function isInAir(): boolean;
    function setFlyingEnabled(enabled: boolean): void;
    function getFlyingEnabled(): boolean;
    function setFlyingDesktopPref(enabled: boolean): void;
    function getFlyingDesktopPref(): boolean;
    function setFlyingHMDPref(enabled: boolean): void;
    function getFlyingHMDPref(): boolean;
    function setHandRelativeMovement(enabled: number): void;
    function getHandRelativeMovement(): number;
    function setDriveGear1(shiftPoint: number): void;
    function getDriveGear1(): number;
    function setDriveGear2(shiftPoint: number): void;
    function getDriveGear2(): number;
    function setDriveGear3(shiftPoint: number): void;
    function getDriveGear3(): number;
    function setDriveGear4(shiftPoint: number): void;
    function getDriveGear4(): number;
    function setDriveGear5(shiftPoint: number): void;
    function getDriveGear5(): number;
    function getAvatarScale(): number;
    function setAvatarScale(scale: number): void;
    function setCollisionsEnabled(enabled: boolean): void;
    function getCollisionsEnabled(): boolean;
    function setOtherAvatarsCollisionsEnabled(enabled: boolean): void;
    function getOtherAvatarsCollisionsEnabled(): boolean;
    function getCollisionCapsule(): MyAvatar.CollisionCapsule;
    function setCharacterControllerEnabled(enabled: boolean): void;
    function getCharacterControllerEnabled(): boolean;
    function getAbsoluteJointRotationInObjectFrame(index: number): Quat;
    function getAbsoluteJointTranslationInObjectFrame(index: number): Vec3;
    function isUp(direction: Vec3): boolean;
    function isDown(direction: Vec3): boolean;
    function grab(targetID: Uuid, parentJointIndex: number, offset: Vec3, rotationalOffset: Quat): Uuid;
    function releaseGrab(grabID: Uuid): void;
    function getAvatarEntityData(): AvatarEntityMap;
    function setAvatarEntityData(avatarEntityData: AvatarEntityMap): void;
    function useFlow(isActive: boolean, isCollidable: boolean, physicsConfig?: {
        [key: string]: MyAvatar.FlowPhysicsOptions;
    }, collisionsConfig?: {
        [key: string]: MyAvatar.FlowCollisionsOptions;
    }): void;
    function getFlowData(): MyAvatar.FlowData;
    function getCollidingFlowJoints(): number[];
    function beginSit(position: Vec3, rotation: Quat): void;
    function endSit(position: Vec3, rotation: Quat): void;
    function increaseSize(): void;
    function decreaseSize(): void;
    function resetSize(): void;
    function animGraphLoaded(): void;
    function setGravity(gravity: number): void;
    function getGravity(): number;
    function goToFeetLocation(position: Vec3, hasOrientation?: boolean, orientation?: Quat, shouldFaceLocation?: boolean): void;
    function goToLocation(position: Vec3, hasOrientation?: boolean, orientation?: Quat, shouldFaceLocation?: boolean, withSafeLanding?: boolean): void;
    function goToLocation(position: Vec3, hasOrientation?: boolean, orientation?: Quat, shouldFaceLocation?: boolean, withSafeLanding?: boolean): void;
    function goToLocationAndEnableCollisions(position: Vec3): void;
    function safeLanding(position: Vec3): boolean;
    function restrictScaleFromDomainSettings(domainSettings: any): void;
    function clearScaleRestriction(): void;
    function addThrust(thrust: Vec3): void;
    function getThrust(): Vec3;
    function setThrust(thrust: Vec3): void;
    function updateMotionBehaviorFromMenu(): void;
    function setToggleHips(enabled: boolean): void;
    function setEnableDebugDrawBaseOfSupport(enabled: boolean): void;
    function setEnableDebugDrawDefaultPose(enabled: boolean): void;
    function setEnableDebugDrawAnimPose(enabled: boolean): void;
    function setDebugDrawAnimPoseName(poseName: string): void;
    function setEnableDebugDrawPosition(enabled: boolean): void;
    function setEnableDebugDrawHandControllers(enabled: boolean): void;
    function setEnableDebugDrawSensorToWorldMatrix(enable: boolean): void;
    function setEnableDebugDrawIKTargets(enabled: boolean): void;
    function setEnableDebugDrawIKConstraints(enabled: boolean): void;
    function setEnableDebugDrawIKChains(enabled: boolean): void;
    function setEnableDebugDrawDetailedCollision(enabled: boolean): void;
    function getEnableMeshVisible(): boolean;
    function storeAvatarEntityDataPayload(): void;
    function sanitizeAvatarEntityProperties(properties: EntityItemProperties): void;
    function setEnableMeshVisible(enabled: boolean): void;
    function setEnableInverseKinematics(enabled: boolean): void;
    function getAnimGraphOverrideUrl(): string;
    function setAnimGraphOverrideUrl(url: string): void;
    function getAnimGraphUrl(): string;
    function setAnimGraphUrl(url: string): void;
    function getPositionForAudio(): Vec3;
    function getOrientationForAudio(): Quat;
    function setModelScale(scale: number): void;
    type AnimIKSolutionSource = number;
    type AnimOverlayBoneSet = number;
    type IKTargetType = number;
    type AnimStateDictionary = any;
    function getDefaultJointRotation(index: number): Quat;
    function getDefaultJointTranslation(index: number): Vec3;
    function getAbsoluteDefaultJointRotationInObjectFrame(index: number): Quat;
    function getAbsoluteDefaultJointTranslationInObjectFrame(index: number): Vec3;
    function setAbsoluteJointRotationInObjectFrame(index: number, rotation: Quat): boolean;
    function setAbsoluteJointTranslationInObjectFrame(index: number, translation: Vec3): boolean;
    function worldToJointPoint(position: Vec3, jointIndex?: number): Vec3;
    function worldToJointDirection(direction: Vec3, jointIndex?: number): Vec3;
    function worldToJointRotation(rotation: Quat, jointIndex?: number): Quat;
    function jointToWorldPoint(position: Vec3, jointIndex?: number): Vec3;
    function jointToWorldDirection(direction: Vec3, jointIndex?: number): Vec3;
    function jointToWorldRotation(rotation: Quat, jointIndex?: number): Quat;
    function setSkeletonOffset(offset: Vec3): void;
    function getSkeletonOffset(): Vec3;
    function getJointPosition(index: number): Vec3;
    function getJointPosition(index: number): Vec3;
    function getNeckPosition(): Vec3;
    function getAcceleration(): Vec3;
    function getWorldFeetPosition(): Vec3;
    function getParentID(): Uuid;
    function setParentID(parentID: Uuid): void;
    function getParentJointIndex(): number;
    function setParentJointIndex(parentJointIndex: number): void;
    function getSkeleton(): MyAvatar.SkeletonJoint[];
    type SkeletonJoint = {
        name: string;
        index: number;
        parentIndex: number;
    };
    function getSimulationRate(rateName?: AvatarSimulationRate): number;
    function targetScaleChanged(targetScale: number): any;
    function getLeftPalmPosition(): Vec3;
    function getLeftPalmRotation(): Quat;
    function getRightPalmPosition(): Vec3;
    function getRightPalmRotation(): Quat;
    function setModelURLFinished(success: boolean): void;
    function rigReady(): void;
    function rigReset(): void;
    function getDomainMinScale(): number;
    function getDomainMaxScale(): number;
    function getEyeHeight(): number;
    function getHeight(): number;
    function setHandState(state: HandState): void;
    function getHandState(): HandState;
    function setRawJointData(data: JointData[]): void;
    function setJointData(index: number, rotation: Quat, translation: Vec3): void;
    function setJointData(index: number, rotation: Quat, translation: Vec3): void;
    function setJointRotation(index: number, rotation: Quat): void;
    function setJointRotation(index: number, rotation: Quat): void;
    function setJointTranslation(index: number, translation: Vec3): void;
    function setJointTranslation(index: number, translation: Vec3): void;
    function clearJointData(index: number): void;
    function clearJointData(index: number): void;
    function isJointDataValid(index: number): boolean;
    function isJointDataValid(index: number): boolean;
    function getJointRotation(index: number): Quat;
    function getJointRotation(index: number): Quat;
    function getJointTranslation(index: number): Vec3;
    function getJointTranslation(index: number): Vec3;
    function getJointRotations(): Quat[];
    function getJointTranslations(): Vec3[];
    function setJointRotations(jointRotations: Quat[]): void;
    function setJointTranslations(translations: Vec3[]): void;
    function clearJointsData(): void;
    function getJointIndex(name: string): number;
    function getJointNames(): string[];
    function setBlendshape(name: string, value: number): void;
    function getAttachmentsVariant(): AttachmentData[];
    function setAttachmentsVariant(variant: AttachmentData[]): void;
    function updateAvatarEntity(entityID: Uuid, entityData: any[]): void;
    function clearAvatarEntity(entityID: Uuid, requiresRemovalFromTree?: boolean): void;
    function setForceFaceTrackerConnected(connected: boolean): void;
    function setSkeletonModelURL(url: string): void;
    function getAttachmentData(): AttachmentData[];
    function setAttachmentData(attachmentData: AttachmentData[]): void;
    function attach(modelURL: string, jointName?: string, translation?: Vec3, rotation?: Quat, scale?: number, isSoft?: boolean, allowDuplicates?: boolean, useSaved?: boolean): void;
    function detachOne(modelURL: string, jointName?: string): void;
    function detachAll(modelURL: string, jointName?: string): void;
    function getSensorToWorldMatrix(): Mat4;
    function getSensorToWorldScale(): number;
    function getControllerLeftHandMatrix(): Mat4;
    function getControllerRightHandMatrix(): Mat4;
    function getDataRate(rateName?: AvatarDataRate): number;
    function getUpdateRate(rateName?: AvatarUpdateRate): number;
    function sendAvatarDataPacket(sendAll?: boolean): number;
    function sendIdentityPacket(): number;
    function setSessionUUID(sessionUUID: Uuid): void;
    function getTargetScale(): number;
    function resetLastSent(): void;
}
declare namespace FaceTracker {
    function setEnabled(enabled: boolean): void;
    function calibrate(): void;
    function toggleMute(): void;
    function getMuted(): boolean;
}
declare type CollisionPickResult = {
    intersects: boolean;
    intersectingObjects: IntersectingObject[];
    collisionRegion: CollisionRegion;
};
declare type IntersectingObject = {
    id: Uuid;
    type: IntersectionType;
    collisionContacts: CollisionContact[];
};
declare type CollisionContact = {
    pointOnPick: Vec3;
    pointOnObject: Vec3;
    normalOnPick: Vec3;
};
declare namespace LaserPointers {
    function createLaserPointer(properties: Pointers.RayPointerProperties): number;
    function editRenderState(id: number, renderState: string, properties: Pointers.RayPointerRenderState): void;
    function setRenderState(renderState: string, id: number): void;
    function getPrevRayPickResult(id: number): RayPickResult;
    function setLaserLength(id: number, laserLength: number): void;
    function setIgnoreItems(id: number, ignoreItems: Uuid[]): void;
    function setIncludeItems(id: number, includeItems: Uuid[]): void;
    function setLockEndUUID(id: number, targetID: Uuid, isAvatar: boolean, offset?: Mat4): void;
    function isLeftHand(id: number): boolean;
    function isRightHand(id: number): boolean;
    function isMouse(id: number): boolean;
    function enableLaserPointer(id: number): void;
    function disableLaserPointer(id: number): void;
    function removeLaserPointer(id: number): void;
    function setPrecisionPicking(id: number, precisionPicking: boolean): void;
}
declare type ParabolaPickResult = {
    type: number;
    intersects: boolean;
    objectID: Uuid;
    distance: number;
    parabolicDistance: number;
    intersection: Vec3;
    surfaceNormal: Vec3;
    extraInfo: SubmeshIntersection;
    parabola: PickParabola;
};
declare namespace Picks {
    type RayPickProperties = {
        enabled?: boolean;
        filter?: FilterFlags;
        maxDistance?: number;
        parentID?: Uuid;
        parentJointIndex?: number;
        joint?: string;
        position?: Vec3;
        posOffset?: Vec3;
        direction?: Vec3;
        dirOffset?: Vec3;
        orientation?: Quat;
        pickType: PickType;
        baseScale: Vec3;
    };
    type StylusPickProperties = {
        hand?: number;
        enabled?: boolean;
        filter?: number;
        maxDistance?: number;
        tipOffset?: Vec3;
        pickType: PickType;
    };
    type ParabolaPickProperties = {
        enabled?: boolean;
        filter?: number;
        maxDistance?: number;
        parentID?: Uuid;
        parentJointIndex?: number;
        joint?: string;
        position?: Vec3;
        posOffset?: Vec3;
        direction?: Vec3;
        dirOffset?: Vec3;
        orientation?: Quat;
        speed?: number;
        accelerationAxis?: Vec3;
        rotateAccelerationWithAvatar?: boolean;
        rotateAccelerationWithParent?: boolean;
        scaleWithParent?: boolean;
        scaleWithAvatar?: boolean;
        pickType: PickType;
        baseScale: Vec3;
    };
    type CollisionPickProperties = {
        enabled?: boolean;
        filter?: FilterFlags;
        maxDistance?: number;
        parentID?: Uuid;
        parentJointIndex?: number;
        joint?: string;
        scaleWithParent?: boolean;
        shape: Shape;
        position: Vec3;
        orientation: Quat;
        threshold: number;
        collisionGroup?: CollisionMask;
        pickType: PickType;
        baseScale: Vec3;
    };
    function createPick(type: PickType, properties: Picks.RayPickProperties | Picks.ParabolaPickProperties | Picks.StylusPickProperties | Picks.CollisionPickProperties): number;
    function enablePick(id: number): void;
    function disablePick(id: number): void;
    function isPickEnabled(id: number): boolean;
    function removePick(id: number): void;
    function getPickProperties(id: number): Picks.RayPickProperties | Picks.ParabolaPickProperties | Picks.StylusPickProperties | Picks.CollisionPickProperties;
    function getPickScriptParameters(id: number): Picks.RayPickProperties | Picks.ParabolaPickProperties | Picks.StylusPickProperties | Picks.CollisionPickProperties;
    function getPicks(): number[];
    function getPrevPickResult(id: number): RayPickResult | ParabolaPickResult | StylusPickResult | CollisionPickResult;
    function setPrecisionPicking(id: number, precisionPicking: boolean): void;
    function setIgnoreItems(id: number, ignoreItems: Uuid[]): void;
    function setIncludeItems(id: number, includeItems: Uuid[]): void;
    function isLeftHand(id: number): boolean;
    function isRightHand(id: number): boolean;
    function isMouse(id: number): boolean;
    function PICK_ENTITIES(): number;
    function PICK_OVERLAYS(): number;
    function PICK_DOMAIN_ENTITIES(): number;
    function PICK_AVATAR_ENTITIES(): number;
    function PICK_LOCAL_ENTITIES(): number;
    function PICK_AVATARS(): number;
    function PICK_HUD(): number;
    function PICK_INCLUDE_VISIBLE(): number;
    function PICK_INCLUDE_INVISIBLE(): number;
    function PICK_INCLUDE_COLLIDABLE(): number;
    function PICK_INCLUDE_NONCOLLIDABLE(): number;
    function PICK_PRECISE(): number;
    function PICK_COARSE(): number;
    function PICK_ALL_INTERSECTIONS(): number;
    function INTERSECTED_NONE(): number;
    function INTERSECTED_ENTITY(): number;
    function INTERSECTED_LOCAL_ENTITY(): number;
    function INTERSECTED_OVERLAY(): number;
    function INTERSECTED_AVATAR(): number;
    function INTERSECTED_HUD(): number;
}
declare namespace Pointers {
    type StylusPointerProperties = {
        model?: Pointers.StylusPointerModel;
        hover?: boolean;
        pointerType: PickType;
        pickID?: number;
    };
    type StylusPointerModel = {
        url?: string;
        dimensions?: Vec3;
        positionOffset?: Vec3;
        rotationOffset?: Quat;
    };
    type DefaultRayPointerRenderState = {
        distance: number;
    };
    type RayPointerRenderState = {
        name: string;
        start?: Overlays.OverlayProperties | Uuid;
        path?: Overlays.OverlayProperties | Uuid;
        end?: Overlays.OverlayProperties | Uuid;
    };
    type RayPointerProperties = {
        faceAvatar?: boolean;
        centerEndY?: boolean;
        lockEnd?: boolean;
        distanceScaleEnd?: boolean;
        scaleWithParent?: boolean;
        scaleWithAvatar?: boolean;
        followNormal?: boolean;
        followNormalStrength?: number;
        renderStates?: Pointers.RayPointerRenderState[] | {
            [key: string]: Pointers.RayPointerRenderState;
        };
        defaultRenderStates?: Pointers.DefaultRayPointerRenderState[] | {
            [key: string]: Pointers.DefaultRayPointerRenderState;
        };
        hover?: boolean;
        triggers?: Pointers.Trigger[];
        pointerType: PickType;
        pickID?: number;
    };
    type ParabolaPointerPath = {
        color?: Color;
        alpha?: number;
        width?: number;
        isVisibleInSecondaryCamera?: boolean;
        drawInFront?: boolean;
    };
    type DefaultParabolaPointerRenderState = {
        distance: number;
    };
    type ParabolaPointerRenderState = {
        name: string;
        start?: Overlays.OverlayProperties | Uuid;
        path?: Pointers.ParabolaPointerPath | Uuid;
        end?: Overlays.OverlayProperties | Uuid;
    };
    type ParabolaPointerProperties = {
        faceAvatar?: boolean;
        centerEndY?: boolean;
        lockEnd?: boolean;
        distanceScaleEnd?: boolean;
        scaleWithParent?: boolean;
        scaleWithAvatar?: boolean;
        followNormal?: boolean;
        followNormalStrength?: number;
        renderStates?: Pointers.ParabolaPointerRenderState[] | {
            [key: string]: Pointers.ParabolaPointerRenderState;
        };
        defaultRenderStates?: Pointers.DefaultParabolaPointerRenderState[] | {
            [key: string]: Pointers.DefaultParabolaPointerRenderState;
        };
        hover?: boolean;
        triggers?: Pointers.Trigger[];
        pointerType: PickType;
        pickID?: number;
    };
    type Trigger = {
        action: Controller.Standard | Controller.Actions | ((...params: any[]) => any);
        button: string;
    };
    function createPointer(type: PickType, properties: Pointers.RayPointerProperties | Pointers.ParabolaPointerProperties | Pointers.StylusPointerProperties): number;
    function enablePointer(id: number): void;
    function disablePointer(id: number): void;
    function isPointerEnabled(id: number): boolean;
    function removePointer(id: number): void;
    function getPointerScriptParameters(id: number): Pointers.RayPointerProperties | Pointers.ParabolaPointerProperties | Pointers.StylusPointerProperties;
    function getPointers(): number[];
    function editRenderState(id: number, renderState: string, properties: Pointers.RayPointerRenderState | Pointers.ParabolaPointerRenderState): void;
    function setRenderState(id: number, renderState: string): void;
    function getPrevPickResult(id: number): RayPickResult | ParabolaPickResult | StylusPickResult;
    function setPrecisionPicking(id: number, precisionPicking: boolean): void;
    function setLength(id: number, length: number): void;
    function setIgnoreItems(id: number, ignoreItems: Uuid[]): void;
    function setIncludeItems(id: number, includeItems: Uuid[]): void;
    function setLockEndUUID(id: number, targetID: Uuid, isAvatar: boolean, offset?: Mat4): void;
    function isLeftHand(id: number): boolean;
    function isRightHand(id: number): boolean;
    function isMouse(id: number): boolean;
    function getPointerProperties(id: number): Pointers.RayPointerProperties | Pointers.ParabolaPointerProperties | any;
}
declare type RayPickResult = {
    type: IntersectionType;
    intersects: boolean;
    objectID: Uuid;
    distance: number;
    intersection: Vec3;
    surfaceNormal: Vec3;
    extraInfo: SubmeshIntersection;
    searchRay: PickRay;
};
declare namespace RayPick {
    function createRayPick(properties: Picks.RayPickProperties): number;
    function enableRayPick(id: number): void;
    function disableRayPick(id: number): void;
    function removeRayPick(id: number): void;
    function getPrevRayPickResult(id: number): RayPickResult;
    function setPrecisionPicking(id: number, precisionPicking: boolean): void;
    function setIgnoreItems(id: number, ignoreItems: Uuid[]): void;
    function setIncludeItems(id: number, includeItems: Uuid[]): void;
    function isLeftHand(id: number): boolean;
    function isRightHand(id: number): boolean;
    function isMouse(id: number): boolean;
    function PICK_ENTITIES(): number;
    function PICK_OVERLAYS(): number;
    function PICK_AVATARS(): number;
    function PICK_HUD(): number;
    function PICK_COARSE(): number;
    function PICK_INCLUDE_INVISIBLE(): number;
    function PICK_INCLUDE_NONCOLLIDABLE(): number;
    function PICK_ALL_INTERSECTIONS(): number;
    function INTERSECTED_NONE(): number;
    function INTERSECTED_ENTITY(): number;
    function INTERSECTED_OVERLAY(): number;
    function INTERSECTED_OVERLAY(): number;
    function INTERSECTED_AVATAR(): number;
    function INTERSECTED_HUD(): number;
}
declare type StylusPickResult = {
    type: number;
    intersects: boolean;
    objectID: Uuid;
    distance: number;
    intersection: Vec3;
    surfaceNormal: Vec3;
    stylusTip: StylusTip;
};
declare namespace AccountServices {
    type DownloadInfoResult = {
        downloading: number[];
        pending: number;
    };
    function getDownloadInfo(): AccountServices.DownloadInfoResult;
    function updateDownloadInfo(): void;
    function isLoggedIn(): boolean;
    function checkAndSignalForAccessToken(): boolean;
    function logOut(): void;
}
declare namespace Audio {
    function setInputDevice(device: any, isHMD: boolean): void;
    function setOutputDevice(device: any, isHMD: boolean): void;
    function setReverb(enable: boolean): void;
    function setReverbOptions(options: AudioEffectOptions): void;
    function setAvatarGain(gain: number): void;
    function getAvatarGain(): number;
    function setInjectorGain(gain: number): void;
    function getInjectorGain(): number;
    function setLocalInjectorGain(gain: number): void;
    function getLocalInjectorGain(): number;
    function setSystemInjectorGain(gain: number): void;
    function getSystemInjectorGain(): number;
    function startRecording(filename: string): boolean;
    function stopRecording(): void;
    function getRecording(): boolean;
    function setPushingToTalkOutputGainDesktop(gain: number): void;
    function getPushingToTalkOutputGainDesktop(): number;
    function onContextChanged(): void;
    function addToSoloList(ids: Uuid[]): void;
    function removeFromSoloList(ids: Uuid[]): void;
    function resetSoloList(): void;
    function getServerEcho(): boolean;
    function setServerEcho(serverEcho: boolean): void;
    function toggleServerEcho(): void;
    function getLocalEcho(): boolean;
    function setLocalEcho(): void;
    function toggleLocalEcho(): void;
    function playSound(sound: SoundObject, injectorOptions?: AudioInjector.AudioInjectorOptions): AudioInjector;
    function playSystemSound(sound: SoundObject): AudioInjector;
    function setStereoInput(stereo: boolean): void;
    function isStereoInput(): boolean;
}
declare namespace Clipboard {
    function getContentsDimensions(): Vec3;
    function getClipboardContentsLargestDimension(): number;
    function importEntities(filename: string, isObservable?: boolean, callerID?: number): boolean;
    function exportEntities(filename: string, entityIDs: Uuid[]): boolean;
    function exportEntities(filename: string, x: number, y: number, z: number, scale: number): boolean;
    function pasteEntities(position: Vec3): Uuid[];
}
declare namespace Controller {
    type Hardware-Application = any;
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
    type Actions = any;
    type Hand = number;
    type Hardware = any;
    function getAllActions(): Action[];
    function getAvailableInputs(deviceID: number): NamedPair[];
    function getDeviceName(deviceID: number): string;
    function getActionValue(actionID: number): number;
    function findDevice(deviceName: string): number;
    function getDeviceNames(): string[];
    function findAction(actionName: string): number;
    function getActionNames(): string[];
    function getValue(source: number): number;
    function getAxisValue(source: number): number;
    function getPoseValue(source: number): Pose;
    function triggerHapticPulse(strength: number, duration: number, hand?: Controller.Hand): void;
    function triggerShortHapticPulse(strength: number, hand?: Controller.Hand): void;
    function triggerHapticPulseOnDevice(deviceID: number, strength: number, duration: number, hand?: Controller.Hand): void;
    function triggerShortHapticPulseOnDevice(deviceID: number, strength: number, hand?: Controller.Hand): void;
    function newMapping(mappingName?: string): MappingObject;
    function enableMapping(mappingName: string, enable?: boolean): void;
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
    function getRunningInputDevices(): string[];
    function captureMouseEvents(): void;
    function releaseMouseEvents(): void;
    function captureTouchEvents(): void;
    function releaseTouchEvents(): void;
    function captureWheelEvents(): void;
    function releaseWheelEvents(): void;
    function captureActionEvents(): void;
    function releaseActionEvents(): void;
    function updateRunningInputDevices(deviceName: string, isRunning: boolean, runningDevices: string[]): void;
    type Standard = any;
    type MappingJSON = {
        name: string;
        channels: Controller.MappingJSONRoute[];
    };
    type MappingJSONRoute = {
        from: string | Controller.MappingJSONAxis;
        peek?: boolean;
        debug?: boolean;
        when?: string | string[];
        filters?: Controller.MappingJSONFilter | Controller.MappingJSONFilter[];
        to: string;
    };
    type MappingJSONAxis = {
        makeAxis: string[][];
    };
    type MappingJSONFilter = {
        type: string;
        ??: string;
        ??: string;
    };
    type Hardware-Keyboard = any;
    type Hardware-OculusTouch = any;
    type Hardware-Vive = any;
}
declare namespace InteractiveWindow {
    type DockAreas = {
        TOP: InteractiveWindow.DockArea;
        BOTTOM: InteractiveWindow.DockArea;
        LEFT: InteractiveWindow.DockArea;
        RIGHT: InteractiveWindow.DockArea;
    };
    type DockArea = number;
    type PresentationModes = {
        VIRTUAL: InteractiveWindow.PresentationMode;
        NATIVE: InteractiveWindow.PresentationMode;
    };
    type PresentationMode = number;
    type Properties = {
        title?: string;
        position?: Vec2;
        size?: Vec2;
        visible?: boolean;
        presentationMode?: InteractiveWindow.PresentationMode;
        presentationWindowInfo?: InteractiveWindow.PresentationWindowInfo;
        additionalFlags?: InteractiveWindow.AdditionalFlags;
        overrideFlags?: InteractiveWindow.OverrideFlags;
    };
    type PresentationWindowInfo = {
        dockArea: InteractiveWindow.DockArea;
    };
    type Flags = number;
}
declare namespace Desktop {
    function setHUDAlpha(alpha: number): void;
    function show(url: string, name: string): void;
    function createWindow(url: string, properties?: InteractiveWindow.Properties): InteractiveWindow;
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
    function isHMDAvailable(name?: string): boolean;
    function isHeadControllerAvailable(name?: string): boolean;
    function isHandControllerAvailable(name?: string): boolean;
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
    function openTablet(contextualMode?: boolean): void;
    function getHUDLookAtPosition2D(): Vec2;
    function getHUDLookAtPosition3D(): Vec3;
}
declare namespace Keyboard { }
declare namespace Menu {
    function addMenu(menuName: string, grouping?: string): void;
    function removeMenu(menuName: string): void;
    function menuExists(menuName: string): boolean;
    function addSeparator(menuName: string, separatorName: string): void;
    function removeSeparator(menuName: string, separatorName: string): void;
    function addMenuItem(properties: Menu.MenuItemProperties): void;
    function addMenuItem(menuName: string, menuItem: string, shortcutKey?: string): void;
    function removeMenuItem(menuName: string, menuItem: string): void;
    function menuItemExists(menuName: string, menuItem: string): boolean;
    function isOptionChecked(menuOption: string): boolean;
    function setIsOptionChecked(menuOption: string, isChecked: boolean): void;
    function triggerOption(menuOption: string): void;
    function isMenuEnabled(menuName: string): boolean;
    function setMenuEnabled(menuName: string, isEnabled: boolean): void;
    type MenuItemProperties = {
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
    };
}
declare namespace PlatformInfo {
    type PlatformTier = number;
    function getInstance(): void;
    function getOperatingSystemType(): string;
    function getCPUBrand(): string;
    function getNumLogicalCores(): number;
    function getTotalSystemMemoryMB(): number;
    function getGraphicsCardType(): string;
    function hasRiftControllers(): boolean;
    function hasViveControllers(): boolean;
    function has3DHTML(): boolean;
    function isStandalone(): boolean;
    function getNumCPUs(): number;
    function getMasterCPU(): number;
    function getCPU(index: number): string;
    function getNumGPUs(): number;
    function getMasterGPU(): number;
    function getGPU(index: number): string;
    function getNumDisplays(): number;
    function getMasterDisplay(): number;
    function getDisplay(index: number): string;
    function getMemory(): string;
    function getComputer(): string;
    function getPlatform(): string;
    function getTierProfiled(): PlatformInfo.PlatformTier;
    function getPlatformTierNames(): string[];
    function isRenderMethodDeferredCapable(): boolean;
    type PlatformDescription = {
        computer: PlatformInfo.ComputerDescription;
        cpus: PlatformInfo.CPUDescription[];
        displays: PlatformInfo.DisplayDescription[];
        gpus: PlatformInfo.GPUDescription[];
        graphicsAPIs: PlatformInfo.GraphicsAPIDescription[];
        memory: PlatformInfo.MemoryDescription;
        nics: PlatformInfo.NICDescription;
    };
    type CPUDescription = {
        vendor: string;
        model: string;
        numCores: number;
        isMaster: boolean;
    };
    type GPUDescription = {
        vendor: string;
        model: string;
        driver: string;
        videoMemory: number;
        displays: number[];
        isMaster: boolean;
    };
    type GraphicsAPIDescription = {
        name: string;
        version: string;
        renderer?: string;
        vendor?: string;
        shadingLanguageVersion?: string;
        extensions?: string[];
        devices?: PlatformInfo.VulkanAPIDescription[];
    };
    type VulkanAPIDescription = {
        driverVersion: string;
        apiVersion: string;
        deviceType: string;
        vendor: string;
        name: string;
        extensions: string[];
        queues: PlatformInfo.VulkanQueueDescription[];
        heaps: PlatformInfo.VulkanHeapDescription[];
    };
    type VulkanQueueDescription = {
        flags: string;
        count: number;
    };
    type VulkanHeapDescription = {
        flags: string;
        size: number;
    };
    type NICDescription = {
        name: string;
        mac: string;
    };
    type DisplayDescription = {
        description: string;
        deviceName: string;
        boundsLeft: number;
        boundsRight: number;
        boundsTop: number;
        boundsBottom: number;
        gpu: number;
        ppi: number;
        ppiDesktop: number;
        physicalWidth: number;
        physicalHeight: number;
        modeRefreshrate: number;
        modeWidth: number;
        modeHeight: number;
        isMaster: boolean;
    };
    type MemoryDescription = {
        memTotal: number;
    };
    type ComputerDescription = {
        OS: PlatformInfo.ComputerOS;
        OSversion: string;
        vendor: string;
        model: string;
        profileTier: PlatformInfo.PlatformTier;
    };
    type ComputerOS = string;
}
declare namespace Render {
    type RenderMethod = number;
    function getConfig(name: string): any;
    function getRenderMethod(): Render.RenderMethod;
    function setRenderMethod(renderMethod: Render.RenderMethod): void;
    function getRenderMethodNames(): string[];
    function getShadowsEnabled(): boolean;
    function setShadowsEnabled(enabled: boolean): void;
    function getAmbientOcclusionEnabled(): boolean;
    function setAmbientOcclusionEnabled(enabled: boolean): void;
    function getAntialiasingEnabled(): boolean;
    function setAntialiasingEnabled(enabled: boolean): void;
    function getViewportResolutionScale(): number;
    function setViewportResolutionScale(resolutionScale: number): void;
    function getConfig(name: string): any;
}
declare namespace Selection {
    type ItemType = string;
    type SelectedItemsList = {
        avatars: Uuid[];
        entities: Uuid[];
    };
    type HighlightStyle = {
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
    };
    function getListNames(): string[];
    function removeListFromMap(listName: string): boolean;
    function addToSelectedItemsList(listName: string, itemType: Selection.ItemType, itemID: Uuid): boolean;
    function removeFromSelectedItemsList(listName: string, itemType: Selection.ItemType, itemID: Uuid): boolean;
    function clearSelectedItemsList(listName: string): boolean;
    function printList(listName: string): void;
    function getSelectedItemsList(listName: string): Selection.SelectedItemsList;
    function getHighlightedListNames(): string[];
    function enableListHighlight(listName: string, highlightStyle: Selection.HighlightStyle): boolean;
    function disableListHighlight(listName: string): boolean;
    function enableListToScene(listName: string): boolean;
    function disableListToScene(listName: string): boolean;
    function getListHighlightStyle(listName: string): Selection.HighlightStyle;
}
declare namespace Settings {
    function getValue(key: string, defaultValue?: string | number | boolean | any): string | number | boolean | any;
    function setValue(key: string, value: string | number | boolean | any | undefined): void;
}
declare namespace WalletScriptingInterface {
    type WalletStatus = number;
    function refreshWalletStatus(): void;
    function getWalletStatus(): WalletScriptingInterface.WalletStatus;
    function proveAvatarEntityOwnershipVerification(entityID: Uuid): void;
}
declare namespace Window {
    type MessageBoxButton = number;
    function hasFocus(): boolean;
    function setFocus(): void;
    function raise(): void;
    function alert(message?: string): void;
    function confirm(message?: string): boolean;
    function prompt(message: string, defaultText: string): string;
    function promptAsync(message?: string, defaultText?: string): void;
    function browseDir(title?: string, directory?: string): string;
    function browseDirAsync(title?: string, directory?: string): void;
    function browse(title?: string, directory?: string, nameFilter?: string): string;
    function browseAsync(title?: string, directory?: string, nameFilter?: string): void;
    function save(title?: string, directory?: string, nameFilter?: string): string;
    function saveAsync(title?: string, directory?: string, nameFilter?: string): void;
    function browseAssets(title?: string, directory?: string, nameFilter?: string): string;
    function browseAssetsAsync(title?: string, directory?: string, nameFilter?: string): void;
    function showAssetServer(uploadFile?: string): void;
    function checkVersion(): string;
    function protocolSignature(): string;
    function copyToClipboard(text: string): void;
    function takeSnapshot(notify?: boolean, includeAnimated?: boolean, aspectRatio?: number, filename?: string): void;
    function takeSecondaryCameraSnapshot(notify?: boolean, filename?: string): void;
    function takeSecondaryCamera360Snapshot(cameraPosition: Vec3, cubemapOutputFormat?: boolean, notify?: boolean, filename?: string): void;
    function makeConnection(success: boolean, description: string): void;
    function displayAnnouncement(message: string): void;
    function shareSnapshot(path: string, href?: string): void;
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
    function domainLoadingProgress(): number;
    function getDisplayPluginCount(): number;
    function getDisplayPluginName(index: number): string;
    function isDisplayPluginHmd(index: number): boolean;
    function getActiveDisplayPlugin(): number;
    function setActiveDisplayPlugin(index: number): void;
    function openWebBrowser(): void;
    type DisplayTexture = string;
    type ConnectionRefusedReason = number;
}
declare namespace AvatarInputs {
    function loudnessToAudioLevel(loudness: number): number;
    function setShowAudioTools(showAudioTools: boolean): void;
    function setShowBubbleTools(showBubbleTools: boolean): void;
    function resetSensors(): void;
    function toggleCameraMute(): void;
}
declare class InteractiveWindow {
    static sendToQml(message: string | any): void;
    static emitScriptEvent(message: string | any): void;
    static emitWebEvent(message: any | string): void;
    static close(): void;
    static show(): void;
    static raise(): void;
}
declare namespace Snapshot {
    function getSnapshotsLocation(): string;
    function setSnapshotsLocation(location: string): void;
}
declare namespace Stats {
    function grabToImage(callback: any, targetSize?: Size): boolean;
    function contains(point: Vec2): boolean;
    function mapFromItem(item: any): void;
    function mapToItem(item: any): void;
    function mapFromGlobal(global: any): void;
    function mapToGlobal(global: any): void;
    function forceActiveFocus(reason?: number): void;
    function nextItemInFocusChain(forward?: boolean): any;
    function childAt(x: number, y: number): any;
    function update(): void;
}
declare namespace Overlays {
    type OverlayType = string;
    type OverlayProperties = {
        id: Uuid;
        type: Overlays.OverlayType;
        visible: boolean;
    };
    type OverlayProperties-Image = {
        bounds: Rect;
        x: number;
        y: number;
        width: number;
        height: number;
        imageURL: string;
        subImage: Rect;
        color: Color;
        alpha: number;
    };
    type OverlayProperties-Text = {
        bounds: Rect;
        x: number;
        y: number;
        width: number;
        height: number;
        margin: number;
        leftMargin: number;
        topMargin: number;
        text: string;
        lineHeight: number;
        color: Color;
        alpha: number;
        backgroundColor: Color;
        backgroundAlpha: number;
    };
    type OverlayProperties-Rectangle = {
        bounds: Rect;
        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;
        color: Color;
        alpha: number;
        borderWidth: number;
        borderColor: Color;
        borderAlpha: number;
    };
    type OverlayProperties-Cube = {
        name: string;
        color: Color;
        alpha: number;
        pulseMax: number;
        pulseMin: number;
        pulsePeriod: number;
        alphaPulse: number;
        colorPulse: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        isSolid: boolean;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
    };
    type OverlayProperties-Sphere = {
        name: string;
        color: Color;
        alpha: number;
        pulseMax: number;
        pulseMin: number;
        pulsePeriod: number;
        alphaPulse: number;
        colorPulse: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        isSolid: boolean;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
    };
    type OverlayProperties-Rectangle3D = {
        name: string;
        color: Color;
        alpha: number;
        pulseMax: number;
        pulseMin: number;
        pulsePeriod: number;
        alphaPulse: number;
        colorPulse: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        isSolid: boolean;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
    };
    type Shape = string;
    type OverlayProperties-Shape = {
        name: string;
        color: Color;
        alpha: number;
        pulseMax: number;
        pulseMin: number;
        pulsePeriod: number;
        alphaPulse: number;
        colorPulse: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        isSolid: boolean;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
        shape: Overlays.Shape;
    };
    type OverlayProperties-Model = {
        name: string;
        position: Vec3;
        dimensions: Vec3;
        scale: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
        url: string;
        loadPriority: number;
        textures: {
            [key: string]: string;
        } | string;
        animationSettings: Entities.AnimationProperties;
    };
    type OverlayProperties-Text3D = {
        name: string;
        color: Color;
        alpha: number;
        pulseMax: number;
        pulseMin: number;
        pulsePeriod: number;
        alphaPulse: number;
        colorPulse: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
    };
    type OverlayProperties-Image3D = {
        name: string;
        color: Color;
        alpha: number;
        pulseMax: number;
        pulseMin: number;
        pulsePeriod: number;
        alphaPulse: number;
        colorPulse: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
        url: string;
    };
    type OverlayProperties-Web3D = {
        name: string;
        color: Color;
        alpha: number;
        pulseMax: number;
        pulseMin: number;
        pulsePeriod: number;
        alphaPulse: number;
        colorPulse: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
        url: string;
    };
    type OverlayProperties-Line3D = {
        name: string;
        color: Color;
        alpha: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
        endParentID: Uuid;
        endParentJointIndex: number;
        start: Vec3;
        end: Vec3;
        localStart: Vec3;
        localEnd: Vec3;
        length: number;
        glow: number;
        lineWidth: number;
    };
    type OverlayProperties-Grid = {
        name: string;
        color: Color;
        alpha: number;
        pulseMax: number;
        pulseMin: number;
        pulsePeriod: number;
        alphaPulse: number;
        colorPulse: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
    };
    type OverlayProperties-Circle3D = {
        name: string;
        pulseMax: number;
        pulseMin: number;
        pulsePeriod: number;
        alphaPulse: number;
        colorPulse: number;
        position: Vec3;
        dimensions: Vec3;
        rotation: Quat;
        localPosition: Vec3;
        localRotation: Quat;
        isSolid: boolean;
        ignorePickIntersection: boolean;
        drawInFront: boolean;
        drawHUDLayer: boolean;
        grabbable: boolean;
        parentID: Uuid;
        parentJointIndex: number;
        startAt: number;
        endAt: number;
        outerRadius: number;
        innerRadius: number;
        color: Color;
        startColor: Color;
        endColor: Color;
        innerColor: Color;
        outerColor: Color;
        innerStartcolor: Color;
        innerEndColor: Color;
        outerStartColor: Color;
        outerEndColor: Color;
        alpha: number;
        startAlpha: number;
        endAlpha: number;
        innerAlpha: number;
        outerAlpha: number;
        innerStartAlpha: number;
        innerEndAlpha: number;
        outerStartAlpha: number;
        outerEndAlpha: number;
        hasTickMarks: boolean;
        majorTickMarksAngle: number;
        minorTickMarksAngle: number;
        majorTickMarksLength: number;
        minorTickMarksLength: number;
        majorTickMarksColor: Color;
        minorTickMarksColor: Color;
    };
    type RayToOverlayIntersectionResult = {
        intersects: boolean;
        overlayID: Uuid;
        distance: number;
        surfaceNormal: Vec3;
        intersection: Vec3;
        extraInfo: any;
    };
    function addOverlay(type: Overlays.OverlayType, properties: Overlays.OverlayProperties): Uuid;
    function cloneOverlay(id: Uuid): Uuid;
    function editOverlay(id: Uuid, properties: Overlays.OverlayProperties): boolean;
    function editOverlays(propertiesById: {
        [key: string]: Overlays.OverlayProperties;
    }): boolean;
    function deleteOverlay(id: Uuid): void;
    function getOverlayType(id: Uuid): Overlays.OverlayType;
    function getOverlayObject(overlayID: Uuid): any;
    function getOverlayAtPoint(point: Vec2): Uuid;
    function getProperty(id: Uuid, property: string): any;
    function getProperties(id: Uuid, properties: string[]): Overlays.OverlayProperties;
    function getOverlaysProperties(propertiesById: {
        [key: string]: string[];
    }): {
        [key: string]: Overlays.OverlayProperties;
    };
    function findRayIntersection(pickRay: PickRay, precisionPicking?: boolean, include?: Uuid[], discard?: Uuid[], visibleOnly?: boolean, collideableOnly?: boolean): Overlays.RayToOverlayIntersectionResult;
    function findOverlays(center: Vec3, radius: number): Uuid[];
    function isLoaded(id: Uuid): boolean;
    function textSize(id: Uuid, text: string): Size;
    function width(): number;
    function height(): number;
    function isAddedOverlay(id: Uuid): boolean;
    function sendMousePressOnOverlay(id: Uuid, event: PointerEvent): void;
    function sendMouseReleaseOnOverlay(id: Uuid, event: PointerEvent): void;
    function sendMouseMoveOnOverlay(id: Uuid, event: PointerEvent): void;
    function sendHoverEnterOverlay(id: Uuid, event: PointerEvent): void;
    function sendHoverOverOverlay(id: Uuid, event: PointerEvent): void;
    function sendHoverLeaveOverlay(id: Uuid, event: PointerEvent): void;
    function getKeyboardFocusOverlay(): Uuid;
    function setKeyboardFocusOverlay(id: Uuid): void;
}
declare namespace AnimationCache {
    function getAnimation(url: string): AnimationObject;
    function getResourceList(): string[];
    function updateTotalSize(deltaSize: number): void;
    function prefetch(url: string): ResourceObject;
}
declare class AnimationObject {
    static getJointNames(): string[];
    static getFrames(): AnimationFrameObject[];
}
declare class AnimationFrameObject {
    static getRotations(): Quat[];
}
declare namespace AudioStats {
    class AudioStreamStats {
    }
}
declare namespace AudioEffectOptions {
    type ReverbOptions = {
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
    };
}
declare class AudioEffectOptions {
    constructor(reverbOptions?: AudioEffectOptions.ReverbOptions);
}
declare namespace AudioInjector {
    type AudioInjectorOptions = {
        position: Vec3;
        orientation: Quat;
        volume: number;
        pitch: number;
        loop: boolean;
        secondOffset: number;
        localOnly: boolean;
        ignorePenumbra: boolean;
    };
}
declare class SoundObject {
}
declare namespace SoundCache {
    function getSound(url: string): SoundObject;
    function getResourceList(): string[];
    function updateTotalSize(deltaSize: number): void;
    function prefetch(url: string): ResourceObject;
}
declare type AvatarDataRate = string;
declare type AvatarUpdateRate = string;
declare type AttachmentData = {
    modelUrl: string;
    jointName: string;
    translation: Vec3;
    rotation: Vec3;
    scale: number;
    soft: boolean;
};
declare type RayToAvatarIntersectionResult = {
    intersects: boolean;
    avatarID: string;
    distance: number;
    face: string;
    intersection: Vec3;
    surfaceNormal: Vec3;
    jointIndex: number;
    extraInfo: SubmeshIntersection;
};
declare type AvatarEntityMap = {
    [key: string]: Entities.EntityProperties;
};
declare type HandState = number;
declare type ParabolaToAvatarIntersectionResult = {
    intersects: boolean;
    avatarID: Uuid;
    distance: number;
    parabolicDistance: number;
    face: BoxFace;
    intersection: Vec3;
    surfaceNormal: Vec3;
    extraInfo: any;
};
declare namespace AvatarList {
    function getAvatarIdentifiers(): Uuid[];
    function getAvatarsInRange(position: Vec3, range: number): Uuid[];
    function getAvatar(avatarID: Uuid): AvatarData;
    function isAvatarInRange(position: string, range: string): boolean;
    function sessionUUIDChanged(sessionUUID: Uuid, oldSessionUUID: Uuid): void;
    function processAvatarDataPacket(message: any, sendingNode: any): void;
    function processAvatarIdentityPacket(message: any, sendingNode: any): void;
    function processBulkAvatarTraits(message: any, sendingNode: any): void;
    function processKillAvatar(message: any, sendingNode: any): void;
}
declare type AvatarData = {
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
    isReplicated: boolean;
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
};
declare type AvatarSimulationRate = string;
declare type Pose = {
    translation: Vec3;
    rotation: Quat;
    velocity: Vec3;
    angularVelocity: Vec3;
    valid: boolean;
};
declare class MappingObject {
    fromQml(source: Controller.Standard | Controller.Hardware | ((...params: any[]) => any)): RouteObject;
    makeAxisQml(source1: Controller.Hardware, source2: Controller.Hardware): RouteObject;
    from(source: Controller.Standard | Controller.Hardware | ((...params: any[]) => any)): RouteObject;
    makeAxis(source1: Controller.Hardware, source2: Controller.Hardware): RouteObject;
    enable(enable?: boolean): MappingObject;
    disable(): MappingObject;
}
declare class RouteObject {
    toQml(destination: Controller.Standard | Controller.Actions | ((...params: any[]) => any)): void;
    whenQml(expression: condition | condition[]): RouteObject;
    to(destination: Controller.Standard | Controller.Actions | ((...params: any[]) => any)): void;
    debug(enable?: boolean): RouteObject;
    peek(enable?: boolean): RouteObject;
    when(expression: condition | condition[]): RouteObject;
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
}
declare namespace Entities {
    type ActionArguments-FarGrab = {
        otherID: Uuid;
        otherJointIndex: Uuid;
        targetPosition: Vec3;
        targetRotation: Quat;
        linearTimeScale: number;
        angularTimeScale: number;
    };
    type ActionArguments-Hold = {
        holderID: Uuid;
        hand: string;
        relativePosition: Vec3;
        relativeRotation: Vec3;
        timeScale: number;
        kinematic: boolean;
        kinematicSetVelocity: boolean;
        ignoreIK: boolean;
    };
    type AmbientLight = {
        ambientIntensity: number;
        ambientURL: string;
    };
    type AnimationProperties = {
        url: string;
        allowTranslation: boolean;
        fps: number;
        firstFrame: number;
        lastFrame: number;
        currentFrame: number;
        running: boolean;
        loop: boolean;
        hold: boolean;
    };
    type Bloom = {
        bloomIntensity: number;
        bloomThreshold: number;
        bloomSize: number;
    };
    type ActionType = string;
    type EntityProperties = {
        id: Uuid;
        name: string;
        type: Entities.EntityType;
        entityHostType: Entities.EntityHostType;
        avatarEntity: boolean;
        clientOnly: boolean;
        localEntity: boolean;
        owningAvatarID: Uuid;
        created: string;
        age: number;
        ageAsText: string;
        lifetime: number;
        lastEdited: number;
        lastEditedBy: Uuid;
        locked: boolean;
        visible: boolean;
        canCastShadow: boolean;
        isVisibleInSecondaryCamera: boolean;
        renderLayer: Entities.RenderLayer;
        primitiveMode: Entities.PrimitiveMode;
        ignorePickIntersection: boolean;
        position: Vec3;
        rotation: Quat;
        registrationPoint: Vec3;
        naturalPosition: Vec3;
        naturalDimensions: Vec3;
        velocity: Vec3;
        damping: number;
        angularVelocity: Vec3;
        angularDamping: number;
        gravity: Vec3;
        acceleration: Vec3;
        restitution: number;
        friction: number;
        density: number;
        collisionless: boolean;
        ignoreForCollisions: boolean;
        collisionMask: CollisionMask;
        collidesWith: string;
        collisionSoundURL: string;
        dynamic: boolean;
        collisionsWillMove: boolean;
        href: string;
        description: string;
        userData: string;
        privateUserData: string;
        script: string;
        scriptTimestamp: number;
        serverScripts: string;
        parentID: Uuid;
        parentJointIndex: number;
        localPosition: Vec3;
        localRotation: Quat;
        localVelocity: Vec3;
        localAngularVelocity: Vec3;
        localDimensions: Vec3;
        boundingBox: Entities.BoundingBox;
        queryAACube: AACube;
        actionData: string;
        renderInfo: Entities.RenderInfo;
        cloneable: boolean;
        cloneLifetime: number;
        cloneLimit: number;
        cloneDynamic: boolean;
        cloneAvatarEntity: boolean;
        cloneOriginID: Uuid;
        grab: Entities.Grab;
        itemName: string;
        itemDescription: string;
        itemCategories: string;
        itemArtist: string;
        itemLicense: string;
        limitedRun: number;
        editionNumber: number;
        entityInstanceNumber: number;
        marketplaceID: string;
        certificateID: string;
        staticCertificateVersion: number;
    };
    type EntityProperties-Box = any;
    type EntityProperties-Light = {
        dimensions: Vec3;
        color: Color;
        intensity: number;
        falloffRadius: number;
        isSpotlight: boolean;
        exponent: number;
        cutoff: number;
    };
    type EntityProperties-Line = {
        dimensions: Vec3;
        linePoints: Vec3[];
        color: Color;
    };
    type EntityProperties-Material = {
        dimensions: Vec3;
        materialURL: string;
        materialData: string;
        priority: number;
        parentMaterialName: string;
        materialMappingMode: string;
        materialMappingPos: Vec2;
        materialMappingScale: Vec2;
        materialMappingRot: number;
        materialRepeat: boolean;
    };
    type EntityProperties-Model = {
        dimensions: Vec3;
        modelURL: string;
        modelScale: Vec3;
        textures: string;
        originalTextures: string;
        color: Color;
        shapeType: ShapeType;
        compoundShapeURL: string;
        animation: Entities.AnimationProperties;
        jointRotations: Quat[];
        jointRotationsSet: boolean[];
        jointTranslations: Vec3[];
        jointTranslationsSet: boolean[];
        relayParentJoints: boolean;
        groupCulled: boolean;
    };
    type EntityProperties-ParticleEffect = {
        isEmitting: boolean;
        maxParticles: number;
        lifespan: number;
        emitRate: number;
        emitSpeed: number;
        speedSpread: number;
        emitAcceleration: Vec3;
        accelerationSpread: Vec3;
        dimensions: Vec3;
        emitterShouldTrail: boolean;
        emitOrientation: Quat;
        shapeType: ShapeType;
        compoundShapeURL: string;
        emitDimensions: Vec3;
        emitRadiusStart: number;
        polarStart: number;
        polarFinish: number;
        azimuthStart: number;
        azimuthFinish: number;
        textures: string;
        particleRadius: number;
        radiusStart: number;
        radiusFinish: number;
        radiusSpread: number;
        color: Color;
        colorStart: ColorFloat;
        colorFinish: ColorFloat;
        colorSpread: Color;
        alpha: number;
        alphaStart: number;
        alphaFinish: number;
        alphaSpread: number;
        pulse: Entities.Pulse;
        particleSpin: number;
        spinStart: number;
        spinFinish: number;
        spinSpread: number;
        rotateWithEntity: boolean;
    };
    type EntityProperties-PolyLine = {
        dimensions: Vec3;
        linePoints: Vec3[];
        normals: Vec3[];
        strokeWidths: number[];
        strokeColors: Vec3[];
        color: Color;
        textures: string;
        isUVModeStretch: boolean;
        glow: boolean;
        faceCamera: boolean;
    };
    type EntityProperties-PolyVox = {
        dimensions: Vec3;
        voxelVolumeSize: Vec3;
        voxelData: string;
        voxelSurfaceStyle: Entities.PolyVoxSurfaceStyle;
        xTextureURL: string;
        yTextureURL: string;
        zTextureURL: string;
        xNNeighborID: Uuid;
        yNNeighborID: Uuid;
        zNNeighborID: Uuid;
        xPNeighborID: Uuid;
        yPNeighborID: Uuid;
        zPNeighborID: Uuid;
    };
    type EntityProperties-Shape = {
        shape: Entities.Shape;
        dimensions: Vec3;
        color: Color;
        alpha: number;
        pulse: Entities.Pulse;
    };
    type EntityProperties-Sphere = any;
    type EntityProperties-Text = {
        dimensions: Vec3;
        text: string;
        lineHeight: number;
        textColor: Color;
        textAlpha: number;
        backgroundColor: Color;
        backgroundAlpha: number;
        pulse: Entities.Pulse;
        leftMargin: number;
        rightMargin: number;
        topMargin: number;
        bottomMargin: number;
        unlit: boolean;
        font: string;
        textEffect: Entities.TextEffect;
        textEffectColor: Color;
        textEffectThickness: number;
        billboardMode: BillboardMode;
        faceCamera: boolean;
        isFacingAvatar: boolean;
    };
    type EntityProperties-Web = {
        dimensions: Vec3;
        sourceUrl: string;
        color: Color;
        alpha: number;
        pulse: Entities.Pulse;
        billboardMode: BillboardMode;
        faceCamera: boolean;
        isFacingAvatar: boolean;
        dpi: number;
        scriptURL: string;
        maxFPS: number;
        inputMode: WebInputMode;
        showKeyboardFocusHighlight: boolean;
    };
    type EntityProperties-Zone = {
        dimensions: Vec3;
        shapeType: ShapeType;
        compoundShapeURL: string;
        keyLightMode: Entities.ComponentMode;
        keyLight: Entities.KeyLight;
        ambientLightMode: Entities.ComponentMode;
        ambientLight: Entities.AmbientLight;
        skyboxMode: Entities.ComponentMode;
        skybox: Entities.Skybox;
        hazeMode: Entities.ComponentMode;
        haze: Entities.Haze;
        bloomMode: Entities.ComponentMode;
        bloom: Entities.Bloom;
        flyingAllowed: boolean;
        ghostingAllowed: boolean;
        filterURL: string;
        avatarPriority: Entities.AvatarPriorityMode;
    };
    type EntityProperties-Image = {
        dimensions: Vec3;
        imageURL: string;
        emissive: boolean;
        keepAspectRatio: boolean;
        subImage: Rect;
        color: Color;
        alpha: number;
        pulse: Entities.Pulse;
        billboardMode: BillboardMode;
        faceCamera: boolean;
        isFacingAvatar: boolean;
    };
    type EntityProperties-Grid = {
        dimensions: Vec3;
        color: Color;
        alpha: number;
        pulse: Entities.Pulse;
        followCamera: boolean;
        majorGridEvery: number;
        minorGridEvery: number;
    };
    type EntityProperties-Gizmo = {
        dimensions: Vec3;
        gizmoType: Entities.GizmoType;
        ring: Entities.RingGizmo;
    };
    type BoundingBox = {
        brn: Vec3;
        tfl: Vec3;
        center: Vec3;
        dimensions: Vec3;
    };
    type RenderInfo = {
        verticesCount: number;
        texturesCount: number;
        texturesSize: number;
        hasTransparent: boolean;
        drawCalls: number;
    };
    type EntityPropertyInfo = {
        propertyEnum: number;
        minimum: string;
        maximum: string;
    };
    type RayToEntityIntersectionResult = {
        intersects: boolean;
        accurate: boolean;
        entityID: Uuid;
        distance: number;
        intersection: Vec3;
        surfaceNormal: Vec3;
        face: BoxFace;
        extraInfo: any;
    };
    function getMultipleEntityProperties(entityIDs: Uuid[], desiredProperties?: string[] | string): Entities.EntityProperties[];
    function canAdjustLocks(): boolean;
    function canRez(): boolean;
    function canRezTmp(): boolean;
    function canRezCertified(): boolean;
    function canRezTmpCertified(): boolean;
    function canWriteAssets(): boolean;
    function canReplaceContent(): boolean;
    function canGetAndSetPrivateUserData(): boolean;
    type EntityHostType = string;
    function addEntity(properties: Entities.EntityProperties, entityHostType?: Entities.EntityHostType): Uuid;
    function addEntity(properties: Entities.EntityProperties, entityHostType?: Entities.EntityHostType): Uuid;
    function cloneEntity(entityID: Uuid): Uuid;
    function getEntityProperties(entityID: Uuid, desiredProperties?: string | string[]): Entities.EntityProperties;
    function editEntity(entityID: Uuid, properties: Entities.EntityProperties): Uuid;
    function deleteEntity(entityID: Uuid): void;
    function getEntityType(id: Uuid): Entities.EntityType;
    function getEntityObject(id: Uuid): any;
    function isLoaded(id: Uuid): boolean;
    function isAddedEntity(id: Uuid): boolean;
    function textSize(id: Uuid, text: string): Size;
    function callEntityMethod(entityID: Uuid, method: string, parameters?: string[]): void;
    function callEntityServerMethod(entityID: Uuid, method: string, parameters?: string[]): void;
    function callEntityClientMethod(clientSessionID: Uuid, entityID: Uuid, method: string, parameters?: string[]): void;
    function findClosestEntity(center: Vec3, radius: number): Uuid;
    function findEntities(center: Vec3, radius: number): Uuid[];
    function findEntitiesInBox(corner: Vec3, dimensions: Vec3): Uuid[];
    function findEntitiesInFrustum(frustum: ViewFrustum): Uuid[];
    function findEntitiesByType(entityType: Entities.EntityType, center: Vec3, radius: number): Uuid[];
    function findEntitiesByName(entityName: string, center: Vec3, radius: number, caseSensitive?: boolean): Uuid[];
    function findRayIntersection(pickRay: PickRay, precisionPicking?: boolean, entitiesToInclude?: Uuid[], entitiesToDiscard?: Uuid[], visibleOnly?: boolean, collideableOnly?: boolean): Entities.RayToEntityIntersectionResult;
    function reloadServerScripts(entityID: Uuid): boolean;
    function getServerScriptStatus(entityID: Uuid, callback: Entities~getServerScriptStatusCallback): boolean;
    type getServerScriptStatusCallback = (success: boolean, isRunning: boolean, status: string, errorInfo: string) => void;
    function queryPropertyMetadata(entityID: Uuid, property: string, callback: Entities~queryPropertyMetadataCallback): boolean;
    function queryPropertyMetadata(entityID: Uuid, property: string, callback: Entities~queryPropertyMetadataCallback): boolean;
    type queryPropertyMetadataCallback = (error: string, result: any) => void;
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
    function setAllPoints(entityID: Uuid, points: Vec3[]): boolean;
    function appendPoint(entityID: Uuid, point: Vec3): boolean;
    function dumpTree(): void;
    function addAction(actionType: Entities.ActionType, entityID: Uuid, arguments: Entities.ActionArguments): Uuid;
    function updateAction(entityID: Uuid, actionID: Uuid, arguments: Entities.ActionArguments): boolean;
    function deleteAction(entityID: Uuid, actionID: Uuid): boolean;
    function getActionIDs(entityID: Uuid): Uuid[];
    function getActionArguments(entityID: Uuid, actionID: Uuid): Entities.ActionArguments;
    function getAbsoluteJointTranslationInObjectFrame(entityID: Uuid, jointIndex: number): Vec3;
    function getJointParent(entityID: Uuid, index: number): number;
    function getAbsoluteJointRotationInObjectFrame(entityID: Uuid, jointIndex: number): Quat;
    function setAbsoluteJointTranslationInObjectFrame(entityID: Uuid, jointIndex: number, translation: Vec3): boolean;
    function setAbsoluteJointRotationInObjectFrame(entityID: Uuid, jointIndex: number, rotation: Quat): boolean;
    function getLocalJointTranslation(entityID: Uuid, jointIndex: number): Vec3;
    function getLocalJointRotation(entityID: Uuid, jointIndex: number): Quat;
    function setLocalJointTranslation(entityID: Uuid, jointIndex: number, translation: Vec3): boolean;
    function setLocalJointRotation(entityID: Uuid, jointIndex: number, rotation: Quat): boolean;
    function setLocalJointTranslations(entityID: Uuid, translations: Vec3[]): boolean;
    function setLocalJointRotations(entityID: Uuid, rotations: Quat[]): boolean;
    function setLocalJointsData(entityID: Uuid, rotations: Quat[], translations: Vec3[]): boolean;
    function getJointIndex(entityID: Uuid, name: string): number;
    function getJointNames(entityID: Uuid): string[];
    function getChildrenIDs(parentID: Uuid): Uuid[];
    function getChildrenIDsOfJoint(parentID: Uuid, jointIndex: number): Uuid[];
    function isChildOfParent(childID: Uuid, parentID: Uuid): boolean;
    function getNestableType(id: Uuid): Entities.NestableType;
    function getKeyboardFocusEntity(): Uuid;
    function setKeyboardFocusEntity(id: Uuid): void;
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
    function getMeshes(entityID: Uuid, callback: Entities~getMeshesCallback): void;
    type getMeshesCallback = (meshes: MeshProxy[], success: boolean) => void;
    function getEntityTransform(entityID: Uuid): Mat4;
    function getEntityLocalTransform(entityID: Uuid): Mat4;
    function worldToLocalPosition(worldPosition: Vec3, parentID: Uuid, parentJointIndex?: number, scalesWithParent?: boolean): Vec3;
    function worldToLocalRotation(worldRotation: Quat, parentID: Uuid, parentJointIndex?: number, scalesWithParent?: boolean): Quat;
    function worldToLocalVelocity(worldVelocity: Vec3, parentID: Uuid, parentJointIndex?: number, scalesWithParent?: boolean): Vec3;
    function worldToLocalAngularVelocity(worldAngularVelocity: Vec3, parentID: Uuid, parentJointIndex?: number, scalesWithParent?: boolean): Vec3;
    function worldToLocalDimensions(worldDimensions: Vec3, parentID: Uuid, parentJointIndex?: number, scalesWithParent?: boolean): Vec3;
    function localToWorldPosition(localPosition: Vec3, parentID: Uuid, parentJointIndex?: number, scalesWithparent?: boolean): Vec3;
    function localToWorldRotation(localRotation: Quat, parentID: Uuid, parentJointIndex?: number, scalesWithParent?: boolean): Quat;
    function localToWorldVelocity(localVelocity: Vec3, parentID: Uuid, parentJointIndex?: number, scalesWithParent?: boolean): Vec3;
    function localToWorldAngularVelocity(localAngularVelocity: Vec3, parentID: Uuid, parentJointIndex?: number, scalesWithParent?: boolean): Vec3;
    function localToWorldDimensions(localDimensions: Vec3, parentID: Uuid, parentJointIndex?: number, scalesWithParent?: boolean): Vec3;
    function getStaticCertificateJSON(entityID: Uuid): string;
    function verifyStaticCertificateProperties(entityID: Uuid): boolean;
    function getPropertyInfo(propertyName: string): Entities.EntityPropertyInfo;
    type EntityType = string;
    type Grab = {
        grabbable: boolean;
        grabKinematic: boolean;
        grabFollowsController: boolean;
        triggerable: boolean;
        grabDelegateToParent: boolean;
        equippable: boolean;
        equippableLeftPosition: Vec3;
        equippableLeftRotation: Quat;
        equippableRightPosition: Vec3;
        equippableRightRotation: Quat;
        equippableIndicatorURL: string;
        equippableIndicatorScale: Vec3;
        equippableIndicatorOffset: Vec3;
    };
    type Haze = {
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
    };
    type KeyLight = {
        color: Color;
        intensity: number;
        direction: Vec3;
        castShadows: boolean;
        shadowBias: number;
        shadowMaxDistance: number;
    };
    type PolyVoxSurfaceStyle = number;
    type Pulse = {
        min: number;
        max: number;
        period: number;
        colorMode: Entities.PulseMode;
        alphaMode: Entities.PulseMode;
    };
    type RingGizmo = {
        startAngle: number;
        endAngle: number;
        innerRadius: number;
        innerStartColor: Color;
        innerEndColor: Color;
        outerStartColor: Color;
        outerEndColor: Color;
        innerStartAlpha: number;
        innerEndAlpha: number;
        outerStartAlpha: number;
        outerEndAlpha: number;
        hasTickMarks: boolean;
        majorTickMarksAngle: number;
        minorTickMarksAngle: number;
        majorTickMarksLength: number;
        minorTickMarksLength: number;
        majorTickMarksColor: Color;
        minorTickMarksColor: Color;
    };
    type Shape = string;
    type Skybox = {
        color: Color;
        url: string;
    };
    type MaterialResource = {
        materialVersion: number;
        materials: Entities.Material | Entities.Material[];
    };
    type Material = {
        model: string;
        name: string;
        emissive: ColorFloat | RGBS | string;
        opacity: number | string;
        unlit: boolean | string;
        albedo: ColorFloat | RGBS | string;
        roughness: number | string;
        metallic: number | string;
        scattering: number | string;
        emissiveMap: string;
        albedoMap: string;
        opacityMap: string;
        roughnessMap: string;
        glossMap: string;
        metallicMap: string;
        specularMap: string;
        normalMap: string;
        bumpMap: string;
        occlusionMap: string;
        scatteringMap: string;
        lightMap: string;
        texCoordTransform0: Mat4 | string;
        texCoordTransform1: Mat4 | string;
        lightmapParams: string;
        materialParams: string;
        defaultFallthrough: boolean;
    };
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
    type ActionArguments-Offset = {
        pointToOffsetFrom: Vec3;
        linearDistance: number;
        linearTimeScale: number;
    };
    type ActionArguments-Tractor = {
        otherID: Uuid;
        otherJointIndex: Uuid;
        targetPosition: Vec3;
        targetRotation: Quat;
        linearTimeScale: number;
        angularTimeScale: number;
    };
    type ActionArguments-TravelOriented = {
        forward: Vec3;
        angularTimeScale: number;
    };
    type ActionArguments-BallSocket = {
        otherEntityID: Uuid;
        pivot: Vec3;
        otherPivot: Vec3;
    };
    type ActionArguments-ConeTwist = {
        otherEntityID: Uuid;
        pivot: Vec3;
        axis: Vec3;
        otherPivot: Vec3;
        otherAxis: Vec3;
        swingSpan1: number;
        swingSpan2: number;
        twistSpan: number;
    };
    type ActionArguments-Hinge = {
        otherEntityID: Uuid;
        pivot: Vec3;
        axis: Vec3;
        otherPivot: Vec3;
        otherAxis: Vec3;
        low: number;
        high: number;
        angle: number;
    };
    type ActionArguments-Slider = {
        otherEntityID: Uuid;
        point: Vec3;
        axis: Vec3;
        otherPoint: Vec3;
        otherAxis: Vec3;
        linearLow: number;
        linearHigh: number;
        angularLow: number;
        angularHigh: number;
        linearPosition: number;
        angularPosition: number;
    };
    type ActionArguments = {
        type: Entities.ActionType;
        tag: string;
        ttl: number;
        isMine: boolean;
        ::no-motion-state: boolean;
        ::active: boolean;
        ::motion-type: Entities.PhysicsMotionType;
    };
    type PhysicsMotionType = string;
    type ComponentMode = string;
    type AvatarPriorityMode = string;
    type GizmoType = string;
    type PrimitiveMode = string;
    type PulseMode = string;
    type RenderLayer = string;
    type NestableType = string;
    type TextEffect = string;
}
declare namespace Graphics {
    type Topology = number;
    type Material = {
        name: string;
        model: string;
        opacity: number | string;
        roughness: number | string;
        metallic: number | string;
        scattering: number | string;
        unlit: boolean | string;
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
        lightMap: string;
        scatteringMap: string;
        texCoordTransform0: Mat4 | string;
        texCoordTransform1: Mat4 | string;
        lightmapParams: string;
        materialParams: string;
        defaultFallthrough: boolean;
    };
    type MaterialLayer = {
        material: Graphics.Material;
        priority: number;
    };
    type IFSData = {
        name?: string;
        topology?: string;
        indices: number[];
        vertices: Vec3[];
        normals?: Vec3[];
        colors?: Vec3[];
        texCoords0?: Vec2[];
    };
    function getModel(entityID: UUID): Graphics.Model;
    function updateModel(id: Uuid, model: Graphics.Model): boolean;
    function canUpdateModel(id: Uuid, meshIndex?: number, partNumber?: number): boolean;
    function newModel(meshes: Graphics.Mesh[]): Graphics.Model;
    function newMesh(ifsMeshData: Graphics.IFSData): Graphics.Mesh;
    function exportModelToOBJ(model: Graphics.Model): string;
    type Mesh = {
        parts: Graphics.MeshPart[];
        attributeNames: string[];
        numParts: number;
        numIndices: number;
        numVertices: number;
        numAttributes: number;
        valid: boolean;
        strong: boolean;
        extents: any;
        bufferFormats: any;
    };
    type MeshPart = {
        valid: boolean;
        partIndex: number;
        firstVertexIndex: number;
        baseVertexIndex: number;
        lastVertexIndex: number;
        topology: Graphics.Topology;
        attributeNames: string[];
        numIndices: number;
        numVerticesPerFace: number;
        numFaces: number;
        numVertices: number;
        numAttributes: number;
        extents: any;
        bufferFormats: any;
    };
    type Model = {
        objectID: Uuid;
        numMeshes: number;
        meshes: Graphics.Mesh[];
        materialLayers: {
            [key: string]: Graphics.MaterialLayer[];
        };
        materialNames: string[];
    };
}
declare type RGBS = array;
declare namespace TextureCache {
    type TextureType = number;
    function prefetch(url: string, type: TextureCache.TextureType, maxNumPixels?: number): ResourceObject;
    function getResourceList(): string[];
    function updateTotalSize(deltaSize: number): void;
    function prefetch(url: string): ResourceObject;
}
declare namespace Midi {
    type MidiMessage = {
        device: number;
        raw: Midi.RawMidiMessage;
        status: number;
        channel: number;
        type: number;
        note: number;
        velocity: number;
        bend: number;
        program: number;
    };
    type RawMidiMessage = number;
    type MidiStatus = number;
    function sendRawDword(device: number, raw: Midi.RawMidiMessage): void;
    function sendMidiMessage(device: number, channel: number, type: Midi.MidiStatus, note: number, velocity: number): void;
    function playMidiNote(status: MidiStatus, note: number, velocity: number): void;
    function allNotesOff(): void;
    function resetDevices(): void;
    function listMidiDevices(output: boolean): string[];
    function blockMidiDevice(name: string, output: boolean): void;
    function unblockMidiDevice(name-: string, output: boolean): void;
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
    function getResourceList(): string[];
    function updateTotalSize(deltaSize: number): void;
    function prefetch(url: string): ResourceObject;
}
declare namespace location {
    type LookupTrigger = number;
    function handleLookupString(address: string, fromSuggestions?: boolean): void;
    function goToViewpointForPath(path: string, namedPath: string): void;
    function goBack(): void;
    function goForward(): void;
    function goToLocalSandbox(path?: string, trigger?: location.LookupTrigger): void;
    function goToEntry(trigger?: location.LookupTrigger): void;
    function goToUser(username: string, matchOrientation?: boolean): void;
    function goToLastAddress(): void;
    function canGoBack(): any;
    function refreshPreviousLookup(): void;
    function storeCurrentAddress(): void;
    function copyAddress(): void;
    function copyPath(): void;
    function lookupShareableNameForDomainID(domainID: Uuid): void;
}
declare namespace Messages {
    function sendMessage(channel: string, message: string, localOnly?: boolean): void;
    function sendLocalMessage(channel: string, message: string): void;
    function sendData(channel: string, data: any, localOnly?: boolean): void;
    function subscribe(channel: string): void;
    function unsubscribe(channel: string): void;
}
declare class ResourceObject {
    release(): void;
}
declare namespace Resources {
    function overrideUrlPrefix(prefix: string, replacement: string): void;
    function restoreUrlPrefix(prefix: string): void;
}
declare namespace Steam {
    function isRunning(): boolean;
    function openInviteOverlay(): void;
}
declare type IntersectionType = number;
declare namespace PickType { }
declare type PickType = number;
declare type SubmeshIntersection = {
    worldIntersectionPoint: Vec3;
    meshIntersectionPoint: Vec3;
    partIndex: number;
    shapeID: number;
    subMeshIndex: number;
    subMeshName: string;
    subMeshTriangleWorld: Triangle;
    subMeshNormal: Vec3;
    subMeshTriangle: Triangle;
};
declare namespace Assets {
    function isValidPath(input: string): boolean;
    function isValidFilePath(input: string): boolean;
    function getATPUrl(input: string): string;
    function extractAssetHash(input: string): string;
    function isValidHash(input: string): boolean;
    function hashData(data: any): any;
    function hashDataHex(data: any): string;
    function uploadData(data: string, callback: Assets~uploadDataCallback): void;
    type uploadDataCallback = (url: string, hash: string) => void;
    function downloadData(url: string, callback: Assets~downloadDataCallback): void;
    type downloadDataCallback = (data: string) => void;
    function setMapping(path: string, hash: string, callback: Assets~setMappingCallback): void;
    type setMappingCallback = (error: string) => void;
    function getMapping(path: string, callback: Assets~getMappingCallback): void;
    type getMappingCallback = (assetID: string, error: string) => void;
    function setBakingEnabled(path: string, enabled: boolean, callback: any): void;
    type setBakingEnabledCallback = () => void;
    function getAsset(options: URL | Assets.GetOptions, scope: Assets~getAssetCallback, callback?: (...params: any[]) => any): void;
    type GetOptions = {
        url?: string;
        responseType?: string;
        decompress?: boolean;
    };
    type getAssetCallback = (error: string, result: Asset~getAssetResult) => void;
    type getAssetResult = {
        url?: string;
        hash?: string;
        response?: string | ArrayBuffer | any;
        responseType?: string;
        contentType?: string;
        byteLength?: number;
        decompressed?: number;
    };
    function putAsset(options: Assets.PutOptions, scope: Assets~putAssetCallback, callback?: (...params: any[]) => any): void;
    type PutOptions = {
        data?: ArrayBuffer | string;
        path?: string;
        compress?: boolean;
    };
    type putAssetCallback = (error: string, result: Assets~putAssetResult) => void;
    type putAssetResult = {
        url?: string;
        path?: string;
        hash?: string;
        compressed?: boolean;
        byteLength?: number;
    };
    function deleteAsset(options: any, scope: any, callback?: any): void;
    function resolveAsset(options: any, scope: any, callback?: any): void;
    function decompressData(options: any, scope: any, callback?: any): void;
    function compressData(options: any, scope: any, callback?: any): void;
    function initializeCache(): boolean;
    function canWriteCacheValue(url: string): boolean;
    function getCacheStatus(scope: any, callback?: any): void;
    function queryCacheMeta(options: any, scope: any, callback?: any): void;
    function loadFromCache(options: any, scope: any, callback?: any): void;
    function saveToCache(options: any, scope: any, callback?: any): void;
    function saveToCache(options: any, scope: any, callback?: any): void;
}
declare namespace File {
    function convertUrlToPath(url: string): string;
    function runUnzip(path: string, url: string, autoAdd: boolean, isZip: boolean, isBlocks: boolean): void;
    function getTempDir(): string;
}
declare type KeyEvent = {
    key: number;
    text: string;
    isShifted: boolean;
    isMeta: boolean;
    isControl: boolean;
    isAlt: boolean;
    isKeypad: boolean;
    isAutoRepeat: boolean;
};
declare namespace Mat4 {
    function multiply(m1: Mat4, m2: Mat4): Mat4;
    function createFromRotAndTrans(rot: Quat, trans: Vec3): Mat4;
    function createFromScaleRotAndTrans(scale: Vec3, rot: Quat, trans: Vec3): Mat4;
    function createFromColumns(col0: Vec4, col1: Vec4, col2: Vec4, col: Vec4): Mat4;
    function createFromArray(numbers: number[]): Mat4;
    function extractTranslation(m: Mat4): Vec3;
    function extractRotation(m: Mat4): Vec3;
    function extractScale(m: Mat4): Vec3;
    function transformPoint(m: Mat4, point: Vec3): Vec3;
    function transformVector(m: Mat4, vector: Vec3): Vec3;
    function inverse(m: Mat4): Mat4;
    function getFront(m: Mat4): Vec3;
    function getForward(m: Mat4): Vec3;
    function getRight(m: Mat4): Vec3;
    function getUp(m: Mat4): Vec3;
    function print(label: string, m: Mat4, transpose?: boolean): void;
}
declare type MouseEvent = {
    x: number;
    y: number;
    button: string;
    isLeftButton: boolean;
    isMiddleButton: boolean;
    isRightButton: boolean;
    isShifted: boolean;
    isMeta: boolean;
    isControl: boolean;
    isAlt: boolean;
};
declare type Quat = {
    x: number;
    y: number;
    z: number;
    w: number;
};
declare namespace Quat {
    function multiply(q1: Quat, q2: Quat): Quat;
    function normalize(q: Quat): Quat;
    function conjugate(q: Quat): Quat;
    function lookAt(eye: Vec3, target: Vec3, up: Vec3): Quat;
    function lookAtSimple(eye: Vec3, target: Vec3): Quat;
    function rotationBetween(v1: Vec3, v2: Vec3): Quat;
    function fromVec3Degrees(vector: Vec3): Quat;
    function fromVec3Radians(vector: Vec3): Quat;
    function fromPitchYawRollDegrees(pitch: number, yaw: number, roll: number): Quat;
    function fromPitchYawRollRadians(pitch: number, yaw: number, roll: number): Quat;
    function inverse(q: Quat): Quat;
    function getFront(orientation: Quat): Vec3;
    function getForward(orientation: Quat): Vec3;
    function getRight(orientation: Quat): Vec3;
    function getUp(orientation: Quat): Vec3;
    function safeEulerAngles(orientation: Quat): Vec3;
    function angleAxis(angle: number, axis: Vec3): Quat;
    function axis(q: Quat): Vec3;
    function angle(q: Quat): number;
    function mix(q1: Quat, q2: Quat, alpha: number): Quat;
    function slerp(q1: Quat, q2: Quat, alpha: number): Quat;
    function squad(q1: Quat, q2: Quat, s1: Quat, s2: Quat, alpha: number): Quat;
    function dot(q1: Quat, q2: Quat): number;
    function print(label: string, q: Quat, asDegrees?: boolean): void;
    function equal(q1: Quat, q2: Quat): boolean;
    function cancelOutRollAndPitch(orientation: Quat): Quat;
    function cancelOutRoll(orientation: Quat): Quat;
}
declare namespace Recording {
    function loadRecording(url: string, callback?: Recording~loadRecordingCallback): void;
    type loadRecordingCallback = (success: boolean, url: string) => void;
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
    function saveRecordingToAsset(getClipAtpUrl: (...params: any[]) => any): void;
    function loadLastRecording(): void;
}
declare namespace Stage {
    type Location = {
        longitude: number;
        latitude: number;
        altitude: number;
    };
    type Time = {
        hour: number;
        day: number;
    };
    type KeyLight = {
        color: Vec3;
        intensity: number;
        ambientIntensity: number;
        direction: Vec3;
    };
}
declare class Stage {
    static setOrientation(orientation: Quat): void;
    static setLocation(longitude: number, latitude: number, altitude: number): void;
}
declare namespace Scene { }
declare class AudioInjector {
    static restart(): void;
    static stop(): void;
    static getOptions(): AudioInjector.AudioInjectorOptions;
    static setOptions(options: AudioInjector.AudioInjectorOptions): void;
    static getLoudness(): number;
    static isPlaying(): boolean;
}
declare namespace Resource {
    type State = {
        QUEUED: number;
        LOADING: number;
        LOADED: number;
        FINISHED: number;
        FAILED: number;
    };
}
declare namespace Script {
    type EntityEvent = string;
    function stop(marshal?: boolean): void;
    function registerGlobalObject(name: string, object: any): void;
    function registerGetterSetter(name: string, getter: (...params: any[]) => any, setter: (...params: any[]) => any, parent?: string): void;
    function registerFunction(name: string, function: (...params: any[]) => any, numArguments?: number): void;
    function registerFunction(name: string, function: (...params: any[]) => any, numArguments?: number): void;
    function registerValue(name: string, value: any): void;
    function evaluate(program: string, filename: string, lineNumber?: number): any;
    function evaluateInClosure(locals: any, program: any): any;
    function getContext(): string;
    function isClientScript(): boolean;
    function isDebugMode(): boolean;
    function isEntityClientScript(): boolean;
    function isEntityServerScript(): boolean;
    function isAgentScript(): boolean;
    function addEventHandler(entityID: Uuid, eventName: Script.EntityEvent, handler: (...params: any[]) => any): void;
    function removeEventHandler(entityID: Uuid, eventName: Script.EntityEvent, handler: (...params: any[]) => any): void;
    function load(filename: string): void;
    function include(filenames: string[], callback?: (...params: any[]) => any): void;
    function include(filename: string, callback?: (...params: any[]) => any): void;
    function require(module: string): void;
    function resetModuleCache(deleteScriptCache?: boolean): void;
    function setInterval(function: (...params: any[]) => any, interval: number): any;
    function setTimeout(function: (...params: any[]) => any, timeout: number): any;
    function clearInterval(timer: any): void;
    function clearTimeout(timer: any): void;
    function print(message: string): void;
    function resolvePath(path: string): string;
    function resourcesPath(): string;
    function beginProfileRange(label: string): void;
    function endProfileRange(label: string): void;
    function isEntityScriptRunning(entityID: Uuid): boolean;
    function loadEntityScript(entityID: Uuid, script: string, forceRedownload: boolean): void;
    function unloadEntityScript(entityID: Uuid, shouldRemoveFromMap?: boolean): void;
    function unloadAllEntityScripts(blockingCall?: boolean): void;
    function callEntityScriptMethod(entityID: Uuid, methodName: string, parameters?: string[], remoteCallerID?: Uuid): void;
    function callEntityScriptMethod(entityID: Uuid, methodName: string, parameters?: string[], remoteCallerID?: Uuid): void;
    function callEntityScriptMethod(entityID: Uuid, methodName: string, parameters?: string[], remoteCallerID?: Uuid): void;
    function requestGarbageCollection(): void;
    function generateUUID(): Uuid;
    function callAnimationStateHandler(callback: (...params: any[]) => any, parameters: any, names: string[], useNames: boolean, resultHandler: (...params: any[]) => any): void;
    function updateMemoryCost(deltaSize: number): void;
    function executeOnScriptThread(function: (...params: any[]) => any, type?: ConnectionType): void;
    function _requireResolve(module: string, relativeTo?: string): string;
    function entityScriptContentAvailable(entityID: Uuid, scriptOrURL: string, contents: string, isURL: boolean, success: boolean, status: string): void;
    function lintScript(sourceCode: string, fileName: string, lineNumber?: number): any;
    function makeError(other?: any, type?: string): any;
    function formatExecption(exception: any, inludeExtendeDetails: boolean): string;
}
declare function print(message: string): void;
declare namespace ScriptDiscoveryService {
    function loadOneScript(filename: string): void;
    function loadScript(filename?: string, isUserLoaded?: boolean, loadScriptFromEditor?: boolean, activateMainWindow?: boolean, reload?: boolean, quitWhenFinished?: boolean): boolean;
    function stopScript(scriptHash: string, restart?: boolean): boolean;
    function reloadAllScripts(): void;
    function stopAllScripts(restart?: boolean): void;
    function getRunning(): object[];
    function getPublic(): object[];
    function getLocal(): object[];
    function onPrintedMessage(message: string, scriptName: string): void;
    function onErrorMessage(message: string, scriptName: string): void;
    function onWarningMessage(message: string, scriptName: string): void;
    function onInfoMessage(message: string, scriptName: string): void;
    function onErrorLoadingScript(url: string): void;
    function onClearDebugWindow(): void;
    function onScriptFinished(filename: string, engine: any): void;
}
declare class ScriptsModel {
    static index(row: number, column: number, parent: QModelIndex): QModelIndex;
    static parent(child: QModelIndex): QModelIndex;
    static data(index: QModelIndex, role?: number): void;
    static rowCount(parent?: QmodelIndex): number;
    static columnCount(parent?: QmodelIndex): number;
    static getTreeNodeFromIndex(index: QmodelIndex): TreeNodeBase;
    static getFolderNodes(parent: TreeNodeFolder): TreeNodeBase[];
}
declare class ScriptsModelFilter {
}
declare namespace Uuid {
    function fromString(string: string): Uuid;
    function toString(id: Uuid): string;
    function generate(): Uuid;
    function isEqual(idA: Uuid, idB: Uuid): boolean;
    function isNull(id: Uuid): boolean;
    function print(label: string, id: Uuid): void;
}
declare type TouchEvent = {
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
    rotating: string;
};
declare namespace Users {
    function ignore(sessionID: Uuid, enable?: boolean): void;
    function getIgnoreStatus(sessionID: Uuid): boolean;
    function personalMute(sessionID: Uuid, muteEnabled?: boolean): void;
    function getPersonalMuteStatus(sessionID: Uuid): boolean;
    function setAvatarGain(nodeID: Uuid, gain: number): void;
    function getAvatarGain(nodeID: Uuid): number;
    function kick(sessionID: Uuid): void;
    function mute(sessionID: Uuid): void;
    function requestUsernameFromID(sessionID: Uuid): void;
    function getCanKick(): boolean;
    function toggleIgnoreRadius(): void;
    function enableIgnoreRadius(): void;
    function disableIgnoreRadius(): void;
    function getIgnoreRadiusEnabled(): boolean;
}
declare namespace Vec3 {
    function reflect(v: Vec3, normal: Vec3): Vec3;
    function cross(v1: Vec3, v2: Vec3): Vec3;
    function dot(v1: Vec3, v2: Vec3): number;
    function multiply(v: Vec3, scale: number): Vec3;
    function multiply(v: Vec3, scale: number): Vec3;
    function multiplyVbyV(v1: Vec3, v2: Vec3): Vec3;
    function multiplyQbyV(q: Quat, v: Vec3): Vec3;
    function sum(v1: Vec3, v2: Vec3): Vec3;
    function subtract(v1: Vec3, v2: Vec3): Vec3;
    function length(v: Vec3): number;
    function distance(p1: Vec3, p2: Vec3): number;
    function orientedAngle(v1: Vec3, v2: Vec3, ref: Vec3): number;
    function normalize(v: Vec3): Vec3;
    function mix(v1: Vec3, v2: Vec3, factor: number): Vec3;
    function print(label: string, v: Vec3): void;
    function equal(v1: Vec3, v2: Vec3): boolean;
    function withinEpsilon(v1: Vec3, v2: Vec3, epsilon: number): boolean;
    function toPolar(p: Vec3): Vec3;
    function fromPolar(polar: Vec3): Vec3;
    function fromPolar(polar: Vec3): Vec3;
    function getAngle(v1: Vec3, v2: Vec3): number;
}
declare type WheelEvent = {
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
};
declare type BillboardMode = string;
/*<p>A <code>BoxFace</code> specifies the face of an axis-aligned (AA) box.
* <table>
*   <thead>
*     <tr><th>Value</th><th>Description</th></tr>
*   </thead>
*   <tbody>
*     <tr><td><code>"MIN_X_FACE"</code></td><td>The minimum x-axis face.</td></tr>
*     <tr><td><code>"MAX_X_FACE"</code></td><td>The maximum x-axis face.</td></tr>
*     <tr><td><code>"MIN_Y_FACE"</code></td><td>The minimum y-axis face.</td></tr>
*     <tr><td><code>"MAX_Y_FACE"</code></td><td>The maximum y-axis face.</td></tr>
*     <tr><td><code>"MIN_Z_FACE"</code></td><td>The minimum z-axis face.</td></tr>
*     <tr><td><code>"MAX_Z_FACE"</code></td><td>The maximum z-axis face.</td></tr>
*     <tr><td><code>"UNKNOWN_FACE"</code></td><td>Unknown value.</td></tr>
*   </tbody>
* </table>
* @typedef {string} BoxFac
 */
declare type BoxFace = string;
declare namespace DebugDraw {
    function drawRay(start: Vec3, end: Vec3, color: Vec4): void;
    function drawRays(lines: Vec3[], color: Vec4, translation?: Vec3, rotation?: Quat): void;
    function addMarker(key: string, rotation: Quat, position: Vec3, color: Vec4): void;
    function removeMarker(key: string): void;
    function addMyAvatarMarker(key: string, rotation: Quat, position: Vec3, color: Vec4): void;
    function removeMyAvatarMarker(key: string): void;
}
declare type Triangle = {
    v0: Vec3;
    v1: Vec3;
    v2: Vec3;
};
declare type JointData = {
    rotation: Quat;
    translation: Vec3;
    rotationIsDefaultPose: boolean;
    translationIsDefaultPose: boolean;
};
declare namespace Paths { }
declare type CollisionMask = number;
declare type FilterFlags = number;
declare type PointerEvent = {
    type: string;
    id: number;
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
};
declare type KeyboardModifiers = number;
declare type AACube = {
    x: number;
    y: number;
    z: number;
    scale: number;
};
declare type Collision = {
    type: ContactEventType;
    idA: Uuid;
    idB: Uuid;
    penetration: Vec3;
    contactPoint: Vec3;
    velocityChange: Vec3;
};
declare type Size = {
    height: number;
    width: number;
};
declare type Mat4 = {
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
};
declare type Vec2 = {
    x: number;
    y: number;
};
declare type Vec3 = {
    x: number;
    y: number;
    z: number;
};
declare type Color = {
    red: number;
    green: number;
    blue: number;
};
declare type ColorFloat = {
    red: number;
    green: number;
    blue: number;
};
declare type Vec4 = {
    x: number;
    y: number;
    z: number;
    w: number;
};
declare type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
declare type PickRay = {
    origin: Vec3;
    direction: Vec3;
};
declare type StylusTip = {
    side: number;
    tipOffset: Vec3;
    position: Vec3;
    orientation: Quat;
    velocity: Vec3;
};
declare type PickParabola = {
    origin: Vec3;
    velocity: Vec3;
    acceleration: Vec3;
};
declare type CollisionRegion = {
    shape: Shape;
    loaded: boolean;
    position: Vec3;
    orientation: Quat;
    threshold: number;
    collisionGroup?: CollisionMask;
};
declare type Shape = {
    shapeType: ShapeType;
    modelUrl?: string;
    dimensions: Vec3;
};
declare type ContactEventType = number;
declare type Uuid = string;
declare class MeshProxy {
    getNumVertices(): number;
    getPos(index: number): Vec3;
}
declare namespace ResourceRequestObserver {
    type ResourceRequest = {
        url: string;
        callerId: number;
        extra: string;
    };
}
declare type ShapeType = string;
declare type WebInputMode = string;
declare type ViewFrustum = {
    position: Vec3;
    orientation: Quat;
    centerRadius: number;
    fieldOfView: number;
    aspectRatio: number;
    projection: Mat4;
};
declare namespace OffscreenFlags { }
declare class OverlayWebWindow {
    constructor(properties?: OverlayWindow.Properties);
    static getURL(): string;
    static setURL(url: string): void;
    static setScriptURL(script: string): void;
    static initQml(properties: OverlayWindow.Properties): void;
    static isVisible(): boolean;
    static setVisible(visible: boolean): void;
    static getPosition(): Vec2;
    static setPosition(position: Vec2): void;
    static setPosition(position: Vec2): void;
    static getSize(): Vec2;
    static setSize(size: Vec2): void;
    static setSize(size: Vec2): void;
    static setTitle(title: string): void;
    static raise(): void;
    static close(): void;
    static getEventBridge(): any;
    static sendToQml(message: any): void;
    static clearDebugWindow(): void;
    static emitScriptEvent(message: any): void;
    static emitWebEvent(message: any): void;
}
declare namespace OverlayWindow {
    type Properties = {
        title: string;
        source: string;
        width: number;
        height: number;
        visible: boolean;
    };
}
declare class OverlayWindow {
    constructor(properties?: OverlayWindow.Properties);
    static initQml(properties: OverlayWindow.Properties): void;
    static isVisible(): boolean;
    static setVisible(visible: boolean): void;
    static getPosition(): Vec2;
    static setPosition(position: Vec2): void;
    static setPosition(position: Vec2): void;
    static getSize(): Vec2;
    static setSize(size: Vec2): void;
    static setSize(size: Vec2): void;
    static setTitle(title: string): void;
    static raise(): void;
    static close(): void;
    static getEventBridge(): any;
    static sendToQml(message: any): void;
    static clearDebugWindow(): void;
    static emitScriptEvent(message: any): void;
    static emitWebEvent(message: any): void;
}
declare namespace TabletButtonProxy {
    type ButtonProperties = {
        uuid: Uuid;
        objectName: Uuid;
        stableOrder: number;
        icon: string;
        hoverIcon: string;
        activeIcon: string;
        activeHoverIcon: string;
        text: string;
        hoverText: string;
        activeText: string;
        activeHoverText: string;
        captionColor: string;
        isActive: boolean;
        isEntered: boolean;
        buttonEnabled: boolean;
        sortOrder: number;
        inDebugMode: boolean;
        flickable: any;
        gridView: any;
        buttonIndex: number;
    };
}
declare namespace Tablet {
    type AudioEvents = number;
    function getTablet(name: string): TabletProxy;
    function playSound(sound: Tablet.AudioEvents): void;
}
declare namespace tabletInterface {
    function getTablet(name: string): TabletProxy;
    function playSound(sound: Tablet.AudioEvents): void;
}
declare namespace TabletProxy {
    type TabletButtonListModel = any;
}
declare class TabletProxy {
    gotoMenuScreen(submenu?: string): void;
    initialScreen(url: string): void;
    gotoHomeScreen(): void;
    gotoWebScreen(url: string, injectedJavaScriptUrl?: string, loadOtherBase?: boolean): void;
    loadQMLSource(path: string, resizable?: boolean): void;
    pushOntoStack(path: string): boolean;
    popFromStack(): void;
    loadQMLOnTop(path: string): void;
    loadWebScreenOnTop(path: string, injectedJavaScriptURL?: string): void;
    returnToPreviousApp(): void;
    isMessageDialogOpen(): boolean;
    closeDialog(): void;
    addButton(properties: TabletButtonProxy.ButtonProperties): TabletButtonProxy;
    removeButton(button: TabletButtonProxy): void;
    emitScriptEvent(message: string | any): void;
    sendToQml(message: string | any): void;
    onHomeScreen(): boolean;
    setLandscape(landscape: boolean): void;
    getLandscape(): boolean;
    isPathLoaded(path: string): boolean;
    desktopWindowClosed(): void;
    emitWebEvent(message: any | string): void;
    onTabletShown(): void;
}
declare class TabletButtonProxy {
    getProperties(): TabletButtonProxy.ButtonProperties;
    editProperties(properties: TabletButtonProxy.ButtonProperties): void;
}
declare class ToolbarButtonProxy {
    editProperties(properties: any): void;
    writeProperty(propertyValue: any): void;
    writeProperties(properties: any): void;
    readProperty(propertyName: string): any;
    readProperties(propertyList: string[]): any;
}
declare class ToolbarProxy {
    addButton(properties: any): ToolbarButtonProxy;
    removeButton(name: string): void;
    writeProperty(propertyValue: any): void;
    writeProperties(properties: any): void;
    readProperty(propertyName: string): any;
    readProperties(propertyList: string[]): any;
}
declare namespace Toolbars {
    function getToolbar(toolbarID: string): ToolbarProxy;
}
