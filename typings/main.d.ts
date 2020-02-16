// undocumented

declare namespace module {
	let exports: any;
}

declare type Timer = object;

declare class Signal<T = Function> {
	connect(callback: T): void;
	disconnect(callback: T): void;
}

// undocumented for implements
// `class MyClass implements ClientEntityScript`

declare class ClientEntityScript {
	preload?(entityID: Uuid): void;
	unload?(entityID: Uuid): void;

	startNearTrigger?(entityID: Uuid): void;
	startFarTrigger?(entityID: Uuid): void;

	clickDownOnEntity?(entityID: Uuid, event: PointerEvent): void;

	enterEntity?(entityID: Uuid): void;
}
