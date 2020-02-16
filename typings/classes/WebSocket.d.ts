declare enum WebSocketCloseCode {
	"Normal" = 1000,
	"GoingAway" = 1001,
	"ProtocolError" = 1002,
	"DatatypeNotSupported" = 1003,
	"Reserved1004" = 1004,
	"MissingStatusCode" = 1005,
	"AbnormalDisconnection" = 1006,
	"WrongDatatype" = 1007,
	"PolicyViolated" = 1008,
	"TooMuchData" = 1009,
	"MissingExtension" = 1010,
	"BadOperation" = 1011,
	"TlsHandshakeFailed" = 1015,
}

declare interface WebSocketCloseData {
	code: WebSocketCloseCode;
	reason: string;
	wasClean: boolean;
}

declare interface WebSocketMessageData {
	data: string;
}

declare enum WebSocketReadyState {
	CONNECTING,
	OPEN,
	CLOSING,
	CLOSED,
}

declare enum WebSocketSocketError {
	"ConnectionRefusedError" = 0,
	"RemoteHostClosedError" = 1,
	"HostNotFoundError" = 2,
	"SocketAccessError" = 3,
	"SocketResourceError" = 4,
	"SocketTimeoutError" = 5,
	"DatagramTooLargeError" = 6,
	"NetworkError" = 7,
	"AddressInUseError" = 8,
	"SocketAddressNotAvailableError" = 9,
	"UnsupportedSocketOperationError" = 10,
	"ProxyAuthenticationRequiredError" = 11,
	"SslHandshakeFailedError" = 12,
	"UnfinishedSocketOperationError" = 13,
	"ProxyConnectionRefusedError" = 14,
	"ProxyConnectionClosedError" = 15,
	"ProxyConnectionTimeoutError" = 16,
	"ProxyNotFoundError" = 17,
	"ProxyProtocolError" = 18,
	"OperationError" = 19,
	"SslInternalError" = 20,
	"SslInvalidUserDataError" = 21,
	"TemporaryError" = 22,
	"UnknownSocketError" = -1,
}

declare type WebSocketOnCloseCallback = (data: WebSocketCloseData) => any;

declare type WebSocketOnErrorCallback = (error: WebSocketSocketError) => any;

declare type WebSocketOnMessageCallback = (
	message: WebSocketMessageData,
) => any;

declare type WebSocketOnOpenCallback = () => any;

declare class WebSocket {
	binaryType: string;
	readonly bufferedAmount: number;
	readonly extensions: string;
	onopen: WebSocketOnOpenCallback;
	onmessage: WebSocketOnMessageCallback;
	onerror: WebSocketOnErrorCallback;
	onclose: WebSocketOnCloseCallback;
	readonly protocol: string;
	readonly readyState: WebSocketReadyState;
	readonly url: string;
	readonly CONNECTING: WebSocketReadyState;
	readonly OPEN: WebSocketReadyState;
	readonly CLOSING: WebSocketReadyState;
	readonly CLOSED: WebSocketReadyState;

	constructor(urlOrWebSocket: string | WebSocket);

	close(closeCode?: WebSocketCloseCode, reason?: string): void;
	send(message: string | object): void;
}
