var fs = require("fs");

var songs = fs.readdirSync("./music");

var atp = [];
var bat = [];

songs.forEach(song=>{
	atp.push("atp:/music/"+song);
	bat.push("ffmpeg-normalize \"./music/"+song+"\" -ar 44100 -c:a libmp3lame -b:a 320 -o \"./out/"+song+"\"");
});

fs.writeFileSync("./convert.bat", bat.join("\n"));
console.log(atp);