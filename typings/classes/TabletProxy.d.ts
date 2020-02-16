declare type TabletButtonListModel = object;

declare class TabletProxy {
	readonly name: string;
	toolbarMode: boolean;
	landscape: boolean;
	tabletShown: boolean;
	buttons: TabletButtonListModel;

	addButton(
		properties: Partial<TabletButtonProxyButtonProperties>,
	): TabletButtonProxy;
	closeDialog(): void;
	emitScriptEvent(message: string | object): void;
	getLandscape(): boolean;
	gotoHomeScreen(): void;
	gotoMenuScreen(submenu?: string): void;
	gotoWebScreen(url: string, injectedJavaScriptUrl?: string): void;
	isMessageDialogOpen(): boolean;
	isPathLoaded(path: string): boolean;
	loadQMLOnTop(path: string): void;
	loadQMLSource(path: string, resizable?: boolean): void;
	loadWebScreenOnTop(path: string, injectedJavaScriptURL?: string): void;
	onHomeScreen(): boolean;
	popFromStack(): void;
	pushOntoStack(path: string): boolean;
	removeButton(button: TabletButtonProxy): void;
	returnToPreviousApp(): void;
	sendToQml(message: string | object): void;
	setLandscape(landscape: boolean): void;

	readonly fromQml: Signal<(message: string | object) => any>;
	readonly screenChanged: Signal<
		(
			type: "Home" | "Menu" | "QML" | "Web" | "Closed" | "Unknown",
			url: string,
		) => any
	>;
	readonly tabletShownChanged: Signal<() => any>;
	readonly toolbarModeChanged: Signal<() => any>;
	readonly webEventReceived: Signal<(message: string | object) => any>;
}
