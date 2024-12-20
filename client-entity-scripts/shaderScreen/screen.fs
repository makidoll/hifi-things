/*
{
	"ProceduralEntity": {
		"shaderUrl": "https://hifi.maki.cafe/client-entity-scripts/shaderScreen/screen.fs",
		"channels": ["resource://spectatorCameraFrame"],
		"version": 3
	}
}
*/

uniform float ratioWidth = 16;
uniform float ratioHeight = 9;

float getProceduralFragment(inout ProceduralFragment frag) {
	vec2 uv = _position.xy+0.5;
	//uv.x *= 0.5; // left eye
	//uv.x += cam_getStereoSide()*0.5; // right eye

	float width = ratioWidth*9;
	float height = ratioHeight*16;

	if (width>height) {
		// crop height
		float screenSize = height/width;
		float borderSize = (1-screenSize)/2; 
		if (uv.y > 1-borderSize) discard;
		if (uv.y < borderSize) discard;
	} else {
		// crop width
		float screenSize = width/height;
		float borderSize = (1-screenSize)/2;
		if (uv.x > 1-borderSize) discard;
		if (uv.x < borderSize) discard;
	}

	vec3 color = texture(iChannel0, uv).rgb;

	frag.emissive = color;
	frag.normal = vec3(0);
	frag.diffuse = vec3(0);
	frag.specular = vec3(0);
	frag.occlusion = 0;
	frag.roughness = 1;
	frag.metallic = 1; // i dont know...
	return 0;
}