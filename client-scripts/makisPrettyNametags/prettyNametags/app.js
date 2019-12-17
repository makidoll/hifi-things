var puppeteer = require("puppeteer-core");
var express = require("express");
var mitt = require("mitt");
var fs = require("fs");

var app = express();
var events = mitt();

var browserRunning = false;

var cache = {};

var scale = 2;
var viewport = [512 * scale, 64 * scale];

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: "google-chrome-unstable",
		args: ["--no-sandbox"],
		defaultViewport: {
			width: viewport[0],
			height: viewport[1],
			deviceScaleFactor: 1,
		},
	});
	browserRunning = true;
	console.log("Browser running");

	events.on("generateNametag", async info => {
		// {id,username,avatarURL,connection,admin,theme}
		let filename = "nametag";
		if (info.theme) filename += "-" + info.theme;

		let html;
		try {
			html = fs.readFileSync(
				__dirname + "/" + filename + ".html",
				"utf8",
			);
		} catch (err) {
			html = fs.readFileSync(__dirname + "/nametag.html", "utf8");
		}

		html = html.replace(/\[username\]/g, info.username);
		html = html.replace(/\[avatarURL\]/g, info.avatarURL);
		switch (info.connection) {
			case "connection":
				html = html.replace(/<!--connection([\s\S]*?)-->/g, "$1");
				break;
			case "friend":
				html = html.replace(/<!--friend([\s\S]*?)-->/g, "$1");
				break;
		}
		if (info.admin) html = html.replace(/<!--admin([\s\S]*?)-->/g, "$1");

		const page = await browser.newPage();
		/*await page.setViewport({
			width: viewport[0],
			height: viewport[1],
			deviceScaleFactor: 1
		})*/

		page.on("load", async () => {
			//const width = await page.$eval("#nametag", el=>el.offsetWidth*4);

			const buffer = await page.screenshot({
				type: "png",
				omitBackground: true,
				clip: {
					x: 0,
					y: 0,
					width: viewport[0],
					height: viewport[1],
				},
			});

			events.emit("generateNametagReceive", {
				id: info.id,
				buffer: buffer,
				//width: width/256,
			});

			page.close().catch(err => {});
			//setTimeout(() => {
			//}, 1000 * 10);
		});

		page.setContent(html, { waitUntil: "networkidle0" }).catch(err => {});
	});
})();

let lastID = 0;
const generateNametag = info =>
	new Promise((resolve, reject) => {
		/* info = {
		username: String,
		avatarURL: String,
		connection: String,
		admin: Boolean,
		theme: String // optional
	} */

		let infoKey = JSON.stringify(info);

		// check cache
		let cachedBuffer = cache[infoKey];
		if (cachedBuffer != undefined) {
			return resolve(cachedBuffer);
		}

		// generate id for the event handler
		let id = lastID;
		lastID++;
		if (lastID > 10000) lastID = 0;

		function receive(info) {
			// {id,buffer}
			if (info.id != id) return;
			resolve(info.buffer);
			cache[infoKey] = info.buffer;
			events.off("generateNametagReceive", receive);
			return;
		}

		events.on("generateNametagReceive", receive);

		info.id = id;
		events.emit("generateNametag", info);
	});

app.get("/", (req, res) => {
	if (req.query.username == undefined) return res.end();
	if (req.query.avatarURL == undefined) return res.end();
	if (req.query.connection == undefined) return res.end();
	if (req.query.admin == undefined) return res.end();

	function completeReq() {
		//console.log("Generating "+req.query.username);
		generateNametag({
			username: req.query.username,
			avatarURL: req.query.avatarURL.split("?")[0],
			connection: req.query.connection,
			admin: req.query.admin != "false",
			theme: req.query.theme,
		})
			.then(buffer => {
				res.setHeader("Content-Type", "image/png");
				//res.setHeader("Nametag-Width", nametag.width)
				res.end(buffer);
			})
			.catch(err => {});
	}

	if (!browserRunning) {
		let interval = setInterval(() => {
			if (!browserRunning) return;
			clearInterval(interval);
			completeReq();
		}, 400);
	} else {
		completeReq();
	}
});

app.listen(8082);

/*
https://maki.cat/prettyNametags
?username=Maki
&connection=friend
&admin=true
&avatarURL=https://hifi-metaverse.s3-us-west-1.amazonaws.com/images/users/previews/323/de9/46-/thumbnail/hifi-user-323de946-477d-468b-a32a-0b4929fb1d11.png
*/
