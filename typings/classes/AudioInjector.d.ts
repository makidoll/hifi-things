declare interface AudioInjectorOptions {
	position: Vec3;
	orientation: Quat;
	volume: number;
	pitch: number;
	loop: boolean;
	secondOffset: number;
	localOnly: boolean;
}

declare class AudioInjector {
	playing: boolean;
	loudness: number;
	options: AudioInjectorOptions;

	getLoudness(): number;
	getOptions(): AudioInjectorOptions;
	isPlaying(): boolean;
	restart(): void;
	setOptions(options: Partial<AudioInjectorOptions>): void;
	stop(): void;

	readonly finished: Signal<() => any>;
}
