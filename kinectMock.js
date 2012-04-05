self.onmessage = function(event) {
    var skeleton = getMockPlayerData();
    self.postMessage( JSON.stringify(skeleton) );
//    self.postMessage(skeleton.length);
//    self.postMessage(skeleton);
}

function getMockPlayerData() {
    var jointNames = ['handleft','handright'];
    var i = 0, max = jointNames.length, joints = [];
    for(; i < max; i+=1 ) {
	joints.push(mockJointData(jointNames[i]));
    }
    return joints;
}

function mockJointData(jointName) {
    var joint = {}, max = 8;
    joint.name = jointName;
    joint.x = Math.floor((Math.random()*max)+1) + .1;
    joint.y = Math.floor((Math.random()*max)+1) + .1;
    joint.z = Math.floor((Math.random()*max)+1) + .1;
    return joint;
}