declare class AudioEffectOptions {
	bandwidth?: number;
	preDelay?: number;
	lateDelay?: number;
	reverbTime?: number;
	earlyDiffusion?: number;
	lateDiffusion?: number;
	roomSize?: number;
	density?: number;
	bassMult?: number;
	bassFreq?: number;
	highGain?: number;
	modRate?: number;
	modDepth?: number;
	earlyGain?: number;
	lateGain?: number;
	earlyMixLeft?: number;
	earlyMixRight?: number;
	lateMixLeft?: number;
	lateMixRight?: number;
	wetDryMix?: number;

	constructor(reverbOptions?: AudioEffectOptions);
}
