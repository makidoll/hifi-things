/*

app.use("/video-sync", require("./video=sync/app")({
	io: io,
	rooms: [
		{
			name: "MyRoom",
			password: "password"
		},
	]
}));

/video-sync/myroom
/video-sync/myroom/admin

*/

var socket = require("socket.io");
var express = require("express");
var path = require("path");
var fs = require("fs");

module.exports = function(opts) {
	if (opts.io == undefined) return (req,res,next)=>next();
	if (opts.rooms == undefined) return (req,res,next)=>next();
	Object.assign(this, opts);

	this.router = new express.Router();

	this.router.get("/socket.io.js", (req,res)=>{
		res.sendFile(path.resolve(
			require.resolve("socket.io"),
			"../../../socket.io-client/dist/socket.io.js"
		));
	});

	this.rooms.forEach(room=>{
		room.info = {
			src: "",
			playing: false,
			position: 0,
			volume: 0.5,
		};

		setInterval(()=>{
			if (room.info.playing) room.info.position++;
		}, 1000);

		this.router.get("/"+room.name, (req,res)=>{
			let html = fs.readFileSync(__dirname+"/player.html", "utf8")
				.replace(/\[room_name\]/gi, room.name)
				.replace(/\[namespace\]/gi, "/video-sync/"+room.name.toLowerCase())

			res.send(html);
		});

		this.router.get("/"+room.name+"/admin", (req,res)=>{
			let html = fs.readFileSync(__dirname+"/admin.html", "utf8")
				.replace(/\[room_name\]/gi, room.name)
				.replace(/\[namespace\]/gi, "/video-sync/"+room.name.toLowerCase())

			res.send(html);
		});

		room.io = this.io.of("/video-sync/"+room.name.toLowerCase());
		room.io.on("connection", socket=>{
			socket.on("getInfo", ()=>{
				socket.emit("getInfo", room.info);
			});

			socket.on("verify", password=>{
				if (password != room.password)
					return socket.emit("verify", false);

				socket.emit("verify", true);
			});

			socket.on("setInfo", info=>{
				if (info.password != room.password) return;
				
				if (info.src!=undefined) room.info.src = info.src;
				if (info.playing!=undefined) room.info.playing = info.playing;
				if (info.position!=undefined) room.info.position = info.position;
				if (info.volume!=undefined) room.info.volume = info.volume;

				//console.log(room.info);
				room.io.emit("getInfo", room.info);
			});

		});
	});

	this.router.get("*", (req,res)=>{
		res.send("Nothing here")
	});

	return router;
}