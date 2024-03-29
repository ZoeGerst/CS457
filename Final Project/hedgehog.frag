#version 330 compatibility


uniform vec4 uColor;
uniform float uTime;

const vec3 ORANGE = vec3(1., .5, .2);
const vec3 WHITE = vec3(1., 1., 1.);

out vec4 outputColor;

in vec4 gColor;
out vec4 Out_Color;

void
main( )
{
	//float a = uTime - int(uTime);
	//gl_FragColor = mix(vec4( ORANGE,  1. ), vec4(WHITE, 1.), a);
	
	//gl_FragColor = vec4( gColor.rgb, 1. );

	float lerpValue = gl_FragCoord.y / 500.0f;
    
    outputColor = mix(vec4(0.5f, 0.5f, 0.0f, 0.0f), vec4(0.2f, 1.0f, 0.2f, 0.25f), lerpValue);


	Out_Color = gColor;
}
