// {
// 	"ProceduralEntity": {
// 		"shaderUrl": "https://raw.githubusercontent.com/makitsune/hifi/master/shaders/lavalamp.fs",
// 		"version": 2,
// 		"grabbableKey": {
// 		  "grabbable": false
// 		}
// 	}
// }

vec4 getProceduralColor() {
	vec3 worldEye = ;
    vec3 ro = iWorldOrientation*(_position.xyz*iWorldScale)+iWorldPosition; // world position of the current fragment
   	vec3 rd = normalize(ro-getEyeWorldPos());

    return vec4(ro,1.0);
}

float getProceduralColors(inout vec3 diffuse, inout vec3 specular, inout float shininess) {
    //vec3 rayOrigin = _position.xyz;
    //vec3 eyePos = (inverse(iWorldOrientation)*(getEyeWorldPos()-iWorldPosition))/iWorldScale;
	//vec3 rayDir = normalize(rayOrigin-eyePos);
	
	vec4 color = getProceduralColor();
	diffuse = color.rgb;
	specular = color.rgb;
	shininess = 0.5;
	return 1.0;
}