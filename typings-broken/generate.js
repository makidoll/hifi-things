const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const HIFI_DIR = "D:/Git/hifi";

function execCmd(cmd, options) {
	return new Promise((resolve,reject)=>{
		exec(cmd, options, (err, stdout, stderr) => {
			if (err) return reject(err);
			if (stderr) return reject(stderr);
			return resolve(stdout)
		});
	});
}

(async ()=>{
	let jsdocDir = path.join(HIFI_DIR, "tools/jsdoc");
	console.log("Working in "+jsdocDir);

	console.log("Installing NPM modules...");
	//console.log(await execCmd("npm install tsd-jsdoc", {cwd: jsdocDir}));

	console.log("Adjusting tsd-jsdoc...");
	let assert_neverPath = path.join(jsdocDir, "node_modules/tsd-jsdoc/dist/assert_never.js");
	let assert_never = fs.readFileSync(assert_neverPath, "utf8");
	assert_never = assert_never.replace("throw new Error", "//throw new Error");
	fs.writeFileSync(assert_neverPath, assert_never);

	console.log("Generating documentaion and types...");
	try {
		let out = await execCmd(
			"jsdoc root.js -t node_modules/tsd-jsdoc/dist -r api-mainpage.md -c config.json", 
		{cwd: jsdocDir});
		console.log(out);
	} catch(err) {
		console.log(err);
	}

	console.log("Modifying out/types.d.ts");
	let typesPath = path.join(jsdocDir, "out/types.d.ts");
	let types = fs.readFileSync(typesPath, "utf8");
	types = types.replace(/\/\*\*([\s\S]*?)\*\//g, "");
	types = types.replace(/^\s*\n/gm, "");

	fs.writeFileSync(typesPath, types);

	console.log("File copied here as hifi.d.ts");
	fs.writeFileSync("./hifi.d.ts", types);
})();



