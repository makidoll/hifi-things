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

function pixelsToObj(pixels) {
	let obj = new Obj();
	let s = 1; // scale
	let d = 1; // depth

	function pixelExists(x, y) {
		for (let i=0; i<pixels.length; i++) {
			let pixel = pixels[i];
			if (pixel==undefined) continue;
			if (
				 pixel.x == x &&
				-pixel.y == y
			) return true;
		}
		return false;
	}

	function getV(newV) { // returns vertex index (finds or adds)
		for (let i=0; i<obj.v.length; i++) {
			let v = obj.v[i];

			if (
				v[0]==newV[0] &&
				v[1]==newV[1] &&
				v[2]==newV[2]

			) return i;
		}

		return obj.addV(newV);
	}

	function addPixel(x, y) {
		let front = [
			getV([x+s, y,   0]),
			getV([x+s, y+s, 0]),
			getV([x,   y+s, 0]),
			getV([x,   y,   0]),
		];
		obj.addF(front, "front");

		let back = [
			getV([x+s, y,   -d]),
			getV([x+s, y+s, -d]),
			getV([x,   y+s, -d]),
			getV([x,   y,   -d]),
		];
		obj.addF(back.reverse(), "front");

		// side faces (checks neighbouring pixel)

		if (!pixelExists(x-1, y)) {
			let left = [
				getV([x, y,    0]),
				getV([x, y+s,  0]),
				getV([x, y+s, -d]),
				getV([x, y,   -d]),
			];
			obj.addF(left, "side");
		}
		
		if (!pixelExists(x+1, y)) {
			let right = [
				getV([x+s, y,    0]),
				getV([x+s, y+s,  0]),
				getV([x+s, y+s, -d]),
				getV([x+s, y,   -d]),
			];
			obj.addF(right.reverse(), "side");
		}

		if (!pixelExists(x, y+1)) {
			let top = [
				getV([x  , y+s, -d]),
				getV([x  , y+s,  0]),
				getV([x+s, y+s,  0]),
				getV([x+s, y+s, -d]),
			];
			obj.addF(top, "side");
		}

		if (!pixelExists(x, y-1)) {
			let bottom = [
				getV([x  , y, -d]),
				getV([x  , y,  0]),
				getV([x+s, y,  0]),
				getV([x+s, y, -d]),
			];
			obj.addF(bottom.reverse(), "side");
		}
	}

	pixels.forEach(pixel=>{
		addPixel(pixel.x, -pixel.y);
	});

	return obj;
}

var objCache = {} // hashmap of req.query

function handleRequest(req, res) {
	// cache!
	let cacheKey = JSON.stringify(req.query); 
	let cachedObj = objCache[cacheKey];

	if (cachedObj != undefined) {
		console.log("cache")
		res.header({"Content-Type": "text/plain"});
		res.end(cachedObj);
		return;
	}

	// check if form is needed to be sent
	if (!(req.query.font&&req.query.scale&&req.query.depth&&req.query.text))
		return res.send(
			fs.readFileSync(__dirname+"/form.html", "utf8")
			.replace(/\[fonts\]/gi,
				fs.readdirSync(__dirname+"/bdf")
				.map(font=>font.replace(/\.bdf/,""))
				.map(font=>'<option value="'+font+'">'+font+'</option>')
				.join("")
			)
		);

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
	obj.scale([
		req.query.scale,
		req.query.scale,
		req.query.depth,
	]);

	obj.mtllib = ("/3d-text"+
		"-"+((req.query.frontDiffuse )? req.query.frontDiffuse : "ffffff")+
		"-"+((req.query.frontEmission)? req.query.frontEmission: "000000")+
		"-"+((req.query.sideDiffuse  )? req.query.sideDiffuse  : "000000")+
		"-"+((req.query.sideEmission )? req.query.sideEmission : "000000")+
	".mtl");

	let objFile = obj.exportObj();
	objCache[cacheKey] = objFile;

	res.header({"Content-Type": "text/plain"});
	res.end(objFile);
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
	let fd = hexToRgb("#"+req.params.fd); if (fd!=null) fd=fd.join(" ");
	let fe = hexToRgb("#"+req.params.fe); if (fe!=null) fe=fe.join(" ");
	let sd = hexToRgb("#"+req.params.sd); if (sd!=null) sd=sd.join(" ");
	let se = hexToRgb("#"+req.params.se); if (se!=null) se=se.join(" ");

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