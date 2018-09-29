var babel = require("babel-core");
var fs = require("fs");

if (!process.argv[2]) {
	console.log("Usage: node compile.js (filename)");
	return;
}

filename = process.argv[2];

babel.transformFile(filename, {
	"presets": ["es2015"]
}, (err,res)=>{
	if (err) return console.log(err);

	filename = filename.split(/[\/\\]/gi);
	filename = filename[filename.length-1];

	fs.writeFileSync("./dist/"+filename, res.code);
	console.log("File saved in dist/"+filename);
});