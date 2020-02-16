declare enum XMLHttpRequestReadyState {
	UNSENT,
	OPENED,
	HEADERS_RECEIVED,
	LOADING,
	DONE,
}

declare enum XMLHttpRequestNetworkError {
	"NoError" = 0,
	"ConnectionRefusedError" = 1,
	"RemoteHostClosedError" = 2,
	"HostNotFoundError" = 3,
	"TimeoutError" = 4,
	"OperationCanceledError" = 5,
	"SslHandshakeFailedError" = 6,
	"TemporaryNetworkFailureError" = 7,
	"NetworkSessionFailedError" = 8,
	"BackgroundRequestNotAllowedError" = 9,
	"TooManyRedirectsError" = 10,
	"InsecureRedirectError" = 11,
	"ProxyConnectionRefusedError" = 101,
	"ProxyConnectionClosedError" = 102,
	"ProxyNotFoundError" = 103,
	"ProxyTimeoutError" = 104,
	"ProxyAuthenticationRequiredError" = 105,
	"ContentAccessDenied" = 201,
	"ContentOperationNotPermittedError" = 202,
	"ContentNotFoundError" = 203,
	"AuthenticationRequiredError" = 204,
	"ContentReSendError" = 205,
	"ContentConflictError" = 206,
	"ContentGoneError" = 207,
	"InternalServerError" = 401,
	"OperationNotImplementedError" = 402,
	"ServiceUnavailableError" = 403,
	"ProtocolUnknownError" = 301,
	"ProtocolInvalidOperationError" = 302,
	"UnknownNetworkError" = 99,
	"UnknownProxyError" = 199,
	"UnknownContentError" = 299,
	"ProtocolFailure" = 399,
	"UnknownServerError" = 499,
}

declare class XMLHttpRequest {
	readonly response: any;
	readonly responseText: string;
	readonly responseType: string;
	readonly status: number;
	readonly statusText: number;
	readonly readyState: XMLHttpRequestReadyState;
	readonly errorCode: XMLHttpRequestNetworkError;
	timeout: number;
	readonly UNSENT: XMLHttpRequestReadyState;
	readonly OPENED: XMLHttpRequestReadyState;
	readonly HEADERS_RECEIVED: XMLHttpRequestReadyState;
	readonly LOADING: XMLHttpRequestReadyState;
	readonly DONE: XMLHttpRequestReadyState;
	ontimeout: Function;
	onreadystatechange: Function;

	abort(): void;
	getAllResponseHeaders(): string;
	getResponseHeader(name: string): string;
	open(
		method:
			| "GET"
			| "HEAD"
			| "POST"
			| "PUT"
			| "DELETE"
			| "CONNECT"
			| "OPTIONS"
			| "TRACE"
			| "PATCH",
		url: string,
		async?: boolean,
		username?: string,
		password?: string,
	): void;
	send(data?: any): void;
	setRequestHeader(name: string, value: string): void;

	readonly requestComplete: Signal<() => any>;
}
