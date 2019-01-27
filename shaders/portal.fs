/*
on a cube sized 2, 3, 0.5

{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/portal.fs",
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

// https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float ellipsoid(vec3 p, vec3 r) {
    float k0 = length(p/r);
    float k1 = length(p/(r*r));
    return k0*(k0-1.0)/k1;
}

float box(vec3 p, vec3 b) {
	vec3 d = abs(p) - b;
	return length(max(d,0.0))
         + min(max(d.x,max(d.y,d.z)),0.0); // remove this line for an only partially signed sdf 
}

float sphere(vec3 p, float s) { return length(p)-s; }

float portal(vec3 p) {
	float n = snoise(vec3(p.xy*12, 
		(sin(iGlobalTime)+(iGlobalTime*3))*0.2
	));

	p.xz += mix(0, n*0.12, length(p.xy));

	float portal = sphere(p, 0.5);
	portal = max(-sphere(p-vec3(0,0, 0.7), 0.5), portal);
	portal = max(-sphere(p-vec3(0,0,-0.7), 0.5), portal);
	return portal;
}

float scene(vec3 p) {
	p /= iWorldScale;

	return max(portal(p), sphere(p, 
		1-clamp(1-iGlobalTime*0.5, 0, 1)
	));
}

// thanks 1001 from vrchat
vec3 raymarch(vec3 rayOrigin, vec3 rayDir) {
		int raySteps = 0;
		float rayDist = 0;
		vec3 rayPos = rayOrigin;

		rayPos *= 1.05; // make slightly smaller
		rayPos.y += sin(iGlobalTime*2)*0.05; // moving up and down
		rayPos.z *= 0.8; // fit to bounding box

		for (raySteps=0; raySteps<maxSteps; raySteps++) { 
			float dist = scene(rayPos);
			rayPos += rayDir*dist;
			if (dist<accuracy) break;	
		}

		float c = (maxSteps-float(raySteps))/maxSteps;
		if (c<accuracy) discard;

		return rayPos;
		//return vec3(c);
}

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec3 rayOrigin = _position.xyz * iWorldScale;
	vec3 eye = (inverse(iWorldOrientation) * (getEyeWorldPos()-iWorldPosition));
	vec3 rayDir = normalize((rayOrigin - eye));

	vec3 rayPos = raymarch(rayOrigin, rayDir)/iWorldScale;

	vec3 color = getColor(rayPos.xy);

	diffuse = color;
	specular = vec3(0);
	shininess = 0.5;
	return 1.0;
}