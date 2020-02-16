declare namespace AnimationCache {
	const numTotal: number;
	const numCached: number;
	const sizeTotal: number;
	const sizeCached: number;
	const numGlobalQueriesPending: number;
	const numGlobalQueriesLoading: number;

	function getAnimation(url: string): AnimationObject;
	function getResourceList(): string[];
	function prefetch(url: string): ResourceObject;

	const dirty: Signal<() => any>;
}
