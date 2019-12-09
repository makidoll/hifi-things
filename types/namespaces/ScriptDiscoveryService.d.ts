declare namespace ScriptDiscoveryService {
	function getRunning(): Script[]; 
	interface Script { // undocumented
		local: boolean;
		name: string;
		path: string;
		url: string;
	}

	function loadScript(
		filename: string,
		isUserLoaded?: boolean,
		loadScriptFromEditor?: boolean,
		activateMainWindow?: boolean,
		reload?: boolean,
		quitWhenFinished?: boolean,
	): boolean; 
}