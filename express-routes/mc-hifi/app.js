// https://wiki.vg/Mojang_API
const request = require("request-promise-native");
const express = require("express");
const Jimp = require("jimp");
const fs = require("fs");

var app = express();

/*
const getUUID = username=>new Promise((resolve, reject)=>{
	request("https://api.mojang.com/users/profiles/minecraft/"+username).then(json=>{
		try {
			json = JSON.parse(json);
			if (json.id==undefined) return reject("Could not parse JSON");
			return resolve(json.id);
		} catch {
			return reject("Could not parse JSON");
		}
	}).catch(err=>{
		return reject("Username not found");
	});
});

const getSkin = uuid=>new Promise((resolve, reject)=>{
	request("https://sessionserver.mojang.com/session/minecraft/profile/"+uuid).then(json=>{
		try {
			json = JSON.parse(json);
			if (json.properties==undefined) return reject("Skin not found");
			if (json.properties[0]==undefined) return reject("Skin not found");
			if (json.properties[0].value==undefined) return reject("Skin not found");
			return resolve("data:image/png;base64,"+json.properties[0].value);
		} catch {
			return reject("Could not parse JSON");
		}
	}).catch(err=>{
		return reject("UUID not found");
	});
});
*/

const getSkin = username=>new Promise((resolve, reject)=>{
	request({
		url:"https://minecraftskinstealer.com/api/v1/skin/download/skin/"+username,
		encoding:null
	}).then(skin=>{
		return resolve(skin);
	}).catch(err=>{
		return reject("Username not found");
	});
});

var skinCache = {};

app.get("/skin.png", async (req,res)=>{
	if (!req.query.username && !req.query.url) return res.end();

	let cacheKey = req.query.username||req.query.url;
	if (skinCache[cacheKey]!=undefined) {
		res.end(skinCache[cacheKey]);
		return;
	}

	let skin;

	try {	
		if (req.query.username != undefined) {
			skin = await getSkin(req.query.username);
		} else if (req.query.url != undefined) {
			skin = await request({url:req.query.url,encoding:null});
		}
	} catch(err) {
		return res.end();
	}

	Jimp.read(skin).then(image=>{
		if (image.bitmap.height==32)
			image.contain(64, 64, Jimp.VERTICAL_ALIGN_TOP);

		image.resize(4096, 4096, Jimp.RESIZE_NEAREST_NEIGHBOR);
		image.getBufferAsync(Jimp.MIME_PNG).then(buffer=>{
			skinCache[cacheKey] = buffer;
			res.end(buffer);
		}).catch(err=>{
			return res.end();
		});
	}).catch(err=>{
		return res.end();
	});
});

app.get("/avatar.fbx", (req,res)=>{
	res.end(fs.readFileSync(__dirname+"/avatar.fbx"));
});

app.get("/avatar.fst", (req,res)=>{
	if (!req.query.username && !req.query.url) return res.end();

	let url = "https://maki.cat/mc-hifi/skin.png";
	if (req.query.username) url += "?username="+req.query.username;
	if (req.query.url) url += "?url="+req.query.url;

	let fst = fs.readFileSync(__dirname+"/avatar.fst", "utf8");
	let materialMap = {
		all: {
			materials: {
				unlit: true,
				albedoMap: url,
				opacityMap: url,
			}
		}
	}
	fst += "\nmaterialMap = "+JSON.stringify(materialMap);

	res.end(fst);
});

var port = 8086;
app.listen(port, ()=>{
	console.log("Server up on *:"+port);
});
