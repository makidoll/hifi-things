let translations = [
	"hifi", "tu", "sl"
];

if (process.argv.length<4) {
	console.log("\n\033[1mnode translateDaeBones.js [.dae file] ["+translations.join(", ")+"]\033[0m\n");
	console.log("For armatures that have a Mixamo naming scheme.")
	return;
}

var fs = require("fs");

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
"Hips":         {tu: "pelvis", sl: "mPelvis"},
// right leg
"RightUpLeg":   {tu: "thigh_r", sl: "mHipRight"},
"RightLeg":     {tu: "calf_r",  sl: "mKneeRight"},
"RightFoot":    {tu: "foot_r",  sl: "mFootRight"},
"RightToeBase": {tu: "ball_r",  sl: "mToeRight"},
"RightToe":     {tu: "ball_r",  sl: "mToeRight"},
// left leg
"LeftUpLeg":    {tu: "thigh_l", sl: "mHipLeft"},
"LeftLeg":      {tu: "calf_l",  sl: "mKneeLeft"},
"LeftFoot":     {tu: "foot_l",  sl: "mFootLeft"},
"LeftToeBase":  {tu: "ball_l",  sl: "mToeLeft"},
"LeftToe":      {tu: "ball_l",  sl: "mToeLeft"},
// spine head
"Spine":        {tu: "spine_01", sl: "mTorso"},
"Spine1":       {tu: "spine_02", sl: "mSpine1"},
"Spine2":       {tu: "spine_03", sl: "mChest"},
"Neck":         {tu: "neck_01",  sl: "mNeck"},
"Head":         {tu: "head",     sl: "mHead"},
// eyes
"RightEye":     {tu: "eye_r", sl: "mEyeRight"},
"LeftEye":      {tu: "eye_l", sl: "mEyeLeft"},
// right arm
"RightShoulder":    {tu: "clavicle_r", sl: "mCollarRight"},
"RightArm":         {tu: "upperarm_r", sl: "mShoulderRight"},
"RightForeArm":     {tu: "lowerarm_r", sl: "mElbowRight"},
"RightHand":        {tu: "hand_r",     sl: "mWristRight"},
// right hand
"RightHandThumb1":  {tu: "thumb_01_r", sl: "mHandThumb1Right"},
"RightHandThumb2":  {tu: "thumb_02_r", sl: "mHandThumb2Right"},
"RightHandThumb3":  {tu: "thumb_03_r", sl: "mHandThumb3Right"},
"RightHandThumb4":  {tu: "thumb_04_r", sl: "mHandThumb4Right"},

"RightHandIndex1":  {tu: "index_01_r", sl: "mHandIndex1Right"},
"RightHandIndex2":  {tu: "index_02_r", sl: "mHandIndex2Right"},
"RightHandIndex3":  {tu: "index_03_r", sl: "mHandIndex3Right"},
"RightHandIndex4":  {tu: "index_04_r", sl: "mHandIndex4Right"},

"RightHandMiddle1": {tu: "middle_01_r", sl: "mHandMiddle1Right"},
"RightHandMiddle2": {tu: "middle_02_r", sl: "mHandMiddle2Right"},
"RightHandMiddle3": {tu: "middle_03_r", sl: "mHandMiddle3Right"},
"RightHandMiddle4": {tu: "middle_04_r", sl: "mHandMiddle4Right"},

"RightHandRing1":   {tu: "ring_01_r", sl: "mHandRing1Right"},
"RightHandRing2":   {tu: "ring_02_r", sl: "mHandRing2Right"},
"RightHandRing3":   {tu: "ring_03_r", sl: "mHandRing3Right"},
"RightHandRing4":   {tu: "ring_04_r", sl: "mHandRing4Right"},

"RightHandPinky1":  {tu: "pinky_01_r", sl: "mHandPinky1Right"},
"RightHandPinky2":  {tu: "pinky_02_r", sl: "mHandPinky2Right"},
"RightHandPinky3":  {tu: "pinky_03_r", sl: "mHandPinky3Right"},
"RightHandPinky4":  {tu: "pinky_04_r", sl: "mHandPinky4Right"},
// left arm
"LeftShoulder":     {tu: "clavicle_l", sl: "mCollarLeft"},
"LeftArm":          {tu: "upperarm_l", sl: "mShoulderLeft"},
"LeftForeArm":      {tu: "lowerarm_l", sl: "mElbowLeft"},
"LeftHand":         {tu: "hand_l",     sl: "mWristLeft"},
// left hand
"LeftHandThumb1":   {tu: "thumb_01_l", sl: "mHandThumb1Left"},
"LeftHandThumb2":   {tu: "thumb_02_l", sl: "mHandThumb2Left"},
"LeftHandThumb3":   {tu: "thumb_03_l", sl: "mHandThumb3Left"},
"LeftHandThumb4":   {tu: "thumb_04_l", sl: "mHandThumb4Left"},

"LeftHandIndex1":   {tu: "index_01_l", sl: "mHandIndex1Left"},
"LeftHandIndex2":   {tu: "index_02_l", sl: "mHandIndex2Left"},
"LeftHandIndex3":   {tu: "index_03_l", sl: "mHandIndex3Left"},
"LeftHandIndex4":   {tu: "index_04_l", sl: "mHandIndex4Left"},

"LeftHandMiddle1":  {tu: "middle_01_l", sl: "mHandMiddle1Left"},
"LeftHandMiddle2":  {tu: "middle_02_l", sl: "mHandMiddle2Left"},
"LeftHandMiddle3":  {tu: "middle_03_l", sl: "mHandMiddle3Left"},
"LeftHandMiddle4":  {tu: "middle_04_l", sl: "mHandMiddle4Left"},

"LeftHandRing1":    {tu: "ring_01_l", sl: "mHandRing1Left"},
"LeftHandRing2":    {tu: "ring_02_l", sl: "mHandRing2Left"},
"LeftHandRing3":    {tu: "ring_03_l", sl: "mHandRing3Left"},
"LeftHandRing4":    {tu: "ring_04_l", sl: "mHandRing4Left"},

"LeftHandPinky1":   {tu: "pinky_01_l", sl: "mHandPinky1Left"},
"LeftHandPinky2":   {tu: "pinky_02_l", sl: "mHandPinky2Left"},
"LeftHandPinky3":   {tu: "pinky_03_l", sl: "mHandPinky3Left"},
"LeftHandPinky4":   {tu: "pinky_04_l", sl: "mHandPinky4Left"},
}

Object.keys(bones).reverse().forEach((boneName, i)=>{
	daeFile = daeFile.replace(/mixamorig[_:]/g, "");

	switch (translateTo) {
		case "hifi": break;
		default:
			daeFile = daeFile.replace(
				new RegExp(boneName, "g"),
				bones[boneName][translateTo]
			);
		break;
	}
});

filename = filename.split("."); filename.pop();
filename = filename.join(".")+"."+translateTo+".dae";
fs.writeFileSync(filename, daeFile);
console.log("Saved file to: "+filename);