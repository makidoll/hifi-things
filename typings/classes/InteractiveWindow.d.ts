declare enum InteractiveWindowPresentationMode {
	VIRTUAL,
	NATIVE,
}

declare enum RelativePositionAnchor {
	NO_ANCHOR,
	TOP_LEFT,
	TOP_RIGHT,
	BOTTOM_RIGHT,
	BOTTOM_LEFT,
}

declare class InteractiveWindow {
	title: string;
	position: Vec2;
	relativePositionAnchor: RelativePositionAnchor;
	relativePosition: Vec2;
	size: Vec2;
	visible: boolean;
	presentationMode: InteractiveWindowPresentationMode;

	close(): void;
	emitScriptEvent(message: string | object): void;
	//emitWebEvent(message: string | object): void;
	raise(): void;
	sendToQml(message: string | object): void;
	show(): void;

	readonly closed: Signal<() => any>;
	readonly fromQml: Signal<(message: string | object) => any>;
	readonly positionChanged: Signal<() => any>;
	readonly presentationModeChanged: Signal<() => any>;
	readonly sizeChanged: Signal<() => any>;
	readonly titleChanged: Signal<() => any>;
	readonly visibleChanged: Signal<() => any>;
	readonly webEventReceived: Signal<(message: string | object) => any>;
}
