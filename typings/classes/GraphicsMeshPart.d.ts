declare class GraphicsMeshPart {
	readonly valid: boolean;
	readonly partIndex: number;
	readonly firstVertexIndex: number;
	readonly baseVertexIndex: number;
	readonly lastVertexIndex: number;
	readonly topology: Graphics.MeshTopology;
	readonly numIndices: number;
	readonly numVertices: number;
	readonly numVerticesPerFace: number;
	readonly numFaces: number;
	readonly numAttributes: number;
	readonly attributeNames: Graphics.BufferTypeName[];
	readonly extents: Graphics.MeshExtents;
	readonly bufferFormats: Record<
		Graphics.BufferTypeName,
		Graphics.BufferFormat
	>;

	addAttribute(
		name: Graphics.BufferTypeName,
		defaultValue?: Graphics.BufferType,
	): number;
	cloneMeshPart(): GraphicsMeshPart;
	dedupeVertices(epsilon?: number): boolean;
	fillAttribute(
		name: Graphics.BufferTypeName,
		value: Graphics.BufferType,
	): number;
	findNearbyPartVertexIndices(origin: Vec3, epsilon?: number): number[];
	getFace(index: number): number[];
	getIndices(): number[];
	getParentMesh(): GraphicsMesh;
	getVertexProperty(
		index: number,
		name: Graphics.BufferTypeName,
	): Graphics.BufferType;
	getVertextAttributes(
		index: number,
	): Record<Graphics.BufferTypeName, Graphics.BufferType>;
	isValidIndex(index: number, attribute?: Graphics.BufferTypeName): boolean;
	replaceMeshPartData(
		source: GraphicsMeshPart,
		attributes?: Graphics.BufferTypeName[],
	): boolean;
	rotate(rotation: Quat, origin?: Vec3): Graphics.MeshExtents;
	rotateDegrees(eulerAngles: Vec3, origin?: Vec3): Graphics.MeshExtents;
	scale(scale: Vec3, origin?: Vec3): Graphics.MeshExtents;
	scaleToFit(scale: number): Graphics.MeshExtents;
	setIndices(indices: number[]): boolean;
	setVertexProperty(
		index: number,
		name: Graphics.BufferTypeName,
		value: Graphics.BufferType,
	): boolean;
	setVertextAttributes(
		index: number,
		value: Record<Graphics.BufferTypeName, Graphics.BufferType>,
	): boolean;
	toOBJ(): string;
	transform(transform: Mat4): Graphics.MeshExtents;
	translate(translation: Vec3): Graphics.MeshExtents;
	updateVertexAttributes(callback: updateVertexAttributesCallback): number;
}
