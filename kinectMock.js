var setup = false;
var USE_MOCK_DATA = true;
var MAX_CUBES = 6;

self.onmessage = function(event) {

    if( USE_MOCK_DATA ) {
	var skeleton = getMockPlayerData();
        self.postMessage( JSON.stringify(skeleton) );
    } 
    else {
	if( !setup ) {
	    initKinect();
	    setup = true;
	}
	var skeleton = getKinectData();
	self.postMessage( JSON.stringify(skeleton) );
	return;
//	if( skeletonData !== null ) {
//	    self.postMessage( skeletonData );
//	}
//	return;
	if( skeletonData === null ) {
	    self.postMessage( JSON.stringify(skeleton) );
	} else {
	    self.postMessage( skeletonData );
	}
    }
}

function getKinectData() {
    var jointNames = ['handright', 'handleft'];
    var i = 0, max = jointNames.length, joints = [];
    for(; i < max; i+=1 ) {
	joints.push(getDataForJoint(jointNames[i]));
    }
    return joints;
}

var gjoint = {};
gjoint.x = 0;
gjoint.y = 0;
gjoint.z = 0;
gjoint.name = 'test';
gjoint.length = 0;
gjoint.joints = [];
gjoint.joints.length = 0;

var skeletonData = null;

function getDataForJoint(jointId) {

    // Display the skeleton joints.
    if(skeletonData === null) {
	return gjoint;
    }

    for (var i = 0; i < skeletonData.skeletons.length; i++) {
        for (var j = 0; j < skeletonData.skeletons[i].joints.length; j++) {
            var joint = skeletonData.skeletons[i].joints[j];
	    
            if ( joint.name === jointId ) {
		//                        x = Math.floor((parseFloat(joint.x) * 2 / (GLOBAL_WIDTH * GLOBAL_SQUARE_SIZE)) * (GLOBAL_WIDTH * GLOBAL_SQUARE_SIZE));
		//                        y = Math.floor((parseFloat(joint.y) * 2 / (GLOBAL_HEIGHT * GLOBAL_SQUARE_SIZE)) * (GLOBAL_HEIGHT * GLOBAL_SQUARE_SIZE));
		return joint;
//		gjoint.x = joint.x;
//		gjoint.y = joint.y;
//		gjoint.z = joint.z;
            }
        }
    }
    



    //var i = 0, max = skeletonData.joints.length;
//    for (; i < max; i+=1) {
//	var joint = skeletonData.joints[i];
//	if(joint.name == jointId)
//	    return joint;
//    }
}

function getMockPlayerData() {
//    var jointNames = ['handleft','handright'];
    var jointNames = ['handright'];
    var i = 0, max = jointNames.length, joints = [];
    for(; i < max; i+=1 ) {
	joints.push(mockJointData(jointNames[i]));
    }
    return joints;
}

function mockJointData(jointName) {
    var joint = {}, max = MAX_CUBES;
    joint.name = jointName;
    joint.x = Math.floor((Math.random()*max)+1) + .1;
    joint.y = Math.floor((Math.random()*max)+1) + .1;
    joint.z = Math.floor((Math.random()*max)+1) + .1;
    return joint;
}

function initKinect() {
    // Initialize a new web socket.
    var socket = new WebSocket("ws://localhost:8181/KinectHtml5");

    // Receive data FROM the server!
    socket.onmessage = function (evt) {
        // Get the data in JSON format.
	var jsonObject = eval('(' + evt.data + ')');
	skeletonData = jsonObject;
	
        // Inform the server about the update.
        socket.send("Skeleton updated on: " + (new Date()).toDateString() + ", " + (new Date()).toTimeString());
    };
}