declare namespace Controller {
	// properties
	var Actions: Controller.Actions;
	var Hardware: Controller.Hardware;
	var Standard: Controller.Standard;

	// methods
	function captureActionEvents(): void;
	function captureEntityClickEvents(): void;
	function captureKeyEvents(event: KeyEvent): void;
	function captureMouseEvents(): void;
	function captureTouchEvents(): void;
	function captureWheelEvents(): void;
	function disableMapping(mappingName: string): void;
	function enableMapping(mappingName: string, enable?: boolean): void;
	function findAction(actionName: string): number;
	function findDevice(deviceName: string): number;
	function getActionNames(): string[];
	function getActions(): Controller.Actions;
	function getActionValue(actionID: number): number;
	function getAxisValue(source: number): number;
	function getDeviceName(deviceID: number): string;
	function getDeviceNames(): string[];
	function getHardware(): Controller.Hardware;
	function getInputRecorderSaveDirectory(): string;
	function getPoseValue(source: number): Pose;
	function getRecommendedHUDRect(): Rect;
	function getRunningInputDevices(): string[];
	function getStandard(): Controller.Standard;
	function getValue(source: number): number;
	function getViewportDimensions(): Vec2;
	function loadInputRecording(file: string): void;
	function loadMapping(jsonURL: string): MappingObject;
	function newMapping(mappingName?: string): MappingObject;
	function parseMapping(jsonString: string): MappingObject;
	function releaseActionEvents(): void;
	function releaseEntityClickEvents(): void;
	function releaseKeyEvents(event: KeyEvent): void;
	function releaseMouseEvents(): void;
	function releaseTouchEvents(): void;
	function releaseWheelEvents(): void;
	function saveInputRecording(): void;
	function setVPadEnabled(enable: boolean): void;
	function setVPadExtraBottomMargin(margin: number): void;
	function setVPadHidden(hidden: boolean): void;
	function startInputPlayback(): void;
	function startInputRecording(): void;
	function stopInputPlayback(): void;
	function stopInputRecording(): void;
	function triggerHapticPulse(
		strength: number,
		duration: number,
		hand?: Controller.Hand,
	): void;
	function triggerHapticPulseOnDevice(
		deviceID: number,
		strength: number,
		duration: number,
		hand?: Controller.Hand,
	): void;
	function triggerShortHapticPulse(
		strength: number,
		hand?: Controller.Hand,
	): void;
	function triggerShortHapticPulseOnDevice(
		deviceID: number,
		strength: number,
		hand?: Controller.Hand,
	): void;

	// signals
	const actionEvent: Signal<(actionID: number, value: number) => any>;
	const hardwareChanged: Signal<() => any>;
	const inputDeviceRunningChanged: Signal<(
		deviceName: string,
		isRunning: boolean,
	) => any>;
	const inputEvent: Signal<(action: number, value: number) => any>;
	const keyPressEvent: Signal<(event: KeyEvent) => any>;
	const keyReleaseEvent: Signal<(event: KeyEvent) => any>;
	const mouseDoublePressEvent: Signal<(event: MouseEvent) => any>;
	const mouseMoveEvent: Signal<(event: MouseEvent) => any>;
	const mousePressEvent: Signal<(event: MouseEvent) => any>;
	const mouseReleaseEvent: Signal<(event: MouseEvent) => any>;
	const touchBeginEvent: Signal<(event: TouchEvent) => any>;
	const touchEndEvent: Signal<(event: TouchEvent) => any>;
	const touchUpdateEvent: Signal<(event: TouchEvent) => any>;
	const wheelEvent: Signal<(event: WheelEvent) => any>;

