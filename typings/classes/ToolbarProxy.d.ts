declare class ToolbarProxy {
	readProperties(propertyList: string[]): object;
	readProperty(propertyName: string): object;
	writeProperties(properties: object): void;
	writeProperty(propertyValue: object): void;
}
