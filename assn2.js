
function myLine (x1, y1, x2, y2)
{
  // insert your code here to draw a line from (x1, y1) to (x2, y2) 
  // using only calls to point().
  dy = y2 - y1
  dx = x2 - x1
  m = dy / dx
  if( x1 == x2 ){
    for( x=x1, y=y1; y <= y2; ++y ){
      point(x,y)
    }
  } else if ( (m>=0) && (m <= 1)){
    dE = 2 * dy
    dNE = 2 * (dy - dx)
    d = dE - dx
    for(x = x1, y = y1; x <= x2; ++x){
      point(x, y)
      if (d <= 0){
        d += dE
      } else{
        ++y;2
        d += dNE
      }
    }
  } else{
    dE = 2 * dy + 4 * dx
    dNE = 2 * dy
    d = 2 * dy + dx
    for( x=x1, y=y1; x <= x2; ++x ){
      point(x,y)
      if ( d<= 0 ){
        --y;
        d += dNE
      } else {
        d += dE
      }
    }
  }
}
  

function myTriangle (x0, y0, x1, y1, x2, y2)
{
  for (x= 0; x <=500 ; ++x ) {
    for (y = 0; y <= 500; ++y) {
      E1 = (x - x0) * (y1 - y0) - (y - y0) * (x1 -x0);
      E2 = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);
      E3 = (x -x2 ) * (y0 -y2) - (y - y2) * (x0 - x2);
      if (E1 >= 0 && E2 >= 0 && E3 >= 0){
        point (x,y);
      }  
      
      }
    }
  }


  
  // insert your code here to draw a triangle with vertices (x0, y0), (x1, y1) and (x2, y2) 
  // using only calls to point().
  
  // your code should implement the the algorithm presented in the video


// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

let doMine;
let scene;
let backgroundColor;

function setup () 
{
  createCanvas (500, 500);
  doMine = true;
  scene = 1;
  backgroundColor = color (150, 150, 150);
  background (backgroundColor);
}

function draw ()
{
  fill (0,0,0);
    if (doMine) text ("my solution", 20, 475);
    else text ("reference", 20, 475);
    
  if (scene == 1) doLines();
  if (scene == 2) doHouse();
  
}

function doHouse()
{
  if (!doMine) {
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (200, 300, 300, 200, 200, 200);
    triangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 255);
    stroke (0,0,255);
    triangle (200,200, 300, 200, 250, 150);
    stroke (0,255,0);
    fill (0,255,0);
    triangle (250, 300, 275, 300, 250, 250);
    triangle (275, 300, 275, 250, 250, 250);
  }
  else {
    fill (128, 0, 0);
    stroke (128,0,0);
    myTriangle (200, 300, 300, 200, 200, 200);
    myTriangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 128);
    stroke (0,0,128);
    myTriangle (200,200, 300, 200, 250, 150);
    stroke (0,128,0);
    fill (0,128,0);
    myTriangle (250, 300, 275, 300, 250, 250);
    myTriangle (275, 300, 275, 250, 250, 250);
  }
}

function doLines()
{
  if  (!doMine) {
    stroke (255, 255, 255);
    line (50, 250, 450, 250);
    line (250, 50, 250, 450);
    line (50, 450, 450, 50);
    line (50, 50, 450, 450);
  }
  else {
    stroke (0, 0, 0);
    myLine (50, 250, 450, 250);
    myLine (250, 50, 250, 450);
    myLine (50, 450, 450, 50);
    myLine (50, 50, 450, 450);
  }
}

function keyPressed()
{
  if (key == '1') 
  {
    background (backgroundColor);
    scene = 1;
  }
  
  if (key == '2') 
  {
    background (backgroundColor);
    scene = 2;
  }
  
  if (key == 'm') 
  {
    background (backgroundColor);
    doMine = !doMine;
  }
}