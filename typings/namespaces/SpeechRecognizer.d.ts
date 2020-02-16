declare namespace SpeechRecognizer {
	function addCommand(command: string): void;
	function removeCommand(command: string): void;
	function setEnabled(enabled: boolean): void;

	const commandRecognized: Signal<(command: string) => any>;
	const enabledUpdated: Signal<(enabled: boolean) => any>;
}
