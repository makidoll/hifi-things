const clientId = "555501224045314068";
const placeIcons = [
	"astral",
	"caitlyn",
	"cutelab",
	"duckpond",
	"maker",
	"mexico",
	"mirrors",
	"solace",
	"tanks",
	"thespot",
	"tin-land"
];

// program starts here

const DiscordRPC = require("discord-rpc");
const WebSocket = require("ws");
const Mitt = require("mitt");

//DiscordRPC.register(clientId);
const events = new Mitt();
const client = new DiscordRPC.Client({
	transport: "ipc",
	scopes: ["rpc", "rpc.api", "messages.read"],
});
const wss = new WebSocket.Server({
	port: 9876,
});

wss.on("connection", ws=>{
	console.log("New connection!")
	ws.on("message", data=>{
		let json = undefined;
		try { json = JSON.parse(data); }
		catch(err) { return; }
		if (json==undefined) return;

		events.emit("update", json);
	});
});

client.on("ready", ()=>{
	function updatePresence(data) { // place, people
		let lPlace = data.place.toLowerCase();
		let people = data.people+" "+((data.people==1)?"person":"people");

		console.log("At hifi://"+data.place+" ("+people+")");

		client.setActivity({
			details: "hifi://"+data.place,
			state: people,

			smallImageKey: "logo",
			largeImageKey:
				(placeIcons.includes(lPlace))?
					lPlace:"paradise-island",

			//partyId: "thespot",
			//spectateSecret: "thespot-secret",
			//instance: true,
	  	});
	}

	events.on("update", data=>{
		updatePresence(data);
	})

  	//client.connect();
});

client.login({clientId}).catch(console.error);