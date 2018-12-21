class EventHandler {
	private connections: {
		event: any,
		callback: Function,
	}[];

	constructor() {
		this.connections = [];
	}

	connect(event: any, callback: Function) {
		event.connect(callback);
		this.connections.push({
			event: event,
			callback: callback
		});
	}

	disconnectAll() {
		this.connections.forEach(con=>{
			con.event.disconnect(con.callback);
		});
	}
}