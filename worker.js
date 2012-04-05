var setup = false;
var grid;
self.onmessage = function(event) {

//    self.postMessage(player);
    if( !setup ) {
	grid = init();
    }
    self.postMessage(JSON.stringify(grid));
    
//    console.log(event);
//    toggleCube(event);
//    self.postMessage('Hi');
//    self.postMessage(event);
}

function updateGridState(grid, skeleton) {
    return grid;
}

function init() {

    var x = 0, y = 0, z = 0, max = 8, cube, offset = 1, grid = [];
    for(; z < max; z+= 1) {
	y = 0;
	layer = [];
	for(; y < max; y+= 1) {
	    x = 0;
	    row = [];
	    for(; x < max; x+= 1) {
		cube = null;
		//cube = new THREE.Mesh( new THREE.CubeGeometry( .9,.9,.9 ), new THREE.MeshBasicMaterial() );
		cube = {
		    position: {
			x:0,
			y:0,
			z:0
		    },
		    material: {
			color: { 
			    r:0,
			    g:0,
			    b:0
			},
			opacity: 1,
			transparency: true
		    }
		}
		
		cube.position.y = y + offset;
		cube.position.x = x + offset;
		cube.position.z = z + offset;
		
		//cube.material.color = (new THREE.Color()).setRGB( 0, 0, 255 );
		cube.material.color = { r:0, g:0, b:255 };
		cube.material.transparent = true;
		cube.material.opacity = .1;

		//				var random = Math.floor((Math.random()*25)+1);
		//				if( random === 5) {
		//				    cube.material.transparent = false;
		//				    cube.material.opacity = 1;
		//				    cube.material.color = (new THREE.Color()).setRGB( 255, 0, 0 );
	    row.push(cube);
	    }
	    //scene.add(cube);
	    layer.push(row);
	}
	grid.push(layer);
    }
    return grid;
}


// have a thread here to collect kinect data
// process the kinect data into the model object and pass it back to the main thread through a message
// the format will be a long object of the on or off state

/*
  {
  'grid':
[


]


*/