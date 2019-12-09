import fetch from "node-fetch";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

if (!fs.existsSync("models.json")) {
	console.log("Could not find models.json");
	process.exit();
}
let modelsJson = fs.readFileSync("models.json", "utf8");

const argv = process.argv.splice(2);
if (argv.length <= 0) {
	console.log("Available commands: list, migrate");
	process.exit();
}
function consoleLogAlt(msg: any) {
	console.log("\u001b[30m\u001b[47m" + msg + "\u001b[0m");
}

function consoleLogFailed(msg: any) {
	console.log("\u001b[41m\u001b[37;1m" + msg + "\u001b[0m");
}

function consoleLogSuccess(msg: any) {
	console.log("\u001b[42m\u001b[37;1m" + msg + "\u001b[0m");
}

function generateRandomNumberString(length: number) {
	let out = "";
	const chars = "0123456789".split("");
	for (let i = 0; i < length; i++) {
		out += chars[Math.floor(Math.random() * chars.length)];
	}
	return out;
}

// https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js
function escapeString(string: string) {
	if (typeof string !== "string") {
		throw new TypeError("Expected a string");
	}

	return string.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&");
}

function getFilenameFromUrl(url: string) {
	return url
		.split("/")
		.pop()
		.split("#")[0]
		.split("?")[0];
}

function findUrls(data: string) {
	const allUrls = data
		.match(/"(https?:\/\/[^]+?)"/gi)
		.map(urlWithSpeechMarks => {
			const matches = urlWithSpeechMarks.match(/"(https?:\/\/[^]+?)"/i);
			if (matches.length > 1) return matches[1];
			return null;
		})
		.filter(url => {
			if (url == null) return false;

			const filename = getFilenameFromUrl(url);
			if (!filename.includes(".")) return false;

			return true;
		});

	return allUrls.filter((url, i) => {
		return allUrls.indexOf(url) === i;
	});
}

function urlToFilename(url: string) {
	return url
		.split("/")
		.pop()
		.split("?")[0]
		.split("#")[0];
}

async function downloadUrls(downloadFolder: string, urls: string[]) {
	if (fs.existsSync(downloadFolder)) {
		console.log("./" + downloadFolder + " already exists");
		process.exit();
	}
	fs.mkdirSync(downloadFolder);

	let urlMapping: { [s: string]: string } = {};

	for (let url of urls) {
		// is in user data
		let urlToDownload = url;
		if (url.endsWith("\\")) {
			urlToDownload = url.slice(0, -1);
		}

		let filename = urlToFilename(urlToDownload);
		process.stdout.write(urlToDownload + " ... ");

		const res = await fetch(urlToDownload, {
			headers: {
				"User-Agent": "HighFidelity",
			},
		});

		if (res.status != 200) {
			consoleLogFailed("Failed!");
			continue;
		}

		let filePath = path.resolve(downloadFolder, filename);
		if (fs.existsSync(filePath)) {
			filename = filename.replace(
				/^([^]+)\.([^]+?)$/i,
				"$1." + generateRandomNumberString(6) + ".$2",
			);
			filePath = path.resolve(downloadFolder, filename);
		}

		const writeStream = fs.createWriteStream(filePath);
		res.body.pipe(writeStream);
		consoleLogSuccess("Success! " + filename);

		urlMapping[url] = filename;
	}

	return urlMapping;
}

function fixLine(line: string) {
	// for user data
	const matches = line.match(/"userData": "({[^]+})"/i);
	if (matches == null) return line;

	const fixedUserData = matches[1].replace(/([^\\])"/g, '$1\\"');
	return line.replace(
		/"userData": "([^]+)"/i,
		'"userData": "' + fixedUserData + '"',
	);
}

async function migrate() {
	if (argv.length <= 1) {
		console.log("Root url not specified!");
		console.log("node models-migrator migrate [url]");
		process.exit();
	}
	const rootUrl = argv[1].endsWith("/") ? argv[1] : argv[1] + "/";

	const urls = findUrls(modelsJson);
	consoleLogAlt(urls.length + " urls");
	console.log();

	const urlMapping = await downloadUrls("uploadme", urls);
	const oldUrls = Object.keys(urlMapping);

	for (let oldUrl of oldUrls) {
		let isInUserData = oldUrl.endsWith("\\");

		const newUrl =
			url.resolve(rootUrl, urlMapping[oldUrl]) +
			(isInUserData ? "\\" : "");

		modelsJson = modelsJson.replace(
			new RegExp(escapeString(`"${oldUrl}"`), "g"),
			`"${newUrl}"`,
		);
	}

	fs.writeFileSync("new.models.json", modelsJson);
	consoleLogAlt("./new.models.json successfully written!");
}

if (argv[0] == "list") {
	const urls = findUrls(modelsJson);
	console.log(urls);
	consoleLogAlt(urls.length + " urls");
}

if (argv[0] == "migrate") migrate();
