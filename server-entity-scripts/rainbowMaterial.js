/*
user data of a material entity

{
	"speed": 1,
	"emission": 1,
	"saturation": 1,
	"value": 1
}
*/

(function() {
	var interval = undefined;
	var materialData = {
		materials: {
			albedo: {},
			emissive: {},
		}
	}

	// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
	function HSVtoRGB(h, s, v) {
		var r, g, b, i, f, p, q, t;
		if (arguments.length === 1) {
			s = h.s, v = h.v, h = h.h;
		}
		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		switch (i % 6) {
			case 0: r = v, g = t, b = p; break;
			case 1: r = q, g = v, b = p; break;
			case 2: r = p, g = v, b = t; break;
			case 3: r = p, g = q, b = v; break;
			case 4: r = t, g = p, b = v; break;
			case 5: r = v, g = p, b = q; break;
		}
		return {r: r, g: g, b: b};
	}

	function multiplyColor(color, a) {
		return {
			r: color.r*a,
			g: color.g*a,
			b: color.b*a,
		};
	}

	this.preload = function(entityID) {
		var entity = Entities.getEntityProperties(entityID, ["userData"]);
		try { var userData = JSON.parse(entity.userData);
		} catch(err) { return; }

		//var unlit = (userData.unlit!=undefined)? userData.unlit: false;
		var speed = (userData.speed!=undefined)? userData.speed: 1;
		var emission = (userData.emission!=undefined)? userData.emission: 2;
		var saturation = (userData.saturation!=undefined)? userData.saturation: 1;
		var value = (userData.value!=undefined)? userData.value: 1;

		//materialData.materials.unlit = unlit;
		Entities.editEntity(entityID, {materialURL: "materialData"});

		var hue = 0;

		interval = Script.setInterval(function() {
			var color = HSVtoRGB(hue, saturation, value);
			materialData.materials.albedo = color;
			materialData.materials.emissive = multiplyColor(color, emission);

			Entities.editEntity(entityID, {
				materialData: JSON.stringify(materialData)
			});

			hue += 0.001*speed;
			if (hue>1) hue -= 1;
		}, 1000/50); // same as scrolling material 50fps
	}

	this.unload = function() {
		if (interval) Script.clearInterval(interval);
	}
})