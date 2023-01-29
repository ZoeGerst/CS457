#version 330 compatibility

uniform float   uAd;		
uniform float   uBd;
uniform float uTol;		

in  vec2  vST;			// texture coords
in  vec3  vMCposition;						
in  float  vLightIntensity;	

const vec3 WHITE = vec3(1., 1., 1.);
const vec3 ORANGE = vec3(1., .5, .2);


void
main( )
{
	
	float Ar = uAd / 2.;
	float Br = uBd / 2.;
	float s = vST.s;
	float t = vST.t;
	int numins = int(s / uAd);
	int numint = int(t / uBd);

	float sc = (numins * uAd) + Ar;
	float tc = (numint * uBd) + Br;

	float results_of_ellipse_equation = (((s - sc) / Ar) * ((s - sc) / Ar)) + (((t - tc) / Br) * ((t - tc) / Br));

	float d = smoothstep( 1. - uTol, 1. + uTol, results_of_ellipse_equation );

	gl_FragColor = mix(vec4(vLightIntensity * ORANGE, 1.), vec4(vLightIntensity * WHITE, 1.), d);

}
