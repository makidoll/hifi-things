declare class MappingObject {
	disable(): MappingObject;
	enable(enable?: boolean): MappingObject;
	from(
		source: Controller.Standard | Controller.Hardware | Function,
	): RouteObject;
	fromQml(
		source: Controller.Standard | Controller.Hardware | Function,
	): RouteObject;
	makeAxis(
		source1: Controller.Hardware,
		source2: Controller.Hardware,
	): RouteObject;
	makeAxisQml(
		source1: Controller.Hardware,
		source2: Controller.Hardware,
	): RouteObject;
}
