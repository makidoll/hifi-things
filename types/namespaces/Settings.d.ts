declare namespace Settings {
	function getValue(key: string, defaultValue?: string|number|boolean|object): string|number|boolean|object;
	function setValue(key: string, value: string|number|boolean|object|undefined): void;
}