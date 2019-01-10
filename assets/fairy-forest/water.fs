// {
// 	"ProceduralEntity": {
// 		"shaderUrl": "file:///D:/Git/hifi-things/shaders/fairy-forest/water.fs",
// 		"version": 2,
// 		"channels": [
// 			"https://maki.cat/hifi/models/makis-room2.jpg"
// 		],
// 		"grabbableKey": {
// 			"grabbable": false
// 		}
// 	}
// }

#define maxSteps 48
#define accuracy 0.01

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

// https://www.shadertoy.com/view/Ms2SD1
float hash( vec2 p ) {
	float h = dot(p,vec2(127.1,311.7));	
    return fract(sin(h)*43758.5453123);
}
float noise( in vec2 p ) {
    vec2 i = floor( p );
    vec2 f = fract( p );	
	vec2 u = f*f*(3.0-2.0*f);
    return -1.0+2.0*mix( mix( hash( i + vec2(0.0,0.0) ), 
                     hash( i + vec2(1.0,0.0) ), u.x),
                mix( hash( i + vec2(0.0,1.0) ), 
                     hash( i + vec2(1.0,1.0) ), u.x), u.y);
}

float sea_octave(vec2 uv, float choppy) {
    uv += noise(uv);        
    vec2 wv = 1.0-abs(sin(uv));
    vec2 swv = abs(cos(uv));    
    wv = mix(wv,swv,wv);
    return pow(1.0-pow(wv.x * wv.y,0.65),choppy);
}

// https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float plane(vec3 p, float y) {
	return abs(p.y-y);
}

float sphere(vec3 p, float r) {
	return length(p)-r;
}

float water(vec3 p, float y) {
	p.xz *= 0.5;

	p.x += sin(iGlobalTime*0.1);
	p.z += cos(iGlobalTime*0.1);

	//p.xz += length(p.xz+(iGlobalTime*4));

	//float n = snoise(p.xz + iGlobalTime*0.1);
	float n = snoise(vec3(p.x, iGlobalTime*0.2, p.z));

	n *= 0.1; // height
	
	return plane(p, y+n);
}

float scene(vec3 p) {
	//p.x = mod(p.x,2)-0.5*2;
	//p.z = mod(p.z,2)-0.5*2;

	//return sphere(p-vec3(-36,0,0), 1);
	//return plane(p, 0);
	return water(p, -1);
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
	//if (c<accuracy) discard;

	return rayPos;
	return vec3(c);
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
vec3 getSkyboxReflectionColor(vec3 dir) {
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
   	vec3 worldEye = getEyeWorldPos();
	vec3 localPos = _position.xyz;
   	vec3 worldPos = (iWorldOrientation*(localPos*iWorldScale)) + iWorldPosition;
	vec3 rayOrigin = getEyeWorldPos();
	vec3 rayDir = normalize(worldPos-worldEye);

	vec3 rayPos = raymarch(rayOrigin, rayDir);
	vec3 rayNormal = estimateNormal(rayPos);
	vec3 reflectionDir = reflectionDir(rayDir, rayNormal);

	vec3 color = getSkyboxReflectionColor(reflectionDir);
	float rayDist = distance(worldEye, worldPos);
	if (rayPos.y>-0.93) {
		color = color+(vec3(0.03)*clamp(1-rayDist/36, 0,1));
	}

	diffuse = color;
	specular = vec3(0);
	shininess = 0.5;
	return 1;
}