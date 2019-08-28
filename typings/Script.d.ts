declare namespace Script {
	var context: string;

	function print(message: string): void;
	function require(module: string): void;
	function resolvePath(path: string): string;

	function setInterval(callback: ()=>void, interval: number): Timer;
	function setTimeout(callback: ()=>void, interval: number): Timer;
	function clearInterval(timer: Timer): void;
	function clearTimeout(timer: Timer): void;
}