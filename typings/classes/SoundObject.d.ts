declare class SoundObject {
	readonly downloaded: boolean;
	readonly duration: number;

	readonly ready: Signal<() => any>;
}
