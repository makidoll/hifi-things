class ConnectionHandler {
	private connections: [{
		con: any,
		fun: Function,
	}];

	connect(con: any, fun: Function) {
		con.connect(fun);
		this.connections.push({
			con: con, fun: fun
		});
	}

	disconnectAll() {
		this.connections.forEach(connection=>{
			connection.con.disconnect(connection.fun);
		});
	}
}