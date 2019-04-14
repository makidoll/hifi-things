/*
{
	"_comment": "channels in order: diffuse, orm, normal",
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/sbsImage.fs",
		"channels": [
			"https://cutelab.space/u/V1RdYM.jpg"
		],
		"uniforms": {
			"fullbright": 0,
			"specular": 0.5,
			"alphaClipping": 0.5,

			"enableOrm": 0,
			"enableNormal": 0
		},
		"version": 3
	}
}
*/

uniform float fullbright = 0;
uniform float specular = 0.5;
uniform float alphaClipping = 0.5;

uniform float enableOrm = 0;
uniform float enableNormal = 0;

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
		frag.occlusion = 0;
		frag.roughness = 1;
	} else {
		frag.diffuse = color;
		frag.specular = vec3(specular);

		if (enableOrm>0.5) {
			vec3 orm = texture(iChannel1, uv).rgb;
			frag.occlusion = orm.r;
			frag.roughness = orm.g;
			frag.metallic = orm.b;
		}
		if (enableNormal>0.5) {
			vec3 normal = texture(iChannel1, uv).rgb;
			frag.normal = normal;
		}
	}

	return 0;
}