declare namespace AccountServices {
	// properties
	const username: string;
	const loggedIn: boolean;
	const findableBy: string;
	const metaverseServerURL: string;

	interface DownloadInfoResult {
		downloading: number[];
		pending: number;
	}

	// methods
	function checkAndSignalForAccessToken(): boolean;
	function getDownloadInfo(): DownloadInfoResult;
	function isLoggedIn(): boolean;
	function logOut(): void;
	function updateDownloadInfo(): void;

	// signals
	const connected: Signal<() => any>;
	const disconnected: Signal<(reason: string) => any>;
	const downloadInfoChanged: Signal<(
		downloadInfo: DownloadInfoResult,
	) => any>;
	const findableByChanged: Signal<(
		findableBy: "none" | "friends" | "connections" | "all",
	) => any>;
	const loggedInChanged: Signal<(loggedIn: boolean) => any>;
	const myUsernameChanged: Signal<(username: string) => any>;
}
