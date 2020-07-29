/*
- when modifying, you'll have to set false to 0 and true to 1
- for useOrm, you need to add an orm texture as the second channel
- for opacityBlend, you need to set the entity to alpha 0.99999
    - Entities.editEntity("entityID", {alpha:0.99999})

{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/shaders/scrollingWater.fs",
		"channels": ["https://www.pngkit.com/png/full/213-2130628_water-texture-water.png"],
		"uniforms": {
			"scale": 0.2,
			"speedX": 0.1,
			"speedY": 0.1,
			"opacityBlend": false,
			"opacityCutoff": 0.3,
			"emissive": false,
			"useOrm": false
		},
		"version": 3
	}
}
*/

uniform float scale = 0.2;
uniform float speedX = 0.1;
uniform float speedY = 0.1;
uniform bool opacityBlend = false;
uniform float opacityCutoff = 0.3;
uniform bool emissive = false;
uniform bool useOrm = false;

float getProceduralFragment(inout ProceduralFragment frag) {
	vec3 worldPos = (_position.xyz * iWorldScale) + iWorldPosition;
	vec2 uv = worldPos.xz - (vec2(speedX, speedY) * iGlobalTime);

	vec4 color = texture(iChannel0, uv * scale);
	
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

	if (useOrm) {
		vec3 orm = texture(iChannel1, uv * scale).rgb;
		frag.occlusion = orm.r;
		frag.roughness = orm.g;
		frag.metallic = orm.b;
	} else {
		frag.roughness = 1;
	}

	return 0;
}

struct ProceduralFragment {
    vec3 normal;
    vec3 diffuse;
    vec3 specular;
    vec3 emissive;
    float alpha;
    float roughness;
    float metallic;
    float occlusion;
    float scattering;
};	