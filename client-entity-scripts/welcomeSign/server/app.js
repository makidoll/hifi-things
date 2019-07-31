var puppeteer = require("puppeteer-core");
var express = require("express");
var request = require("request-promise-native");
var mitt = require("mitt");
var fs = require("fs");

var app = express();
var events = mitt();

var browserRunning = false;

var scale = 2;
var viewport = [
	400*scale,
	200*scale
];

(async ()=>{
	const browser = await puppeteer.launch({
		executablePath: "google-chrome-unstable",
		//executablePath: "C:/Program Files (x86)/Google/Chrome Dev/Application/chrome.exe",
		args: ["--no-sandbox"],
		defaultViewport: {
			width: viewport[0],
			height: viewport[1],
			deviceScaleFactor: 1,
		},
	});
	browserRunning = true;
	console.log("Browser running");

	events.on("placeSign.generate", async info=>{
		let html = fs.readFileSync(__dirname+"/sign.html", "utf8");

		html = html.replace(/\[username\]/gi, info.username);
		html = html.replace(/\[avatarURL\]/gi, info.avatarURL);

		html = html.replace(/\[placeName\]/gi, info.placeName);
		html = html.replace(/\[placeDesc\]/gi, info.placeDesc);
		html = html.replace(/\[placeThumb\]/gi, info.placeThumb);

		html = html.replace(/\[hostUsername\]/gi, info.hostUsername);
		html = html.replace(/\[hostAvatarURL\]/gi, info.hostAvatarURL);

		const page = await browser.newPage();

		page.on("load", async ()=>{
			const buffer = await page.screenshot({
				type: "png",
				omitBackground: true,
				clip: {
					x: 0, y: 0,
					width: viewport[0],
					height: viewport[1],
				}
			});

			events.emit("placeSign.receive", {
				id: info.id,
				buffer: buffer,
			});

			setTimeout(()=>{
				page.close().catch(err=>{});
			}, 1000*10);
		});

		page.setContent(html, {waitUntil: "networkidle0"}).catch(err=>{});
	});
})();

var lastID = 0;
const generatePlaceSign = info=>new Promise((resolve,reject)=>{
	/*info = {
		username: "Maki",
		avatarURL: "https://.png",
		
		placeName: "Cutelab",
		placeDesc: "Where the cute fairies live",
		placeThumb: "https://.png",

		hostUsername: "Caitlyn",
		hostAvatarURL: "https://.png",
	}*/

	let id = lastID;
	lastID++;
	if (lastID>10000) lastID = 0;

	const receive = info=>{ // {id,buffer}
		if (info.id != id) return;
		resolve(info.buffer);
		events.off("placeSign.receive", receive);
		return;
	};

	events.on("placeSign.receive", receive);

	info.id = id;
	events.emit("placeSign.generate", info);
});

const getUserDetails = username=>new Promise((resolve,reject)=>{
	request("https://metaverse.highfidelity.com/users/"+username).then(html=>{
		let details = {}

		try {
			details.avatarURL = (/<img class=['"]users-img['"] src="(.*?)[?'"]/gi.exec(html))[1];
			details.username = (/<title>(.*?) - High Fidelity<\/title>/i.exec(html))[1];
		} catch(err) {
			return reject("Details not found");
		}

		if (details.avatarURL.startsWith("/"))
			details.avatarURL = "https://metaverse.highfidelity.com"+details.avatarURL;

		return resolve(details);
	}).catch(err=>{
		return reject("User not found");
	});
});

const getPlaceDetails = placeName=>new Promise((resolve,reject)=>{
	request("https://metaverse.highfidelity.com/places/"+placeName).then(html=>{
		let details = {};

		try {
			details.name = (/<title>(.*?) -/i.exec(html))[1];
			details.desc = (/<p class=['"]places-regular-text places-left-justify['"]>(.*?)<\/p>/i.exec(html))[1];
			details.thumb = (/<img class=['"]places-img['"] src="(.*?)[?'"]/i.exec(html))[1];

			let host = (/Host:(?:.*?)src="(.*?)"(?:.*?)<a(?:.*?)>(.*?)<\/a>/i.exec(html));
			details.hostAvatarURL = host[1];
			details.hostUsername = host[2];
		} catch(err) {
			return reject("Details not found");
		}

		return resolve(details);
	}).catch(err=>{
		return reject("Place not found")
	})
});

app.get("/", (req,res)=>{
	if (req.query.username==undefined) return res.end();
	if (req.query.place==undefined) return res.end();

	let info = {}; // 6 strings to fill in

	getUserDetails(req.query.username).then(avatarDetails=>{
		info.avatarURL = avatarDetails.avatarURL;
		info.username = avatarDetails.username;

		getPlaceDetails(req.query.place).then(placeDetails=>{
			info.placeName = placeDetails.name;
			info.placeDesc = placeDetails.desc;
			info.placeThumb = placeDetails.thumb;
			info.hostUsername = placeDetails.hostUsername;
			info.hostAvatarURL = placeDetails.hostAvatarURL;

			generatePlaceSign(info).then(buffer=>{
				res.setHeader("Content-Type", "image/png");
				res.end(buffer);
			}).catch(err=>{
				console.log(err);
				res.end();
			});
		}).catch(err=>{
			console.log(err);
			res.end();
		});
	}).catch(err=>{
		console.log(err);
		res.end();
	});
});

app.listen(8085);