declare class WebSocketServer {
	readonly url: string;
	readonly port: number;
	readonly listening: boolean;

	constructor();

	close(): void;

	readonly newConnection: Signal<(webSocket: WebSocket) => any>;
}
