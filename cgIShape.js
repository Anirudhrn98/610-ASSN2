//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//
function makeCube (subdivisions)  {

    if( subdivisions < 1 )
        subdivisions = 1;

	 step = 1 /  subdivisions;

	for ( i = 0; i < subdivisions; i++) {
		u0 = i * step - .5;
		 u1 = (i + 1) * step - .5;
		for ( j = 0; j < subdivisions; j++) {
			 v0 = j * step - .5;
			 v1 = (j + 1) * step - .5;
       // face (x,-.5,z) drawn clockwise
      addTriangle(u1, -.5, v0, u0, -.5, v1, u0, -.5, v0);
      addTriangle(u1, -.5, v0, u1, -.5, v1, u0, -.5, v1);
      // face (x,.5,z) drawn counterclockwise
      addTriangle(u0, .5, v1, u1, .5, v0, u0, .5, v0);
      addTriangle(u1, .5, v1, u1, .5, v0, u0, .5, v1);
			// face (x,y,-.5) drawn clockwise
			addTriangle(u1, v0, -.5, u0, v0, -.5, u0, v1, -.5);
			addTriangle(u1, v0, -.5, u0, v1, -.5, u1, v1, -.5);
			// face (x,y,.5) drawn counterclockwise
			addTriangle(u0, v0, .5, u1, v0, .5, u0, v1, .5);
			addTriangle(u0, v1, .5, u1, v0, .5, u1, v1, .5);
			// face (-.5,y,z) drawn counterclockwise
			addTriangle(-.5, u0, v1, -.5, u1, v0, -.5, u0, v0);
			addTriangle(-.5, u1, v1, -.5, u1, v0, -.5, u0, v1);
			// face (.5,y,z) drawn clockwise
			addTriangle(.5, u1, v0, .5, u0, v1, .5, u0, v0);
			addTriangle(.5, u1, v0, .5, u1, v1, .5, u0, v1);


		}
	}


}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder(radialdivision, heightdivision) {
    radius=0.5
    if( radialdivision < 3 )
        radialdivision = 3;

    if( heightdivision < 1 )
        heightdivision = 1;

	const  PI = 3.14159265358979;
	 alpha = 0,
		y0 = -.5
	for ( i = 0; i < radialdivision; i++) {
		// we compute the coordinates of the triangle MON,
		// where M(x0,+/-.5,z0), O(0,+/-.5,0) and N(x1,+/-.5,z1)
		x0 = radius * Math.cos(i * 2 * PI / radialdivision);
		z0 = radius * Math.sin(i * 2 * PI / radialdivision);
		x1 = radius * Math.cos((i+1) * 2 * PI / radialdivision);
		z1 = radius * Math.sin((i+1) * 2 * PI / radialdivision);

		// face (x,-.5,z) drawn clockwise
		addTriangle(0., -.5, 0., x0, -.5, z0, x1, -.5, z1);
		// face (x,5,z) drawn counterclockwise
		addTriangle(x1, .5, z1, x0, .5, z0, 0., .5, 0.);

		// draw the rectangles for the height
		for ( j = 0; j < heightdivision; j++) {
			y0 = (j) / heightdivision - .5;
			y1 = (j + 1) / heightdivision -.5;
			addTriangle(x0, y1, z0, x1, y1, z1, x0, y0, z0);
			addTriangle(x1, y1, z1, x1, y0, z1, x0, y0, z0);
		}
	}
}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone(radialdivision, heightdivision) {
    radius=0.5
    if( radialdivision < 3 )
        radialdivision = 3;

    if( heightdivision < 1 )
        heightdivision = 1;

	const  PI = 3.14159265358979;

	for (i = 0; i < radialdivision; i++) {

		 x0 = radius * Math.cos(i * 2 * PI / radialdivision);
		 z0 = radius * Math.sin(i * 2 * PI / radialdivision);
		 x1 = radius * Math.cos((i + 1) * 2 * PI / radialdivision);
		 z1 = radius * Math.sin((i + 1) * 2 * PI / radialdivision);


		addTriangle(x0, -0.5, z0, x1, -0.5, z1, 0.0, -0.5, 0.0);

		 y0 = -0.5;
		 cx0 = -x0 / heightdivision;
		 cz0 = -z0 / heightdivision;
		 cx1 = -x1 / heightdivision;
		 cz1 = -z1 / heightdivision;
		 y1 = 1.0 / heightdivision;

		for (j = 0; j < heightdivision - 1; j++) {

			addTriangle(x0, y0, z0, x0+cx0, y0+y1, z0+cz0, x1, y0, z1);
			addTriangle(x0+cx0, y0+y1, z0+cz0, x1+cx1, y0+y1, z1+cz1, x1, y0, z1);

			x0 += cx0;
			z0 += cz0;
			x1 += cx1;
			z1 += cz1;
			y0 += y1;
		}


		addTriangle(x0, y0, z0, 0.0, 0.5, 0.0, x1, y0, z1);
	}
}

