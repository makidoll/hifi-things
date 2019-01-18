/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cat/shaders/tv.fs",
		"version": 2,
		"channels": ["https://hifi.maki.cat/shaders/goats.jpg"],
		"uniforms": {
			"sqeeze": 6,
			"scale": 100,
			"brightness": 1,
			"jitterOffset": 0.02,
			"xShiftingSpeed": 0,
			"yShiftingSpeed": 0,
			"scanlineWidth": 0.1,
			"scanlineSpeed": 1,
			"scanlineOpacity": 0.02,
			"animWidth": 4,
			"animHeight": 6,
			"animFPS": 15,
			"animChannels": 1
		}
	},
	"grabbableKey": {
		"grabbable": false
	}
}
*/

uniform float sqeeze = 6;
uniform float scale = 100;
uniform float brightness = 1;
uniform float jitterOffset = 0.02;
uniform float xShiftingSpeed = 0;
uniform float yShiftingSpeed = 0;
uniform float scanlineWidth = 0.1;
uniform float scanlineSpeed = 1;
uniform float scanlineOpacity = 0.02;
uniform float animWidth = 4;
uniform float animHeight = 6;
uniform float animFPS = 15;
uniform float animChannels = 1;

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

vec3 getAnimationColor(vec2 uv) {
	uv.x += floor(mod(iGlobalTime*animFPS, animWidth));
	uv.y += floor(mod((iGlobalTime*animFPS)/animWidth, animHeight));

	uv.x /= animWidth;
	uv.y /= animHeight;

	if (animChannels==1) {
		return texture(iChannel0, uv).rgb;
	} else {
		float timePerChannel = animWidth*animHeight;
		float timeNow = mod(iGlobalTime*animFPS, timePerChannel*4);

		if (timeNow < timePerChannel*1) return texture(iChannel0, uv).rgb;
		if (timeNow < timePerChannel*2) return texture(iChannel1, uv).rgb;
		if (timeNow < timePerChannel*3) return texture(iChannel2, uv).rgb;
		if (timeNow < timePerChannel*4) return texture(iChannel3, uv).rgb;

		return vec3(0);
	}
}

void sqeezeUV(vec2 uv, float power) {
	if (power>0) {
		uv = (uv-0.5)*2; // -1 to 1
		uv.y = pow(abs(uv.y), power);
		if (length(uv)>1) discard;
	}
}

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec2 uv = (_position.xz+0.5);
	sqeezeUV(uv, sqeeze);
	//uv.x += sin(iGlobalTime*100)*jitter;
	//uv.y += cos(iGlobalTime*200)*jitter;

	// jittering on y through the x axis
	float jitterOffset = noise(vec2(uv.x*30, iGlobalTime*100))*jitterOffset;
	
	// shifting
	vec2 imageUV = uv;
	imageUV.x += iGlobalTime*xShiftingSpeed;
	imageUV.y += iGlobalTime*yShiftingSpeed + jitterOffset;
	imageUV = mod(imageUV,1);

	// animation color
	vec3 imageColor = getAnimationColor(floor(imageUV*scale)/scale);
	imageColor *= brightness;

	// scanline on animation color
	float scanline = mod(uv.y-iGlobalTime*scanlineSpeed, 1);
	if (scanline>0+jitterOffset && scanline<scanlineWidth+jitterOffset)
		imageColor = mix(imageColor, vec3(1), scanlineOpacity);

	// rgb pixel color 
	vec2 pixelUV = mod(uv*scale, 1);
	vec3 pixelColor = vec3(0,0,imageColor.b);
	if (pixelUV.x<0.666666) pixelColor = vec3(0,imageColor.g,0);
	if (pixelUV.x<0.333333) pixelColor = vec3(imageColor.r,0,0);
	pixelColor *= 4; // make it brighter

	// fading from animation to rgb pixel color (thanks @theepicsnail)
    vec3 worldScalePosition = _position.xyz * iWorldScale;
    vec3 eye = (inverse(iWorldOrientation) * (getEyeWorldPos() - iWorldPosition));
    float dist = length(worldScalePosition-eye);

    float pixelImageMix = dist-0.5;
    if (pixelImageMix<0) pixelImageMix = 0;
    if (pixelImageMix>0.7) pixelImageMix = 0.7;
	vec3 color = mix(pixelColor, imageColor, pixelImageMix);

	diffuse = color.rgb;
	specular = color.rgb;
	shininess = 0;
	return 1;
}