#version 330 compatibility

uniform float	uLightX;
uniform float	uLightY;
uniform float	uLightZ;
out  vec3  vMC;		// texture coords
out  vec3  vN;		// normal vector
out  vec3  vL;		// vector from point to light
out  vec3  vE;		// vector from point to eye
uniform float uK, uP, uY0;

vec3 LightPosition = vec3(  uLightX, uLightY, uLightZ );


const float PI = 3.14159265;


void
main( )
{ 
	float z = uK * (uY0 - gl_Vertex.y) * sin(2. * PI * gl_Vertex.x / uP);

	vec4 vert = vec4(gl_Vertex.x, gl_Vertex.y, z, gl_Vertex.w);

	vec4 ECposition = gl_ModelViewMatrix * vert;

	float dzdx = uK * (uY0 - gl_Vertex.y) * (2. * PI/uP) * cos(2. * PI * gl_Vertex.x / uP);
	float dzdy = -uK * sin(2. * PI * gl_Vertex.x / uP);

	vN = normalize( gl_NormalMatrix * cross(vec3(1., 0., dzdx), vec3(0., 1., dzdy)) );	// normal vector
	vL = LightPosition - ECposition.xyz;		// vector from the point
							// to the light position
	vE = vec3( 0., 0., 0. ) - ECposition.xyz;		// vector from the point
							// to the eye position 

	vMC = vert.xyz;

	gl_Position = gl_ModelViewProjectionMatrix * vert;
}
