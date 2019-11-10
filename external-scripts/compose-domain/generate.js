#!/usr/bin/env node

var fs = require("fs");
var YAML = require("yaml");

var config = require("./config.js");
var services = {};

Object.keys(config.domains).forEach(name => {
	let port = config.domains[name][0];
	let ports = [];

	let command = "";
	let environment = [];

	if (port == null) {
		// default ports
		port = 40100;
		ports = [
			{
				start: port,
				end: port + 9,
			},
			{
				start: port + 7900,
				end: port + 7900 + 9,
			},
		];
	} else {
		ports = [
			{
				start: port,
				end: port + 9,
			},
			{
				start: port + 10,
				end: port + 19,
			},
		];

		command =
			'sh -c "' +
			"sed -i '{s/4800/'$${HIFI_ASSIGNMENT_RANGE_START%?}'/g;}' /etc/supervisor/conf.d/hifi.conf && " +
			"supervisord -c /etc/supervisor/conf.d/hifi.conf" +
			'"';

		environment.push("HIFI_ASSIGNMENT_RANGE_START=" + ports[1].start);
	}

	// custom metaverse url
	const metaverseUrl = config.domains[name][2];
	if (metaverseUrl != null) {
		environment.push("HIFI_METAVERSE_URL=" + metaverseUrl);
	}

	services[name] = {
		hostname: name,
		image: "highfidelity/hifi:" + config.version,
		ports: [
			ports[0].start + "-" + ports[0].end + ":40100-40109",
			ports[0].start + "-" + ports[0].end + ":40100-40109/udp",
			ports[1].start + "-" + ports[1].end,
			ports[1].start + "-" + ports[1].end + "/udp",
		],
		volumes: ["./domains/" + name + ":/root/.local/share/High Fidelity"],
		environment,
		restart: "always",
		network_mode: "bridge",

		/*
		cpu_count: 3,
		cpu_percent: 50,
		mem_limit: "8g",
		mem_reservation: "2g", 
		*/

		/*deploy: {
			resources: {
				limits: {
					memory: "2G"
				}
			}
		}*/
	};

	if (command) services[name].command = command;
});

console.log("Using High Fidelity v" + config.version);
console.log("Wrote " + Object.keys(config.domains).length + " domains\n");

fs.writeFileSync(
	"./docker-compose.yml",
	YAML.stringify({
		version: "3.6",
		services: services,
	}),
);
