() => {
	class ForceGoodGraphics implements ClientEntityScript {
		setHighRefreshRate() {
			Performance.setRefreshRateProfile(
				// ECO,INTERACTIVE,REALTIME
				Performance.getRefreshRateProfileNames().indexOf("REALTIME"),
			);
		}

		setHighPerformance() {
			Performance.setPerformancePreset(
				// UNKNOWN,LOW,MID,HIGH
				Performance.getPerformancePresetNames().indexOf("HIGH"),
			);
		}

		setProperLOD() {
			//LODManager.setAutomaticLODAdjust(false);
			//LODManager.setOctreeSizeScale(65536000);
			//LODManager.setAutomaticLODAdjust(true);
		}

		preload() {
			this.setHighRefreshRate();
			this.setHighPerformance();
		}
	}

	return new ForceGoodGraphics();
};
