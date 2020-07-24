const http = require("http");
const path = require("path");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = require("socket.io").listen(server);

const name = process.env.ROOMS || "Room1:password1,Room2:password2";

const rooms = name.split(",").reduce((rooms, credsStr) => {
	const creds = credsStr.split(":");
	if (creds.length < 2) return rooms;
	rooms.push({ name: creds[0], password: creds[1] });
	return rooms;
}, []);

app.use("/files", express.static(path.join(__dirname, "files")));

app.use(
	"/",
	require("./video-sync/video-sync")({
		io,
		mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1/videoSync",
		rooms,
	}),
);

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log("Server listening on *:" + port);
	for (const room of rooms) {
		console.log(
			'Room available at "/' +
				room.name.toLowerCase() +
				'" with password "' +
				room.password +
				'"',
		);
	}
});
