declare namespace Entities {
	// properties

	const keyboardFocusEntity: Uuid;

	// methods
	function AABoxIntersectsCapsule(
		brn: Vec3,
		dimensions: Vec3,
		start: Vec3,
		end: Vec3,
		radius: number,
	): boolean;
	function addAction<T>(
		actionType: ActionType,
		entityID: Uuid,
		arguments: Partial<T>,
	): Uuid;
	function addEntity<T>(
		properties: Partial<T>,
		entityHostType: EntityHostType,
	): Uuid;
	function addEntity<T>(properties: Partial<T>, avatarEntity: boolean): Uuid;
	function appendPoint(entityID: Uuid, point: Vec3): boolean;
	function callEntityClientMethod(
		clientSessionID: Uuid,
		entityID: Uuid,
		method: string,
		parameters?: string[],
	): void;
	function callEntityMethod(
		entityID: Uuid,
		method: string,
		parameters?: string[],
	): void;
	function callEntityServerMethod(
		entityID: Uuid,
		method: string,
		parameters?: string[],
	): void;
	function canAdjustLocks(): boolean;
	function canGetAndSetPrivateUserData(): boolean;
	function canReplaceContent(): boolean;
	function canRez(): boolean;
	function canRezCertified(): boolean;
	function canRezTmp(): boolean;
	function canRezTmpCertified(): boolean;
	function canWriteAssets(): boolean;
	function cloneEntity(entityID: Uuid): Uuid;
	function deleteAction(entityID: Uuid, actionID: Uuid): boolean;
	function deleteEntity(entityID: Uuid): void;
	function dumpTree(): void;
	function editEntity<T>(entityID: Uuid, properties: Partial<T>): Uuid;
	function emitScriptEvent(entityID: Uuid, message: string): void;
	function findClosestEntity(center: Vec3, radius: number): Uuid;
	function findEntities(center: Vec3, radius: number): Uuid[];
	function findEntitiesByName(
		entityName: string,
		center: Vec3,
		radius: number,
		caseSensitive?: boolean,
	): Uuid[];
	function findEntitiesByType(
		entityType: EntityType,
		center: Vec3,
		radius: number,
	): Uuid[];
	function findEntitiesInBox(corner: Vec3, dimensions: Vec3): Uuid[];
	function findEntitiesInFrustum(frustrum: ViewFrustrum): Uuid[];
	function findEntitiesWithTag(
		tagName: string,
		center: Vec3,
		radius: number,
	): Uuid[];
	function findRayIntersection(
		pickRay: PickRay,
		precisionPicking?: boolean,
		entitiesToInclude?: Uuid[],
		entitiesToDiscard?: Uuid[],
		visibleOnly?: boolean,
		collideableOnly?: boolean,
	): RayToEntityIntersectionResult;
	function getAbsoluteJointRotationInObjectFrame(
		entityID: Uuid,
		jointIndex: number,
	): Quat;
	function getAbsoluteJointTranslationInObjectFrame(
		entityID: Uuid,
		jointIndex: number,
	): Vec3;
	function getActionArguments<T>(entityID: Uuid, actionID: Uuid): T;
	function getActionIDs(entityID: Uuid): Uuid[];
	function getChildrenIDs(entityID: Uuid): Uuid[];
	function getChildrenIDsOfJoint(parentID: Uuid, jointIndex: number): Uuid[];
	function getDrawZoneBoundaries(): boolean;
	function getEntityLocalTransform(entitiyID: Uuid): Mat4;
	function getEntityObject(id: Uuid): object;
	function getEntityProperties<T>(
		entityID: Uuid,
		desiredProperties?:
			| (keyof EntityPropertiesType)[]
			| keyof EntityPropertiesType,
	): T;
	function getEntityTransform(entityID: Uuid): Mat4;
	function getEntityType(id: Uuid): EntityType;
	function getJointIndex(entityID: Uuid, name: string): number;
	function getJointNames(entityID: Uuid): string[];
	function getJointParents(entityID: Uuid, index: number): number;
	function getKeyboardFocusEntity(): Uuid;
	function getLifetimeBPS(): number;
	function getLifetimeBPSQueued(): number;
	function getLifetimeBytesQueued(): number;
	function getLifetimeBytesSent(): number;
	function getLifetimeInSeconds(): number;
	function getLifetimeInUsecs(): number;
	function getLifetimePacketsQueued(): number;
	function getLifetimePacketsSent(): number;
	function getLifetimePPS(): number;
	function getLifetimePPSQueued(): number;
	function getLightsArePickable(): boolean;
	function getLocalJointRotation(entityID: Uuid, jointIndex: number): Quat;
	function getLocalJointTranslation(entityID: Uuid, jointIndex: number): Vec3;
	function getEntityProperties<T>(
		entityIDs: Uuid,
		desiredProperties?:
			| (keyof EntityPropertiesType)[]
			| keyof EntityPropertiesType,
	): T[];
	function getNestableType(id: Uuid): NestableType;
	function getPacketsPerSecond(): number;
	function getPropertyInfo(propertyName: string): EntityPropertyInfo;
	function getServerScriptStatus(
		entityID: string,
		callback: getServerScriptStatusCallback,
	): boolean;
	function getStaticCertificateJSON(entityID: Uuid): string;
	function getZonesArePickable(): boolean;
	function hasPacketsToSend(): boolean;
	function isAddedEntity(id: Uuid): boolean;
	function isChildOfParent(childID: Uuid, parentID: Uuid): boolean;
	function isLoaded(id: Uuid): boolean;
	function localCoordsToVoxelCoords(entityID: Uuid, localCoords: Vec3): Vec3;
	function localToWorldAngularVelocity(
		localAngularVelocity: Vec3,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Vec3;
	function localToWorldDimensions(
		localDimensions: Vec3,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Vec3;
	function localToWorldPosition(
		localPosition: Vec3,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Vec3;
	function localToWorldRotation(
		localRotation: Quat,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Quat;
	function localToWorldVelocity(
		localVelocity: Vec3,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Vec3;
	function packetsToSendCount(): number;
	function queryPropertyMetadata(
		entityID: Uuid,
		property: string,
		callback: queryPropertyMetadataCallback,
	): boolean;
	function queryPropertyMetadata(
		entityID: Uuid,
		property: string,
		scope: object,
		callback: queryPropertyMetadataCallback,
	): boolean;
	function reloadServerScripts(entityID: Uuid): boolean;
	function sendClickDownOnEntity(entityID: Uuid, event: PointerEvent): void;
	function sendClickReleaseOnEntity(
		entityID: Uuid,
		event: PointerEvent,
	): void;
	function sendHoldingClickOnEntity(
		entityID: Uuid,
		event: PointerEvent,
	): void;
	function sendHoverEnterEntity(entityID: Uuid, event: PointerEvent): void;
	function sendHoverLeaveEntity(entityID: Uuid, event: PointerEvent): void;
	function sendHoverOverEntity(entityID: Uuid, event: PointerEvent): void;
	function sendMouseMoveOnEntity(entityID: Uuid, event: PointerEvent): void;
	function sendMousePressOnEntity(entityID: Uuid, event: PointerEvent): void;
	function sendMouseReleaseOnEntity(
		entityID: Uuid,
		event: PointerEvent,
	): void;
	function serversExist(): boolean;
	function setAbsoluteJointRotationInObjectFrame(
		entityID: Uuid,
		jointIndex: number,
		rotation: Quat,
	): boolean;
	function setAbsoluteJointTranslationInObjectFrame(
		entityID: Uuid,
		jointIndex: number,
		translation: Vec3,
	): boolean;
	function setAllVoxels(entityID: Uuid, value: number): void;
	function setDrawZoneBoundaries(value: boolean): void;
	function setKeyboardFocusEntity(id: Uuid): void;
	function setLightsArePickable(value: boolean): void;
	function setLocalJointRotation(
		entityID: Uuid,
		jointIndex: number,
		rotation: Quat,
	): boolean;
	function setLocalJointRotations(entityID: Uuid, rotations: Quat[]): boolean;
	function setLocalJointsData(
		entityID: Uuid,
		rotations: Quat[],
		translations: Vec3[],
	): boolean;
	function setLocalJointTranslation(
		entityID: Uuid,
		jointIndex: number,
		translation: Vec3,
	): boolean;
	function setLocalJointTranslations(
		entityID: Uuid,
		translation: Vec3[],
	): boolean;
	function setPacketsPerSecond(packetsPerSecond: number): void;
	function setVoxel(entityID: Uuid, position: Vec3, value: number): void;
	function setVoxelCapsule(
		entityID: Uuid,
		start: Vec3,
		end: Vec3,
		radius: number,
		value: number,
	): void;
	function setVoxelsInCuboid(
		entityID: Uuid,
		lowPosition: Vec3,
		cuboidSize: Vec3,
		value: number,
	): void;
	function setVoxelSphere(
		entityID: Uuid,
		center: Vec3,
		radius: number,
		value: number,
	): void;
	function setZonesArePickable(value: boolean): void;
	function textSize(id: Uuid, text: string): Size;
	function updateAction<T>(
		entityID: Uuid,
		actionID: Uuid,
		arguments: T,
	): boolean;
	function verifyStaticCertificateProperties(entityID: Uuid): boolean;
	function voxelCoordsToLocalCoords(entityID: Uuid, voxelCoords: Vec3): Vec3;
	function voxelCoordsToWorldCoords(entityID: Uuid, voxelCoords: Vec3): Vec3;
	function wantsHandControllerPointerEvents(entityID: Uuid): boolean;
	function worldCoordsToVoxelCoords(entityID: Uuid, worldCoords: Vec3): Vec3;
	function worldToLocalAngularVelocity(
		worldAngularVelocity: Vec3,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Vec3;
	function worldToLocalDimensions(
		worldDimensions: Vec3,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Vec3;
	function worldToLocalPosition(
		worldPosition: Vec3,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Vec3;
	function worldToLocalRotation(
		worldRotation: Quat,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Quat;
	function worldToLocalVelocity(
		worldVelocity: Vec3,
		parentID: Uuid,
		parentJointIndex?: number,
		scalesWithParent?: boolean,
	): Vec3;

	// signals

	const addingEntity: Signal<(entityID: Uuid) => any>;
	const addingWearable: Signal<(entityID: Uuid) => any>;
	const canAdjustLocksChanged: Signal<(canAdjustLocks: boolean) => any>;
	const canGetAndSetPrivateUserDataChanged: Signal<(
		canGetAndSetPrivateUserData: boolean,
	) => any>;
	const canRezCertifiedChanged: Signal<(canRezCertified: boolean) => any>;
	const canRezChanged: Signal<(canRez: boolean) => any>;
	const canRezTmpCertifiedChanged: Signal<(
		canRezTmpCertified: boolean,
	) => any>;
	const canRezTmpChanged: Signal<(canRezTmp: boolean) => any>;
	const canWriteAssetsChanged: Signal<(canWriteAssets: boolean) => any>;
	const clearingEntities: Signal<() => any>;
	const clickDownOnEntity: Signal<(
		entityID: Uuid,
		event: PointerEvent,
	) => any>;
	const clickReleaseOnEntity: Signal<(
		entityID: Uuid,
		event: PointerEvent,
	) => any>;
	const collisionWithEntity: Signal<(
		idA: Uuid,
		idB: Uuid,
		collision: Collision,
	) => any>;
	const deletingEntity: Signal<(entityID: Uuid) => any>;
	const deletingWearable: Signal<(entityID: Uuid) => any>;
	const enterEntity: Signal<(entityID: Uuid) => any>;
	const holdingClickOnEntity: Signal<(
		entityID: Uuid,
		event: PointerEvent,
	) => any>;
	const hoverEnterEntity: Signal<(
		entityID: Uuid,
		event: PointerEvent,
	) => any>;
	const hoverLeaveEntity: Signal<(
		entityID: Uuid,
		event: PointerEvent,
	) => any>;
	const hoverOverEntity: Signal<(entityID: Uuid, event: PointerEvent) => any>;
	const leaveEntity: Signal<(entityID: Uuid) => any>;
	const mouseDoublePressOffEntity: Signal<(event: PointerEvent) => any>;
	const mouseDoublePressOnEntity: Signal<(
		entityID: Uuid,
		event: PointerEvent,
	) => any>;
	const mouseMoveOnEntity: Signal<(
		entityID: Uuid,
		event: PointerEvent,
	) => any>;
	const mousePressOffEntity: Signal<(event: PointerEvent) => any>;
	const mousePressOnEntity: Signal<(
		entityID: Uuid,
		event: PointerEvent,
	) => any>;
	const mouseReleaseOnEntity: Signal<(
		entityID: Uuid,
		event: PointerEvent,
	) => any>;
	const preload: Signal<(entityID: Uuid) => any>;
	const unload: Signal<(entityID: Uuid) => any>;
	const webEventReceived: Signal<(entityID: Uuid, message: string) => any>;

	// types
	interface ActionArguments {
		type: ActionType;
		tag: string;
		ttl: number;
		isMine: boolean;
		"::no-motion-state": boolean;
		"::active": boolean;
		"::motion-type": PhysicsMotionType;
	}

	interface ActionArgumentsBallSocket extends ActionArguments {
		otherEntityID: Uuid;
		pivot: Vec3;
		otherPivot: Vec3;
	}

	interface ActionArgumentsConeTwist extends ActionArguments {
		otherEntityID: Uuid;
		pivot: Vec3;
		axis: Vec3;
		otherPivot: Vec3;
		otherAxis: Vec3;
		swingSpan1: number;
		swingSpan2: number;
		twistSpan: number;
	}

	interface ActionArgumentsFarGrab extends ActionArguments {
		otherID: Uuid;
		otherJointIndex: Uuid;
		targetPosition: Vec3;
		targetRotation: Quat;
		linearTimeScale: number;
		angularTimeScale: number;
	}

	interface ActionArgumentsHinge extends ActionArguments {
		otherEntityID: Uuid;
		pivot: Vec3;
		axis: Vec3;
		otherPivot: Vec3;
		otherAxis: Vec3;
		low: number;
		high: number;
		angle: number;
	}

	interface ActionArgumentsHold extends ActionArguments {
		holderID: Uuid;
		hand: string;
		relativePosition: Vec3;
		relativeRotation: Vec3;
		timeScale: number;
		kinematic: boolean;
		kinematicSetVelocity: boolean;
		ignoreIK: boolean;
	}

	interface ActionArgumentsOffset extends ActionArguments {
		pointToOffsetFrom: Vec3;
		linearDistance: number;
		linearTimeScale: number;
	}

	interface ActionArgumentsSlider extends ActionArguments {
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
	}

	interface ActionArgumentsTractor extends ActionArguments {
		otherID: Uuid;
		otherJointIndex: Uuid;
		targetPosition: Vec3;
		targetRotation: Quat;
		linearTimeScale: number;
		angularTimeScale: number;
	}

	interface ActionArgumentsTravelOriented extends ActionArguments {
		forward: Vec3;
		angularTimeScale: number;
	}

	type ActionArgumentsType =
		| ActionArgumentsBallSocket
		| ActionArgumentsConeTwist
		| ActionArgumentsFarGrab
		| ActionArgumentsHinge
		| ActionArgumentsHold
		| ActionArgumentsOffset
		| ActionArgumentsSlider
		| ActionArgumentsTractor
		| ActionArgumentsTravelOriented;

	type ActionType =
		| "far-grab"
		| "hold"
		| "offset"
		| "tractor"
		| "travel-oriented"
		| "hinge"
		| "slider"
		| "cone-twist"
		| "ball-socket";

	interface AmbientLight {
		ambientIntensity: number;
		ambientURL: string;
	}

	interface AnimationProperties {
		url: string;
		allowTranslation: boolean;
		fps: number;
		firstFrame: number;
		lastFrame: number;
		currentFrame: number;
		running: boolean;
		loop: boolean;
		hold: boolean;
	}

	type AvatarPriorityMode = "inherit" | "crowd" | "hero";

	interface Bloom {
		bloomIntensity: number;
		bloomThreshold: number;
		bloomSize: number;
	}

	interface BoundingBox {
		brn: Vec3;
		tfl: Vec3;
		center: Vec3;
		dimensions: Vec3;
	}

	type ComponentMode = "inherit" | "disabled" | "enabled";

	type EntityHostType = "domain" | "avatar" | "local";

	interface EntityProperties {
		id: Uuid;
		name: string;
		type: EntityType;
		entityHostType: EntityHostType;
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
		renderLayer: RenderLayer;
		primitiveMode: PrimitiveMode;
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
		boundingBox: BoundingBox;
		queryAACube: AACube;
		actionData: string;
		renderInfo: RenderInfo;
		cloneable: boolean;
		cloneLifetime: number;
		cloneLimit: number;
		cloneDynamic: boolean;
		cloneAvatarEntity: boolean;
		cloneOriginID: Uuid;
		grab: Grab;
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
	}

	interface EntityPropertiesBox extends EntityPropertiesShape {}

	interface EntityPropertiesGizmo extends EntityProperties {
		dimensions: Vec3;
		gizmoType: GizmoType;
		ring: RingGizmo;
	}

	interface EntityPropertiesGrid extends EntityProperties {
		dimensions: Vec3;
		color: Color;
		alpha: number;
		pulse: Pulse;
		followCamera: boolean;
		majorGridEvery: number;
		minorGridEvery: number;
	}

	interface EntityPropertiesImage extends EntityProperties {
		dimensions: Vec3;
		imageURL: string;
		emissive: boolean;
		keepAspectRatio: boolean;
		subImage: Rect;
		color: Color;
		alpha: number;
		pulse: Pulse;
		billboardMode: BillboardMode;
		faceCamera: boolean;
		isFacingAvatar: boolean;
	}

	interface EntityPropertiesLight extends EntityProperties {
		dimensions: Vec3;
		color: Color;
		intensity: number;
		falloffRadius: number;
		isSpotlight: boolean;
		exponent: number;
		cutoff: number;
	}

	interface EntityPropertiesLine extends EntityProperties {
		dimensions: Vec3;
		linePoints: Vec3[];
		color: Color;
	}

	interface EntityPropertiesMaterial extends EntityProperties {
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
	}

	interface EntityPropertiesModel extends EntityProperties {
		dimensions: Vec3;
		modelURL: string;
		modelScale: Vec3;
		textures: string;
		originalTextures: string;
		color: Color;
		shapeType: ShapeType;
		compoundShapeURL: string;
		animation: AnimationProperties;
		jointRotations: Quat[];
		jointRotationsSet: boolean[];
		jointTranslations: Vec3[];
		jointTranslationsSet: boolean[];
		relayParentJoints: boolean;
		groupCulled: boolean;
	}

	interface EntityPropertiesParticleEffect extends EntityProperties {
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
		pulse: Pulse;
		particleSpin: number;
		spinStart: number;
		spinFinish: number;
		spinSpread: number;
		rotateWithEntity: boolean;
	}

	interface EntityPropertiesPolyLine extends EntityProperties {
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
	}

	interface EntityPropertiesPolyVox extends EntityProperties {
		dimensions: Vec3;
		voxelVolumeSize: Vec3;
		voxelData: string;
		voxelSurfaceStyle: PolyVoxSurfaceStyle;
		xTextureURL: string;
		yTextureURL: string;
		zTextureURL: string;
		xNNeighborID: Uuid;
		yNNeighborID: Uuid;
		zNNeighborID: Uuid;
		xPNeighborID: Uuid;
		yPNeighborID: Uuid;
		zPNeighborID: Uuid;
	}

	interface EntityPropertiesShape extends EntityProperties {
		shape: Shape;
		dimensions: Vec3;
		color: Color;
		alpha: number;
		pulse: Pulse;
	}

	interface EntityPropertiesSphere extends EntityPropertiesShape {}

	interface EntityPropertiesText extends EntityProperties {
		dimensions: Vec3;
		text: string;
		lineHeight: number;
		textColor: Color;
		textAlpha: number;
		backgroundColor: Color;
		backgroundAlpha: number;
		pulse: Pulse;
		leftMargin: number;
		rightMargin: number;
		topMargin: number;
		bottomMargin: number;
		unlit: boolean;
		billboardMode: BillboardMode;
		faceCamera: boolean;
		isFacingAvatar: boolean;
	}

	interface EntityPropertiesWeb extends EntityProperties {
		dimensions: Vec3;
		sourceUrl: string;
		color: Color;
		alpha: number;
		pulse: Pulse;
		billboardMode: BillboardMode;
		faceCamera: boolean;
		isFacingCamera: boolean;
		dpi: number;
		scriptURL: string;
		maxFPS: number;
		inputMode: WebInputMode;
		showKeyboardFocusHighlight: boolean;
	}

	interface EntityPropertiesZone extends EntityProperties {
		dimensions: Vec3;
		shapeType: ShapeType;
		compoundShapeURL: string;
		keyLightMode: ComponentMode;
		keyLight: KeyLight;
		ambientLightMode: ComponentMode;
		ambientLight: AmbientLight;
		skyboxMode: ComponentMode;
		skybox: Skybox;
		hazeMode: ComponentMode;
		haze: Haze;
		bloomMode: ComponentMode;
		bloom: Bloom;
		flyingAllowed: boolean;
		ghostingAllowed: boolean;
		filterURL: string;
		avatarPriority: AvatarPriorityMode;
	}

	type EntityPropertiesType =
		| EntityPropertiesBox
		| EntityPropertiesGizmo
		| EntityPropertiesGrid
		| EntityPropertiesImage
		| EntityPropertiesLight
		| EntityPropertiesLine
		| EntityPropertiesMaterial
		| EntityPropertiesModel
		| EntityPropertiesParticleEffect
		| EntityPropertiesPolyLine
		| EntityPropertiesPolyVox
		| EntityPropertiesShape
		| EntityPropertiesSphere
		| EntityPropertiesText
		| EntityPropertiesWeb
		| EntityPropertiesZone;

	interface EntityPropertyInfo {
		propertyEnum: number;
		minimum: string;
		maximum: string;
	}

	type EntityType =
		| "Shape"
		| "Box"
		| "Sphere"
		| "Model"
		| "Text"
		| "Image"
		| "Web"
		| "ParticleEffect"
		| "Line"
		| "PolyLine"
		| "PolyVox"
		| "Grid"
		| "Gizmo"
		| "Light"
		| "Zone"
		| "Material";

	type GizmoType = "ring";

	interface Grab {
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
	}

	interface Haze {
		hazeRange: number;
		hazeColor: Color;
		hazeEnableGlare: boolean;
		hazeGlareColor: Color;
		hazeGlareAngle: number;
		hazeAltitudeEffet: boolean;
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
		shadowBias: number;
		shadowMaxDistance: number;
	}

	interface Material {
		name: string;
		model: "hifi_pbr" | "hifi_shader_simple";
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
		opacityMapMode: string;
		opacityCutoff: number | string;
		cullFaceMode: "CULL_NONE" | "CULL_FRONT" | "CULL_BACK" | "fallthrough";
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
		procedural: ProceduralData;
	}

	interface MaterialResource {
		materialVersion: number;
		materials: Material | Material[];
	}

	type NestableType = "entity" | "avatar" | "unknown";

	type PhysicsMotionType = "static" | "kinematic" | "dynamic";

	enum PolyVoxSurfaceStyle {
		marchingCubes,
		cubic,
		edgedCubic,
		edgedMarchingCubes,
	}

	type PrimitiveMode = "solid" | "lines";

	interface Pulse {
		min: number;
		max: number;
		period: number;
		colorMode: PulseMode;
		alphaMode: PulseMode;
	}

	enum PulseMode {
		none = "none",
		in = "in",
		out = "out",
	}

	interface RayToEntityIntersectionResult {
		intersects: boolean;
		accurate: boolean;
		entitiyID: Uuid;
		distance: number;
		intersection: Vec3;
		surfaceNormal: Vec3;
		face: BoxFace;
		extraInfo: object;
	}

	interface RenderInfo {
		verticiesCount: number;
		texturesCount: number;
		texturesSize: number;
		hasTransparent: boolean;
		drawCalls: number;
	}

	type RenderLayer = "world" | "front" | "hud";

	interface RingGizmo {
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
	}

	type Shape =
		| "Circle"
		| "Cone"
		| "Cube"
		| "Cylinder"
		| "Dodecahedron"
		| "Hexadon"
		| "Icosahedron"
		| "Octagon"
		| "Octahedron"
		| "Quad"
		| "Sphere"
		| "Tetrahedron"
		| "Torus"
		| "Triangle";

	interface Skybox {
		color: Color;
		url: string;
	}

	type TextEffect = "none" | "outline" | "outlineFill" | "shadow";

	type ZoneCullingMode =
		| "ZONECULLING_MODE_INHERIT"
		| "ZONECULLING_MODE_ON_INCLUSIVE"
		| "ZONECULLING_MODE_ON_EXCLUSIVE"
		| "ZONECULLING_MODE_OFF_EXCLUSIVE";

	type getServerScriptStatusCallback = (
		success: boolean,
		isRunning: boolean,
		status: string,
		errorInfo: string,
	) => any;

	type queryPropertyMetadataCallback = (error: string, result: object) => any;
}
