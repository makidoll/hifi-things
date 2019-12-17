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
	const connected: Signal;
	const disconnected: Signal;
	const downloadInfoChanged: Signal;
	const findableByChanged: Signal;
	const loggedInChanged: Signal;
	const myUsernameChanged: Signal;
}
