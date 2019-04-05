/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://cutelab.space/u/ZxmWQM.fs",
		"channels": ["resource://spectatorCameraFrame", "https://cutelab.space/u/jqKRan.png"],
		"version": 4
	},
	"grabbableKey": {"grabbable": false}
}
*/

#define maxSteps 96
#define accuracy 0.01
#define imageInscale 0.96

uniform int res = 4;

const float PI = 3.14159265359;

vec2 rotate(vec2 p, float r) {
	return vec2(
		p[0]*cos(r) - p[1]*sin(r),
		p[1]*cos(r) + p[0]*sin(r)
	);
}

// https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float plane(vec3 p, float y) {
	return abs(p.y-y);
}

float sphere(vec3 p, float s) {
  return length(p)-s;
}

float box(vec3 p, vec3 b) {
	vec3 d = abs(p) - b;
	return length(max(d,0.0))
		+ min(max(d.x,max(d.y,d.z)),0.0); // remove this line for an only partially signed sdf 
}

float plane(vec3 p, vec4 n) {
  // n must be normalized
  return dot(p,n.xyz) + n.w;
}

float verticalPlane(vec3 p, vec2 d) {
	if (p.x<-d.x) return 1000;
	if (p.x> d.x) return 1000;
	if (p.y<-d.y) return 1000;
	if (p.y> d.y) return 1000;
	return abs(p.z);
}

float dot2( in vec3 v ) { return dot(v,v); }
float quad( vec3 p, vec3 a, vec3 b, vec3 c, vec3 d ) {
    vec3 ba = b - a; vec3 pa = p - a;
    vec3 cb = c - b; vec3 pb = p - b;
    vec3 dc = d - c; vec3 pc = p - c;
    vec3 ad = a - d; vec3 pd = p - d;
    vec3 nor = cross( ba, ad );

    return sqrt(
    (sign(dot(cross(ba,nor),pa)) +
     sign(dot(cross(cb,nor),pb)) +
     sign(dot(cross(dc,nor),pc)) +
     sign(dot(cross(ad,nor),pd))<3.0)
     ?
     min( min( min(
     dot2(ba*clamp(dot(ba,pa)/dot2(ba),0.0,1.0)-pa),
     dot2(cb*clamp(dot(cb,pb)/dot2(cb),0.0,1.0)-pb) ),
     dot2(dc*clamp(dot(dc,pc)/dot2(dc),0.0,1.0)-pc) ),
     dot2(ad*clamp(dot(ad,pd)/dot2(ad),0.0,1.0)-pd) )
     :
     dot(nor,pa)*dot(nor,pa)/dot2(nor) );
}

// float scene(vec3 p) {
// 	p /= iWorldScale/2;

// 	float d = 9999;
// 	float disp = 0.5;

// 	vec2 uv = floor((p.xy*res)/2) / (res/2);

// 	disp = sin(uv.x*2 + iGlobalTime)*0.5 + 0.5;

// 	for (int y=0; y<res; y++) {
// 		for (int x=0; x<res; x++) {
		
// 			d = min(d, box(p-vec3(
// 				(float(x)/res * 2) - (float(res-1)/float(res)),
// 				(float(y)/res * 2) - (float(res-1)/float(res)),
// 				-1+disp
// 			), vec3(
// 				1/float(res),
// 				1/float(res),
// 				disp
// 			)));

// 		}
// 	}

// 	return d;
// }

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

float scene(vec3 p) {
	p /= iWorldScale/2;

	// float disp = sin(p.x*4 + iGlobalTime)*0.5 + 0.5;
	vec2 uv = (p.xy*imageInscale)*0.5 + 0.5;
	uv.x *= 0.5; uv.x += 0.5;
	//uv.y *= -1;
	vec3 tex = texture(iChannel0, uv).rgb;
	float disp = rgb2hsv(tex).r * 320/360;

	vec3 dispP = p;
	dispP.z -= disp;
	float width = 0.01; 
	return min(
		box(dispP-vec3(0,0,-1+width), vec3(1,1,width)),
		box(p-vec3(0,0,-1+width/2), vec3(1,1,width))
	);

	//disp = 1;
	// return box(p-vec3(
	// 	0, 0,
	// 	-1+disp
	// ), vec3(
	// 	1, 1,
	// 	disp
	// ));
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

vec3 estimateNormal(vec3 p) {
	return normalize(vec3(
		scene(vec3(p.x+accuracy, p.y, p.z)) - scene(vec3(p.x-accuracy, p.y, p.z)),
		scene(vec3(p.x, p.y+accuracy, p.z)) - scene(vec3(p.x, p.y-accuracy, p.z)),
		scene(vec3(p.x, p.y, p.z+accuracy)) - scene(vec3(p.x, p.y, p.z-accuracy))
	));
}

// https://github.com/theepicsnail/hifi/tree/master/shaders
float getProceduralFragmentWithPosition(inout ProceduralFragmentWithPosition frag) {
	//vec3 worldEye = getEyeWorldPos();
	//vec3 localPos = _position.xyz;
	//vec3 worldPos = (iWorldOrientation*(localPos*iWorldScale)) + iWorldPosition;
	//vec3 rayOrigin = getEyeWorldPos();
	//vec3 rayDir = normalize(worldPos-worldEye);
	vec3 rayOrigin = _position.xyz*iWorldScale;
	vec3 eye = (inverse(iWorldOrientation) * (getEyeWorldPos()-iWorldPosition));
	vec3 rayDir = normalize((rayOrigin - eye));

	vec3 rayPos = raymarch(rayOrigin, rayDir);
	//vec3 rayNormal = estimateNormal(rayPos);
	
	vec3 color = vec3(0);
	if (rayPos.z/iWorldScale.z > -0.485) {
		// left side colour
		vec2 uv = (rayPos.xy/iWorldScale.xy * imageInscale);
		uv += 0.5; uv.x *= 0.5;
		// correct kinect misalignment
		uv *= 0.9;
		uv.x += 0.02;
		uv.y += 0.01;
		// flip
		//uv.y *= -1;

		color = texture(iChannel0, uv).rgb;
	}
	
	frag.position = iWorldPosition + rayPos;
	frag.emissive = color;
	frag.normal = vec3(0);
	frag.diffuse = vec3(0);
	frag.specular = vec3(0);
	frag.roughness = 1;
	return 0;
}