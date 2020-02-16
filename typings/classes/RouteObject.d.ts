declare class RouteObject {
	clamp(min: number, max: number): RouteObject;
	contrainToInteger(): RouteObject;
	constrainToPositiveInteger(): RouteObject;
	deadZone(min: number): RouteObject;
	debug(enable?: boolean): RouteObject;
	exponentialSmoothing(
		rotationConstant: number,
		translationConstant: number,
	): RouteObject;
	hysteresis(min: number, max: number): RouteObject;
	invert(): RouteObject;
	logicalNot(): RouteObject;
	lowVelocity(
		rotationConstant: number,
		translationConstant: number,
	): RouteObject;
	peek(enabled?: boolean): RouteObject;
	postTransform(transform: Mat4): RouteObject;
	pulse(interval: number): RouteObject;
	rotate(rotation: Quat): RouteObject;
	scale(multiplyer: number): RouteObject;
	to(destination: Controller.Standard | Controller.Actions | Function): void;
	toQml(
		destination: Controller.Standard | Controller.Actions | Function,
	): void;
	transform(transform: Mat4): RouteObject;
	translate(translate: Vec3): RouteObject;
	when(expression: any | any[]): RouteObject;
	whenQml(expression: any | any[]): RouteObject;
}
