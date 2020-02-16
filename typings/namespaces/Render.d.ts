declare namespace Render {
	type RenderMethod = 0 | 1;

	const renderMethod: RenderMethod;
	const shadowsEnabled: boolean;
	const ambientOcclusionEnabled: boolean;
	const antialiasingEnabled: boolean;
	const viewportResolutionScale: number;

	function getAmbientOcclusionEnabled(): boolean;
	function getAntialiasingEnabled(): boolean;
	function getConfig(name: string): any;
	function getRenderMethod(): RenderMethod;
	function getRenderMethodNames(): string[];
	function getShadowsEnabled(): boolean;
	function getViewportResolutionScale(): number;
	function setAmbientOcclusionEnabled(enabled: boolean): void;
	function setAntialiasingEnabled(enabled: boolean): void;
	function setRenderMethod(renderMethod: RenderMethod): void;
	function setShadowsEnabled(enabled: boolean): void;
	function setViewportResolutionScale(resolutionScale: number): void;
	function toJSON(): string;

	const settingsChanged: Signal<() => any>;
}
