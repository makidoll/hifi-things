/*
	{
		"ProceduralEntity": {
			"shaderUrl": "https://hifi.maki.cafe/shaders/scrollingWater.fs",
			"channels": ["https://www.pngkit.com/png/full/213-2130628_water-texture-water.png"],
			"uniforms": {
				"scale": 0.2,
				"speedX": 0.1,
				"speedY": 0.1,
				"opacityCutoff": 0.3,
				"emissive": false
			},
			"version": 3
		}
	}
*/

uniform float scale = 0.2;
uniform float speedX = 0.1;
uniform float speedY = 0.1;
uniform float opacityCutoff = 0.3;
uniform bool emissive = false;

float getProceduralFragment(inout ProceduralFragment frag) {
	vec3 worldPos = (_position.xyz * iWorldScale) + iWorldPosition;
	vec2 uv = worldPos.xz - (vec2(speedX, speedY) * iGlobalTime);

	vec4 color = texture(iChannel0, uv * scale);
	if (color.a < opacityCutoff) {
		discard;
	}

	if (emissive) {
		frag.emissive = color.rgb;
		frag.diffuse = vec3(0);
	} else {
		frag.emissive = vec3(0);
		frag.diffuse = color.rgb;
	}

	frag.roughness = 1;
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