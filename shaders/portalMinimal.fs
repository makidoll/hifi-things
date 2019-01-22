/*
on a sphere sized 2, 3, 0.5

{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/portalMinimal.fs",
		"channels": ["https://hifi.maki.cat/shaders/my-room.jpg"],
		"version": 2
	}
}
*/

#define maxSteps 48
#define accuracy 0.01

vec3 getColor(vec2 uv) {
	//vec2 nUv = uv*12;
	vec2 nUv = vec2(uv.x, uv.y*3/2)*12;
	float n = snoise(vec3(nUv, 
		(sin(iGlobalTime)+(iGlobalTime*3))*0.2
	));
	n = (n+1)*0.5; // 0 to 1

	float d = length(uv*2); // 0 to 1 in a circle

	// higher pow means more edge
	// if (n+pow(d, 
	// 	((sin(iGlobalTime*16)+3)*4)-3
	// )>1) return vec3(1);
	if (n+pow(d, 10)>1) return vec3(1);

	// correct the uv and make image swirl
	vec2 iUv = uv-0.5;
	iUv.y *= -1; 

	float swirliness = (n-0.5)*0.015;
	iUv += swirliness;
	vec3 color = texture(iChannel0, iUv.xy).rgb;

	float swirlinessLength = length(uv + swirliness*16);
	if (swirlinessLength>0.3) { color += vec3(1)*0.1; }
	if (swirlinessLength>0.4) { color += vec3(1)*0.3; }

	return color;
}

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec3 color = getColor(_position.xy*0.525);

	diffuse = color;
	specular = vec3(0);
	shininess = 0.5;
	return 1.0;
}