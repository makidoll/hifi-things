/*
{
	"ProceduralEntity": {
		"shaderUrl": "",
		"version": 4
	}
}
*/

#define maxSteps 48
#define accuracy 0.01
#define iTime iGlobalTime*1

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

float torus(vec3 p, vec2 t) {
	vec2 q = vec2(length(p.xz)-t.x,p.y);
	return length(q)-t.y;
}

float sphere(vec3 p, float r) {
	return length(p)-r;
}

vec2 rotate(vec2 p, float r) {
	return vec2(
		p[0]*cos(r) - p[1]*sin(r),
		p[1]*cos(r) + p[0]*sin(r)
	);
}

float scene(vec3 p) {
	//p.xz = rotate(p.xz, iTime*0.01);

	float s = snoise(vec3(floor(p.xz)*0.1, iTime*0.2))*0.4;
	p.y -= s;
	p.y -= sin(length(p*0.1)-iTime*1)*0.4;

	float repeat = 0.5;
	p.xz = mod(p.xz,repeat)-0.5*repeat;

	p.y -= -1;
	p.xz = rotate(p.xz, s*24-iTime*1);
	p.xy = rotate(p.xy, PI/2);

	return torus(p, vec2(0.15, 0.05));
	//return torus(p, vec2(0.2*s+0.1, 0.3*s));
	//return sphere(p, 0.2);
}

vec3 raymarch(vec3 rayOrigin, vec3 rayDir) {
	int raySteps = 0;
	float rayDist = 0;
	vec3 rayPos = rayOrigin;

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

vec3 estimateNormal(vec3 p) {
	return normalize(vec3(
		scene(vec3(p.x+accuracy, p.y, p.z)) - scene(vec3(p.x-accuracy, p.y, p.z)),
		scene(vec3(p.x, p.y+accuracy, p.z)) - scene(vec3(p.x, p.y-accuracy, p.z)),
		scene(vec3(p.x, p.y, p.z+accuracy)) - scene(vec3(p.x, p.y, p.z-accuracy))
	));
}

vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float getProceduralFragmentWithPosition(inout ProceduralFragmentWithPosition frag) {
	vec3 rayOrigin = getEyeWorldPos();
    vec3 worldPos = (iWorldOrientation * (_position.xyz*iWorldScale))+iWorldPosition;
    vec3 rayDir = normalize(worldPos-rayOrigin);

    vec3 rayPos = raymarch(rayOrigin, rayDir);
    //vec3 rayNormal = estimateNormal(rayPos);

    //float matcap = -dot(rayNormal, rayDir);

    // vec3 color = hsv2rgb(vec3(
    // 	(rayPos.x+rayPos.z)-iTime,
    // 	1,
    // 	matcap
    // ));
    vec3 color = hsv2rgb(vec3(
    	rayPos.y*2 - iTime*0.1,
    	1,
    	1
    ));

    frag.position = rayPos;
	frag.emissive = color;
	frag.diffuse = vec3(1);
	frag.specular = vec3(0);
	frag.roughness = 0;
	return 1;
}