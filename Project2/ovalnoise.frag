#version 330 compatibility

uniform float uAd;		
uniform float uBd;
uniform float uTol;		
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uAlpha;
uniform sampler3D Noise3;

uniform bool uUseChromaDepth;
uniform float uChromaRed;
uniform float uChromaBlue;

in  vec2  vST;			// texture coords
in  vec3  vMCposition;			
in  vec4  vColor;			
in  float  vLightIntensity;	
in float Z;

const vec3 WHITE = vec3(1., 1., 1.);
const vec3 ORANGE = vec3(1., .5, .0);




void
main( )
{

	

	vec4 nv  = texture3D( Noise3, uNoiseFreq*vMCposition );

	float n = nv.r + nv.g + nv.b + nv.a;    //  1. -> 3.
	n = n - 2.;                             // -1. -> 1.
	n *= uNoiseAmp;
	
	float Ar = uAd / 2.;
	float Br = uBd / 2.;
	float s = vST.s;
	float t = vST.t;
	int numins = int(s / uAd);
	int numint = int(t / uBd);

	float sc = (numins * uAd) + Ar;
	float ds = vST.s - sc;
	float tc = (numint * uBd) + Br;
	float dt = vST.t - tc;                   // wrt ellipse center

	float oldDist = sqrt( ds*ds + dt*dt );
	float newDist = oldDist + n;
	float scale = newDist / oldDist;        // this could be < 1., = 1., or > 1.

	ds *= scale;
	ds /=Ar;
	dt *= scale;
	dt /= Br;



	float d = smoothstep( 1. - uTol, 1. + uTol, (ds * ds) + (dt * dt));

	

	gl_FragColor = mix(vec4(vLightIntensity * ORANGE, 1.), vec4(vLightIntensity * WHITE, uAlpha), d);

	if(gl_FragColor.a == 0){
	
		discard;
	
	}

}
