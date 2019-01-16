// {
// 	"ProceduralEntity": {
// 		"shaderUrl": "file:///D:/Users/Max/Desktop/tv.fs",
// 		"version": 2
// 	},
// 	"grabbableKey": {
// 		"grabbable": false
// 	}
// }

uniform float sqeeze = 4;
uniform float jitter = 0.0005;
uniform float scale = 100;
uniform float xShiftingSpeed = 0;
uniform float yShiftingSpeed = 0;
uniform float scanlineWidth = 0.1;
uniform float scanlineSpeed = 2;
uniform float scanlineOpacity = 0.1;
uniform float animWidth = 4;
uniform float animHeight = 6;
uniform float animFPS = 15;
uniform float animChannels = 1;

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
	uv = (uv-0.5)*2; // -1 to 1
	uv.y = pow(abs(uv.y), power);
	if (length(uv)>1) discard;
}

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec2 uv = (_position.xz+0.5);
	sqeezeUV(uv, sqeeze);
	uv.x += sin(iGlobalTime*100)*jitter;
	uv.y += cos(iGlobalTime*200)*jitter;

	vec2 imageUV = uv;
	imageUV.x += iGlobalTime*xShiftingSpeed;
	imageUV.y += iGlobalTime*yShiftingSpeed;
	imageUV = mod(imageUV,1);

	vec3 imageColor = getAnimationColor(floor(imageUV*scale)/scale);

	float scanline = mod(uv.y-iGlobalTime*scanlineSpeed, 1);
	if (scanline>0 && scanline<scanlineWidth)
		imageColor = mix(imageColor, vec3(1), scanlineOpacity);

	vec2 pixelUV = mod(uv*scale, 1);
	vec3 pixelColor = vec3(0,0,imageColor.b);
	if (pixelUV.x<0.666666) pixelColor = vec3(0,imageColor.g,0);
	if (pixelUV.x<0.333333) pixelColor = vec3(imageColor.r,0,0);

	//vec3 color = mix(pixelColor, imageColor, 0);
	vec3 color = pixelColor;

	diffuse = color.rgb;
	specular = color.rgb;
	shininess = 0;
	return 1;
}