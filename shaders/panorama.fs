// {
// 	"ProceduralEntity": {
// 		"shaderUrl": "https://hifi.maki.cat/shaders/panorama.fs",
// 		"version": 2,
// 		"channels": [
// 			"https://hifi.maki.cat/shaders/my-room.jpg"
// 		],
// 		"grabbableKey": {
// 			"grabbable": false
// 		}
// 	}
// }

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

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
   	vec3 worldEye = getEyeWorldPos();
	vec3 localPos = _position.xyz;
   	vec3 worldPos = (iWorldOrientation*(localPos*iWorldScale)) + iWorldPosition;
	//vec3 rayOrigin = getEyeWorldPos();
	vec3 rayDir = normalize(worldPos-worldEye);

	vec3 color = getSkyboxImageColor(rayDir);

	diffuse = color;
	specular = vec3(0);
	shininess = 0.5;
	return 1;
}