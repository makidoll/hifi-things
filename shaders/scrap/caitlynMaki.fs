/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/scrap/caitlynMaki.fs",
		"version": 4
	},
}
*/

#define scale 3

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

const int[] caitlynMaki = int[](56,68,68,40,0,56,68,68,124,0,64,380,4,64,504,68,0,504,4,0,122,5,5,126,0,124,64,64,60,0,0,0,0,112,184,252,126,252,248,112,0,0,0,0,124,32,32,124,0,56,68,68,124,0,508,16,40,68,0,64,380,4,0,0,0,0,112,184,252,126,252,248,112,0,0,0,0);
bool renderCaitlynMaki(vec2 uv) { return ((caitlynMaki[int(uv.x)]>>int(uv.y))&1)>0; }

vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 getColor(vec2 uv) {
	uv.y += sin(uv.x*8 - iGlobalTime*2)*0.04;

	vec2 textUV = vec2(
		floor(uv.x*20*scale + iGlobalTime*4),
		floor(uv.y*10*scale)
	);

	if (abs(textUV.y)>8) discard;

	vec2 modTextUV = textUV;
	modTextUV.x = mod(textUV.x, 77);
	//modTextUV.x -= 6;
	modTextUV.y += 4;

	vec3 snoiseColor = hsv2rgb(vec3(
		snoise(vec3(textUV*0.04, iGlobalTime*0.3))*1,
		0.9,
		1
	));

	vec3 textColor = snoiseColor;
	vec3 heartColor = hsv2rgb(vec3(
		0,
		(sin(iGlobalTime*5 + (modTextUV.x-modTextUV.y)*0.4)/2+0.5)*0.03 + 0.964,
		1
	));
	if (modTextUV.x>29) if (modTextUV.x<40) textColor = heartColor;
	if (modTextUV.x>63) if (modTextUV.x<74) textColor = heartColor;

	bool render = renderCaitlynMaki(modTextUV);
	if (render) return textColor;
	if (7-abs(textUV.y)>0) return snoiseColor*0.1;

	return hsv2rgb(vec3(
		textUV.x*0.99 - textUV.y*0.98 - iGlobalTime*0.2,
		0.9, 0.9
	));
}

float getProceduralFragmentWithPosition(inout ProceduralFragmentWithPosition frag) {
   	vec3 color = getColor(_position.xy);

   	//frag.position = rayPos;
	frag.emissive = color;
	frag.diffuse = vec3(0);
	frag.specular = vec3(0);
	frag.roughness = 0;
	return 0;
}