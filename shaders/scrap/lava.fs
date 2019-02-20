/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/scrap/lava.fs",
		"version": 3
	}
}
*/

float getProceduralFragment(inout ProceduralFragment frag) {
	vec3 pos =  _position.xyz*iWorldScale;
	vec2 uv = pos.xz;

	uv = floor(uv*8);
	float n = snoise(vec3(uv*0.2, iGlobalTime*0.4));

	vec3 color = mix(vec3(1,0.2,0), vec3(1,1,0), n);

	frag.emissive = color;
	frag.diffuse = vec3(0);
	frag.specular = vec3(0);
	frag.roughness = 1;
	return 0;
}