/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/SBSimage.fs",
		"channels": ["https://cutelab.space/u/V1RdYM.jpg"],
		"uniforms": {
			"alphaClipping": 0.5,
			"fullbright": 0,
		},
		"version": 3
	}
}
*/

uniform float alphaClipping = 0.5;
uniform float fullbright = 0;
uniform float specular = 0;

float getProceduralFragment(inout ProceduralFragment frag) {
	vec2 uv = _position.xy+0.5;
	uv.y *= -1;
	uv.x *= 0.5;
	uv.x += cam_getStereoSide()*0.5; // right eye

	vec4 image = texture(iChannel0, uv).rgba;
	if (image.a < alphaClipping) discard;
	vec3 color = image.rgb;

	if (fullbright>0.5) {
		frag.emissive = color;
		frag.diffuse = vec3(0);
	} else {
		frag.diffuse = color;
	}

	frag.specular = vec3(0);
	frag.roughness = 1;

	return 0;
}