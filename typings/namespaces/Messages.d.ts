declare namespace Messages {
	// methods
	function sendData(channel: string, data: object, localOnly?: boolean): void;
	function sendLocalMessage(channel: string, message: string): void;
	function sendMessage(
		channel: string,
		message: string,
		localOnly?: boolean,
	): void;
	function subscribe(channel: string): void;
	function unsubscribe(channel: string): void;

	// signals
	const dataReceived: Signal<(
		channel: string,
		data: object,
		senderID: Uuid,
		localOnly: boolean,
	) => any>;
	const messageReceived: Signal<(
		change: string,
		message: string,
		senderID: Uuid,
		localOnly: boolean,
	) => any>;
}
