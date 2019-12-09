declare namespace Entities {
	// properties
	var keyboardFocusEntity: Uuid;

	// methods
	function addEntity(
		properties:
			| EntityProperties
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
			| EntityPropertiesZone,
		entityHostType: EntityHostType,
	): Uuid;

	function addEntity(
		properties:
			| EntityProperties
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
			| EntityPropertiesZone,
		avatarEntity: boolean,
	): Uuid;

	function callEntityMethod(
		entityID: Uuid,
		method: string,
		parameters?: string[],
	): void;

	function deleteEntity(entityID: Uuid): void;

	function emitScriptEvent(entityID: Uuid, message: string): void;

	function getChildrenIDs(entityID: Uuid): Uuid[];

	function getEntityProperties(
		entityID: any,
		desiredProperties?: string[],
	):
		| EntityProperties
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

	// signals
	var enterEntity: Signal;
	var leaveEntity: Signal;

	// types
	interface ActionArguments {
		type: Entities.ActionType;
		tag: string;
		ttl: number;
		isMine: boolean;
		// ::no-motion-state: boolean;
		// ::active: boolean;
		// ::motion-type: Entities.PhysicsMotionType;
	}

	interface ActionArgumentBallSocket extends ActionArguments {
		otherEntityID: Uuid;
		pivot: Vec3;
		otherPivot: Vec3;
	}

	interface ActionArgumentConeTwist extends ActionArguments {
		otherEntityID: Uuid;
		pivot: Vec3;
		axis: Vec3;
		otherPivot: Vec3;
		otherAxis: Vec3;
		swingSpan1: number;
		swingSpan2: number;
		twistSpan: number;
	}

	interface ActionArgumentFarGrab extends ActionArguments {
		otherID: Uuid;
		otherJointIndex: Uuid;
		targetPosition: Vec3;
		targetRotation: Quat;
		linearTimeScale: number;
		angularTimeScale: number;
	}

	interface ActionArgumentHinge extends ActionArguments {
		otherEntityID: Uuid;
		pivot: Vec3;
		axis: Vec3;
		otherPivot: Vec3;
		otherAxis: Vec3;
		low: number;
		high: number;
		angle: number;
	}

	interface ActionArgumentHold extends ActionArguments {
		holderID: Uuid;
		hand: string;
		relativePosition: Vec3;
		relativeRotation: Vec3;
		timeScale: number;
		kinematic: boolean;
		kinematicSetVelocity: boolean;
		ignoreIK: boolean;
	}

	interface ActionArgumentOffset extends ActionArguments {
		pointToOffsetFrom: Vec3;
		linearDistance: number;
		linearTimeScale: number;
	}

	interface ActionArgumentSlider extends ActionArguments {
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

	interface ActionArgumentTractor extends ActionArguments {
		otherID: Uuid;
		otherJointIndex: Uuid;
		targetPosition: Vec3;
		targetRotation: Quat;
		linearTimeScale: number;
		angularTimeScale: number;
	}

	interface ActionArgumentTravelOriented extends ActionArguments {
		forward: Vec3;
		angularTimeScale: number;
	}

	enum ActionType {
		farGrab = "far-grab",
		hold = "hold",
		offset = "offset",
		tractor = "tractor",
		travelOriented = "travel-oriented",
		hinge = "hinge",
		slider = "slider",
		coneTwist = "cone-twist",
		ballSocket = "ball-socket",
	}

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

	enum AvatarPriorityMode {
		inherit = "inherit",
		crowd = "crowd",
		hero = "hero",
	}

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

	enum ComponentMode {
		inherit = "inherit",
		disabled = "disabled",
		enabled = "enabled",
	}

	enum EntityHostType {
		domain = "domain",
		avatar = "avatar",
		local = "local",
	}

	interface EntityProperties {
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
	}

	interface EntityPropertiesBox extends EntityPropertiesShape {}

	interface EntityPropertiesGizmo extends EntityProperties {
		dimensions: Vec3;
		gizmoType: Entities.GizmoType;
		ring: Entities.RingGizmo;
	}

	interface EntityPropertiesGrid extends EntityProperties {
		dimensions: Vec3;
		color: Color;
		alpha: number;
		pulse: Entities.Pulse;
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
		pulse: Entities.Pulse;
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
		animation: Entities.AnimationProperties;
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
		pulse: Entities.Pulse;
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
	}

	interface EntityPropertiesShape extends EntityProperties {
		shape: Entities.Shape;
		dimensions: Vec3;
		color: Color;
		alpha: number;
		pulse: Entities.Pulse;
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
		pulse: Entities.Pulse;
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
		pulse: Entities.Pulse;
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
	}

	interface EntityPropertyInfo {
		propertyEnum: number;
		minimum: string;
		maximum: string;
	}

	enum EntityType {
		Shape = "Shape",
		Box = "Box",
		Sphere = "Sphere",
		Model = "Model",
		Text = "Text",
		Image = "Image",
		Web = "Web",
		ParticleEffect = "ParticleEffect",
		Line = "Line",
		PolyLine = "PolyLine",
		PolyVox = "PolyVox",
		Grid = "Grid",
		Gizmo = "Gizmo",
		Light = "Light",
		Zone = "Zone",
		Material = "Material",
	}

	enum GizmoType {
		ring = "ring",
	}

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
		noramlMap: string;
		bumpMap: string;
		occlusionMap: string;
		scatteringMap: string;
		lightMap: string;
		texCoordTransform0: Mat4 | string;
		texCoordTransform1: Mat4 | string;
		lightmapParams: string;
		materialParams: string;
		defaultFallthrough: boolean;
	}

	interface MaterialResource {
		materialVersion: number;
		materials: Entities.Material | Entities.Material[];
	}

	enum NestableType {
		entity = "entity",
		avatar = "avatar",
		unknown = "unknown",
	}

	enum PhysicsMotionType {
		static = "static",
		kinematic = "kinematic",
		dynamic = "dynamic",
	}

	enum PolyVoxSurfaceStyle {
		marchingCubes,
		cubic,
		edgedCubic,
		edgedMarchingCubes,
	}

	enum PrimitiveMode {
		solid = "solid",
		lines = "lines",
	}

	interface Pulse {
		min: number;
		max: number;
		period: number;
		colorMode: Entities.PulseMode;
		alphaMode: Entities.PulseMode;
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

	enum RenderLayer {
		world = "world",
		front = "front",
		hud = "hud",
	}

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

	enum Shape {
		Circle = "Circle",
		Cone = "Cone",
		Cube = "Cube",
		Cylinder = "Cylinder",
		Dodecahedron = "Dodecahedron",
		Hexadon = "Hexadon",
		Icosahedron = "Icosahedron",
		Octagon = "Octagon",
		Octahedron = "Octahedron",
		Quad = "Quad",
		Sphere = "Sphere",
		Tetrahedron = "Tetrahedron",
		Torus = "Torus",
		Triangle = "Triangle",
	}

	interface Skybox {
		color: Color;
		url: string;
	}
}
