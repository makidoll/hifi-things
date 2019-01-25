var BDF = require("./BDF");
var Obj = require("./Obj");
var fs = require("fs");

function printPixels(pixels, w, h) {
	let canvas = new Array(h).fill("").map(row=>new Array(w).fill("  ")); // 64x16 empty spaces

	pixels.forEach(pixel=>{
		if (pixel.y<0) return;
		canvas[pixel.y][pixel.x] = "##";
	});

	console.log(canvas.map(col=>col.join("")).join("\n"));
}

function pixelsToObj(pixels, s, d) { // scale, depth

	let obj = new Obj();

	function addPixel(x, y) {
		obj.addV([x+s, y,   0]);
		obj.addV([x+s, y+s, 0]);
		obj.addV([x,   y+s, 0]);
		obj.addV([x,   y,   0]);
		obj.addToF([0,1,2,3], "front");

		obj.addV([x+s, y,   -d]);
		obj.addV([x+s, y+s, -d]);
		obj.addV([x,   y+s, -d]);
		obj.addV([x,   y,   -d]);
		obj.addToF([3,2,1,0], "front");

		// left, right
		obj.addV([x, y,    0]);
		obj.addV([x, y+s,  0]);
		obj.addV([x, y+s, -d]);
		obj.addV([x, y,   -d]);
		obj.addToF([0,1,2,3], "side");

		obj.addV([x+s, y,    0]);
		obj.addV([x+s, y+s,  0]);
		obj.addV([x+s, y+s, -d]);
		obj.addV([x+s, y,   -d]);
		obj.addToF([3,2,1,0], "side");

		// top, bottom
		obj.addV([x  , y+s, -d]);
		obj.addV([x  , y+s,  0]);
		obj.addV([x+s, y+s,  0]);
		obj.addV([x+s, y+s, -d]);
		obj.addToF([0,1,2,3], "side");

		obj.addV([x  , y, -d]);
		obj.addV([x  , y,  0]);
		obj.addV([x+s, y,  0]);
		obj.addV([x+s, y, -d]);
		obj.addToF([3,2,1,0], "side");
	}

	pixels.forEach(pixel=>{
		addPixel(pixel.x*s, -pixel.y*s);
	});

	return obj;
}

function handleRequest(req, res) {
	if (!(req.query.font||req.query.scale||req.query.depth||req.query.text))
		return res.send("<pre>"+
			"Available fonts:\n"+
			"\t"+fs.readdirSync(__dirname+"/bdf").map(font=>font.replace(/\.bdf/,"")).join(", ")+"\n"+
			"\n"+
			"Required parameters:\n"+
			"\tfont,\n"+
			"\tscale (float),\n"+
			"\tdepth (float),\n"+
			"\ttext\n"+
			"\n"+
			"Optional parameters:\n"+
			"\tfrontDiffuse (hex color),\n"+
			"\tfrontEmission (hex color),\n"+
			"\n"+
			"\tsideDiffuse (hex color),\n"+
			"\tsideEmission (hex color),\n"+
			"\n"+
			"\tspaceOffset (int),\n"+
			"\tlineOffset (int)\n"+
		"</pre>");

	let font = __dirname+"/bdf/"+req.query.font+".bdf";
	let scale = parseFloat(req.query.scale); if (scale+""=="NaN") return res.send("Scale not a number!");
	let depth = parseFloat(req.query.depth); if (depth+""=="NaN") return res.send("Depth not a number!");
	let text = req.query.text;

	
	if (!fs.existsSync(font)) return res.send("Font not found!");

	font = new BDF(font);

	let spaceOffset = parseInt(req.query.spaceOffset); if (spaceOffset+""=="NaN") spaceOffset = 0;
	let lineOffset = parseInt(req.query.lineOffset); if (lineOffset+""=="NaN") lineOffset = 0;
	let pixels = font.getPixels(text, spaceOffset, lineOffset);

	let obj = pixelsToObj(pixels, scale, depth);

	obj.mtllib = ("/3d-text"+
		"-"+((req.query.frontDiffuse )? req.query.frontDiffuse : "000000")+
		"-"+((req.query.frontEmission)? req.query.frontEmission: "000000")+
		"-"+((req.query.sideDiffuse  )? req.query.sideDiffuse  : "000000")+
		"-"+((req.query.sideEmission )? req.query.sideEmission : "000000")+
	".mtl");

	res.header({"Content-Type": "text/plain"});
	res.end(obj.exportObj());
}

global.app.get("/3d-text", handleRequest);
global.app.get("/3d-text.obj", handleRequest);

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result? [
        parseInt(result[1], 16)/255,
        parseInt(result[2], 16)/255,
        parseInt(result[3], 16)/255
    ]: null;
}

global.app.get("/3d-text-:fd-:fe-:sd-:se.mtl", (req,res)=>{
	let fd = hexToRgb("#"+req.params.fd).join(" ");
	let fe = hexToRgb("#"+req.params.fe).join(" ");
	let sd = hexToRgb("#"+req.params.sd).join(" ");
	let se = hexToRgb("#"+req.params.se).join(" ");

	res.header({"Content-Type": "text/plain"});
	res.end(
		"newmtl front\n"+
		"Ns 0\n"+ // specular
		"Ka 1 1 1\n"+ // ambient
		"Kd "+fd+"\n"+ // diffuse
		"Ks 0 0 0\n"+ // specular
		"Ke "+fe+"\n"+ // emissive
		"Ni 1\n"+ // optical density (refraction)
		"illum 1\n"+ //
		"newmtl side\n"+
		"Ns 0\n"+ // specular
		"Ka 1 1 1\n"+ // ambient
		"Kd "+sd+"\n"+ // diffuse
		"Ks 0 0 0\n"+ // specular
		"Ke "+se+"\n"+ // emissive
		"Ni 1\n"+ // optical density (refraction)
		"illum 1\n" //
	)

});