	// types
	interface Actions {
		// avatar movement
		TranslateX: number;
		TranslateY: number;
		TranslateZ: number;
		Pitch: number;
		Yaw: number;
		Roll: number;
		DeltaPitch: number;
		DeltaYaw: number;
		DeltaRoll: number;
		StepTranslateX: number;
		StepTranslateY: number;
		StepTranslateZ: number;
		StepPitch: number;
		StepYaw: number;
		StepRoll: number;
		// avatar skeleton
		Hips: Pose;
		Spine2: Pose;
		Head: Pose;
		LeftArm: Pose;
		RightArm: Pose;
		LeftHand: Pose;
		LeftHandThumb1: Pose;
		LeftHandThumb2: Pose;
		LeftHandThumb3: Pose;
		LeftHandThumb4: Pose;
		LeftHandIndex1: Pose;
		LeftHandIndex2: Pose;
		LeftHandIndex3: Pose;
		LeftHandIndex4: Pose;
		LeftHandMiddle1: Pose;
		LeftHandMiddle2: Pose;
		LeftHandMiddle3: Pose;
		LeftHandMiddle4: Pose;
		LeftHandRing1: Pose;
		LeftHandRing2: Pose;
		LeftHandRing3: Pose;
		LeftHandRing4: Pose;
		LeftHandPinky1: Pose;
		LeftHandPinky2: Pose;
		LeftHandPinky3: Pose;
		LeftHandPinky4: Pose;
		RightHand: Pose;
		RightHandThumb1: Pose;
		RightHandThumb2: Pose;
		RightHandThumb3: Pose;
		RightHandThumb4: Pose;
		RightHandIndex1: Pose;
		RightHandIndex2: Pose;
		RightHandIndex3: Pose;
		RightHandIndex4: Pose;
		RightHandMiddle1: Pose;
		RightHandMiddle2: Pose;
		RightHandMiddle3: Pose;
		RightHandMiddle4: Pose;
		RightHandRing1: Pose;
		RightHandRing2: Pose;
		RightHandRing3: Pose;
		RightHandRing4: Pose;
		RightHandPinky1: Pose;
		RightHandPinky2: Pose;
		RightHandPinky3: Pose;
		RightHandPinky4: Pose;
		LeftFoot: Pose;
		RightFoot: Pose;
		// application
		BoomIn: number;
		BoomOut: number;
		CycleCamera: number;
		ContextMenu: number;
		ToggleMute: number;
		TogglePushToTalk: number;
		ToggleOverlay: number;
		Sprint: number;
		ReticleClick: number;
		ReticleX: number;
		ReticleY: number;
		ReticleLeft: number;
		ReticleRight: number;
		ReticleUp: number;
		ReticleDown: number;
		UiNavLateral: number;
		UiNavVerticle: number;
		UiNavGroup: number;
		UiNavSelect: number;
		UiNavBack: number;
		// aliases
		Backward: number;
		Forward: number;
		StrafeRight: number;
		StrafeLeft: number;
		Up: number;
		Down: number;
		PitchDown: number;
		PitchUp: number;
		YawLeft: number;
		YawRight: number;
	}

	enum Hand {
		Left,
		Right,
		Both,
	}

	interface Hardware {
		Actions: { [key: string]: number };
		Application: { [key: string]: number };
		Keyboard: { [key: string]: number };
		OculusTouch: { [key: string]: number };
		Vive: { [key: string]: number };
	}

	interface HardwareApplication {
		CameraFirstPerson: number;
		CameraThirdPerson: number;
		CameraFSM: number;
		CameraIndependant: number;
		CameraEntity: number;
		InHMD: number;
		AdvancedMovement: number;
		StrafeEnabled: number;
		LeftHandDominant: number;
		RightHandDominant: number;
		SnapTurn: number;
		Grounded: number;
		NaviagationFocused: number;
		PlatformWindows: number;
		PlatformMac: number;
		PlatformAndroid: number;
	}

