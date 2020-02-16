declare namespace AddressManager {
	// properties
	const domainID: Uuid;
	const hostname: string;
	const href: string;
	const isConnected: boolean;
	const pathname: string;
	const placename: string;
	const protocol: string;

	enum LookupTrigger {
		UserInput,
		Back,
		Forward,
		StartupFromSettings,
		DomainPathResponse,
		Internal,
		AttemptedRefresh,
		Suggestions,
		VisitUserFromPAL,
	}

	// methods
	function canGoBack(): boolean;
	function copyAddress(): void;
	function copyPath(): void;
	function goBack(): void;
	function goForward(): void;
	function goToEntry(trigger: LookupTrigger): void;
	function goToLastAddress(): void;
	function goToLocalSandbox(path?: string, trigger?: LookupTrigger): void;
	function goToUser(username: string, matchOrientation?: boolean): void;
	function handleLookupString(
		address: string,
		fromSuggestions?: boolean,
	): void;
	function storeCurrentAddress(): void;

	// signals
	const goBackPossible: Signal<(isPossible: boolean) => any>;
	const goForwardPossible: Signal<(isPossible: boolean) => any>;
	const hostChanged: Signal<(hostname: string) => any>;
	const locationChangeRequired: Signal<(
		position: Vec3,
		hasOrientationChange: boolean,
		orientation: Quat,
		shouldFaceLocation: boolean,
	) => any>;
	const lookupResultIsNotFound: Signal<() => any>;
	const lookupResultIsOffline: Signal<() => any>;
	const lookupResultsFinished: Signal<() => any>;
	const pathChangeRequired: Signal<(path: string) => any>;
	const possibleDomainChangeRequired: Signal<(
		domainURL: string,
		domainID: Uuid,
	) => any>;
	const possibleDomainChangeRequiredViaICEForID: Signal<(
		iceServerHostName: string,
		domainID: Uuid,
	) => any>;
}
