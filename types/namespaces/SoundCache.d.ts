declare namespace SoundCache {
	var numTotal: number;
	var numCached: number;
	var sizeTotal: number;
	var sizeCached: number;

	function getResourceList(): string[];
	function getSound(url: string): SoundObject;
	function prefetch(url: string): ResourceObject;
}