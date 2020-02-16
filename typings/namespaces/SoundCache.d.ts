declare namespace SoundCache {
	const numTotal: number;
	const numCached: number;
	const sizeTotal: number;
	const sizeCached: number;

	function getResourceList(): string[];
	function getSound(url: string): SoundObject;
	function prefetch(url: string): ResourceObject;
}
