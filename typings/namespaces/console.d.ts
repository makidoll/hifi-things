declare namespace console {
	function assert(assertion: boolean, ...message: any): void;
	function clean(): void;
	function debug(...message: any): void;
	function error(...message: any): void;
	function exception(...message: any): void;
	function group(message: any): void;
	function groupCollapsed(message: any): void;
	function groupEnd(): void;
	function info(message: any): void;
	function log(...message: any): void;
	function time(name: string): void;
	function timeEnd(name: string): void;
	function trace(): void;
	function warn(...message: any): void;
}
