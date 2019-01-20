/*
on a cube sized 2, 0.001, 3

{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/portal.fs",
		"channels": ["https://hifi.maki.cat/shaders/my-room.jpg"],
		"version": 2
	}
}
*/

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec2 uv = _position.xy;

	//vec2 nUv = uv*12;
	vec2 nUv = vec2(uv.x, uv.y*3/2)*12;
	float n = snoise(vec3(nUv, 
		(sin(iGlobalTime)+(iGlobalTime*3))*0.2
	));
	n = (n+1)*0.5; // 0 to 1

	float d = length(uv*2); // 0 to 1 in a circle

	// higher pow means more edge
	if (n+pow(d, 
		((sin(iGlobalTime)+3)*4)-3
	)>1) discard;

	// correct the uv and make image swirl
	vec2 iUv = uv-0.5;
	iUv.y *= -1; 

	float swirliness = (n-0.5)*0.015;
	iUv += swirliness;
	vec3 color = texture(iChannel0, iUv.xy).rgb;

	if (length(uv + swirliness*16)>0.4) {
		color += vec3(1)*0.2;
	}

	diffuse = color;
	specular = vec3(0);
	shininess = 0.5;
	return 1.0;
}