declare namespace Overlays {
	// properties
	const keyboardFocusOverlay: Uuid;

	type OverlayType = "rectangle" | "image" | "text";

	interface OverlayPropertiesBase {
		id: Uuid;
		type: OverlayType;
		visible: boolean;
	}

	interface OverlayPropertiesRectangle extends OverlayPropertiesBase {
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
	}

	interface OverlayPropertiesImage extends OverlayPropertiesBase {
		bounds: Rect;
		x: number;
		y: number;
		width: number;
		height: number;
		imageURL: string;
		subImage: Rect;
		color: Color;
		alpha: number;
	}

	interface OverlayPropertiesText extends OverlayPropertiesBase {
		bounds: Rect;
		x: number;
		y: number;
		width: number;
		height: number;
		margin: number;
		leftMargin: number;
		topMargin: number;
		text: string;
		font: {
			size: number;
		};
		lineHeight: number;
		color: Color;
		alpha: number;
		backgroundColor: Color;
		backgroundAlpha: number;
	}

	type OverlayProperties =
		| OverlayPropertiesRectangle
		| OverlayPropertiesImage
		| OverlayPropertiesText;

	interface RayToOverlayIntersectionResult {
		intersects: boolean;
		overlayID: Uuid;
		distance: number;
		surfaceNormal: Vec3;
		intersection: Vec3;
		extraInfo: object;
	}

	// methods
	function addOverlay<T>(type: OverlayType, properties: Partial<T>): Uuid;
	function cloneOverlay(id: Uuid): Uuid;
	function deleteOverlay(id: Uuid): void;
	function editOverlay<T>(id: Uuid, properties: Partial<T>): boolean;
	function editOverlays(propertiesById: {
		[id: string]: OverlayProperties;
	}): boolean;
	function findOverlays(center: Vec3, radius: number): Uuid[];
	function findRayIntersection(
		pickRay: PickRay,
		precisionPicking?: boolean,
		include?: Uuid[],
		discard?: Uuid[],
		visibleOnly?: boolean,
		collideableOnly?: boolean,
	): RayToOverlayIntersectionResult;
	function getKeyboardFocusOverlay(): Uuid;
	function getOverlayAtPoint(point: Vec2): Uuid;
	function getOverlayObject(overlayID: Uuid): object;
	function getOverlaysProperties(propertiesById: {
		[id: string]: string[];
	}): {
		[id: string]: OverlayProperties;
	};
	function getOverlayType(id: Uuid): OverlayType;
	function getProperties(id: Uuid, properties: string[]): OverlayProperties;
	function getProperty(id: Uuid, properties: string): any;
	function height(): number;
	function isAddedOverlay(id: Uuid): boolean;
	function isLoaded(id: Uuid): boolean;
	function sendHoverEnterOverlay(id: Uuid, event: PointerEvent): void;
	function sendHoverLeaveOverlay(id: Uuid, event: PointerEvent): void;
	function sendHoverOverOverlay(id: Uuid, event: PointerEvent): void;
	function sendMouseMoveOnOverlay(id: Uuid, event: PointerEvent): void;
	function sendMousePressOnOverlay(id: Uuid, event: PointerEvent): void;
	function sendMouseReleaseOnOverlay(id: Uuid, event: PointerEvent): void;
	function setKeyboardFocusOverlay(id: Uuid): void;
	function textSize(id: Uuid, text: string): Size;
	function width(): number;

	// signals
	const hoverEnterOverlay: Signal<(id: Uuid, event: PointerEvent) => any>;
	const hoverLeaveOverlay: Signal<(id: Uuid, event: PointerEvent) => any>;
	const hoverOverOverlay: Signal<(id: Uuid, event: PointerEvent) => any>;
	const mouseDoublePressOffOverlay: Signal<() => any>;
	const mouseDoublePressOnOverlay: Signal<(
		id: Uuid,
		event: PointerEvent,
	) => any>;
	const mouseMoveOnOverlay: Signal<(id: Uuid, event: PointerEvent) => any>;
	const mousePressOffOverlay: Signal<() => any>;
	const mousePressOnOverlay: Signal<(id: Uuid, event: PointerEvent) => any>;
	const mouseReleaseOnOverlay: Signal<(id: Uuid, event: PointerEvent) => any>;
	const overlayDeleted: Signal<(id: Uuid) => any>;
}
