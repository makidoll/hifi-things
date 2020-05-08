/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/client-entity-scripts/welcomeSign/thePalace.fs",
		"version": 3,
		"uniforms": {
			"size": 6,
			"speed": 0.1,
			"opacity": 0.25,
			"arrowVness": 0.1,
			"bgColorR": 34,
			"bgColorG": 153,
			"bgColorB": 5
		}
	}
}
*/

uniform float size = 6; 
uniform float speed = 0.1; 
uniform float opacity = 0.25; 
uniform float arrowVness = 0.1; 

uniform float bgColorR = 34;
uniform float bgColorG = 153;
uniform float bgColorB = 5;

#define bgColor vec3(bgColorR, bgColorG, bgColorB)/255

float getProceduralFragment(inout ProceduralFragment frag) {

	vec2 uv = _position.xz*size;
	uv.y += iGlobalTime*speed;
	uv.y += abs(uv.x)*-arrowVness;
	uv.y = mod(uv.y, 1);

	vec3 color = mix(
		bgColor,
		vec3(1),
		(1-uv.y)*opacity
	);

	color.r = pow(color.r, 2.2);
	color.g = pow(color.g, 2.2);
	color.b = pow(color.b, 2.2);

	//frag.emissive = color;
	//frag.normal = vec3(0);
	frag.diffuse = color;
	//frag.specular = vec3(0);
	//frag.roughness = 1;
	return 0;	
}