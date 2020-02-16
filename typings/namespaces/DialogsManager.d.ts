declare namespace DialogsManager {
	// properties

	// methods
	function showAddressBar(): void;
	function hideAddressBar(): void;
	function showLoginDialog(): void;
	function showFeed(): void;

	// signals
	const addressBarShown: Signal<(visible: boolean) => any>;
}
