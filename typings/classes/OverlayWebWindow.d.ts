declare interface OverlayWindowProperties {
	title?: string;
	source?: string;
	width?: number;
	height?: number;
	visible?: boolean;
}

declare class OverlayWebWindow {
	readonly url: string;
	position: Vec2;
	size: Vec2;
	visible: boolean;

	constructor(
		titleOrProperties?: string | OverlayWindowProperties,
		source?: string,
		width?: number,
		height?: number,
	);

	close(): void;
	emitScriptEvent(message: string | object): void;
	getPosition(): Vec2;
	getSize(): Vec2;
	getURL(): string;
	isVisible(): boolean;
	raise(): void;
	setPosition(position: Vec2): void;
	setPosition(x: number, y: number): void;
	setScriptURL(script: string): void;
	setSize(size: Vec2): void;
	setSize(width: number, height: number): void;
	setTitle(title: string): void;
	setURL(url: string): void;
	setVisible(visible: boolean): void;

	closed: Signal<() => any>;
	moved: Signal<(position: Vec2) => any>;
	positionChanged: Signal<() => any>;
	resized: Signal<(size: Size) => any>;
	sizeChanged: Signal<() => any>;
	urlChanged: Signal<() => any>;
	visibleChanged: Signal<() => any>;
	webEventReceived: Signal<(message: string | object) => any>;
}