	interface HardwareKeyboard {
		"0 – 9": number;
		"A – Z": number;
		Space: number;
		Tab: number;
		Shift: number;
		Control: number;
		Left: number;
		Right: number;
		Up: number;
		Down: number;
		PgUp: number;
		PgDown: number;
		LeftMouseButton: number;
		MiddleMouseButton: number;
		RightMouseButton: number;
		LeftMouseClicked: number;
		MiddleMouseClicked: number;
		RightMouseClicked: number;
		MouseMoveRight: number;
		MouseMoveLeft: number;
		MouseMoveUp: number;
		MouseMoveDown: number;
		MouseX: number;
		MouseY: number;
		MouseWheelRight: number;
		MouseWheelLeft: number;
		MouseWheelUp: number;
		MouseWheelDown: number;
		TouchpadRight: number;
		TouchpadLeft: number;
		TouchpadUp: number;
		TouchpadDown: number;
	}

	interface HardwareOculusTouch {
		// buttons
		A: number;
		B: number;
		X: number;
		Y: number;
		LeftApplicationMenu: number;
		RightApplicationMenu: number;
		// sticks
		LX: number;
		LY: number;
		RX: number;
		RY: number;
		LS: number;
		RS: number;
		LSTouch: number;
		RSTouch: number;
		// triggers
		LT: number;
		RT: number;
		LeftGrip: number;
		RightGrip: number;
		// finger abstractions
		LeftPrimaryThumbTouch: number;
		LeftSecondaryThumbTouch: number;
		LeftThumbUp: number;
		RightPrimaryThumbTouch: number;
		RightSecondaryThumbTouch: number;
		RightThumbUp: number;
		LeftPrimaryIndexTouch: number;
		LeftIndexPoint: number;
		RightPrimaryIndexTouch: number;
		RightIndexPoint: number;
		// avatar skeleon
		Head: Pose;
		LeftHand: Pose;
		RightHand: Pose;
	}

	interface HardwareVive {
		// buttons
		LeftApplicationMenu: number;
		RightApplicationMenu: number;
		// touch pad (sticks)
		LX: number;
		LY: number;
		RX: number;
		RY: number;
		LS: number;
		LS_CENTER: number;
		LS_X: number;
		LS_Y: number;
		RS: number;
		RS_CENTER: number;
		RS_X: number;
		RS_Y: number;
		LSTouch: number;
		RSTouch: number;
		// triggers
		LT: number;
		RT: number;
		LTClick: number;
		RTClick: number;
		LeftGrip: number;
		RightGrip: number;
		// avatar skeleton
		Hips: Pose;
		Spine2: Pose;
		Head: Pose;
		LeftArm: Pose;
		RightArm: Pose;
		LeftHand: Pose;
		RightHand: Pose;
		// trackers
		TrackedObject00: Pose;
		TrackedObject01: Pose;
		TrackedObject02: Pose;
		TrackedObject03: Pose;
		TrackedObject04: Pose;
		TrackedObject05: Pose;
		TrackedObject06: Pose;
		TrackedObject07: Pose;
		TrackedObject08: Pose;
		TrackedObject09: Pose;
		TrackedObject10: Pose;
		TrackedObject11: Pose;
		TrackedObject12: Pose;
		TrackedObject13: Pose;
		TrackedObject14: Pose;
		TrackedObject15: Pose;
	}

	interface MappingJSON {
		name: string;
		channels: Controller.MappingJSONRoute[];
	}

	interface MappingJSONAxis {
		makeAxis: string[][];
	}

	interface MappingJSONFilter {
		type: string;
	}

	interface MappingJSONRoute {
		from: string | Controller.MappingJSONAxis;
		peek: boolean;
		debug: boolean;
		when: string | string[];
		filters: Controller.MappingJSONFilter | Controller.MappingJSONFilter[];
		to: string;
	}

