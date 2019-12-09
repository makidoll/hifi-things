declare namespace Quat {
	var IDENTITY: Quat;

	function angle(q: Quat): number;
	function angleAxis(angle: number, axis: Vec3): Quat;
	function axis(q: Quat): Vec3;
	function cancelOutRoll(orientation: Quat): Quat;
	function cancelOutRollAndPitch(orientation: Quat): Quat;
	function conjugate(orientation: Quat): Quat;
	function dot(q1: Quat, q2: Quat): number;
	function equal(q1: Quat, q2: Quat): boolean;
	function fromPitchYawRollDegrees(pitch: number, yaw: number, roll: number): Quat;
	function fromPitchYawRollRadians(pitch: number, yaw: number, roll: number): Quat;
	function fromVec3Degrees(vector: Vec3): Quat;
	function fromVec3Radians(vector: Vec3): Quat;
	function getForward(orientation: Quat): Vec3;
	function getFront(orientation: Quat): Vec3;
	function getRight(orientation: Quat): Vec3;
	function getUp(orientation: Quat): Vec3;
	function inverse(q: Quat): Quat;
	function lookAt(eye: Vec3, target: Vec3, up: Vec3): Quat;
	function lookAtSimple(eye: Vec3, target: Vec3): Quat;
	function mix(q1: Quat, q2: Quat, alpha: number): Quat;
	function multiply(q1: Quat, q2: Quat): Quat;
	function normalize(q: Quat): Quat;
	function print(label: string, q: Quat, asDegrees?: boolean): void;
	function rotationBetween(v1: Vec3, v2: Vec3): Quat;
	function safeEulerAngles(orientation: Quat): Vec3;
	function slerp(q1: Quat, q2: Quat, alpha: number): Quat;
	function squad(q1: Quat, q2: Quat, s1: Quat, s2: Quat, alpha: number): Quat;
}