declare namespace LODManager {
	const presentTime: number;
	const engineRunTime: number;
	const gpuTime: number;

	function getAutomaticLODAdjust(): boolean;
	function getBoundaryLevelAdjust(): number;
	function getDesktopLODTargetFPS(): number;
	function getHMDLODTargetFPS(): number;
	function getLODFeedbackText(): string;
	function getLODTargetFPS(): number;
	function getOctreeSizeScale(): number;
	function setAutomaticLODAdjust(value: boolean): void;
	function setBoundaryLevelAdjust(boundaryLevelAdjust: number): void;
	function setDesktopLODTargetFPS(value: number): void;
	function setHMDLODTargetFPS(value: number): void;
	function setOctreeSizeScale(sizeScale: number): void;

	const LODDecreased: Signal;
	const LODIncreased: Signal;
}
