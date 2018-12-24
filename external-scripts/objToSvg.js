if (process.argv.length < 3) {
	console.log("\n\033[1mnode objToSvg.js [input .obj] [output .svg]\033[0m\n");
	console.log("Make sure your .obj has edges and verticies.");
	console.log("All faces are ignored.");
	return;
}

var fs = require("fs");

let inputFilename = process.argv[2];
let outputFilename = (process.argv[3])?
	(()=>{
		let out = process.argv[3];
		if (out.split(".").pop()!="svg") out+=".svg";
		return out;
	})():
	(()=>{
		let out = inputFilename.split(".");
		out.pop();
		return out.join(".")+".svg";
	})();

function Obj(input) {
	this.verticies = [];
	this.edges = [];

	input.split("\n").forEach(line=>{
		line = line.split(" ");
		switch (line[0]) {
			case "v":
				let vertex = [];
				for (var i=1; i<line.length; i++) {
					vertex.push(parseFloat(
						line[i]*((i==2)?-1:1)
					));
				}
				this.verticies.push(vertex);
			break;
			case "l":
				let edge = [];
				for (var i = 1; i < line.length; i++) {
					edge.push(parseInt(line[i])-1);
				}
				this.edges.push(edge);
			break;
		}
	});
}

let obj = new Obj(fs.readFileSync(inputFilename, "utf8"));

let minWidth = 0; let maxWidth = 0;
let minHeight = 0; let maxHeight = 0;

obj.verticies.forEach(vertex=>{
	if (vertex[0]<minWidth) minWidth = vertex[0];
	if (vertex[0]>maxWidth) maxWidth = vertex[0];

	if (vertex[1]<minHeight) minHeight = vertex[1];
	if (vertex[1]>maxHeight) maxHeight = vertex[1];
});

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minWidth} ${minHeight} ${maxWidth} ${maxHeight}" fill="none" stroke="#000" stroke-width="0.1">`

let edges = obj.edges.map(edge=>{return {
	done: false,
	verticies: edge.map(vertI=>obj.verticies[vertI]),
}});

function addNextPath() {
	let currentEdge = undefined;
	for (var i=0; i<edges.length; i++) {
		if (edges[i].done) continue;
		currentEdge = edges[i];
		break;
	}
	if (currentEdge == undefined) return; // all done!

	// start path and finish line
	svg += 'Z"/><path d="M';

	let addEdgeToPath = (edge, edgeI)=>{

		edge.verticies.forEach(vertex=>{
			svg += vertex[0]+","+vertex[1]+"L";
		});
		edge.done = true;

		// find other edge that connects with this edge
		let lastVertex = edge.verticies[edge.verticies.length-1];
		for (var i = 0; i<edges.length; i++) {
			if (edges[i].done) continue;
			console.log("connecting")
			if (lastVertex == edges[i].verticies[0])
				addEdgeToPath(edges[i]);
		}
	}

	addEdgeToPath(currentEdge);
	addNextPath();
}

addNextPath();

// obj.edges.forEach(edge=>{
// 	edge.forEach((vertexIndex,i)=>{
// 		let vertex = obj.verticies[vertexIndex];

// 		if (i==0) {
// 			// first vertex check if it nees to be ZM'd
// 			if (lastVertex != vertex) {
// 				svg+='Z"/><path d="M'
// 			}
// 		}

// 		svg += vertex[0]+","+vertex[1]+"L";
// 		lastVertex = vertex;
// 	});
// });

svg += 'Z"/></svg>';
svg = svg.replace(/>Z"\/>/, '>'); // remove Z from start of file
svg = svg.replace(/LZ/g, "Z"); // L doesnt happen right before Z

fs.writeFileSync(outputFilename, svg);
console.log("Saved to: "+outputFilename);