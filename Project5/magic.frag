#version 330 compatibility

uniform float   uSc, uTc, uDs, uDt, uRad, uT;
uniform float   uMagFactor;
uniform float   uRotAngle;
uniform float   uSharpFactor;
uniform sampler2D    uImageUnit;



in  vec2  vST;			// texture coords


void
main( )
{

	
	
	vec2 rotSt = vST;
	float ds = uDs;
	float dt = uDt;

	if(uT < 0.1){

		if((((vST.s - uSc) * (vST.s - uSc)) + ((vST.t - uTc) * (vST.t - uTc))) <= (uRad * uRad)){

			ivec2 ires = textureSize(uImageUnit, 0);

			rotSt.s = rotSt.s - uSc;
			rotSt.t = rotSt.t - uTc;
			rotSt.s = rotSt.s / uMagFactor;
			rotSt.t = rotSt.t / uMagFactor;

			float s = rotSt.s;
			float t = rotSt.t;
			rotSt.s = s * cos(uRotAngle) - t * sin(uRotAngle);
			rotSt.t = s * sin(uRotAngle) + t * cos(uRotAngle);
			rotSt.s = rotSt.s + uSc;
			rotSt.t = rotSt.t + uTc;
			
	
			
			float ResS = float(ires.s);
			float ResT = float(ires.t);
			vec2 stp0 = vec2(1. / ResS, 0.);
			vec2 st0p = vec2(0., 1. / ResT);
			vec2 stpp = vec2(1. / ResS, 1. / ResT);
			vec2 stpm = vec2(1. / ResS, -1. / ResT);

			vec3 i00    = texture2D( uImageUnit, rotSt ).rgb;
			vec3 im1m1  = texture2D( uImageUnit, rotSt - stpp ).rgb;
			vec3 ip1p1  = texture2D( uImageUnit, rotSt + stpp ).rgb;
			vec3 im1p1  = texture2D( uImageUnit, rotSt - stpm ).rgb;
			vec3 ip1m1  = texture2D( uImageUnit, rotSt + stpm ).rgb;
			vec3 im10   = texture2D( uImageUnit, rotSt - stp0 ).rgb;
			vec3 ip10   = texture2D( uImageUnit, rotSt + stp0 ).rgb;
			vec3 i0m1   = texture2D( uImageUnit, rotSt - st0p ).rgb;
			vec3 i0p1   = texture2D( uImageUnit, rotSt + st0p ).rgb;

			vec3 target = vec3(0., 0., 0.);
			target += 1.* (im1m1 + ip1m1 + ip1p1 + im1p1);
			target += 2.* (im10 + ip10 + i0m1 + i0p1);
			target += 4. * (i00);
			target /= 16.;

			gl_FragColor = vec4( mix( target, i00, uSharpFactor ), 1. );
			
	
		}
		else{
		
			gl_FragColor = vec4( texture2D(uImageUnit, rotSt).rgb,  1. );
		}
		
	}
	else{

		if(uSc - ds <= vST.s && vST.s <= uSc + ds && uTc - dt <= vST.t && vST.t <= uTc + dt){

			ivec2 ires = textureSize(uImageUnit, 0);
		
			rotSt.s = rotSt.s - uSc;
			rotSt.t = rotSt.t - uTc;
			rotSt.s = rotSt.s / uMagFactor;
			rotSt.t = rotSt.t / uMagFactor;

			float s = rotSt.s;
			float t = rotSt.t;
			rotSt.s = s * cos(uRotAngle) - t * sin(uRotAngle);
			rotSt.t = s * sin(uRotAngle) + t * cos(uRotAngle);
			rotSt.s = rotSt.s + uSc;
			rotSt.t = rotSt.t + uTc;
			


			float ResS = float(ires.s);
			float ResT = float(ires.t);
			vec2 stp0 = vec2(1. / ResS, 0.);
			vec2 st0p = vec2(0., 1. / ResT);
			vec2 stpp = vec2(1. / ResS, 1. / ResT);
			vec2 stpm = vec2(1. / ResS, -1. / ResT);

			vec3 i00    = texture2D( uImageUnit, rotSt ).rgb;
			vec3 im1m1  = texture2D( uImageUnit, rotSt - stpp ).rgb;
			vec3 ip1p1  = texture2D( uImageUnit, rotSt + stpp ).rgb;
			vec3 im1p1  = texture2D( uImageUnit, rotSt - stpm ).rgb;
			vec3 ip1m1  = texture2D( uImageUnit, rotSt + stpm ).rgb;
			vec3 im10   = texture2D( uImageUnit, rotSt - stp0 ).rgb;
			vec3 ip10   = texture2D( uImageUnit, rotSt + stp0 ).rgb;
			vec3 i0m1   = texture2D( uImageUnit, rotSt - st0p ).rgb;
			vec3 i0p1   = texture2D( uImageUnit, rotSt + st0p ).rgb;

			vec3 target = vec3(0., 0., 0.);
			target += 1.* (im1m1 + ip1m1 + ip1p1 + im1p1);
			target += 2.* (im10 + ip10 + i0m1 + i0p1);
			target += 4. * (i00);
			target /= 16.;

			gl_FragColor = vec4( mix( target, i00, uSharpFactor ), 1. );
		
		}

		else{
		
			gl_FragColor = vec4( texture2D(uImageUnit, rotSt).rgb,  1. );
		}

	}

	
}
