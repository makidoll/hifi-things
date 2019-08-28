declare namespace Window {
	var innerWidth: number;
	var innerHeight: number;
	var x: number;
	var y: number;
	var interstitialModeEnabled: boolean;
	var location: string;

	function alert(message?: string): void;
	function browse(title?: string, directory?: string, nameFilter?: string): string;
	function browseAssets(title?: string, directory?: string, nameFilter?: string): string;
	function browseAssetsAsync(title?: string, directory?: string, nameFilter?: string): void;
	function browseAsync(title?: string, directory?: string, nameFilter?: string): void;
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
	function openAndroidActivity(activityName: string, backToScene: boolean): void;
	function openMessageBox(title: string, text: string,
			buttons: Window.MessageBoxButton, defaultButton: Window.MessageBoxButton): number;
	function openURL(url: string): void;
	function openWebBrowser(): void;
	function prompt(message: string, defaultText?: string): string;
	function promptAsync(message: string, defaultText?: string): string;
	function protocolSignature(): string;
	function raise(): void;
	function save(title?: string, directory?: string, nameFilter?: string): string;
	function saveAsync(title?: string, directory?: string, nameFilter?: string): void;
	function setActiveDisplayPlugin(index: number): void;
	function setDisplayTexture(texture: Window.DisplayTexture): boolean;
	function setFocus(): void;
	function shareSnapshot(path: string, href?: string): void;
	function showAssetServer(uploadFile?: string): void;
	function takeSecondaryCamera360Snapshot(cameraPosition: Vec3, cubemapOutputFormat?: boolean,
		notify?: boolean, filename?: string): void;
	function takeSecondaryCamera360Snapshot(notify?: boolean, filename?: string): void;
	function takeSnapshot(notify?: boolean, includeAnimated?: boolean,
		aspectRatio?: number, filename?: string): void;
	function updateMessageBox(id: number, title: string, text: string,
		buttons: Window.MessageBoxButton, defaultButton: Window.MessageBoxButton): void;

	var announcement: Signal;
	var assetsDirChanged: Signal;
	var browseChanged: Signal;
	var browseDirChanged: Signal;
	var connectionAdded: Signal;
	var connectionError: Signal;
	var domainChanged: Signal;
	var domainConnectionRefused: Signal;
	var geometryChanged: Signal;
	var interstitialModeChanged: Signal;
	var messageBoxClosed: Signal;
	var processingGifCompleted: Signal;
	var processingGifStarted: Signal;
	var promptTextChanged: Signal;
	var redirectErrorStateChanged: Signal;
	var saveFileChanged: Signal;
	var snapshot360Taken: Signal;
	var snapshotShared: Signal;
	var stillSnapshotTaken: Signal;
	var svoImportRequested: Signal;

	enum ConnectionRefusedReason {
		Unknown,
		ProtocolMismatch,
		LoginError,
		NotAuthorized,
		TooManyUsers,
		TimedOut
	}

	enum DisplayTexture {
		noramlView = "",
		hmdPreview = "resource://hmdPreviewFrame",
		spectatorCamera = "resource://spectatorCameraFrame"
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

