#version 330 compatibility

out vec3 vTnorm;
out vec4 vColor;

void
main( )
{ 
	 
	vTnorm = normalize(gl_NormalMatrix * gl_Normal);
	vColor = vec4(1.0, 0.0, 0.0, 1.0);
	gl_Position = gl_ModelViewMatrix * gl_Vertex;
	
}
