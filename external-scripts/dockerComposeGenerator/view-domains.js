
var config = require(__dirname+"/domains.js");

const RESET = "\x1b[0m";
const BRIGHT = "\x1b[1m";

const FGBLACK = "\x1b[30m";
const BGWHITE = "\x1b[47m";

var maxLength = 0;
Object.keys(config.domains).forEach(name=>{
	if (name.length>maxLength) maxLength=name.length;
});

function fit(name) {
	var spacesLength = maxLength-name.length;
	var spaces = "";

	for (var i=0; i<spacesLength; i++) spaces+=" ";
	return spaces+name;
}

console.log("");
Object.keys(config.domains).forEach((name,i)=>{
	let port = config.domains[name][0];
	let auth = config.domains[name][1];

	console.log(BGWHITE+FGBLACK+fit(name)+RESET+" http://"+auth+"@"+config.host+":"+port+"/settings");
});
console.log("");%  