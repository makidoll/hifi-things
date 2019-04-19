/*

app.use("/video-sync", require("./video-sync/app")({
	io: io,
	mongo: {
		address: "127.0.0.1",
		db: "videoSync",
		user: "",
		pass: "",
	},
	rooms: [
		{
			name: "MyRoom",
			password: "password"
		},
	],
}));

GET  /video-sync/myroom
GET  /video-sync/myroom/admin

GET  /video-sync/myroom/movies

POST /video-sync/myroom/api/add-movie ? password video tmbd (aspectRatio)
POST /video-sync/myroom/api/delete-movie ? password id
GET  /video-sync/myroom/api/list-movies

*/

//const socket = require("socket.io");

const request = require("request-promise");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

let getVideoDurationFromURL = url=>new Promise((resolve,reject)=>{
	let args = "-v error -select_streams v:0 -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "+url;
	const ffprobe = spawn("ffprobe", args.split(" "));
	
	ffprobe.stdout.on("data", data=>{
		try {
			let dur = data.toString();
			dur = parseFloat(dur);
			return resolve(dur);
		} catch(err) {
			return reject();
		};
	});
	
	ffprobe.stderr.on("data", data=>{
		reject();
	});
});

module.exports = function(opts) {

	if (opts.io == undefined) return (req,res,next)=>next();
	if (opts.rooms == undefined) return (req,res,next)=>next();
	if (opts.mongo == undefined) return (req,res,next)=>next();
	Object.assign(this, opts);

	// database
	this.db = mongoose.createConnection("mongodb://"+this.mongo.address, {
		dbName: this.mongo.db,
		user: this.mongo.user,
		pass: this.mongo.pass,
		useNewUrlParser: true,
	});

	// express
	this.router = new express.Router();

	this.router.use((req,res,next)=>{
		for (let query in req.query) {
			req.query[query] = req.query[query].replace(/(https?):\/([^\/])/i, "$1://$2");
		}
		next();
	});

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
			duration: -1,
			volume: 0.05,
			backdrop: "",
		};

		setInterval(()=>{
			if (room.info.playing) room.info.position++;
			if (room.info.position>room.info.duration) {
				room.info.position = 0;
				room.io.emit("getInfo", {position: room.info.position});
			}
		}, 1000);

		// database

		room.model = this.db.model("Movie."+room.name, {
			created: Date,

			video: String,
			tmdb: String,

			name: String,
			year: Number,
			overview: String,
			genres: Array,

			poster: {
				small: String, 
				original: String,
			},
			backdrop: String,
			
			// aspectRatio: {
			// 	width: {type: Number, default: 16},
			// 	height: {type: Number, default: 9},
			// }
		}, "movies."+room.name.toLowerCase());

		const addMovie = (video,tmdbLink)=>new Promise(async (resolve,reject)=>{
			let movie = new room.model();

			movie.created = new Date();
			movie.video = video

			// get aspect ratio
			// if (aspectRatio) {
			// 	try {
			// 		aspectRatio = aspectRatio.split(":");
			// 		movie.aspectRatio.width = parseFloat(aspectRatio[0]);
			// 		movie.aspectRatio.height = parseFloat(aspectRatio[1]);
			// 	} catch(err) {
			// 		return reject("Failed to parse aspect ratio");
			// 	}
			// }

			// get movie details
			let tmdbID;
			try {
				tmdbID = tmdbLink.match(/\/movie\/([0-9]{0,10})[?-]?/i);
				if (tmdbID[1] == undefined) return reject("Invalid TMDB link");
				tmdbID = tmdbID[1];
			} catch(err) {
				return reject("Invalid TMDB link");
			}

			movie.tmdb = "https://themoviedb.org/movie/"+tmdbID;

			try {
				// https://developers.themoviedb.org/3/movies/get-movie-details
				let json = await request({
					method: "GET",
					uri: "https://api.themoviedb.org/3/movie/"+tmdbID,
					formData: {
						api_key: "dda271d7792aeba709c136eac183c8fa"
					}
				});

				json = JSON.parse(json);

				movie.name = json.title;
				movie.year = json.release_date.split("-")[0];
				movie.overview = json.overview;
				movie.genres = json.genres.map(genre=>genre.name);

				movie.poster.small = "https://image.tmdb.org/t/p/w200"+json.poster_path;
				movie.poster.original = "https://image.tmdb.org/t/p/original"+json.poster_path;

				movie.backdrop = "https://image.tmdb.org/t/p/original"+json.backdrop_path;

			} catch(err) {
				return reject("Failed to receive movie info");
			}

			movie.save(err=>{
				if (err) return reject("Failed to save movie document");

				// convert Model to Object
				movie = JSON.parse(JSON.stringify(movie))
				delete movie.__v;
				return resolve(movie);
			});
		});

		const listMovies = ()=>new Promise((resolve,reject)=>{
			room.model.find()
				.sort({created: "desc"})
				.exec((err, docs)=>{
					if (err) return reject("Could not list movies");
					return resolve(docs.map(doc=>{
						doc = JSON.parse(JSON.stringify(doc));
						delete doc.__v;
						return doc;
				}));
			});
		});

		const deleteMovie = _id=>new Promise((resolve,reject)=>{
			room.model.deleteOne({_id:_id}, err=>{
				if (err) return reject("Movie not found");
				return resolve("Movie deleted");
			});
		});

		// router

		this.router.get("/"+room.name, (req,res)=>{
			let html = fs.readFileSync(__dirname+"/player.html", "utf8")
				.replace(/\[room_name\]/gi, room.name)
				.replace(/\[namespace\]/gi, "/video-sync/"+room.name.toLowerCase())

			res.send(html);
		});

		this.router.get("/"+room.name+"/admin", async (req,res)=>{
			let moviesSimplified = [];
			try {
				let movies = await listMovies();
				movies.forEach(movie=>{
					moviesSimplified.push({
						poster: movie.poster.small,
						backdrop: movie.backdrop,
						video: movie.video,
					});
				});
			} catch(err) { console.log(err) };

			let html = fs.readFileSync(__dirname+"/admin.html", "utf8")
				.replace(/\[room_name\]/gi, room.name)
				.replace(/\[namespace\]/gi, "/video-sync/"+room.name.toLowerCase())
				.replace(/\[movies\]/gi, JSON.stringify(moviesSimplified))

			res.send(html);
		});

		// router hifi

		this.router.get("/"+room.name+"/hifi-volume", (req,res)=>{
			let html = fs.readFileSync(__dirname+"/hifi-volume.html", "utf8")
				.replace(/\[room_name\]/gi, room.name)
				.replace(/\[namespace\]/gi, "/video-sync/"+room.name.toLowerCase())

			res.send(html);
		});

		this.router.get("/"+room.name+"/hifi-volume.js", (req,res)=>{
			res.send(fs.readFileSync(__dirname+"/hifi-volume.js", "utf8"));
		});

		// router database

		this.router.post("/"+room.name+"/api/add-movie", (req,res)=>{
			if (req.query.password!=room.password) return res.json({success: false, error: "Password is incorrect"});
			if (!req.query.video) return res.json({success: false, error: "Video parameter not specified"});
			if (!req.query.tmdb) return res.json({success: false, error: "TMDB parameter not specified"});

			//addMovie(req.query.video, req.query.tmdb, req.query.aspectRatio).then(movie=>{
			addMovie(req.query.video, req.query.tmdb).then(movie=>{
				res.json({success: true, movie: movie});
			}).catch(err=>{
				res.json({success: false, error: err});
			});
		});

		this.router.post("/"+room.name+"/api/delete-movie", (req,res)=>{
			if (req.query.password!=room.password) return res.json({success: false, error: "Password is incorrect"});
			if (!req.query.id) return res.json({success: false, error: "ID parameter not specified"});

			deleteMovie(req.query.id).then(msg=>{
				res.json({success: true});
			}).catch(err=>{
				res.json({success: false, error: "Movie not found"});
			})
		});

		this.router.get("/"+room.name+"/api/list-movies", (req,res)=>{
			listMovies().then(movies=>{
				res.json({success: true, movies: movies});
			}).catch(err=>{
				res.json({success: false, error, err});
			});
		});

		// router database public

		this.router.get("/"+room.name+"/movies", async (req,res)=>{
			let posters = [];
			try {
				let movies = await listMovies();
				movies.forEach(movie=>posters.push(movie.poster.small));
			} catch(err) { console.log(err) };

			let html = fs.readFileSync(__dirname+"/movies.html", "utf8")
				.replace(/\[room_name\]/gi, room.name)
				.replace(/\[namespace\]/gi, "/video-sync/"+room.name.toLowerCase())
				.replace(/\[posters\]/gi, JSON.stringify(posters))

			res.send(html);
		});

		// socket

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
				
				if (info.src!=undefined) {
					room.info.src = info.src;
					getVideoDurationFromURL(info.src).then(duration=>{
						room.info.duration = duration;
					}).catch(err=>{
						room.info.duration = -1;
					});
				}
				if (info.playing!=undefined) room.info.playing = info.playing;
				if (info.position!=undefined) room.info.position = info.position;
				if (info.volume!=undefined) room.info.volume = info.volume;
				if (info.backdrop!=undefined) room.info.backdrop = info.backdrop;

				delete info.password;

				//console.log(room.info);
				room.io.emit("getInfo", info);
			});

			// api

			socket.on("api-addMovie", info=>{
				if (info.password!=room.password) return socket.emit("api-addMovie", {success: false, error: "Password is incorrect"});
				if (!info.video) return socket.emit("api-addMovie", {success: false, error: "Video parameter not specified"});
				if (!info.tmdb) return socket.emit("api-addMovie", {success: false, error: "TMDB parameter not specified"});
	
				addMovie(info.video, info.tmdb).then(movie=>{
					socket.emit("api-addMovie", {success: true, movie: movie});
				}).catch(err=>{
					socket.emit("api-addMovie", {success: false, error: err});
				});
			})
		});
	});

	this.router.get("*", (req,res)=>{
		res.send("Nothing here")
	});

	return router;
}
