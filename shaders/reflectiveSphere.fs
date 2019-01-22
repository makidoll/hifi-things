/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/reflectiveSphere.fs",
		"channels": ["https://hifi.maki.cat/shaders/my-room.jpg"],
		"version": 2
	},
	"grabbableKey": {"grabbable": false}
}
*/

#define maxSteps 48
#define accuracy 0.01

uniform float scale = 1;
uniform float speed = 1;
uniform float height = 0.1;
uniform bool whiteWaves = true;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

float sphere(vec3 p, float r) {
	return length(p)-r;
}

float scene(vec3 p) {
	return sphere(p, 0.5);
}

// thanks 1001 from vrchat
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

// http://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/
vec3 estimateNormal(vec3 p) {
	return normalize(vec3(
		scene(vec3(p.x+accuracy, p.y, p.z)) - scene(vec3(p.x-accuracy, p.y, p.z)),
		scene(vec3(p.x, p.y+accuracy, p.z)) - scene(vec3(p.x, p.y-accuracy, p.z)),
		scene(vec3(p.x, p.y, p.z+accuracy)) - scene(vec3(p.x, p.y, p.z-accuracy))
	));
}

// https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
vec3 reflectionDir(vec3 dir, vec3 normal) {
	return dir - 2*(dot(dir,normal))*normal;
}

// https://makc3d.wordpress.com/2017/01/19/sampling-equirectangular-textures/
vec3 getSkyboxImageColor(vec3 dir) {
	float r = length(dir);
	float theta = acos(-dir.y/r);
	float phi = atan(dir.x, -dir.z);

	return texture(iChannel0, vec2(
		phi/TAU,
		1-theta/PI
   )).rgb;
}

// https://github.com/theepicsnail/hifi/tree/master/shaders
float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec3 rayOrigin = _position.xyz * iWorldScale;
	vec3 eye = (inverse(iWorldOrientation) * (getEyeWorldPos()-iWorldPosition));
	vec3 rayDir = normalize((rayOrigin - eye));

	vec3 rayPos = raymarch(rayOrigin, rayDir);
	vec3 rayNormal = estimateNormal(rayPos);
	vec3 reflectionDir = reflectionDir(rayDir, rayNormal);

	vec3 color = getSkyboxImageColor(reflectionDir);

	diffuse = color;
	specular = vec3(0);
	shininess = 0.5;
	return 1;
}