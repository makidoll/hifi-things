declare namespace Tablet {
	type AudioEvents = 0 | 1 | 2 | 3 | 4;

	function getTablet(
		name: "com.highfidelity.interface.tablet.system" | string,
	): TabletProxy;

	function playSound(sound: AudioEvents): void;

	const tabletNotification: Signal<() => any>;
}
