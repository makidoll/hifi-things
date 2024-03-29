/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/shaders/greenscreen.fs",
		"version": 2
	}
}
*/

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec3 color = vec3(0.0,1.0,0.0);
	diffuse = color.rgb;
	specular = color.rgb;
	shininess = 0.5;
	return 1.0;
}