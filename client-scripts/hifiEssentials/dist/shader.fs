// On a cube sized: 2, 1.5, 0
//
// {
// 	"ProceduralEntity": {
// 		"shaderUrl": "https://hifi.maki.cat/client-scripts/hifiEssentials/dist/shader.fs",
// 		"version": 2,
// 		"channels": [
// 			"https://hifi.maki.cat/client-scripts/hifiEssentials/dist/sakura0.png",
// 			"https://hifi.maki.cat/client-scripts/hifiEssentials/dist/sakura1.png",
// 			"https://hifi.maki.cat/client-scripts/hifiEssentials/dist/sakura2.png",
// 			"https://hifi.maki.cat/client-scripts/hifiEssentials/dist/sakura3.png"
// 		],
// 		"grabbableKey": {
// 			"grabbable": false
// 		}
// 	}
// }

#define animChannels 4
#define animWidth 4
#define animHeight 8
#define animFPS 16
#define bg vec3(29,31,33)/(255*8)

vec4 _permute(vec4 x){return mod((x*34.+1.)*x,289.);}vec4 _taylorInvSqrt(vec4 r){return 1.79284-.853735*r;}float _snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy)),x0=v-i+dot(i,C.xxx),g=step(x0.yzx,x0.xyz),l=1.-g,i1=min(g.xyz,l.zxy),i2=max(g.xyz,l.zxy),x1=x0-i1+C.xxx,x2=x0-i2+2.*C.xxx,x3=x0-1.+3.*C.xxx;i=mod(i,289.);vec4 p=_permute(_permute(_permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));float n_=1./7.;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z),x_=floor(j*ns.z),y_=floor(j-7.*x_),x=x_*ns.x+ns.yyyy,y=y_*ns.x+ns.yyyy,h=1.-abs(x)-abs(y),b0=vec4(x.xy,y.xy),b1=vec4(x.zw,y.zw),s0=floor(b0)*2.+1.,s1=floor(b1)*2.+1.,sh=-step(h,vec4(0.)),a0=b0.xzyw+s0.xzyw*sh.xxyy,a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x),p1=vec3(a0.zw,h.y),p2=vec3(a1.xy,h.z),p3=vec3(a1.zw,h.w);vec4 norm=_taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}

vec3 getAnimationColor(vec2 uv) {
	uv.x += floor(mod(iGlobalTime*animFPS, animWidth)); // shifting
	uv.y += floor(mod((iGlobalTime*animFPS)/animWidth, animHeight)); // shifting

	uv.x /= animWidth;
	uv.y /= animHeight;

	float timePerChannel = animWidth*animHeight;
	float timeNow = mod(iGlobalTime*animFPS, timePerChannel*animChannels);
	
	if (animChannels == 4) {
		if (timeNow < timePerChannel*1) return texture(iChannel0, uv).rgb;
		if (timeNow < timePerChannel*2) return texture(iChannel1, uv).rgb;
		if (timeNow < timePerChannel*3) return texture(iChannel2, uv).rgb;
		if (timeNow < timePerChannel*4) return texture(iChannel3, uv).rgb;
	}

	return vec3(0);
}

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec2 uv = _position.xy*2; // -1 to 1

	// get color
	vec2 cUv = (vec2(-uv.x,-uv.y)+1) * 0.5; // 0 to 1 from top left
	cUv.x = cUv.x*0.7 + 0; // shift uv to correct for image
	vec3 color = getAnimationColor(cUv);

	if (uv.y>0) {
		color = mix(color, bg, 0.4);
	} else {
		color = mix(color, bg, 0.9);
	}

	// noise allowance
	vec2 nUv = 1-abs(uv*2) * 1; // 0 to 1 to 0
	float nA = min(nUv.x, nUv.y);

	// noise
	float n = (snoise(vec3(
		uv.x*8, uv.y*6,
		iGlobalTime*0.2
	))+1) / 2;
	
	if (nA<0) {
		n += nA*1;
		if (n<0) discard;
	};

	// finishing
	diffuse = color;
	specular = color;
	shininess = 0.5;
	return 1.0;
}