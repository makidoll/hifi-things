declare namespace PlatformInfo {
	type PlatformTier = 0 | 1 | 2 | 3;

	function getComputer(): string;
	function getCPU(index: number): string;
	function getDisplay(index: number): string;
	function getGPU(index: number): string;
	function getMasterCPU(): number;
	function getMasterDisplay(): number;
	function getMasterGPU(): number;
	function getMemory(): string;
	function getNumCPUs(): number;
	function getNumDisplays(): number;
	function getNumGPUs(): number;
	function getPlatform(): string;
	function getPlatformTierNames(): string[];
	function getTierProfiled(): PlatformTier;
	function has3DHTML(): boolean;
	function hasRiftControllers(): boolean;
	function hasViveControllers(): boolean;
	function isRenderMethodDeferredCapable(): boolean;
	function isStandalone(): boolean;
}
