const clientId = "555501224045314068";

const DiscordRPC = require("discord-rpc");

DiscordRPC.register(clientId);
const client = new DiscordRPC.Client({
	transport: "ipc",
	scopes: ["rpc", "rpc.api", "messages.read"],
});

client.on("ready", ()=>{
	// client.setActivity({
	// 	details: "test number 1",
	// 	state: 'test number 2',
	// 	startTimestamp: 0,
	// 	largeImageKey: 'icon',
	// 	largeImageText: 'icon!',
	// 	smallImageKey: 'icon',
	// 	smallImageText: 'small icon!',
	// 	instance: true,
	// 	party: {
	// 		id: "thespot",
	// 		size: [1, 100]
	// 	},
	// 	secrets: {
	//         join: "thespot",
	//     },
	// });
	client.setActivity({
		details: "hifi://thespot",
		state: "2 people",

		partyId: "thespot",

		spectateSecret: "thespot-secret",

		largeImageKey: "icon",
		smallImageKey: "icon",

		instance: true,
  	});

  	client.connect();
});

client.login({clientId}).catch(console.error);