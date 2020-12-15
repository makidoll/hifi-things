/*
- use on quad shape
- to enable opacity blend, make sure entity alpha is 0.98

{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/shaders/spriteSheet.fs",
		"channels": ["https://files.tivolicloud.com/caitlyn/projects/props/tealight/candle1.png"],
		"uniforms": {
			"width": 16,
			"height": 16,
			"fps": 30,
			"emissive": true,
			"opacityBlend": true,
			"opacityCutoff": 0.5
		},
		"version": 3
	}
}
*/

uniform float width = 16;
uniform float height = 16;
uniform float fps = 30;
uniform bool emissive = true;
uniform bool opacityBlend = true;
uniform float opacityCutoff = 0.5;

float getProceduralFragment(inout ProceduralFragment frag) {
	vec2 uv = _position.xz + 0.5;

	uv.x += floor(mod(iGlobalTime * fps, width));
	uv.y += floor(mod((iGlobalTime * fps) / width, height));

	uv.x /= width;
	uv.y /= height;

	vec4 color = texture(iChannel0, uv);

	if (opacityBlend) {
		frag.alpha = color.a;
	} else {
		if (color.a < opacityCutoff) {
			discard;
		}
	}

	if (emissive) {
		frag.emissive = color.rgb;
		frag.diffuse = vec3(0);
	} else {
		frag.emissive = vec3(0);
		frag.diffuse = color.rgb;
	}

	return 0;
}
