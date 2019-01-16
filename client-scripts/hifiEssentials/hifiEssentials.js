var runningScripts = ScriptDiscoveryService.getRunning();

for (var i=0; i<runningScripts.length; i++) {
	if (runningScripts[i].name == "hifiEssentials.js") {
		ScriptDiscoveryService.stopScript(runningScripts[i].url);
	}
}

ScriptDiscoveryService.loadScript("https://scripts.cutelab.space/hifiEssentials/hifiEssentials.js");