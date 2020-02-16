declare interface TabletButtonProxyButtonProperties {
	readonly uuid: Uuid;
	readonly objectName: Uuid;
	stableOrder: number;
	icon: string;
	hoverIcon: string;
	activeIcon: string;
	activeHoverIcon: string;
	text: string;
	hoverText: string;
	activeText: string;
	activeHoverText: string;
	captionColor: string;
	isActive: boolean;
	isEntered: boolean;
	buttonEnabled: boolean;
	sortOrder: number;
	inDebugMode: boolean;
	flickable: object;
	gridView: object;
	buttonIndex: number;
}

declare class TabletButtonProxy {
	readonly uuid: Uuid;
	properties: TabletButtonProxyButtonProperties;

	editProperties(
		properties: Partial<TabletButtonProxyButtonProperties>,
	): void;
	getProperties(): TabletButtonProxyButtonProperties;

	readonly clicked: Signal<() => any>;
	readonly propertiesChanged: Signal<() => any>;
}
