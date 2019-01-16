if (process.argv.length < 5) {
	console.log("\n\033[1mnode gifToMultipleSpritesheets.js [input video] [spritesheets] [width]\033[0m\n");
	return;
}

var spritesheets = parseInt(process.argv[3]);
var width = parseInt(process.argv[4]);

if (spritesheets+"" == "NaN" || spritesheets<=0) return console.log("Invalid spritesheets number!");
if (width+"" == "NaN" || spritesheets<=0) return console.log("Invalid width number!");

var path = process.argv[2].split(".");
var fileExt = path.pop();
path = path.join(".");

const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

(async ()=>{
	const { stdout } = await exec("magick identify "+path+"."+fileExt);
	let frames = stdout.split("\n").length-1;

	let framesPerSpritesheet = frames/spritesheets;
	if (framesPerSpritesheet%1 != 0)
		return console.log("Gif has "+frames+" frames which doesn't fit "+spritesheets+" spritesheets!")

	if (!fs.existsSync(path+"-00000001.png")) {
		console.log("Spliting into frames...");
		await exec("ffmpeg -i "+path+"."+fileExt+" -f image2 "+path+"-%08d.png")
		//await exec("magick "+path+"."+fileExt+" "+path+".png");
	}

	for (let i=0; i<spritesheets; i++) {
		console.log("Montaging spritesheet "+i+"...");

		let cmd = "magick montage ";
		for (let j=1; j<=framesPerSpritesheet; j++) {
			let n = (j+(framesPerSpritesheet*i));
			n = ("00000000"+n).slice(-8);
			cmd += path+"-"+n+".png ";
		}
		cmd += "-tile "+width+"x -geometry +0+0 "+path+i+".png";

		await exec(cmd);
	}
})();