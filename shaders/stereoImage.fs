/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/stereoImage.fs",
		"channels": ["https://maki.cat/u/tW2hr1.jpg"],
		"version": 2
	}
}
*/

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec2 uv = _position.xy;
	uv.x = uv.x*0.5 + 0.25;
	uv.y = uv.y*-1 + 0.5;

	uv.x += cam_getStereoSide()/2;

	vec3 color = texture(iChannel0, uv).xyz;

	diffuse = color.rgb;
	specular = color.rgb;
	shininess = 0;
	return 1;
}