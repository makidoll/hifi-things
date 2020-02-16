declare class ResourceObject {
	readonly url: string;
	readonly state: typeof Resource.State;

	release(): void;

	readonly progressChanged: Signal<
		(bytesReceived: number, bytesTotal: number) => any
	>;
	readonly stateChanged: Signal<(state: typeof Resource.State) => any>;
}
