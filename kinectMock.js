var setup = false;
var skeletonData = null;
var USE_MOCK_DATA_TILL_CONNECTION = true;
var USE_MOCK_DATA = true;
var MAX_CUBES = 6;

// Default Data till first kinect socket is filled
var gjoint = {};
gjoint.x = 0;
gjoint.y = 0;
gjoint.z = 0;
gjoint.name = 'test';
gjoint.length = 0;
gjoint.joints = [];
gjoint.joints.length = 0;

self.onmessage = function(event) {
    if( !setup ) {
	initKinect();
	setup = true;
    }
    
    if( USE_MOCK_DATA ) {
	var skeleton = getMockPlayerData();
        self.postMessage( JSON.stringify(skeleton) );
    } 
    else {
	var skeleton = getKinectData();
	self.postMessage( JSON.stringify(skeleton) );
    }
}

function initKinect() {
    // Initialize a new web socket.
    var socket = new WebSocket("ws://localhost:8181/KinectHtml5");

    // Receive data FROM the server!
    socket.onmessage = function (evt) {
	if(USE_MOCK_DATA_TILL_CONNECTION)
	    USE_MOCK_DATA = false;
        // Get the data in JSON format.
	var jsonObject = eval('(' + evt.data + ')');
	skeletonData = jsonObject;
	
        // Inform the server about the update.
        socket.send("Skeleton updated on: " + (new Date()).toDateString() + ", " + (new Date()).toTimeString());
    };
}

function getKinectData() {
    var jointNames = ['handright', 'handleft'];
    var i = 0, max = jointNames.length, joints = [];
    for(; i < max; i+=1 ) {
	joints.push(getDataForJoint(jointNames[i]));
    }
    return joints;
}

function getDataForJoint(jointId) {

    if(skeletonData === null) {
	return gjoint;
    }

    for (var i = 0; i < skeletonData.skeletons.length; i++) {
        for (var j = 0; j < skeletonData.skeletons[i].joints.length; j++) {
            var joint = skeletonData.skeletons[i].joints[j];
            if ( joint.name === jointId ) {
		return joint;
            }
        }
    }
}

// Mock Data Methods
function getMockPlayerData() {
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
