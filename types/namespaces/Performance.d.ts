declare namespace Performance {
	// properties
	var objectName: string;
	var performancePreset: number;
	var refreshRateProfile: number;

	// methods
	//function destroyed(): void;
	//function objectNameChanged(): void;
	//function settingsChanged(): void;

	function getPerformancePresetNames(): string[];
	function setPerformancePreset(PerformancePreset: number): void;
	function getPerformancePreset(): void;

	function getRefreshRateProfileNames(): string[];
	function setRefreshRateProfile(RefreshRateProfile: number): void;
	function getRefreshRateProfile(): number;

	function getActiveRefreshRate(): number;
	//function getUXMode(): void;
	//function getRefreshRateRegime(): void;

	// signals
}
