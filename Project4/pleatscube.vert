#version 330 compatibility

uniform float uK, uP, uY0;

out vec3	vNs;
out vec3	vEs;
out vec3	vMC;


const float PI = 3.14159265;

void
main( )
{    

	float z = uK * (uY0 - gl_Vertex.y) * sin(2. * PI * gl_Vertex.x / uP);
	
	vec4 newVertex = vec4(gl_Vertex.x, gl_Vertex.y, z, gl_Vertex.w);
	

	vec4 ECposition = gl_ModelViewMatrix * newVertex;

	float dzdx = uK * (uY0 - gl_Vertex.y) * (2. * PI/uP) * cos(2. * PI * gl_Vertex.x / uP);
	float dzdy = -uK * sin(2. * PI * gl_Vertex.x / uP);
	vec3 xtangent = vec3(1., 0., dzdx);
	vec3 ytangent = vec3(0., 1., dzdy);

	vec3 newNormal = normalize(gl_NormalMatrix * cross(xtangent, ytangent));
	vNs = newNormal;
	vEs = ECposition.xyz - vec3( 0., 0., 0. ) ; 
	       		// vector from the eye position to the point
	vMC = newVertex.xyz;

	gl_Position = gl_ModelViewProjectionMatrix * newVertex;
}