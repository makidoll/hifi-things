/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/shaders/pulse.fs",
		"uniforms": {
			"color": [1, 0, 0],
			"speed": 2.5,
			"minIntensity": 0.2,
			"maxIntensity": 0.8
		},
		"version": 3
	}
}
*/

uniform vec3 color = vec3(1,0,0);
uniform float speed = 2.5;
uniform float minIntensity = 0.2;
uniform float maxIntensity = 0.8;

float getProceduralFragment(inout ProceduralFragment frag) {
	float range = maxIntensity - minIntensity;
	float amount = (sin((iGlobalTime * 6.283185) / speed) * 0.5 + 0.5) * range + minIntensity;
	frag.emissive = mix(vec3(0), color, amount);
	frag.diffuse = vec3(0,0,0);
	return 0;
}