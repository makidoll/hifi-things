declare namespace Mat4 {
	function createFromArray(numbers: number[]): Mat4;
	function createFromColumns(col0: Vec4, col1: Vec4, col2: Vec4, col: Vec4): Mat4;
	function createFromRotAndTrans(rot: Quat, trans: Vec3): Mat4;
	function createFromScaleRotAndTrans(scale: Vec3, rot: Quat, trans: Vec3): Mat4;
	function extractRotation(m: Mat4): Vec3;
	function extractScale(m: Mat4): Vec3;
	function extractTranslation(m: Mat4): Vec3;
	function getForward(m: Mat4): Vec3;
	function getFront(m: Mat4): Vec3;
	function getRight(m: Mat4): Vec3;
	function getUp(m: Mat4): Vec3;
	function inverse(m: Mat4): Mat4;
	function multiply(m1: Mat4, m2: Mat4): Mat4;
	function print(label: string, m: Mat4, transpose?: boolean): void;
	function transformPoint(m: Mat4, point: Vec3): Vec3;
	function transformVector(m: Mat4, vector: Vec3): Vec3;
}