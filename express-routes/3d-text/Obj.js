module.exports = function() {
	this.mtllib = "";

	this.v = [];
	this.vt = []; // uv
	this.f = [];

	this.mtl = {};

	let hasVt = false;

	this.addV = function(pos, uv) { // [x,y,z], [uvX,uvY]
		if (uv) hasVT = true;

		this.v.push(pos);
		this.vt.push(uv||[0,0]);

		return this.v.length-1; // index
	}

	this.addF = function(indicies, mtl) { // [0,1,2,...]
		if (!this.f[mtl]) this.f[mtl]=[];
		this.f[mtl].push(indicies.map(i=>i+1));
	}

	this.addToF = function(indicies, mtl) { // [0,1,2,...]
		if (!this.f[mtl]) this.f[mtl]=[];

		let totalIndicies = 0;
		Object.values(this.f).forEach(mtl=>{
			mtl.forEach(face=>{
				totalIndicies += face.length
			});
		});

		this.f[mtl].push(indicies.map(i=>i+totalIndicies+1));
	}

	this.addMtl = function(mtl, properties) {
		if (this.mtl[mtl]) return;

		this.mtl[mtl] = {
			diffuse: properties.diffuse,
		};

		if (properties.texture)
			this.mtl[mtl].texture = properties.texture;
	}

	this.scale = function(scale) { // [x,y,z]
		this.v.forEach(pos=>{
			pos[0] *= scale[0];
			pos[1] *= scale[1];
			pos[2] *= scale[2];
		});
	}

	this.exportObj = function() {
		let data = "";
		if (this.mtllib)
			data += "mtllib "+this.mtllib+"\n";

		this.v.forEach(v=>{
			data += "v "+v.join(" ")+"\n";
		});

		if (hasVt)
			this.vt.forEach(vt=>{
				data += "vt "+vt.join(" ")+"\n";
			});

		Object.keys(this.f).forEach(mtl=>{
			data += "usemtl "+mtl+"\n";
			data += "s off\n";

			this.f[mtl].forEach(face=>{
				data += "f "+face.join(" ")+"\n";
			});
		});

		return data;
	}

	this.exportMtl = function() {
		let data = "";

		Object.keys(this.mtl).forEach(mtl=>{
			data += (
				"newmtl "+mtl+"\n"+
				"Ns 0\n"+ // specular
				"Ka 1 1 1\n"+ // ambient
				"Kd "+this.mtl[mtl].diffuse.join(" ")+"\n"+ // diffuse
				"Ks 0 0 0\n"+ // specular
				"Ke 0 0 0\n"+ // emissive
				"Ni 1\n"+ // optical density (refraction)
				"illum 1\n" //
			);

			if (this.mtl[mtl].texture)
				data += "map_Kd "+this.mtl[mtl].texture // diffuse image

			data += "\n";
		});

		return data;
	}
}