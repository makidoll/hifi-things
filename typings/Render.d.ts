declare namespace Render {
	function getAmbientOcclusionEnabled(): boolean;
	function getAntialiasingEnabled(): boolean;
	function getConfig(name: string): object;
	function getNumSubs(): number;
	function getRenderMethod(): number;
	function getRenderMethodNames(): string[];
	function getShadowsEnabled(): boolean;
	function getSubConfig(index: number): object;
	function getSubConfigs(): object[];
	function getViewportResolutionScale(): number;
	function isTask(): boolean;
	function load(map: object): void;
	function refresh(): void;
	function setAmbientOcclusionEnabled(enabled: boolean): void;
	function setAntialiasingEnabled(enabled: boolean): void;
	function setRenderMethod(renderMethod: number): void;
	function setShadowsEnabled(enabled: boolean): void;
	function setViewportResolutionScale(resolutionScale: number): void;
	function toJSON(): string;

	function dirtyEnabled(): Signal;
	function loaded(): Signal;
	function newStats(): Signal;
}
