declare class AudioStreamStats {
	readonly dropCount: number;
	readonly framesAvailable: number;
	readonly framesAvailableAvg: number;
	readonly framesDesired: number;
	readonly lastStarveDurationCount: number;
	readonly lossCount: number;
	readonly lossCountWindow: number;
	readonly lossRate: number;
	readonly lossRateWindow: number;
	readonly overflowCount: number;
	readonly starveCount: number;
	readonly timegapMsAvg: number;
	readonly timegapMsAvgWindow: number;
	readonly timegapMsMax: number;
	readonly timegapMsMaxWindow: number;
	readonly unplayedMsMax: number;

	// signals

	readonly dropCountChanged: Signal<(dropCount: number) => any>;
	readonly framesAvailableAvgChanged: Signal<
		(framesAvailableAvg: number) => any
	>;
	readonly framesAvailableChanged: Signal<(framesAvailable: number) => any>;
	readonly framesDesiredChanged: Signal<(framesDesired: number) => any>;
	readonly lastStarveDurationCountChanged: Signal<
		(lastStarveDurationCount: number) => any
	>;
	readonly lossCountChanged: Signal<(lossCount: number) => any>;
	readonly lossCountWindowChanged: Signal<(lossCountWindow: number) => any>;
	readonly lossRateChanged: Signal<(lossRate: number) => any>;
	readonly lossRateWindowChanged: Signal<(lossRateWindow: number) => any>;
	readonly overflowCountChanged: Signal<(overflowCount: number) => any>;
	readonly starveCountChanged: Signal<(starveCount: number) => any>;
	readonly timegapMsAvgChanged: Signal<(timegapMsAvg: number) => any>;
	readonly timegapMsAvgWindowChanged: Signal<
		(timegapMsAvgWindow: number) => any
	>;
	readonly timegapMsMaxChanged: Signal<(timegapMsMax: number) => any>;
	readonly timegapMsMaxWindowChanged: Signal<
		(timegapMsMaxWindow: number) => any
	>;
	readonly unplayedMsMaxChanged: Signal<(unplayedMsMax: number) => any>;
}
