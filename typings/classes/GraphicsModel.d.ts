declare class GraphicsModel {
	readonly objectID: Uuid;
	readonly numMeshes: number;
	readonly meshes: GraphicsMesh[];
	readonly materialNames: string[];
	readonly materialLayers: Graphics.MaterialLayer[];

	cloneModel(options?: object): GraphicsModel;
	toString(): string;
}
