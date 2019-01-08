// {
// 	"ProceduralEntity": {
// 		"shaderUrl": "file:///D:/Git/hifi-things/shaders/fairy-forest/grass.fs",
// 		"version": 2,
// 		"channels": [
// 			"https://maki.cat/hifi/models/makis-room2.jpg"
// 		],
// 		"grabbableKey": {
// 			"grabbable": false
// 		}
// 	}
// }

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
	vec3 localPos = _position.xyz;
   	vec3 worldPos = (iWorldOrientation*(localPos*iWorldScale)) + iWorldPosition;

   	vec3 color = texture(iChannel0, worldPos.xz*0.1).rgb;

	diffuse = color;
	specular = vec3(0.5);
	shininess = 0;
	return 0.1;
}