	interface Standard {
		// buttons
		A: number;
		B: number;
		X: number;
		Y: number;
		DL: number;
		DR: number;
		DU: number;
		DD: number;
		Start: number;
		Back: number;
		LB: number;
		RB: number;
		// sticks
		LX: number;
		LY: number;
		RX: number;
		RY: number;
		LS: number;
		RS: number;
		LSTouch: number;
		RSTouch: number;
		// triggers
		LT: number;
		RT: number;
		LTClick: number;
		RTClick: number;
		LeftGrip: number;
		RightGrip: number;
		LeftGripTouch: number;
		RightGripTouch: number;
		// alliases, playstation style names
		Cross: number;
		Circle: number;
		Square: number;
		Triangle: number;
		Left: number;
		Right: number;
		Up: number;
		Down: number;
		Select: number;
		L1: number;
		R1: number;
		L3: number;
		R3: number;
		L2: number;
		R2: number;
		// finger abstarctions
		LeftPrimaryThumb: number;
		LeftSecondaryThumb: number;
		RightPrimaryThumb: number;
		RightSecondaryThumb: number;
		LeftPrimaryThumbTouch: number;
		LeftSecondaryThumbTouch: number;
		LeftThumbUp: number;
		RightPrimaryThumbTouch: number;
		RightSecondaryThumbTouch: number;
		RightThumbUp: number;
		LeftPrimaryIndex: number;
		LeftSecondaryIndex: number;
		RightPrimaryIndex: number;
		RightSecondaryIndex: number;
		LeftPrimaryIndexTouch: number;
		LeftSecondaryIndexTouch: number;
		LeftIndexPoint: number;
		RightPrimaryIndexTouch: number;
		RightSecondaryIndexTouch: number;
		RightIndexPoint: number;
		// avatar skeleton
		Hips: Pose;
		Spine2: Pose;
		Head: Pose;
		LeftArm: Pose;
		RightArm: Pose;
		LeftHand: Pose;
		LeftHandThumb1: Pose;
		LeftHandThumb2: Pose;
		LeftHandThumb3: Pose;
		LeftHandThumb4: Pose;
		LeftHandIndex1: Pose;
		LeftHandIndex2: Pose;
		LeftHandIndex3: Pose;
		LeftHandIndex4: Pose;
		LeftHandMiddle1: Pose;
		LeftHandMiddle2: Pose;
		LeftHandMiddle3: Pose;
		LeftHandMiddle4: Pose;
		LeftHandRing1: Pose;
		LeftHandRing2: Pose;
		LeftHandRing3: Pose;
		LeftHandRing4: Pose;
		LeftHandPinky1: Pose;
		LeftHandPinky2: Pose;
		LeftHandPinky3: Pose;
		LeftHandPinky4: Pose;
		RightHand: Pose;
		RightHandThumb1: Pose;
		RightHandThumb2: Pose;
		RightHandThumb3: Pose;
		RightHandThumb4: Pose;
		RightHandIndex1: Pose;
		RightHandIndex2: Pose;
		RightHandIndex3: Pose;
		RightHandIndex4: Pose;
		RightHandMiddle1: Pose;
		RightHandMiddle2: Pose;
		RightHandMiddle3: Pose;
		RightHandMiddle4: Pose;
		RightHandRing1: Pose;
		RightHandRing2: Pose;
		RightHandRing3: Pose;
		RightHandRing4: Pose;
		RightHandPinky1: Pose;
		RightHandPinky2: Pose;
		RightHandPinky3: Pose;
		RightHandPinky4: Pose;
		LeftFoot: Pose;
		RightFoot: Pose;
		// trackers
		TrackedObject00: Pose;
		TrackedObject01: Pose;
		TrackedObject02: Pose;
		TrackedObject03: Pose;
		TrackedObject04: Pose;
		TrackedObject05: Pose;
		TrackedObject06: Pose;
		TrackedObject07: Pose;
		TrackedObject08: Pose;
		TrackedObject09: Pose;
		TrackedObject10: Pose;
		TrackedObject11: Pose;
		TrackedObject12: Pose;
		TrackedObject13: Pose;
		TrackedObject14: Pose;
		TrackedObject15: Pose;
	}
}
