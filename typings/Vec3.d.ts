declare namespace Vec3 {
	function cross(v1: Vec3, v2: Vec3): Vec3;
	function distance(p1: Vec3, p2: Vec3): number;
	function dot(v1: Vec3, v2: Vec3): number;
	function equal(v1: Vec3, v2: Vec3): boolean;
	function fromPolar(elevation: number, azimuth: number): Vec3;
	function fromPolar(polar: Vec3): Vec3;
	function getAngle(v1: Vec3, v2: Vec3): number;
	function length(v: Vec3): number;
	function mix(v1: Vec3, v2: Vec3, factor: number): Vec3;
	function multiply(v: Vec3, scale: number): Vec3;
	function multiply(scale: number, v: Vec3): Vec3;
	function multiplyQbyV(q: Quat, v: Vec3): Vec3;
	function multiplyVbyV(v1: Vec3, v2: Vec3): Vec3;
	function normalize(v: Vec3): Vec3;
	function orientedAngle(v1: Vec3, v2: Vec3, ref: Vec3): number;
	function print(label: string, v: Vec3): void;
	function reflect(v: Vec3, normal: Vec3): Vec3;
	function subtract(v1: Vec3, v2: Vec3): Vec3;
	function sum(v1: Vec3, v2: Vec3): Vec3;
	function toPolar(p: Vec3): Vec3;
	function withinEpsilon(v1: Vec3, v2: Vec3, epsilon: number): boolean;
}