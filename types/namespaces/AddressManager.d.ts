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
	const goBackPossible: Signal;
	const goForwardPossible: Signal;
	const hostChanged: Signal;
	const locationChangeRequired: Signal;
	const lookupResultIsNotFound: Signal;
	const lookupResultIsOffline: Signal;
	const lookupResultsFinished: Signal;
	const pathChangeRequired: Signal;
	const possibleDomainChangeRequired: Signal;
	const possibleDomainChangeRequiredViaICEForID: Signal;
}
