#define maxSteps 48
#define accuracy 0.01

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

float sphere(vec3 p, float r) {
	return length(p)-r;
}

float scene(vec3 p) {
	return sphere(p-vec3(0,24,0), 1);
}

// thanks 1001 from vrchat
void raymarch(vec3 rayOrigin, vec3 rayDir, out float rayAccuracy, out vec3 rayPos) {
	int raySteps = 0;
	float rayDist = 0;
	rayPos = rayOrigin;

	for (raySteps=0; raySteps<maxSteps; raySteps++) { 
		float dist = scene(rayPos);
		rayPos += rayDir*dist;
		if (dist<accuracy) break;	
	}

	rayAccuracy = (maxSteps-float(raySteps))/maxSteps;
	//if (rayAccuracy<accuracy) discrd;
}

// https://gamedev.stackexchange.com/questions/92015/optimized-linear-to-srgb-glsl
vec3 fromLinear(vec3 linearRGB) {
    bvec3 cutoff = lessThan(linearRGB, vec3(0.0031308));
    vec3 higher = vec3(1.055)*pow(linearRGB, vec3(1.0/2.4)) - vec3(0.055);
    vec3 lower = linearRGB * vec3(12.92);

    return mix(higher, lower, cutoff);
}

// https://makc3d.wordpress.com/2017/01/19/sampling-equirectangular-textures/
vec3 getSkyboxImageColor(vec3 dir) {
	float r = length(dir);
	float c = -dir.y/r;
	float theta = acos(c);
	float phi = atan(dir.x, -dir.z);

	return fromLinear(texture(iChannel0, vec2(
		phi/TAU,
		1-theta/PI
   ), -2*log2(1+c*c)).rgb);
}

vec3 getSkyboxColor() {
	//vec3 rayOrigin = getEyeWorldPos();
	vec3 rayDir = normalize(_normal);

	//float rayAccuracy;
	//vec3 rayPos;
	//raymarch(rayOrigin, rayDir, rayAccuracy, rayPos);

	vec3 color = getSkyboxImageColor(rayDir);
	// if (rayAccuracy>accuracy) {
	// 	//vec3 rayNormal = estimateNormal(rayPos);
	// 	//vec3 reflectionDir = reflectionDir(rayDir, rayNormal);
	// 	color = rayPos;
	// }

	return color;
}