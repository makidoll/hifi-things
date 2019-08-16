#!/usr/bin/env node

var fs = require("fs");
var YAML = require("yaml");

var config = require("./config.js")
var services = {};

var command = "sh -c \""+
	"sed -i '{s/4800/'$${HIFI_ASSIGNMENT_RANGE_START%?}'/g;}' /etc/supervisor/conf.d/hifi.conf && "+
	"supervisord -c /etc/supervisor/conf.d/hifi.conf"+
"\"";

Object.keys(config.domains).forEach(name=>{
	let port = config.domains[name];
	port = [
		{
			start: port,
			end: port+9,
		},
		{
			start: port+10,
			end: port+19,
		}
	]

	services[name] = {
		hostname: name,
		image: "highfidelity/hifi:"+config.version,
		ports: [
			port[0].start+"-"+port[0].end+":40100-40109",
			port[0].start+"-"+port[0].end+":40100-40109/udp",
			port[1].start+"-"+port[1].end,
      		port[1].start+"-"+port[1].end+"/udp",
		],
		volumes: [
			"./domains/"+name+":/root/.local/share/High Fidelity" 
		],
		environment: [
			"HIFI_ASSIGNMENT_RANGE_START="+port[1].start
		],
		command: command,
		restart: "always",
		network_mode: "bridge",
	};
});

console.log("Using High Fidelity v"+config.version);
console.log("Wrote "+Object.keys(config.domains).length+" domains\n");

fs.writeFileSync("./docker-compose.yml", YAML.stringify({
	version: "3.6",
	services: services
}));
