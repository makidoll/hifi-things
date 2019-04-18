/*
on a cylinder sized 1, 2, 1

{
	"ProceduralEntity": {
		"shaderUrl": "file:///D:/Users/Maki/Desktop/groundPortal.fs",
		"version": 3
	}
}
*/

vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float getProceduralFragment(inout ProceduralFragment frag) {

	float y = _position.y+0.18;
	y += snoise(vec3(_texCoord01.xy*vec2(1.5,1)*16, iGlobalTime*0.25))*0.1;

	if (y>-0.2) discard;

	// vec3 color = vec3(0,
	// 	_position.y + 0.6 + sin(iGlobalTime*4)*0.05,
	// 1);

	vec3 color = hsv2rgb(vec3(
		(_position.y+(y*0.2))*2 + iGlobalTime*0.1, 1, 1
	));

	if (_position.y<-0.4999) {
		float n = snoise(vec3(_position.xz*4, iGlobalTime*0.25));
		vec3 newColor = hsv2rgb(vec3(n*8, 1, 1));
		
		float l = length(_position.xz)*2;
		color = mix(color, newColor, 1-l);
	}

	frag.emissive = color;
	frag.diffuse = vec3(0);
	frag.specular = vec3(0);
	frag.metallic = 0;
	frag.roughness = 1;
	return 0;
}