//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    if (slices < 1)
		slices = 1;
	if (slices > 5)
		slices = 5;

	if (stacks < 3)
		stacks = 3;

    radius=0.5
    a = radius;

	Triangle_draw(0, a, -1, -a, 1, 0, a, 1, 0, slices, radius);

	Triangle_draw(0, a, 1, a, 1, 0, -a, 1, 0, slices, radius);

	Triangle_draw(0, a, 1, -1, 0, a, 0, -a, 1, slices, radius);

	Triangle_draw(0, a, 1, 0, -a, 1, 1, 0, a, slices, radius);

	Triangle_draw(0, a, -1, 1, 0, -a, 0, -a, -1, slices, radius);

	Triangle_draw(0, a, -1, 0, -a, -1, -1, 0, -a, slices, radius);

	Triangle_draw(0, -a, 1, -a, -1, 0, a, -1, 0, slices, radius);

	Triangle_draw(0, -a, -1, a, -1, 0, -a, -1, 0, slices, radius);
	Triangle_draw(-a, 1, 0, -1, 0, -a, -1, 0, a, slices, radius);

	Triangle_draw(-a, -1, 0, -1, 0, a, -1, 0, -a, slices, radius);

	Triangle_draw(a, 1, 0, 1, 0, a, 1, 0, -a, slices, radius);

	Triangle_draw(a, -1, 0, 1, 0, -a, 1, 0, a, slices, radius);

	Triangle_draw(0, a, 1, -a, 1, 0, -1, 0, a, slices, radius);

	Triangle_draw(0, a, 1, 1, 0, a, a, 1, 0, slices, radius);

	Triangle_draw(0, a, -1, -1, 0, -a, -a, 1, 0, slices, radius);

	Triangle_draw(0, a, -1, a, 1, 0, 1, 0, -a, slices, radius);

	Triangle_draw(0, -a, -1, -a, -1, 0, -1, 0, -a, slices, radius);

	Triangle_draw(0, -a, -1, 1, 0, -a, a, -1, 0, slices, radius);

	Triangle_draw(0, -a, 1, -1, 0, a, -a, -1, 0, slices, radius);

	Triangle_draw(0, -a, 1, a, -1, 0, 1, 0, a, slices, radius);
}



function Triangle_draw(x0, y0, z0, x1,y1, z1, x2,  y2,  z2,  subdivision, radius)
{
	if (subdivision == 1)
	{
		//Normalization of the point 0
		 norm0 = Math.pow((Math.pow(x0, 2) + Math.pow(y0, 2) + Math.pow(z0, 2)), 0.5);
		x0 = (x0 / norm0) * radius;
		y0 = (y0 / norm0) * radius;
		z0 = (z0 / norm0) * radius;
		//Normalization of the point 1
		norm1 = Math.pow((Math.pow(x1, 2) + Math.pow(y1, 2) + Math.pow(z1, 2)), 0.5);
		x1 = (x1 / norm1) * radius;
		y1 = (y1 / norm1) * radius;
		z1 = (z1 / norm1) * radius;
		//Normalization of the point 2
		norm2 = Math.pow((Math.pow(x2, 2) + Math.pow(y2, 2) + Math.pow(z2, 2)), 0.5);
		x2 = (x2 / norm2) * radius;
		y2 = (y2 / norm2) * radius;
		z2 = (z2 / norm2) * radius;
		addTriangle(x0, y0, z0, x1, y1, z1, x2, y2, z2);
	}
	else
	{
		//Calculate the point on the middle of the edge point0 - point1
		midx01 = (x0 + x1) / 2.;
		midy01 = (y0 + y1) / 2.;
	     midz01 = (z0 + z1) / 2.;

		//Calculate the point on the middle of the edge point1 - point2
		 midx12 = (x1 + x2) / 2.;
		midy12 = (y1 + y2) / 2.;
		 midz12 = (z1 + z2) / 2.;

		//Calculate the point on the middle of the edge point2 - point0
		midx20 = (x0 + x2) / 2.;
		 midy20 = (y0 + y2) / 2.;
	     midz20 = (z0 + z2) / 2.;

		//Call 4 times (1 call per sub triangles created) the Triangle_draw method with subdivision-1,
		Triangle_draw(x0, y0, z0, midx01, midy01, midz01, midx20, midy20, midz20, (subdivision - 1), radius);
		Triangle_draw(midx01, midy01, midz01, midx12, midy12, midz12, midx20, midy20, midz20, (subdivision - 1), radius);
		Triangle_draw(midx01, midy01, midz01, x1, y1, z1, midx12, midy12, midz12, (subdivision - 1), radius);
		Triangle_draw(midx20, midy20, midz20, midx12, midy12, midz12, x2, y2, z2, (subdivision - 1), radius);
	}
}



////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {


    var nverts = points.length / 4;

    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;

    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++

    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}
