declare namespace Graphics {
	// types

	interface BufferElementFormat {
		type: string;
		semantic: string;
		dimension: string;
		scalarCount: number;
		byteSize: number;
		BYTES_PER_ELEMENT: number;
	}

	interface BufferFormat {
		slot: number;
		length: number;
		byteLength: number;
		offset: number;
		stride: number;
	}

	type BufferType = Vec2 | Vec3 | Vec4;

	type BufferTypeName =
		| "position"
		| "normal"
		| "tangent"
		| "color"
		| "skin_cluster_index"
		| "skin_cluster_weight"
		| "texcoord0"
		| "texcoord1"
		| "texcoord2"
		| "texcoord3"
		| "texcoord4";

	interface IFSData {
		name: string;
		topology: MeshTopology;
		indices: number[];
		positions: Vec3[];
		normals: Vec3[];
		colors: Vec3[];
		texCoords0: Vec2[];
	}

	interface Material {
		name: string;
		model: string;
		albedo?: Vec3 | "fallthrough";
		opacity?: number | "fallthrough";
		opacityCutoff?: number | "fallthrough";
		roughness?: number | "fallthrough";
		metallic?: number | "fallthrough";
		scattering?: number | "fallthrough";
		unlit?: boolean | "fallthrough";
		emissive?: Vec3 | "fallthrough";
		albedoMap?: string | "fallthrough";
		opacityMap?: string | "fallthrough";
		opacityMapMode?:
			| "OPACITY_MAP_OPAQUE"
			| "OPACITY_MAP_MASK"
			| "OPACITY_MAP_BLEND"
			| "fallthrough";
		occlusionMap?: string | "fallthrough";
		lightMap?: string | "fallthrough";
		lightmapParams?: string | "fallthrough";
		scatteringMap?: string | "fallthrough";
		emissiveMap?: string | "fallthrough";
		metallicMap?: string | "fallthrough";
		specularMap?: string | "fallthrough";
		roughnessMap?: string | "fallthrough";
		glossMap?: string | "fallthrough";
		normalMap?: string | "fallthrough";
		bumpMap?: string | "fallthrough";
		materialParams?: string | "fallthrough";
		cullFaceMode?: "CULL_NONE" | "CULL_FRONT" | "CULL_BACK";
		texCoordTransform0?: Mat4 | "fallthrough";
		texCoordTransform1?: Mat4 | "fallthrough";
		procedural: string;
		defaultFallthrough: boolean;
	}

	interface MaterialLayer {
		material: Material;
		priority: number;
	}

	interface MeshExtents {
		brn: Vec3;
		tfl: Vec3;
		center: Vec3;
		dimensions: Vec3;
	}

	type MeshTopology =
		| "points"
		| "lines"
		| "line_strip"
		| "triangles"
		| "triangle_strip"
		| "quads"
		| "quad_strip";

	// methods

	function canUpdateModel(
		id: Uuid,
		meshIndex?: number,
		partNumber?: number,
	): boolean;
	function exportModelToOBJ(model: GraphicsModel): string;
	function getModel(id: Uuid): GraphicsModel;
	function newMesh(ifsMeshData: IFSData): GraphicsMesh;
	function newModel(meshes: GraphicsMesh[]): GraphicsModel;
	function updateModel(id: Uuid, model: GraphicsModel);
}
