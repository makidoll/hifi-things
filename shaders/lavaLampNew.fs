/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/shaders/lavaLampNew.fs",
		"version": 4,
		"uniforms": {
			"blobScale": 2,
			"blobDepth": 2,
			"blobSaturation": 0.8,
			"blobValue": 0.4,
			"blobMoveSpeed": 0.1,
			"hueSpeed": 0.05,
			"hueScale": 4,
			"background": "vec3(0,0,0)"
		}
	}
}
*/

uniform float blobScale = 2;
uniform float blobDepth = 2;
uniform float blobSaturation = 0.8;
uniform float blobValue = 0.4;
uniform float blobMoveSpeed = 0.1;
uniform float hueSpeed = 0.05;
uniform float hueScale = 4;
uniform vec3 background = vec3(0.0,0.0,0.0);

vec3 _mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 _mod289(vec4 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 _permute(vec4 x) { return _mod289(((x*34.0)+1.0)*x);}
vec4 _taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float _snoise(vec3 v){ const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);vec3 i  = floor(v + dot(v, C.yyy) );vec3 x0 =   v - i + dot(i, C.xxx) ;vec3 g = step(x0.yzx, x0.xyz);vec3 l = 1.0 - g;vec3 i1 = min( g.xyz, l.zxy );vec3 i2 = max( g.xyz, l.zxy );vec3 x1 = x0 - i1 + C.xxx;vec3 x2 = x0 - i2 + C.yyy; vec3 x3 = x0 - D.yyy;      i = _mod289(i); vec4 p = _permute( _permute( _permute(  i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));float n_ = 0.142857142857; vec3  ns = n_ * D.wyz - D.xzx;vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  vec4 x_ = floor(j * ns.z);vec4 y_ = floor(j - 7.0 * x_ );    vec4 x = x_ *ns.x + ns.yyyy;vec4 y = y_ *ns.x + ns.yyyy;vec4 h = 1.0 - abs(x) - abs(y);vec4 b0 = vec4( x.xy, y.xy );vec4 b1 = vec4( x.zw, y.zw );vec4 s0 = floor(b0)*2.0 + 1.0;vec4 s1 = floor(b1)*2.0 + 1.0;vec4 sh = -step(h, vec4(0.0));vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;vec3 p0 = vec3(a0.xy,h.x);vec3 p1 = vec3(a0.zw,h.y);vec3 p2 = vec3(a1.xy,h.z);vec3 p3 = vec3(a1.zw,h.w);vec4 norm = _taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));p0 *= norm.x;p1 *= norm.y;p2 *= norm.z;p3 *= norm.w;vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);m = m * m;return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 raymarch(vec3 rayOrigin, vec3 rayDir, out vec3 rayPos) { // returns color
	vec3 color = background;

	vec3 position = vec3(0,iGlobalTime*blobMoveSpeed,0);

	float rayStep = 0.02*blobScale;
	rayPos = rayOrigin;

	for (float i=0; i<blobDepth; i+=rayStep) {
		rayPos += rayDir*rayStep;

		float dist = _snoise(rayPos*blobScale + position);

		//if (dist>0.5 && c>1) {
		if (dist>0.5) {
			break;
		}
	}

	float c = length(rayOrigin-rayPos);
	float inverseC = blobDepth-c;

	if (c>inverseC-0.0001) {
		discard;
		//rayPos = rayDir*1000;
		//return vec3(0);
	}

	vec3 col = hsv2rgb(vec3(mod(
			(-rayPos.y*hueScale*0.1) + ((0.2+iGlobalTime.x)*hueSpeed*3),
		1),
		blobSaturation, blobValue
	));

	return vec3(mix(background, col, inverseC));
}

// vec3 getLavalampColor() {
// 	// big thanks to Snail! https://github.com/theepicsnail/hifi/tree/master/shaders
// 	vec3 worldEye = getEyeWorldPos();
// 	//vec3 worldPos =  (iWorldOrientation * (localPos*iWorldScale)) + iWorldPosition;
//     vec3 ro = _position.xyz * iWorldScale;
//     vec3 eye = (inverse(iWorldOrientation) * (worldEye - iWorldPosition)) ;
//     vec3 rd = normalize((ro - eye));	


// 	float c = 4.0;

// 	for (float step=0.0; step<256.0; step+=1.0) {
// 		vec3 p =  _position.xyz+ro+((rd*0.1)*step);
// 		float d = snoise(p);
// 		if (d>0.4) {
// 			c = length(_position.xyz-p);
// 			break;
// 		}
// 	}

// 	return vec3(
// 		hsv2rgb(vec3(
// 			(c*0.4)*(iGlobalTime*0.2),
// 			1, 4.0-c
// 		))
// 	);
// }

float getProceduralFragmentWithPosition(inout ProceduralFragmentWithPosition frag) {
	vec3 eye = getEyeWorldPos();
	vec3 ro = (_position.xyz*iWorldScale*inverse(iWorldOrientation))+iWorldPosition;
	vec3 rd = normalize(ro - eye);

	vec3 rayPos;
	vec3 color = raymarch(ro-iWorldPosition, rd, rayPos);

	frag.position = rayPos+iWorldPosition;
	frag.emissive = color;
	frag.normal = vec3(0);
	frag.diffuse = vec3(0);
	frag.specular = vec3(0);
	frag.roughness = 1;
	return 0;
}