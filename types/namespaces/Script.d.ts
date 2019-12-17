declare namespace Script {
	const context: string;

	function print(message: string): void;
	function include(filename: string, callback?: () => void): void;
	function include(filenames: string[], callback?: () => void): void;
	function require<T>(module: string): T;
	function resolvePath(path: string): string;
	function setInterval(callback: () => void, interval: number): Timer;
	function setTimeout(callback: () => void, interval: number): Timer;
	function clearInterval(timer: Timer): void;
	function clearTimeout(timer: Timer): void;

	const scriptEnding: Signal;
	const update: Signal;
}
