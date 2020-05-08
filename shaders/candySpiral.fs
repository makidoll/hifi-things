/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/shaders/candySpiral.fs",
		"version": 3
	}
}
*/

#define size 4.0
#define spirals 0.5
#define time iGlobalTime/6.0

#define blue vec3(172, 218, 205)/255.0
#define pink vec3(240, 180, 180)/255.0
#define white vec3(1,1,1);

float getProceduralFragment(inout ProceduralFragment frag) {
	//vec2 uv = _texCoord01.xy;
   	vec2 uv = _position.xz;

	float d = length(uv)*size; // Distance fom center
	float a = atan(uv.x, uv.y)/3.141592*spirals; // Angle from center
	
	float v = fract(d + a - time); // Spirals!
	
	vec3 color =
	    v<.25? blue:
		v>.5 && v<.75? pink:
		white;

	frag.emissive = color;
	frag.diffuse = vec3(0);
	frag.specular = vec3(0);
	frag.roughness = 1;
	return 0;
}