declare namespace Window {
	// properties
	const innerWidth: number;
	const innerHeight: number;
	const x: number;
	const y: number;
	let interstitialModeEnabled: boolean;
	let location: string; // AddressManager

	// methods
	function alert(message?: string): void;
	function browse(
		title?: string,
		directory?: string,
		nameFilter?: string,
	): string;
	function browseAssets(
		title?: string,
		directory?: string,
		nameFilter?: string,
	): string;
	function browseAssetsAsync(
		title?: string,
		directory?: string,
		nameFilter?: string,
	): void;
	function browseAsync(
		title?: string,
		directory?: string,
		nameFilter?: string,
	): void;
	function browseDir(title?: string, directory?: string): string;
	function browseDirAsync(title?: string, directory?: string): void;
	function checkVersion(): string;
	function closeMessageBox(id: number): void;
	function confirm(message: string): boolean;
	function copyToClipboard(text: string): void;
	function displayAnnouncement(message: string): void;
	function getActiveDisplayPlugin(): number;
	function getDeviceSize(): Vec2;
	function getDisplayPluginCount(): number;
	function getDisplayPluginName(index: number): string;
	function getLastDomainConnectionError(): Window.ConnectionRefusedReason;
	function hasFocus(): boolean;
	function isDisplayPluginHmd(index: number): boolean;
	function isPhysicsEnabled(): boolean;
	function isPointOnDesktopWindow(point: Vec2): boolean;
	function makeConnection(success: boolean, description: string): void;
	function openAndroidActivity(
		activityName: string,
		backToScene: boolean,
	): void;
	function openMessageBox(
		title: string,
		text: string,
		buttons: Window.MessageBoxButton,
		defaultButton: Window.MessageBoxButton,
	): number;
	function openURL(url: string): void;
	function openWebBrowser(): void;
	function prompt(message: string, defaultText?: string): string;
	function promptAsync(message: string, defaultText?: string): string;
	function protocolSignature(): string;
	function raise(): void;
	function save(
		title?: string,
		directory?: string,
		nameFilter?: string,
	): string;
	function saveAsync(
		title?: string,
		directory?: string,
		nameFilter?: string,
	): void;
	function setActiveDisplayPlugin(index: number): void;
	function setDisplayTexture(texture: Window.DisplayTexture): boolean;
	function setFocus(): void;
	function shareSnapshot(path: string, href?: string): void;
	function showAssetServer(uploadFile?: string): void;
	function takeSecondaryCamera360Snapshot(
		cameraPosition: Vec3,
		cubemapOutputFormat?: boolean,
		notify?: boolean,
		filename?: string,
	): void;
	function takeSecondaryCamera360Snapshot(
		notify?: boolean,
		filename?: string,
	): void;
	function takeSnapshot(
		notify?: boolean,
		includeAnimated?: boolean,
		aspectRatio?: number,
		filename?: string,
	): void;
	function updateMessageBox(
		id: number,
		title: string,
		text: string,
		buttons: Window.MessageBoxButton,
		defaultButton: Window.MessageBoxButton,
	): void;

	// signals
	const announcement: Signal;
	const assetsDirChanged: Signal;
	const browseChanged: Signal;
	const browseDirChanged: Signal;
	const connectionAdded: Signal;
	const connectionError: Signal;
	const domainChanged: Signal;
	const domainConnectionRefused: Signal;
	const geometryChanged: Signal;
	const interstitialModeChanged: Signal;
	const messageBoxClosed: Signal;
	const processingGifCompleted: Signal;
	const processingGifStarted: Signal;
	const promptTextChanged: Signal;
	const redirectErrorStateChanged: Signal;
	const saveFileChanged: Signal;
	const snapshot360Taken: Signal;
	const snapshotShared: Signal;
	const stillSnapshotTaken: Signal;
	const svoImportRequested: Signal;

	// types
	enum ConnectionRefusedReason {
		Unknown,
		ProtocolMismatch,
		LoginError,
		NotAuthorized,
		TooManyUsers,
		TimedOut,
	}

	enum DisplayTexture {
		noramlView = "",
		hmdPreview = "resource://hmdPreviewFrame",
		spectatorCamera = "resource://spectatorCameraFrame",
	}

	enum MessageBoxButton {
		NoButton = 0x0,
		Ok = 0x400,
		Save = 0x800,
		SaveAll = 0x1000,
		Open = 0x2000,
		Yes = 0x4000,
		YesToAll = 0x8000,
		No = 0x10000,
		NoToAll = 0x20000,
		Abort = 0x40000,
		Retry = 0x80000,
		Ignore = 0x100000,
		Close = 0x200000,
		Cancel = 0x400000,
		Discard = 0x800000,
		Help = 0x1000000,
		Apply = 0x2000000,
		Reset = 0x4000000,
		RestoreDefaults = 0x8000000,
	}
}
