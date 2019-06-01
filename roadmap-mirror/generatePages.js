var fs = require("fs");

let boards = fs.readdirSync(".");
boards = boards.filter(name=>{
	if (name.includes(".json")) {
		if (name.includes("package-lock")) return false;
		return true;
	}
});

boards.forEach(filename=>{
	let path = filename.replace(/\.json/gi, "");
	let title = path.replace(/-/gi, " ").split(" ").map(word=>{
		return word.slice(0,1).toUpperCase()+word.slice(1).toLowerCase();
	}).join(" ")

	let posts = fs.readFileSync(filename, "utf8");
	posts = JSON.parse(posts);

	let postHTML = "";
	posts.forEach(post=>{
		postHTML += (
			"<div class='post'>"+
				"<table>"+
					"<td>"+
						"<p class='score'>"+post.score+"</p>"+
					"</td>"+
					"<td>"+
						"<p class='title'>"+post.title+"</p>"+
						"<p class='details'>"+post.details+"</p>"+
					"</td>"+
				"</table>"+
			"</div>"
		);
	});

	let html = fs.readFileSync("page.html", "utf8");

	let date = new Date().toISOString().split("T")[0];

	html = html.replace(/\[filename\]/gi, filename);
	html = html.replace(/\[posts\]/gi, postHTML);
	html = html.replace(/\[title\]/gi, title);
	html = html.replace(/\[date\]/gi, date);

	if (!fs.existsSync(path)) fs.mkdirSync(path);
	path = path+"/index.html";
	fs.writeFileSync(path, html);

	console.log("Page written: "+path);
});