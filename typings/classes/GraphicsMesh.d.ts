type forEachVertexCallback = (
	attributes: Record<Graphics.BufferTypeName, Graphics.BufferType>,
	index: number,
	properties: object,
) => any;

type updateVertexAttributesCallback = (
	attributes: Record<Graphics.BufferTypeName, Graphics.BufferType>,
	index: number,
	properties: object,
) => Record<Graphics.BufferTypeName, Graphics.BufferType> | boolean;

declare class GraphicsMesh {
	readonly numParts: number;
	readonly parts: GraphicsMeshPart[];
	readonly numIndices: number;
	readonly numVertices: number;
	readonly numAttributes: number;
	readonly attributeNames: Graphics.BufferTypeName[];
	readonly valid: boolean;
	readonly strong: boolean;
	readonly extents: Graphics.MeshExtents;
	readonly bufferFormats: Record<
		Graphics.BufferTypeName,
		Graphics.BufferFormat
	>;

	addAttribute(
		name: Graphics.BufferTypeName,
		defaultValue: Graphics.BufferType,
	): number;
	cloneMesh(): GraphicsMesh;
	fillAttribute(
		name: Graphics.BufferTypeName,
		value: Graphics.BufferType,
	): number;
	findNearbyVertexIndicies(origin: Vec3, epsilon?: number): number;
	forEachVertex(callback: forEachVertexCallback): number;
	getIndices(): number[];
	getParentModel(): GraphicsModel;
	getVertexAttributes(
		index: number,
	): Record<Graphics.BufferTypeName, Graphics.BufferType>;
	getVertexProperty(
		index: number,
		name: Graphics.BufferTypeName,
	): Graphics.BufferType;
	isValidIndex(index: number, attribute?: Graphics.BufferTypeName): boolean;
	queryVertexAttributes(name: Graphics.BufferTypeName): Graphics.BufferType[];
	removeAttribute(name: Graphics.BufferTypeName): boolean;
	setVertexAttributes(
		index: number,
		values: Record<Graphics.BufferTypeName, Graphics.BufferType>,
	): boolean;
	setVertexProperty(
		index: number,
		name: Graphics.BufferTypeName,
		value: Graphics.BufferType,
	): boolean;
	updateVertexAttributes(callback: updateVertexAttributesCallback): number;
}
