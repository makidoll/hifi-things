declare namespace Entities {
	var keyboardFocusEntity: Uuid;

	function getEntityProperties(entityID: any, desiredProperties?: string[]): EntityProperties;

	interface ActionArguments {
		type: Entities.ActionType;
		tag: string;
		ttl: number;
		isMine: boolean;
		// ::no-motion-state: boolean;
		// ::active: boolean;
		// ::motion-type: Entities.PhysicsMotionType;

		// im not sure why extends is acting strange

		// BallSocket
		otherEntityID: Uuid;
		pivot: Vec3;
		otherPivot: Vec3;

		// ConeTwist
		//otherEntityID: Uuid;
		//pivot: Vec3;
		axis: Vec3;
		//otherPivot: Vec3;
		otherAxis: Vec3;
		swingSpan1: number;
		swingSpan2: number;
		twistSpan: number;

		// Far Grab
		otherID: Uuid;
		otherJointIndex: Uuid;
		targetPosition: Vec3;
		targetRotation: Quat;
		linearTimeScale: number;
		angularTimeScale: number;

		// Hinge
		//otherEntityID: Uuid;
		//pivot: Vec3;
		//axis: Vec3;
		//otherPivot: Vec3;
		//otherAxis: Vec3;
		low: number;
		high: number;
		angle: number;

		// Hold
		holderID: Uuid;
		hand: string;
		relativePosition: Vec3;
		relativeRotation: Vec3;
		timeScale: number;
		kinematic: boolean;
		kinematicSetVelocity: boolean;
		ignoreIK: boolean;

		// Offset
		pointToOffsetFrom: Vec3;
		linearDistance: number;
		//linearTimeScale: number;

		// Slider
		//otherEntityID: Uuid;
		point: Vec3;
		//axis: Vec3;
		otherPoint: Vec3;
		//otherAxis: Vec3;
		linearLow: number;
		linearHigh: number;
		angularLow: number;
		angularHigh: number;
		linearPosition: number;
		angularPosition: number;

		// Tractor
		//otherID: Uuid;
		//otherJointIndex: Uuid;
		//targetPosition: Vec3;
		//targetRotation: Quat;
		//linearTimeScale: number;
		//angularTimeScale: number;

		// TravelOriented
		forward: Vec3;
		//angularTimeScale: number;
	}

	/*
	interface ActionArgument_BallSocket extends ActionArguments {
		otherEntityID: Uuid;
		pivot: Vec3;
		otherPivot: Vec3;
	}

	interface ActionArgument_ConeTwist extends ActionArguments {
		otherEntityID: Uuid;
		pivot: Vec3;
		axis: Vec3;
		otherPivot: Vec3;
		otherAxis: Vec3;
		swingSpan1: number;
		swingSpan2: number;
		twistSpan: number;
	}

	interface ActionArgument_FarGrab extends ActionArguments {
		otherID: Uuid;
		otherJointIndex: Uuid;
		targetPosition: Vec3;
		targetRotation: Quat;
		linearTimeScale: number;
		angularTimeScale: number;
	}

	interface ActionArgument_Hinge extends ActionArguments {
		otherEntityID: Uuid;
		pivot: Vec3;
		axis: Vec3;
		otherPivot: Vec3;
		otherAxis: Vec3;
		low: number;
		high: number;
		angle: number;
	}

	interface ActionArgument_Hold extends ActionArguments {
		holderID: Uuid;
		hand: string;
		relativePosition: Vec3;
		relativeRotation: Vec3;
		timeScale: number;
		kinematic: boolean;
		kinematicSetVelocity: boolean;
		ignoreIK: boolean;
	}

	interface ActionArgument_Offset extends ActionArguments {
		pointToOffsetFrom: Vec3;
		linearDistance: number;
		linearTimeScale: number;
	}

	interface ActionArgument_Slider extends ActionArguments {
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

	interface ActionArgument_Tractor extends ActionArguments {
		otherID: Uuid;
		otherJointIndex: Uuid;
		targetPosition: Vec3;
		targetRotation: Quat;
		linearTimeScale: number;
		angularTimeScale: number;
	}

	interface ActionArgument_TravelOriented extends ActionArguments {
		forward: Vec3;
		angularTimeScale: number;
	}
	*/

	type ActionType = string;

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

	type AvatarPriorityMode = string;

	interface Bloom {
		bloomIntensity: number
		bloomThreshold: number
		bloomSize: number
	}

	interface BoundingBox {
		brn: Vec3;
		tfl: Vec3;
		center: Vec3;
		dimensions: Vec3;
	}

	type ComponentMode = string;

	type EntityHostType = string;

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

		// im not sure why extends is acting strange

		// Box

		// Gizmo
		dimensions: Vec3;
		gizmoType: Entities.GizmoType;
		ring: Entities.RingGizmo;

		// Grid
		//dimensions: Vec3;
		color: Color;
		alpha: number;
		pulse: Entities.Pulse;
		followCamera: boolean;
		majorGridEvery: number;
		minorGridEvery: number;

		// Image
		//dimensions: Vec3;
		imageURL: string;
		emissive: boolean;
		keepAspectRatio: boolean;
		subImage: Rect;
		//color: Color;
		//alpha: number;
		//pulse: Entities.Pulse;
		billboardMode: BillboardMode;
		faceCamera: boolean;
		isFacingAvatar: boolean;

		// Light
		//dimensions: Vec3;
		//color: Color;
		intensity: number;
		falloffRadius: number;
		isSpotlight: boolean;
		exponent: number;
		cutoff: number;

		// Line
		//dimensions: Vec3;
		linePoints: Vec3[];
		//color: Color;

		// Material
		//dimensions: Vec3;
		materialURL: string;
		materialData: string;
		priority: number;
		parentMaterialName: string;
		materialMappingMode: string;
		materialMappingPos: Vec2;
		materialMappingScale: Vec2;
		materialMappingRot: number;
		materialRepeat: boolean;

		// Model
		//dimensions: Vec3;
		modelURL: string;
		modelScale: Vec3;
		textures: string;
		originalTextures: string;
		//color: Color;
		shapeType: ShapeType;
		compoundShapeURL: string;
		animation: Entities.AnimationProperties;
		jointRotations: Quat[];
		jointRotationsSet: boolean[];
		jointTranslations: Vec3[];
		jointTranslationsSet: boolean[];
		relayParentJoints: boolean;
		groupCulled: boolean;

		// Particle Effects
		isEmitting: boolean;
		maxParticles: number;
		lifespan: number;
		emitRate: number;
		emitSpeed: number;
		speedSpread: number;
		emitAcceleration: Vec3;
		accelerationSpread: Vec3;
		//dimensions: Vec3;
		emitterShouldTrail: boolean;
		emitOrientation: Quat;
		//shapeType: ShapeType;
		//compoundShapeURL: string;
		emitDimensions: Vec3;
		emitRadiusStart: number;
		polarStart: number;
		polarFinish: number;
		azimuthStart: number;
		azimuthFinish: number;
		//textures: string;
		particleRadius: number;
		radiusStart: number;
		radiusFinish: number;
		radiusSpread: number;
		//color: Color;
		colorStart: ColorFloat;
		colorFinish: ColorFloat;
		colorSpread: Color;
		//alpha: number;
		alphaStart: number;
		alphaFinish: number;
		alphaSpread: number;
		//pulse: Entities.Pulse;
		particleSpin: number;
		spinStart: number;
		spinFinish: number;
		spinSpread: number;
		rotateWithEntity: boolean;

		// PolyLine
		//dimensions: Vec3;
		//linePoints: Vec3[];
		normals: Vec3[];
		strokeWidths: number[];
		strokeColors: Vec3[];
		//color: Color;
		//textures: string;
		isUVModeStretch: boolean;
		glow: boolean;
		//faceCamera: boolean;

		// PolyVox
		//dimensions: Vec3;
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

		// Shape
		shape: Entities.Shape;
		//dimensions: Vec3;
		//color: Color;
		//alpha: number;
		//pulse: Entities.Pulse;

		// Sphere

		// Text
		//dimensions: Vec3;
		text: string;
		lineHeight: number;
		textColor: Color;
		textAlpha: number;
		backgroundColor: Color;
		backgroundAlpha: number;
		//pulse: Entities.Pulse;
		leftMargin: number;
		rightMargin: number;
		topMargin: number;
		bottomMargin: number;
		unlit: boolean;
		//billboardMode: BillboardMode;
		//faceCamera: boolean;
		//isFacingAvatar: boolean;

		// Web
		//dimensions: Vec3;
		sourceUrl: string;
		//color: Color;
		//alpha: number;
		//pulse: Entities.Pulse;
		//billboardMode: BillboardMode;
		//faceCamera: boolean;
		isFacingCamera: boolean;
		dpi: number;
		scriptURL: string;
		maxFPS: number;
		inputMode: WebInputMode;
		showKeyboardFocusHighlight: boolean;

		// Zone
		//dimensions: Vec3;
		//shapeType: ShapeType;
		//compoundShapeURL: string;
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

	/*
	interface EntityProperties_Box extends EntityProperties_Shape {}

	interface EntityProperties_Gizmo extends EntityProperties {
		dimensions: Vec3;
		gizmoType: Entities.GizmoType;
		ring: Entities.RingGizmo;
	}

	interface EntityProperties_Grid extends EntityProperties {
		dimensions: Vec3;
		color: Color;
		alpha: number;
		pulse: Entities.Pulse;
		followCamera: boolean;
		majorGridEvery: number;
		minorGridEvery: number;
	}

	interface EntityProperties_Image extends EntityProperties {
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

	interface EntityProperties_Light extends EntityProperties {
		dimensions: Vec3;
		color: Color;
		intensity: number;
		falloffRadius: number;
		isSpotlight: boolean;
		exponent: number;
		cutoff: number;
	}

	interface EntityProperties_Line extends EntityProperties {
		dimensions: Vec3;
		linePoints: Vec3[];
		color: Color;
	}

	interface EntityProperties_Material extends EntityProperties {
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

	interface EntityProperties_Model extends EntityProperties {
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

	interface EntityProperties_ParticleEffect extends EntityProperties {
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

	interface EntityProperties_PolyLine extends EntityProperties {
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

	interface EntityProperties_PolyVox extends EntityProperties {
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

	interface EntityProperties_Shape extends EntityProperties {
		shape: Entities.Shape;
		dimensions: Vec3;
		color: Color;
		alpha: number;
		pulse: Entities.Pulse;
	}

	interface EntityProperties_Sphere extends EntityProperties_Shape {}

	interface EntityProperties_Text extends EntityProperties {
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

	interface EntityProperties_Web extends EntityProperties {
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

	interface EntityProperties_Zone extends EntityProperties {
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
	*/

	interface EntityPropertyInfo {
		propertyEnum: number;
		minimum: string;
		maximum: string;
	}

	type EntityType = string;

	type GizmoType = string;

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
		emissive: ColorFloat|RGBS|string;
		opacity: number|string;
		unlit: boolean|string;
		albedo: ColorFloat|RGBS|string;
		roughness: number|string;
		metallic: number|string;
		scattering: number|string;
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
		texCoordTransform0: Mat4|string;
		texCoordTransform1: Mat4|string;
		lightmapParams: string;
		materialParams: string;
		defaultFallthrough: boolean;
	}

	interface MaterialResource {
		materialVersion: number;
		materials: Entities.Material|Entities.Material[];
	}

	type NestableType = string;

	type PhysicsMotionType = string;

	type PolyVoxSurfaceStyle = number;

	type PrimitiveMode = string;

	interface Pulse {
		min: number;
		max: number;
		period: number;
		colorMode: Entities.PulseMode;
		alphaMode: Entities.PulseMode;
	}

	type PulseMode = string;

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

	type RenderLayer = string;

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

	type Shape = string;

	interface Skybox {
		color: Color;
		url: string;
	}
}