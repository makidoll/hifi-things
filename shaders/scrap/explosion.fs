/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/shaders/scrap/explosion.fs",
		"version": 3
	}
}
*/

#define maxSteps 48
#define accuracy 0.01

vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(100);
	for (int i = 0; i < 5; ++i) {
		v += a * noise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

float scene(vec3 p) {
	vec3 n = normalize(p);


	//float disp = sin(16*n.x)*sin(16*n.y)*sin(16*n.z)*0.1;
	//float disp = pnoise(n)+pnoise(n*2)+pnoise(n*3)+pnoise(n*4);
	float disp = fbm(p*3.4)*(pow(mod(iGlobalTime*0.4, 1)+0.4, 3)*0.6);

	return length(p) - (disp);
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

vec3 paletteFire(float d) {
    const vec3   yellow = vec3(1.7, 1.3, 1.0); // note that the color is "hot", i.e. has components >1
    const vec3   orange = vec3(1.0, 0.6, 0.0);
    const vec3      red = vec3(1.0, 0.0, 0.0);
    const vec3 darkgray = vec3(0.2, 0.2, 0.2);
    const vec3     gray = vec3(0.4, 0.4, 0.4);

    float x = max(0, min(1, d));
    if (x<0.25) return mix(gray, darkgray, x*4);
    if (x<0.5) return mix(darkgray, red, x*4-1);
    if (x<0.75) return mix(red, orange, x*4-2);

    return mix(orange, yellow, x*4-3);
}

float getProceduralFragment(inout ProceduralFragment frag) {
	vec3 rayOrigin = _position.xyz * iWorldScale;
	vec3 eye = (inverse(iWorldOrientation) * (getEyeWorldPos()-iWorldPosition));
	vec3 rayDir = normalize((rayOrigin - eye));

	vec3 rayPos = raymarch(rayOrigin, rayDir);
	//vec3 rayNormal = estimateNormal(rayPos);

	vec3 color = paletteFire(1-length(rayPos));

	//frag.position = rayPos;
	frag.emissive = color;
	frag.diffuse = vec3(0);
	frag.specular = vec3(0);
	frag.roughness = 1;
	return 0;
}