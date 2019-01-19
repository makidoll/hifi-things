var fs = require("fs");

let translations = [
	"tu", "hifi"
];

if (process.argv.length<4) {
	console.log("\n\033[1mnode translateDaeBones.js [.dae file] ["+translations.join(", ")+"]\033[0m\n");
	console.log("For armatures that have a Mixamo naming scheme.")
	return;
}

let daeFile = "";
let filename = process.argv[2];
try {
	daeFile = fs.readFileSync(filename, "utf8");
} catch(err) {
	console.log("Cannot read: "+filename);
	return;
}

let translateTo = process.argv[3].toLowerCase();
if (!translations.includes(translateTo)) {
	console.log("Translation not supported: "+translateTo);
}

let bones = {
"Hips": 		{tu: "pelvis"},
// right leg
"RightUpLeg": 	{tu: "thigh_r"},
"RightLeg": 	{tu: "calf_r"},
"RightFoot": 	{tu: "foot_r"},
"RightToeBase": {tu: "ball_r"},
// left leg
"LeftUpLeg": 	{tu: "thigh_l"},
"LeftLeg": 		{tu: "calf_l"},
"LeftFoot": 	{tu: "foot_l"},
"LeftToeBase": 	{tu: "ball_l"},
// spine head
"Spine": 		{tu: "spine_01"},
"Spine1": 		{tu: "spine_02"},
"Spine2": 		{tu: "spine_03"},
"Neck": 		{tu: "neck_01"},
"Head": 		{tu: "head"},
// right arm
"RightShoulder": 	{tu: "clavicle_r"},
"RightArm": 		{tu: "upperarm_r"},
"RightForeArm": 	{tu: "lowerarm_r"},
"RightHand": 		{tu: "hand_r"},
// right hand
"RightHandThumb1": 	{tu: "thumb_01_r"},
"RightHandThumb2": 	{tu: "thumb_02_r"},
"RightHandThumb3": 	{tu: "thumb_03_r"},

"RightHandIndex1": 	{tu: "index_01_r"},
"RightHandIndex2": 	{tu: "index_02_r"},
"RightHandIndex3": 	{tu: "index_03_r"},

"RightHandMiddle1": {tu: "middle_01_r"},
"RightHandMiddle2": {tu: "middle_02_r"},
"RightHandMiddle3": {tu: "middle_03_r"},

"RightHandRing1": 	{tu: "ring_01_r"},
"RightHandRing2": 	{tu: "ring_02_r"},
"RightHandRing3": 	{tu: "ring_03_r"},

"RightHandPinky1": 	{tu: "pinky_01_r"},
"RightHandPinky2": 	{tu: "pinky_02_r"},
"RightHandPinky3": 	{tu: "pinky_03_r"},
// left arm
"LeftShoulder": 	{tu: "clavicle_l"},
"LeftArm": 			{tu: "upperarm_l"},
"LeftForeArm": 		{tu: "lowerarm_l"},
"LeftHand": 		{tu: "hand_l"},
// left hand
"LeftHandThumb1": 	{tu: "thumb_01_l"},
"LeftHandThumb2": 	{tu: "thumb_02_l"},
"LeftHandThumb3": 	{tu: "thumb_03_l"},

"LeftHandIndex1": 	{tu: "index_01_l"},
"LeftHandIndex2": 	{tu: "index_02_l"},
"LeftHandIndex3": 	{tu: "index_03_l"},

"LeftHandMiddle1": 	{tu: "middle_01_l"},
"LeftHandMiddle2": 	{tu: "middle_02_l"},
"LeftHandMiddle3": 	{tu: "middle_03_l"},

"LeftHandRing1": 	{tu: "ring_01_l"},
"LeftHandRing2": 	{tu: "ring_02_l"},
"LeftHandRing3": 	{tu: "ring_03_l"},

"LeftHandPinky1": 	{tu: "pinky_01_l"},
"LeftHandPinky2": 	{tu: "pinky_02_l"},
"LeftHandPinky3": 	{tu: "pinky_03_l"},
}

Object.keys(bones).reverse().forEach((boneName, i)=>{
	daeFile = daeFile.replace(/mixamorig[_:]/g, "");

	switch (translateTo) {
		case "hifi": break;
		default:
			daeFile = daeFile.replace(
				new RegExp(boneName, "gi"),
				bones[boneName][translateTo]
			);
		break;
	}
});

filename = filename.split("."); filename.pop();
filename = filename.join(".")+"."+translateTo+".dae";
fs.writeFileSync(filename, daeFile);
console.log("Saved file to: "+filename);