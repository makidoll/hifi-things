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

	const doneRunning: Signal<() => any>;
	const entityScriptPreloadFinished: Signal<(entityID: Uuid) => any>;
	const errorMessage: Signal<(message: string, scriptName: string) => any>;
	const infoMessage: Signal<(message: string, scriptName: string) => any>;
	const printedMessage: Signal<(message: string, scriptName: string) => any>;
	const runningStateChanged: Signal<() => any>;
	const scriptEnding: Signal<() => any>;
	const unhandledException: Signal<(exception: object) => any>;
	const update: Signal<(deltaTime: number) => any>;
	const warningMessage: Signal<(message: string, scriptName: string) => any>;
}
