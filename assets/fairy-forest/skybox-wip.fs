#define maxSteps 48
#define accuracy 0.01

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

vec2 rotate(vec2 p, float r) {
	return vec2(
		p[0]*cos(r) - p[1]*sin(r),
		p[1]*cos(r) + p[0]*sin(r)
	);
}

float sphere(vec3 p, float r) {
	return length(p)-r;
}

float rotatingSphere(
	vec3 p, float sphereRadius,
	float height, float radius, float speed
) {
	vec3 spherePos = p;
	spherePos.y -= height;
	spherePos.xz = rotate(spherePos.xz, iGlobalTime*speed);
	spherePos.x -= radius;

	return sphere(spherePos, sphereRadius);
}

float scene(vec3 p) {
	//vec3 lp = p;
	//lp.x = mod(p.x,4)-0.5*4;
	//lp.z = mod(p.z,4)-0.5*4;

	return min(
		rotatingSphere(p, 16, 128, 128, 0.01),
		rotatingSphere(p, 16, 128, 64, 0.1)
	);
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
	float theta = acos(-dir.y/r);
	float phi = atan(dir.x, -dir.z);

	return fromLinear(texture(iChannel0, vec2(
		phi/TAU,
		1-theta/PI
   )).rgb);
}

vec3 getSkyboxColor() {
	vec3 rayOrigin = getEyeWorldPos();
	vec3 rayDir = normalize(_normal);

	float rayAccuracy;
	vec3 rayPos;
	raymarch(rayOrigin, rayDir, rayAccuracy, rayPos);

	vec3 color = getSkyboxImageColor(rayDir);
	if (rayAccuracy>accuracy) {
		//vec3 rayNormal = estimateNormal(rayPos);
		//vec3 reflectionDir = reflectionDir(rayDir, rayNormal);
		color = rayPos;
	}

	return color;
}