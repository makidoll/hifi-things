var fs = require("fs");

module.exports = function(filename) {
	let fontFile = fs.readFileSync(filename, "utf8");
	let fontBoundingBox = fontFile.match(/FONTBOUNDINGBOX(.*)\n/)[1].trim().split(" ").map(n=>parseInt(n));

	let fontHeight = fontBoundingBox[1]+fontBoundingBox[3];

	function conform8BitBinaryNumber(number) {
		return ("00000000"+number).slice(-8);
	}

	this.getChar = char=>{ // returns {w,h,p[]}
		let encoding = char.charCodeAt(0);
		let match = fontFile.match(new RegExp("ENCODING "+encoding+"(?:[\\s\\S]*?)BBX([\\s\\S]*?)BITMAP([\\s\\S]*?)ENDCHAR"));

		if (match.length<1) return undefined;

		let boundingBox = match[1].trim().split(" ").map(n=>parseInt(n)); // w, h, x, y
		let bitmap = match[2].trim().split("\n");

		// convert hex to binary
		bitmap = bitmap.map(hex=>conform8BitBinaryNumber(parseInt(hex, 16).toString(2)).slice(0, boundingBox[0]))

		// make sure its pushed down to fontHeight
		if (bitmap.length<fontHeight) {
			let emptyLines = fontHeight-bitmap.length;
			for (var i = 0; i < emptyLines; i++) {
				bitmap.unshift("0")
			}
		}

		// convert to {x,y}[]
		let pixels = [];
		bitmap.forEach((line, y)=>{
			let lines = line.split("");
			lines.forEach((pixel, x)=>{
				pixel = parseInt(pixel);
				if (pixel==0) return;

				pixels.push({
					x: x, // x-boundingBox[2]
					y: y-boundingBox[3]
				});
			});
		});

		return {
			w: boundingBox[0],
			h: boundingBox[1],
			pixels: pixels
		};
	}

	this.getPixels = (string, spaceOffset, lineOffset)=>{ // returns {x,y}[]
		let pixels = [];

		let currentX = 0;
		let currentY = 0;

		if (spaceOffset)
			string = string.replace(/ /g, new Array(spaceOffset+1).fill(" ").join(""));

		string.split("\n").forEach(line=>{
			line.split("").forEach(char=>{
				char = this.getChar(char);

				char.pixels.map(pixel=>{
					pixel.x += currentX;
					pixel.y += currentY;
					return pixel;
				});

				pixels = pixels.concat(char.pixels);
				currentX += char.w+1;
			});
			currentX = 0;
			currentY += fontHeight+1
			if (lineOffset) currentY += lineOffset;
		});

		return pixels;
	}
}