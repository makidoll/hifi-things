/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/shaders/birthdayHat.fs",
		"version": 3,
		"channels": [
			"https://hifi.maki.cafe/shaders/birthdayHat.png"
		]
	}
}
*/

vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float getProceduralFragment(inout ProceduralFragment frag) {

	vec3 pos = _position.xyz;
	pos.y *= 1.5;

	float s = snoise(pos*4 - vec3(0,-iGlobalTime*0.5,0));

	vec3 color = vec3(1);
	if (s>0) color = vec3(0.85);

	// texture
	float l = atan(pos.x, pos.z)/(3.141592*2);
	l += iGlobalTime*0.05;

	vec2 textUV = vec2(l, 0.25-_position.y*0.9)*2;
	if (textUV.y<1) { if (textUV.y>0) {
		vec4 text = texture(iChannel0, textUV).rgba;
		if (text.a>0.5) {
			s = snoise(pos*4 - vec3(0,-iGlobalTime*0.1,0));
			color = hsv2rgb(vec3(s*4,0.8,0.2));
		}
	}}


	// rainbow underneath
	s = snoise(pos*4 - vec3(0,iGlobalTime,0));
	if (pos.y+(s*0.1)<-0.5) {
		l += iGlobalTime*0.1;
		color = hsv2rgb(vec3(l,0.95,1));
	}

	frag.emissive = color;
	frag.normal = vec3(0);
	frag.diffuse = vec3(0);
	frag.specular = vec3(0);
	frag.roughness = 1;
	return 0;	
}